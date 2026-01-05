// src/Home.jsx
import { useEffect, useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import React from "react";


// images (put these in src/assets)
import mapleImg from "./assets/leaf.png";
import logoImg from "./assets/logo.png";
import googleLogo from "./assets/google.png"; // <--- NEW: google logo

// ---------- animations & styled components ----------
const fadeIn = keyframes`
  from { opacity: 0 }
  to { opacity: 1 }
`;

const zoomOut = keyframes`
  from { transform: scale(2.2); opacity: 0 }
  40% { transform: scale(1); opacity: 1 }
  to { transform: scale(1); opacity: 1 }
`;

const fadeOut = keyframes`
  from { opacity: 1 }
  to { opacity: 0 }
`;

const pulse = keyframes`
  0% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.15); opacity: 1; }
  100% { transform: scale(1); opacity: 0.8; }
`;

const AppShell = styled.div`
  width: 1350px;
  height: 635px ;
  display:flex;
  align-items:center;
  justify-content:center;
  background: #FFF5F5; /* ivory-creamy */
  font-family: "DM Sans", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
  margin-left: 0px;
  margin-top: -28px;
  margin-bottom: -32px;
`;

const CenterStage = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  position:relative;
  width:100%;
  height:100vh;
`;

const Maple = styled.img`
  width: 480px;
  height: auto;
  will-change: opacity, transform;
  animation: ${fadeIn} 400ms ease-out forwards;
  &.leave {
    animation: ${fadeOut} 450ms ease-in forwards;
  }
`;

const Logo = styled.img`
  width: 550px;
  height: auto;
  position: absolute;
  opacity: 0;
  transform-origin: center;
  &.enter {
    animation: ${zoomOut} 700ms cubic-bezier(.2,.9,.2,1) forwards;
  }
  &.leave {
    animation: ${fadeOut} 600ms ease-in forwards;
  }
`;

const AuthCard = styled.div`
  background: rgba(255,255,255,0.95);
  border-radius: 18px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.07);
  padding: 28px;
  height: 500px;
  width: 420px;
  animation: ${fadeIn} 400ms ease-out;
`;

const Title = styled.h2`
  margin-top: -35px;
    margin-bottom: -30px;
  font-size: 30px;
  letter-spacing: 0.2px;
  color: #4A1E2D;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
`;

const InlineLogo = styled.img`
  height: 150px;
  width: auto;
  margin-left: -10px;
`;

const Subtitle = styled.p`
  margin: 0 0 18px 0;
  color: #000000ff;
  font-size: 14px;
  text-align: center;
`;

const Row = styled.div`
  display:flex;
  gap:10px;
  margin-bottom:12px;
  justify-content: center;
`;

const Input = styled.input`
  flex:1;
  padding:10px 12px;
  border-radius:10px;
  border:1px solid #000000ff;
  background:#fff;
  color: black;
  font-size:14px;
  outline:none;
  &:focus { box-shadow: 0 3px 10px rgba(0,0,0,0.06); }
`;

const Button = styled.button`
  padding:10px 12px;
  background:  #f85e7aff;
  color:white;
  border:none;
  border-radius:10px;
  cursor:pointer;
  font-weight:600;
`;

const GoogleButton = styled.button`
  padding: 10px 18px;
  background: #ffffff;
  color: #444;
  cursor: pointer;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: 2px solid transparent;
  border-image: linear-gradient(
    90deg,
    #4285F4,
    #EA4335,
    #FBBC05,
    #34A853
  ) 1;
`;

const GoogleIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const Small = styled.small`
  display:block;
  margin-top:10px;
  color:#888;
  font-size:12px;
`;

const Divider = styled.div`
  height:1px;
  background:#f3f3f3;
  margin:12px 0 18px 0;
`;

const Info = styled.p`
  font-size:13px;
  color:#555;
`;

const LoaderWrapper = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  width:100%;
  height:100vh;
`;

const LoaderLeaf = styled.img`
  width: 140px;
  height: auto;
  animation: ${pulse} 1.2s ease-in-out infinite;
`;

