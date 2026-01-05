// src/Profile1.jsx
import React, { useState } from "react";
import styled from "styled-components";

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
`;

const SectionTitle = styled.h2`
  margin: 0 0 4px;
  font-size: 20px;
  font-weight: 700;
  color: #4a1e2d;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 18px;
  row-gap: 12px;
  margin-top: 8px;
`;

const FieldFull = styled.div`
  grid-column: span 2;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Label = styled.label`
  font-size: 13px;
  color: #333;
  font-weight: 600;
`;

const InputRow = styled.div`
  display: flex;
  align-items: stretch;
`;

const PinkBar = styled.div`
  width: 4px;
  border-radius: 8px 0 0 8px;
  background: #4A1E2D;
`;

const TextInput = styled.input`
  flex: 1;
  border-radius: 0 8px 8px 0;
  border: 1px solid #4A1E2D;
  padding: 9px 10px;
  font-size: 13px;
  outline: none;
  background: #ffffff;
  color: #333;

  &:focus {
    box-shadow: 0 0 0 1px #4A1E2D;
    border-color: #4A1E2D;
  }
`;

// button that opens the wheel window (used for ALL option fields now)
const PickerDisplay = styled.button`
  flex: 1;
  border-radius: 0 8px 8px 0;
  border: 1px solid #4A1E2D;
  padding: 9px 10px;
  font-size: 13px;
  outline: none;
  background: #ffffff;
  color: #333;
  text-align: left;
  cursor: pointer;
  position: relative;

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

const LocationRow = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
`;

const LocationStatus = styled.span`
  font-size: 12px;
  color: #666;
`;

const RegisterLocationButton = styled.button`
  padding: 8px 12px;
  border-radius: 999px;
  border: none;
  background: #4A1E2D;
  color: white;
  font-size: 12px;
  cursor: pointer;
  font-weight: 600;
`;

const ErrorText = styled.p`
  margin: 6px 0 0;
  font-size: 12px;
  color: #d12b4a;
`;

const ActionsRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

const NextButton = styled.button`
  padding: 10px 24px;
  border-radius: 999px;
  border: none;
  background: #4A1E2D;
  color: white;
  font-weight: 600;
  cursor: pointer;
  font-size: 14px;
`;

// wheel picker window styles
const PickerOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const PickerModal = styled.div`
  background: #ffffff;
  border-radius: 18px;
  width: min(420px, 94vw);
  padding: 18px 20px 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const PickerTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  text-align: center;
  font-weight: 600;
  color: #111;
`;

const WheelContainer = styled.div`
  margin-top: 4px;
  position: relative;
  max-height: 180px;
  overflow-y: auto;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  scrollbar-width: none;
`;

const WheelHighlight = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: 40px;
  transform: translateY(-50%);
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  pointer-events: none;
`;

const WheelOption = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 17px;
  cursor: pointer;
  color: ${(props) => (props.selected ? "#000" : "#b0b0b0")};
  font-weight: ${(props) => (props.selected ? "700" : "500")};
`;

const PickerFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 6px;
`;

const PickerButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const PickerBtn = styled.button`
  padding: 6px 14px;
  border-radius: 999px;
  border: none;
  font-size: 13px;
  cursor: pointer;
  font-weight: 600;
  background: ${(props) => (props.primary ? "#4A1E2D" : "transparent")};
  color: ${(props) => (props.primary ? "#fff" : "#4A1E2D")};
`;

const HeightInfo = styled.span`
  font-size: 11px;
  color: #777;
