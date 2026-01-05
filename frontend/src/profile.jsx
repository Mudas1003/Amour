// src/Profile.jsx
import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import logoImg from "./assets/logo.png";
import mapleImg from "./assets/leaf.png";
import plusIcon from "./assets/plus.png";
import Profile1 from "./profile1";
import Profile2 from "./profile2";
import Profile3 from "./profile3";

// ------------------------------------------
// ANIMATIONS + STYLES — UNTOUCHED (YOUR UI)
// ------------------------------------------

const pulse = keyframes`
  0% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.15); opacity: 1; }
  100% { transform: scale(1); opacity: 0.8; }
`;

const PageWrapper = styled.div`
  width: 1300px;
  min-height: 100vh;
  background: #fff5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "DM Sans", system-ui, -apple-system, "Segoe UI", Roboto,
    "Helvetica Neue", Arial;
  padding: 24px;
`;

const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

const LoaderLeaf = styled.img`
  width: 140px;
  height: auto;
  animation: ${pulse} 1.2s ease-in-out infinite;
`;

const Card = styled.div`
  width: 1200px;
  max-width: 100%;
  background: linear-gradient(135deg, #ffffff, #ffe9ef);
  border-radius: 22px;
  padding: 28px 32px 32px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.img`
  height: 180px;
  width: auto;
  margin-bottom: -30px;
`;

const HiText = styled.h1`
  margin: 0;
  font-size: 40px;
  font-weight: 700;
  color: #4a1e2d;
  text-align: left;
  margin-bottom: -40px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SectionHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 8px;
`;

const SectionTitle = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: #4a1e2d;
`;

const SectionSub = styled.p`
  margin: 0;
  font-size: 12px;
  color: #777;
`;

const PhotosCarousel = styled.div`
  display: flex;
  flex-direction: row;
  gap: 14px;
  margin-top: 4px;
  overflow-x: auto;
  padding-bottom: 4px;

  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
`;

const PhotoWrapper = styled.div`
  min-width: ${(props) => (props.large ? "260px" : "190px")};
`;

const PhotoTopRow = styled.div`
  margin-bottom: 6px;
`;

const PromptBarButton = styled.button`
  width: 100%;
  border-radius: 10px;
  border: 1px solid #f4b9c8;
  padding: 8px 10px;
  font-size: 12px;
  outline: none;
  background: #ffffff;
  color: #333;
  text-align: left;
  cursor: pointer;
  position: relative;
  font-weight: 500;

  &::after {
    content: "▾";
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 10px;
    color: #777;
  }
`;

const PhotoCard = styled.div`
  position: relative;
  flex: 0 0 ${(props) => (props.large ? "260px" : "190px")};
  height: ${(props) => (props.large ? "280px" : "280px")};
  border-radius: 18px;
  background: #fff5f5;
  border: 1px dashed #e44161;
  overflow: hidden;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const MainTag = styled.div`
  position: absolute;
  top: 10px;
  right: 12px;
  background: rgba(228, 65, 97, 0.92);
  color: white;
  font-size: 10px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 999px;
  z-index: 2;
`;

const CardContent = styled.div`
  text-align: center;
  color: #444;
  font-size: 12px;
`;

const PlusCircle = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 999px;
  background: #ffffff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 6px;
`;

const PlusImg = styled.img`
  width: 22px;
  height: 22px;
`;

const CardPreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
`;

const CardVideoPreview = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
`;

const LastCardText = styled.p`
  margin: 4px 0 0;
  font-size: 11px;
  color: #555;
`;

const PromptOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const PromptModal = styled.div`
  background: #ffffff;
  border-radius: 18px;
  padding: 14px 16px;
  width: min(360px, 92vw);
  max-height: 70vh;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const PromptModalTitle = styled.h3`
  margin: 0;
  font-size: 15px;
  color: #4a1e2d;
`;

const PromptList = styled.div`
  margin-top: 6px;
  overflow-y: auto;
  padding-right: 4px;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  scrollbar-width: none;