const ProfileWrapper = styled.div`
  background: rgba(255,255,255,0.95);
  border-radius: 18px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.07);
  padding: 28px;
  height: 500px;
  width: 420px;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
`;

const ProfileTitle = styled.h2`
  font-size: 26px;
  margin-bottom: 20px;
  margin-top: -50px;
  color: #4A1E2D;
`;

const ProfileText = styled.p`
  font-size: 14px;
  color: #555;
  text-align: center;
    margin-top: -20px;

`;

// ---------- main component ----------
export default function Home() {
  // animation state
  const [showMaple, setShowMaple] = useState(true);
  const [mapleLeaving, setMapleLeaving] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [logoLeaving, setLogoLeaving] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  // auth UI state
  const [mode, setMode] = useState("email"); // 'email' or 'phone'
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const confirmationRef = useRef(null);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  const [showProfile, setShowProfile] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  // force fresh login every reload
  useEffect(() => {
    auth.signOut().catch(() => {});
  }, []);

  useEffect(() => {
    // Sequence:
    // maple visible -> after 2s set leave -> show logo -> after 3s logo leave -> show auth
    const t1 = setTimeout(() => {
      setMapleLeaving(true);
      setTimeout(() => {
        setShowMaple(false);
        setShowLogo(true);
      }, 350);
    }, 2000);

    const t2 = setTimeout(() => {
      setLogoLeaving(true);
      setTimeout(() => {
        setShowLogo(false);
        setShowAuth(true);
      }, 300);
    }, 2000 + 700 + 3000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return unsub;
  }, []);

  // After user logs in → show signed-in view for 4s → loader 5s → profile page
  useEffect(() => {
    let signoutViewTimer;
    let loaderTimer;

    if (user) {
      setShowProfile(false);
      setShowLoader(false);

      signoutViewTimer = setTimeout(() => {
        setShowLoader(true);
        loaderTimer = setTimeout(() => {
          setShowLoader(false);
          setShowProfile(true);
        }, 5000);
      }, 4000);
    } else {
      setShowProfile(false);
      setShowLoader(false);
    }

    return () => {
      if (signoutViewTimer) clearTimeout(signoutViewTimer);
      if (loaderTimer) clearTimeout(loaderTimer);
    };
  }, [user]);

  // Email/password handlers
  const handleEmailSubmit = async (e) => {
    e && e.preventDefault();
    setMessage("");
    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
        setMessage("Signup successful — you are logged in.");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        setMessage("Login successful.");
      }
    } catch (err) {
      console.error(err);
      setMessage(err.message || "Error during email auth.");
    }
  };

  // Phone (OTP)
const setupRecaptcha = () => {
  if (window.recaptchaVerifier) return window.recaptchaVerifier;
  const verifier = new RecaptchaVerifier(
    auth,                      // ✅ auth goes first in modular SDK
    "recaptcha-container",     // then the container ID
    { size: "invisible" }      // then options
  );
  window.recaptchaVerifier = verifier;
  return verifier;
};

  const sendOtp = async (e) => {
    e && e.preventDefault();
    setMessage("");
    try {
      const verifier = setupRecaptcha();
      const confirmationResult = await signInWithPhoneNumber(auth, phone, verifier);
      confirmationRef.current = confirmationResult;
      setMessage("OTP sent to " + phone);
    } catch (err) {
      console.error(err);
      setMessage(
        err.message ||
        "Failed to send OTP. Use E.164 format (e.g. +11234567890) and enable Phone Auth in Firebase console."
      );
    }
  };

  const verifyOtp = async (e) => {
    e && e.preventDefault();
    setMessage("");
    try {
      if (!confirmationRef.current) {
        setMessage("No OTP sent yet.");
        return;
      }
      await confirmationRef.current.confirm(otp);
      setMessage("Phone login successful.");
    } catch (err) {
      console.error(err);
      setMessage(err.message || "OTP verification failed.");
    }
  };

  const signOut = async () => {
    await auth.signOut();
    setMessage("Signed out.");
  };

  const handleGoogleSignIn = async () => {
    setMessage("");
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      setMessage("Google login successful.");
    } catch (err) {
      console.error(err);
      setMessage(err.message || "Google sign-in failed.");
    }
  };

  const navigate = useNavigate();