`;

// --- options data ---
const ageOptions = Array.from({ length: 63 }, (_, i) => 18 + i); // 18-80
const heightOptions = Array.from({ length: 71 }, (_, i) => `${140 + i} cm`); // 140-210
const weightOptions = Array.from({ length: 111 }, (_, i) => `${40 + i} kg`); // 40-150

const sexOptions = ["Male", "Female", "Intersex", "Non-binary", "Prefer not to say"];

const orientationOptions = [
  "Straight",
  "Gay",
  "Lesbian",
  "Bisexual",
  "Asexual",
  "Demisexual",
  "Pansexual",
  "Queer",
  "Questioning",
  "Other",
];

const pronounOptions = [
  "He/Him",
  "She/Her",
  "They/Them",
  "He/They",
  "She/They",
  "Any pronouns",
  "Ask me",
  "Prefer not to say",
];

const dateTargetOptions = [
  "Men",
  "Women",
  "Everyone",
  "Non-binary",
  "Trans people",
  "Queer folks",
  "Prefer not to say",
];

const datingIntentOptions = [
  "Long-term partner",
  "Serious relationship",
  "Short-term fun",
  "Casual dating",
  "Open to exploring",
  "Not sure yet",
  "New friends",
];

const religionOptions = [
  "Islam",
  "Hinduism",
  "Christianity",
  "Sikhism",
  "Buddhism",
  "Jainism",
  "Judaism",
  "Zoroastrian",
  "Baháʼí",
  "Spiritual, not religious",
  "Atheist",
  "Agnostic",
  "Other",
  "Prefer not to say",
];

const relationTypeOptions = [
  "Monogamous",
  "Open relationship",
  "Polyamorous",
  "Monogamish",
  "We’ll decide together",
];

// Wheel modal component
function WheelModal({ title, options, value, onChange, onClose, showAlwaysText }) {
  return (
    <PickerOverlay onClick={onClose}>
      <PickerModal onClick={(e) => e.stopPropagation()}>
        <PickerTitle>{title}</PickerTitle>
        <WheelContainer>
          <WheelHighlight />
          {options.map((opt) => {
            const label = String(opt);
            const selected = label === String(value);
            return (
              <WheelOption
                key={label}
                selected={selected}
                onClick={() => onChange(label)}
              >
                {label}
              </WheelOption>
            );
          })}
        </WheelContainer>
        <PickerFooter>
          {showAlwaysText && <HeightInfo>Always visible on profile</HeightInfo>}
          <PickerButtons>
            <PickerBtn type="button" onClick={onClose}>
              Cancel
            </PickerBtn>
            <PickerBtn type="button" primary onClick={onClose}>
              Done
            </PickerBtn>
          </PickerButtons>
        </PickerFooter>
      </PickerModal>
    </PickerOverlay>
  );
}

// Profile1 gets media + prompts from parent
export default function Profile1({ media, prompts, onCompleted }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [sex, setSex] = useState("");
  const [orientation, setOrientation] = useState("");
  const [pronouns, setPronouns] = useState("");
  const [dateTarget, setDateTarget] = useState("");
  const [datingIntent, setDatingIntent] = useState("");
  const [religion, setReligion] = useState("");
  const [relationType, setRelationType] = useState("");
  const [address, setAddress] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [locationStatus, setLocationStatus] = useState("Location not set yet");
  const [error, setError] = useState("");
  const [activePicker, setActivePicker] = useState(null); 
  // "age" | "height" | "weight" | "sex" | "orientation" | "pronouns" | "dateTarget" | "datingIntent" | "religion" | "relationType"

  const handleRegisterLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus("Geolocation is not supported in this browser.");
      return;
    }

    setLocationStatus("Detecting location...");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = `${pos.coords.latitude.toFixed(
          4
        )}, ${pos.coords.longitude.toFixed(4)}`;
        setCurrentLocation(coords);
        setLocationStatus(`Location captured: ${coords}`);
      },
      (err) => {
        console.error(err);
        setLocationStatus(
          "Could not fetch location. Please allow location access."
        );
      }
    );
  };

  const handleNext = (e) => {
    e.preventDefault();
    setError("");

    const mediaCount = media.filter(Boolean).length;
    const allMediaFilled = media.every((m) => m !== null);
    const allPromptsFilled = prompts.every((p) => p);

    const requiredFields = [
      name,
      age,
      height,
      weight,
      sex,
      orientation,
      pronouns,
      dateTarget,
      datingIntent,
      religion,
      relationType,
      address,
      currentLocation,
    ];

    if (
      requiredFields.some((v) => !v) ||
      mediaCount === 0 ||
      !allMediaFilled ||
      !allPromptsFilled
    ) {
      setError(
        "Please fill all details, upload all 6 photos/videos with prompts, and capture your current location."
      );
      return;
    }

    const profileData = {
      media,
      prompts,
      name,
      age,
      height,
      weight,
      sex,
      orientation,
      pronouns,
      dateTarget,
      datingIntent,
      religion,
      relationType,
      address,
      currentLocation,
    };

    console.log("Profile saved:", profileData);
    alert("Profile details saved successfully.");

    if (onCompleted) {
      onCompleted();
    }
  };

  // choose options based on which picker is open
  let pickerTitle = "";
  let pickerOptions = [];
  let pickerValue = "";
  let showAlwaysText = false;

  if (activePicker === "age") {
    pickerTitle = "Age";
    pickerOptions = ageOptions;
    pickerValue = age;
  } else if (activePicker === "height") {
    pickerTitle = "Height";
    pickerOptions = heightOptions;
    pickerValue = height;
    showAlwaysText = true;
  } else if (activePicker === "weight") {
    pickerTitle = "Weight";
    pickerOptions = weightOptions;
    pickerValue = weight;
  } else if (activePicker === "sex") {
    pickerTitle = "Sex";
    pickerOptions = sexOptions;
    pickerValue = sex;
  } else if (activePicker === "orientation") {
    pickerTitle = "Sexual Orientation";
    pickerOptions = orientationOptions;
    pickerValue = orientation;
  } else if (activePicker === "pronouns") {
    pickerTitle = "Pronouns";
    pickerOptions = pronounOptions;
    pickerValue = pronouns;
  } else if (activePicker === "dateTarget") {
    pickerTitle = "You want to date";
    pickerOptions = dateTargetOptions;
    pickerValue = dateTarget;
  } else if (activePicker === "datingIntent") {
    pickerTitle = "Dating Intentions";
    pickerOptions = datingIntentOptions;
    pickerValue = datingIntent;
  } else if (activePicker === "religion") {
    pickerTitle = "Religion";
    pickerOptions = religionOptions;
    pickerValue = religion;
  } else if (activePicker === "relationType") {
    pickerTitle = "Relation Type";
    pickerOptions = relationTypeOptions;
    pickerValue = relationType;
  }

  const handlePickerChange = (val) => {
    if (activePicker === "age") setAge(val);
    if (activePicker === "height") setHeight(val);
    if (activePicker === "weight") setWeight(val);
    if (activePicker === "sex") setSex(val);
    if (activePicker === "orientation") setOrientation(val);
    if (activePicker === "pronouns") setPronouns(val);
    if (activePicker === "dateTarget") setDateTarget(val);
    if (activePicker === "datingIntent") setDatingIntent(val);
    if (activePicker === "religion") setReligion(val);
    if (activePicker === "relationType") setRelationType(val);
  };

  return (
    <Section>
      <SectionTitle>Let's Get Started</SectionTitle>

      <form onSubmit={handleNext}>
        <FormGrid>
          <FieldFull>
            <Field>
              <Label>Name</Label>
              <InputRow>
                <PinkBar />
                <TextInput
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                />
              </InputRow>
            </Field>
          </FieldFull>

          {/* AGE PICKER */}
          <Field>
            <Label>Age</Label>
            <InputRow>
              <PinkBar />
              <PickerDisplay
                type="button"
                onClick={() => setActivePicker("age")}
              >
                {age || "Select age"}
              </PickerDisplay>
            </InputRow>
          </Field>

          {/* HEIGHT PICKER */}
          <Field>
            <Label>Height</Label>
            <InputRow>
              <PinkBar />
              <PickerDisplay
                type="button"
                onClick={() => setActivePicker("height")}
              >
                {height || "Select height"}
              </PickerDisplay>
            </InputRow>
          </Field>

          {/* WEIGHT PICKER */}
          <Field>
            <Label>Weight</Label>
            <InputRow>
              <PinkBar />
              <PickerDisplay
                type="button"
                onClick={() => setActivePicker("weight")}
              >
                {weight || "Select weight"}
              </PickerDisplay>
            </InputRow>
          </Field>

          {/* SEX PICKER */}
          <Field>
            <Label>Sex</Label>
            <InputRow>
              <PinkBar />
              <PickerDisplay
                type="button"
                onClick={() => setActivePicker("sex")}
              >
                {sex || "Select sex"}
              </PickerDisplay>
            </InputRow>
          </Field>

          {/* ORIENTATION PICKER */}
          <Field>
            <Label>Sexual Orientation</Label>
            <InputRow>
              <PinkBar />
              <PickerDisplay
                type="button"
                onClick={() => setActivePicker("orientation")}
              >
                {orientation || "Select orientation"}
              </PickerDisplay>
            </InputRow>
          </Field>

          {/* PRONOUNS PICKER */}
          <Field>
            <Label>Pronouns</Label>
            <InputRow>
              <PinkBar />
              <PickerDisplay
                type="button"
                onClick={() => setActivePicker("pronouns")}
              >
                {pronouns || "Select pronouns"}
              </PickerDisplay>
            </InputRow>
          </Field>

          {/* DATE TARGET PICKER */}
          <Field>
            <Label>You want to date ?</Label>
            <InputRow>
              <PinkBar />
              <PickerDisplay
                type="button"
                onClick={() => setActivePicker("dateTarget")}
              >
                {dateTarget || "Select preference"}
              </PickerDisplay>
            </InputRow>
          </Field>

          {/* DATING INTENT PICKER */}
          <Field>
            <Label>Dating Intentions</Label>
            <InputRow>
              <PinkBar />
              <PickerDisplay
                type="button"
                onClick={() => setActivePicker("datingIntent")}
              >
                {datingIntent || "Select intent"}
              </PickerDisplay>
            </InputRow>
          </Field>

          {/* RELIGION PICKER */}
          <Field>
            <Label>Religion</Label>
            <InputRow>
              <PinkBar />
              <PickerDisplay
                type="button"
                onClick={() => setActivePicker("religion")}
              >
                {religion || "Select religion"}
              </PickerDisplay>
            </InputRow>
          </Field>

          {/* RELATION TYPE PICKER */}
          <Field>
            <Label>Relation type</Label>
            <InputRow>
              <PinkBar />
              <PickerDisplay
                type="button"
                onClick={() => setActivePicker("relationType")}
              >
                {relationType || "Select relation type"}
              </PickerDisplay>
            </InputRow>
          </Field>

          <FieldFull>
            <Field>
              <Label>Address</Label>
              <InputRow>
                <PinkBar />
                <TextInput
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Your full address"
                />
              </InputRow>
            </Field>
          </FieldFull>

          <FieldFull>
            <Field>
              <Label>Current location</Label>
              <LocationRow>
                <RegisterLocationButton
                  type="button"
                  onClick={handleRegisterLocation}
                >
                  Register current location
                </RegisterLocationButton>
                <LocationStatus>{locationStatus}</LocationStatus>
              </LocationRow>
            </Field>
          </FieldFull>
        </FormGrid>

        {error && <ErrorText>{error}</ErrorText>}

        <ActionsRow>
          <NextButton type="submit">Next</NextButton>
        </ActionsRow>
      </form>

      {activePicker && (
        <WheelModal
          title={pickerTitle}
          options={pickerOptions}
          value={pickerValue}
          onChange={handlePickerChange}
          onClose={() => setActivePicker(null)}
          showAlwaysText={showAlwaysText}
        />
      )}
    </Section>
  );
}