`;

const PromptOption = styled.button`
  width: 100%;
  text-align: left;
  border: none;
  background: ${(props) => (props.active ? "#ffe3ec" : "transparent")};
  border-radius: 10px;
  padding: 8px 10px;
  font-size: 13px;
  margin-bottom: 4px;
  cursor: pointer;
  color: #333;

  &:hover {
    background: #ffe3ec;
  }
`;

const PromptClose = styled.button`
  align-self: flex-end;
  border: none;
  background: none;
  font-size: 12px;
  color: #e44161;
  cursor: pointer;
`;

// 📌 Your prompt list here (unchanged)
const photoPromptOptions = [
  "Leave a comment if you want to meet here",
  "Guess where this photo was taken",
  "Plandid or candid?",
  "You had to be there",
  "How my friends see me",
  "This could be us",
  "Together we can be terrible at",
  "Leave a one-word review for this",
  "Life out-take",
  "Let me introduce you to my alter ego",
  "My submission to National Geographic",
  "My Instagram Story mostly contains",
  "My weekends look like",
  "Are you a dog person because",
  "Guess how many takes this took",
  "Most exotic place I've been", 
  "I can teach you how to", 
  "Pre-coffee me", 
  "Felt cute, might delete later",
  "I'm known for",
  "How history will remember me",
  "It's all about the simple things",
  "That one dance trend I nailed",
  "#MondaysAmIRight?",
  "Let's do this for our date from home",
  "My best blue steel",
  "My uniform",
  "Me in the wild",
  "Comment if you've been here",
  "As seen on my mum's fridge",
  "A special talent of mine",
  "Woke up like this",
  "Dating me will look like",
  "Get someone who looks at you like",
  "Post-coffee me",
  "I feel famous when",
  "Help me identify this photo bomber",
  "I'm learning how to",
  "This should go viral",
  "My life behind the scenes",
  "The moment I knew my modelling career was over",
  "It was all fun and games until",
  "Me during Fashion Week",
  "A favourite memory of mine",
  "Never have I ever",
  "Caption this photo",
  "Biggest risk I've ever taken",
  "This year, I really want to",
  "Thank you for coming to my TED Talk",
  "Lowkey flex",
  "My proudest moment",
  "How I fight the Sunday scaries",
  "Video most likely to win an Oscar",
  "The advertisement for my life would look like",
  "Are you a cat person because",
  "Don't show this to my mum",
  "Selfie #503",
  "My dog looks at me like this",
  "Take me back to",
  "My life peaked when",
  "Me in my blogging days",
  "My best side", "Don't judge me",
  "Caught in the act",
  "I thought I'd deleted this one",
  "My vulnerable side",
  "Guess the backstory to this photo",
  "Write the subtitles for this video",
  "My quarter-life crisis looks like",
  "Who wore it better?",
  "Me and my best friend",

];

// ========================================================================
// ⭐⭐⭐ FINAL UPDATED Profile COMPONENT ⭐⭐⭐
// ========================================================================

export default function Profile({ media, prompts, onMediaChange, onPromptsChange }) {
  const [loading, setLoading] = useState(true);
  const [transitionLoading, setTransitionLoading] = useState(false);
  const [step, setStep] = useState("main");
  const [activePromptIndex, setActivePromptIndex] = useState(null);

  // ------------------------------------------
  // LOADER
  // ------------------------------------------

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(t);
  }, []);

  // ------------------------------------------
  // FILE UPLOAD HANDLER (FIXED)
  // ------------------------------------------

  const handleCardClick = (index) => {
    document.getElementById(`media-input-${index}`)?.click();
  };

  const handleMediaChange = (index, event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    const isVideo = file.type.startsWith("video");

    onMediaChange((prev) => {
      const updated = [...prev];
      updated[index] = { file, url, isVideo };
      return updated;
    });
  };

  // ------------------------------------------
  // PROMPT MODAL HANDLER (FIXED)
  // ------------------------------------------

  const handlePromptSelect = (index, prompt) => {
    onPromptsChange((prev) => {
      const updated = [...prev];
      updated[index] = prompt;
      return updated;
    });
    setActivePromptIndex(null);
  };

  // ------------------------------------------
  // STEP NAVIGATION
  // ------------------------------------------

  const handleProfileCompleted = () => {
    setTransitionLoading(true);
    setTimeout(() => {
      setTransitionLoading(false);
      setStep("part2");
    }, 3000);
  };

  const handlePart2Completed = () => {
    setTransitionLoading(true);
    setTimeout(() => {
      setTransitionLoading(false);
      setStep("part3");
    }, 3000);
  };

  // ------------------------------------------
  // LOADING SCREEN
  // ------------------------------------------

  if (loading || transitionLoading) {
    return (
      <PageWrapper>
        <LoaderWrapper>
          <LoaderLeaf src={mapleImg} alt="Loading" />
        </LoaderWrapper>
      </PageWrapper>
    );
  }

  // ------------------------------------------
  // MAIN UI — UNTOUCHED
  // ------------------------------------------

  return (
    <PageWrapper>
      <Card>
        <TopRow>
          <HiText>Hii User!!</HiText>
          <Logo src={logoImg} alt="Logo" />
        </TopRow>

        {step === "main" && (
          <>
            {/* Photos Section */}
            <Section>
              <SectionHeader>
                <SectionTitle>Add Photos</SectionTitle>
                <SectionSub>
                  Don&apos;t forget to add clear and good photos because photos
                  make the first impression.
                </SectionSub>
              </SectionHeader>

              <PhotosCarousel>
                {Array.from({ length: 6 }).map((_, index) => {
                  const item = media[index];
                  const isLast = index === 5;
                  const large = index === 0;

                  return (
                    <PhotoWrapper key={index} large={large}>
                      {/* PROMPT BUTTON */}
                      <PhotoTopRow>
                        <PromptBarButton onClick={() => setActivePromptIndex(index)}>
                          {prompts[index] || "Add a prompt"}
                        </PromptBarButton>
                      </PhotoTopRow>

                      {/* PHOTO CARD */}
                      <PhotoCard large={large} onClick={() => handleCardClick(index)}>
                        {large && <MainTag>Main</MainTag>}

                        {item ? (
                          item.isVideo ? (
                            <CardVideoPreview src={item.url} controls />
                          ) : (
                            <CardPreview src={item.url} alt="" />
                          )
                        ) : (
                          <CardContent>
                            <PlusCircle>
                              <PlusImg src={plusIcon} alt="Add" />
                            </PlusCircle>
                            <div>{isLast ? "Add a fun moment" : "Tap to upload"}</div>
                            {isLast && (
                              <LastCardText>
                                Show your quirky side, upload a video instead of a photo.
                              </LastCardText>
                            )}
                          </CardContent>
                        )}

                        <input
                          id={`media-input-${index}`}
                          type="file"
                          accept={isLast ? "image/*,video/*" : "image/*"}
                          style={{ display: "none" }}
                          onChange={(e) => handleMediaChange(index, e)}
                        />
                      </PhotoCard>
                    </PhotoWrapper>
                  );
                })}
              </PhotosCarousel>
            </Section>

            {/* PROFILE1 */}
            <Profile1
              media={media}
              prompts={prompts}
              onMediaChange={onMediaChange}
              onPromptsChange={onPromptsChange}
              onCompleted={handleProfileCompleted}
            />
          </>
        )}

        {/* PART 2 */}
        {step === "part2" && <Profile2 onCompleted={handlePart2Completed} />}

        {/* PART 3 */}
        {step === "part3" && <Profile3 />}
      </Card>

      {/* PROMPT MODAL */}
      {activePromptIndex !== null && (
        <PromptOverlay onClick={() => setActivePromptIndex(null)}>
          <PromptModal onClick={(e) => e.stopPropagation()}>
            <PromptModalTitle>Select a prompt</PromptModalTitle>

            <PromptClose onClick={() => setActivePromptIndex(null)}>
              Close
            </PromptClose>

            <PromptList>
              {photoPromptOptions.map((p) => (
                <PromptOption
                  key={p}
                  type="button"
                  active={prompts[activePromptIndex] === p}
                  onClick={() => handlePromptSelect(activePromptIndex, p)}
                >
                  {p}
                </PromptOption>
              ))}
            </PromptList>
          </PromptModal>
        </PromptOverlay>
      )}
    </PageWrapper>
  );
}