const goToProfilePage = () => {
  navigate("/profile");
};


  return (
    <AppShell>
      <CenterStage>
        {showMaple && (
          <Maple src={mapleImg} alt="maple" className={mapleLeaving ? "leave" : ""} />
        )}

        {showLogo && (
          <Logo src={logoImg} alt="amour logo" className={logoLeaving ? "leave" : "enter"} />
        )}

        {showProfile ? (
          <ProfileWrapper>
            <InlineLogo src={logoImg} alt="Amour logo" />
            <ProfileTitle>Create your Profile</ProfileTitle>
            <ProfileText>
              Welcome to your space. Here you’ll add your photos, bio, interests and more.
              You’re currently logged in as <b>{user?.email || user?.phoneNumber || "Amour user"}</b>.
            </ProfileText>
            <Button
              style={{ marginTop: "18px", paddingInline: "24px" }}
              onClick={goToProfilePage}
            >
              Create your Profile
            </Button>
          </ProfileWrapper>
        ) : showLoader ? (
          <LoaderWrapper>
            <LoaderLeaf src={mapleImg} alt="Loading..." />
          </LoaderWrapper>
        ) : (
          showAuth && (
            <AuthCard>
              <Title>
                Welcome to
                <InlineLogo src={logoImg} alt="Amour logo" />
              </Title>
              <Subtitle>Sign in or create an account to find someone special</Subtitle>

              {!user ? (
                <>
                  <div style={{ display: "flex", gap: 8, marginBottom: 12, justifyContent: "center" }}>
                    <Button
                      onClick={() => setMode("email")}
                      style={{ flex: 1, background: mode === "email" ? "#E44161" : undefined }}
                    >
                      Email
                    </Button>
                    <Button
                      onClick={() => setMode("phone")}
                      style={{ flex: 1, background: mode === "phone" ? "#E44161" : undefined }}
                    >
                      Phone
                    </Button>
                  </div>

                  {mode === "email" && (
                    <form onSubmit={handleEmailSubmit}>
                      <Row>
                        <Input
                          required
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </Row>
                      <Row>
                        <Input
                          required
                          type="password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </Row>
                      <Row>
                        <Button type="submit">
                          {isSignup ? "Sign Up" : "Sign In"}
                        </Button>
                        <Button
                          type="button"
                          onClick={() => setIsSignup(!isSignup)}
                          style={{ background: "#ddd", color: "#333" }}
                        >
                          {isSignup ? "Switch to Sign In" : "Switch to Sign Up"}
                        </Button>
                      </Row>
                    </form>
                  )}

                  {mode === "phone" && (
                    <>
                      <div id="recaptcha-container" />
                      <form onSubmit={sendOtp}>
                        <Row>
                          <Input
                            required
                            placeholder="Phone (E.164) e.g. +11234567890"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                          />
                        </Row>
                        <Row>
                          <Button type="submit">Send OTP</Button>
                        </Row>
                      </form>

                      <form onSubmit={verifyOtp}>
                        <Row>
                          <Input
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                          />
                          <Button type="button" onClick={verifyOtp}>
                            Verify
                          </Button>
                        </Row>
                      </form>
                    </>
                  )}

                  <Divider />

                  <Row>
                    <GoogleButton type="button" onClick={handleGoogleSignIn}>
                      <GoogleIcon src={googleLogo} alt="Google" />
                      <span>Continue with Google</span>
                    </GoogleButton>
                  </Row>

                  <Info>
                    By continuing you agree to AMOUR's terms. Phone auth requires enabling Phone
                    Provider in Firebase console and using an allowed test number during development.
                  </Info>

                  {message && <Small>{message}</Small>}
                </>
              ) : (
                <>
                  <Info>Signed in as: {user.phoneNumber || user.email}</Info>
                  <Row>
                    <Button onClick={signOut}>Sign out</Button>
                  </Row>
                  {message && <Small>{message}</Small>}
                </>
              )}
            </AuthCard>
          )
        )}
      </CenterStage>
    </AppShell>
  );
}
