// src/Profile2.jsx
import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const MainTitle = styled.h2`
  margin: 0;
  font-size: 40px;
  font-weight: 700;
  color: #4a1e2d;
  text-align: left;
`;

const SectionBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SectionTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: #4a1e2d;
  margin-top: 20px;
`;

const SectionSub = styled.p`
  margin: 0;
  font-size: 12px;
  color: #777;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 18px;
  row-gap: 12px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const FieldFull = styled.div`
  grid-column: span 2;

  @media (max-width: 720px) {
    grid-column: span 1;
  }
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

const Bar = styled.div`
  width: 4px;
  border-radius: 8px 0 0 8px;
  background: #4a1e2d;
`;

const TextInput = styled.input`
  flex: 1;
  border-radius: 0 8px 8px 0;
  border: 1px solid #d7c9cf;
  padding: 9px 10px;
  font-size: 13px;
  outline: none;
  background: #ffffff;
  color: #333;

  &:focus {
    box-shadow: 0 0 0 1px #4a1e2d;
    border-color: #4a1e2d;
  }
`;

// Button used to open wheel modal for options
const PickerDisplay = styled.button`
  flex: 1;
  border-radius: 0 8px 8px 0;
  border: 1px solid #d7c9cf;
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

  &:focus {
    box-shadow: 0 0 0 1px #4a1e2d;
    border-color: #4a1e2d;
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
  background: linear-gradient(135deg, #4a1e2d, #7b3a4b);
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
  margin-top: 12px;
`;

const NextButton = styled.button`
  padding: 8px 18px;
  border-radius: 999px;
  border: none;
  background: #4a1e2d;
  color: #ffffff;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
`;

// NEW: Add hobby button + hobby tags + counter
const AddHobbyButton = styled.button`
  margin-left: 8px;
  padding: 0 12px;
  border-radius: 999px;
  border: none;
  background: #4a1e2d;
  color: #ffffff;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
`;

const HobbiesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 6px;
`;

const HobbyTag = styled.span`
  padding: 4px 8px;
  border-radius: 999px;
  background: #f3e5ea;
  font-size: 11px;
  color: #4a1e2d;
  cursor: pointer;
`;

const HobbiesCount = styled.span`
  margin-top: 4px;
  font-size: 11px;
  color: #777;
`;

/* ========== WHEEL MODAL STYLES (same pattern as Profile1) ========== */

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
  justify-content: flex-end;
  align-items: center;
  margin-top: 6px;
  gap: 10px;
`;

const PickerBtn = styled.button`
  padding: 6px 14px;
  border-radius: 999px;
  border: none;
  font-size: 13px;
  cursor: pointer;
  font-weight: 600;
  background: ${(props) => (props.primary ? "#4a1e2d" : "transparent")};
  color: ${(props) => (props.primary ? "#fff" : "#4a1e2d")};
`;

/* ========== OPTIONS DATA ========== */

const ethnicityOptions = [
  "Asian",
  "Black / African descent",
  "Latino / Hispanic",
  "Middle Eastern",
  "Native American",
  "Pacific Islander",
  "White / European",
  "Mixed",
  "Other",
  "Prefer not to say",
];

const zodiacOptions = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
];

const familyPlanOptions = [
  "Want children",
  "Don’t want children",
  "Open to children",
  "Not sure yet",
];

const petsOptions = [
  "Have a pet",
  "Want a pet",
  "Love pets, can’t have one",
  "Not a pet person",
];

const politicsOptions = [
  "Apolitical",
  "Liberal / Left",
  "Centrist",
  "Conservative / Right",
  "Mixed",
  "Prefer not to say",
];

const languageOptions = [
  "English",
  "Hindi",
  "Urdu",
  "Bengali",
  "Tamil",
  "Telugu",
  "Marathi",
  "Gujarati",
  "Punjabi",
  "Other",
];

const educationOptions = [
  "High school",
  "Diploma",
  "Undergraduate in progress",
  "Bachelor’s degree",
  "Master’s degree",
  "Doctorate",
  "Other",
];

const frequencyOptions = [
  "Never",
  "Rarely",
  "Sometimes",
  "Often",
  "Prefer not to say",
];

// Personality options
const personalityOptions = [
  "Ambivert",
  "Extrovert",
  "Introvert",
  "Depends on my mood",
  "Still figuring it out",
];

/* ========== WHEEL MODAL COMPONENT ========== */

function WheelModal({ title, options, value, onChange, onClose }) {
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
          <PickerBtn type="button" onClick={onClose}>
            Cancel
          </PickerBtn>
          <PickerBtn type="button" primary onClick={onClose}>
            Done
          </PickerBtn>
        </PickerFooter>
      </PickerModal>
    </PickerOverlay>
  );
}

/* ========== MAIN COMPONENT ========== */

export default function Profile2({ onCompleted }) {
  const [ethnicity, setEthnicity] = useState("");
  const [zodiac, setZodiac] = useState("");
  const [familyPlan, setFamilyPlan] = useState("");
  const [pets, setPets] = useState("");
  const [politics, setPolitics] = useState("");
  const [languages, setLanguages] = useState("");
  const [homeTown, setHomeTown] = useState("");

  // personality + hobbies state
  const [personality, setPersonality] = useState("");
  const [hobbiesInput, setHobbiesInput] = useState("");
  const [hobbies, setHobbies] = useState([]);

  const [workPlace, setWorkPlace] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [college, setCollege] = useState("");
  const [education, setEducation] = useState("");

  const [drinking, setDrinking] = useState("");
  const [smoking, setSmoking] = useState("");
  const [marijuana, setMarijuana] = useState("");
  const [drugs, setDrugs] = useState("");

  const [error, setError] = useState("");

  const [activePicker, setActivePicker] = useState(null);
  // "ethnicity" | "zodiac" | "familyPlan" | "pets" | "politics" | "languages" | "personality" | "education" | "drinking" | "smoking" | "marijuana" | "drugs"

  const handleRegisterLocation = () => {}; // placeholder (unchanged)

  const handleAddHobby = () => {
    const trimmed = hobbiesInput.trim();
    if (!trimmed) return;
    if (hobbies.length >= 5) return;
    if (hobbies.includes(trimmed)) return;

    setHobbies((prev) => [...prev, trimmed]);
    setHobbiesInput("");
  };

  const handleRemoveHobby = (hobbyToRemove) => {
    setHobbies((prev) => prev.filter((h) => h !== hobbyToRemove));
  };

  const handleNext = (e) => {
    e.preventDefault();
    setError("");

    const required = [
      ethnicity,
      zodiac,
      familyPlan,
      pets,
      politics,
      languages,
      homeTown,
      personality,
      workPlace,
      jobTitle,
      college,
      education,
      drinking,
      smoking,
      marijuana,
      drugs,
    ];

    if (required.some((v) => !v)) {
      setError("Please fill all Part-2 details before continuing.");
      return;
    }

    const data = {
      ethnicity,
      zodiac,
      familyPlan,
      pets,
      politics,
      languages,
      homeTown,
      personality,
      hobbies,
      workPlace,
      jobTitle,
      college,
      education,
      drinking,
      smoking,
      marijuana,
      drugs,
    };

    console.log("Part-2 details:", data);
    alert("Part-2 details saved (console logged).");

    if (onCompleted) onCompleted();
  };

  // Decide wheel content based on activePicker
  let pickerTitle = "";
  let pickerOptions = [];
  let pickerValue = "";

  if (activePicker === "ethnicity") {
    pickerTitle = "Ethnicity";
    pickerOptions = ethnicityOptions;
    pickerValue = ethnicity;
  } else if (activePicker === "zodiac") {
    pickerTitle = "Zodiac sign";
    pickerOptions = zodiacOptions;
    pickerValue = zodiac;
  } else if (activePicker === "familyPlan") {
    pickerTitle = "Family plans";
    pickerOptions = familyPlanOptions;
    pickerValue = familyPlan;
  } else if (activePicker === "pets") {
    pickerTitle = "Pets";
    pickerOptions = petsOptions;
    pickerValue = pets;
  } else if (activePicker === "politics") {
    pickerTitle = "Politics";
    pickerOptions = politicsOptions;
    pickerValue = politics;
  } else if (activePicker === "languages") {
    pickerTitle = "Languages spoken";
    pickerOptions = languageOptions;
    pickerValue = languages;
  } else if (activePicker === "personality") {
    pickerTitle = "Personality traits";
    pickerOptions = personalityOptions;
    pickerValue = personality;
  } else if (activePicker === "education") {
    pickerTitle = "Education level";
    pickerOptions = educationOptions;
    pickerValue = education;
  } else if (activePicker === "drinking") {
    pickerTitle = "Drinking?";
    pickerOptions = frequencyOptions;
    pickerValue = drinking;
  } else if (activePicker === "smoking") {
    pickerTitle = "Smoking?";
    pickerOptions = frequencyOptions;
    pickerValue = smoking;
  } else if (activePicker === "marijuana") {
    pickerTitle = "Marijuana?";
    pickerOptions = frequencyOptions;
    pickerValue = marijuana;
  } else if (activePicker === "drugs") {
    pickerTitle = "Drugs?";
    pickerOptions = frequencyOptions;
    pickerValue = drugs;
  }

  const handlePickerChange = (val) => {
    if (activePicker === "ethnicity") setEthnicity(val);
    if (activePicker === "zodiac") setZodiac(val);
    if (activePicker === "familyPlan") setFamilyPlan(val);
    if (activePicker === "pets") setPets(val);
    if (activePicker === "politics") setPolitics(val);
    if (activePicker === "languages") setLanguages(val);
    if (activePicker === "personality") setPersonality(val);
    if (activePicker === "education") setEducation(val);
    if (activePicker === "drinking") setDrinking(val);
    if (activePicker === "smoking") setSmoking(val);
    if (activePicker === "marijuana") setMarijuana(val);
    if (activePicker === "drugs") setDrugs(val);
  };

  return (
    <Wrapper>
      <MainTitle>Part-2</MainTitle>

      <form onSubmit={handleNext}>
        {/* My Vitals */}
        <SectionBlock>
          <SectionTitle>My Vitals</SectionTitle>
          <SectionSub>
            Let people know a little more about your background.
          </SectionSub>

          <FormGrid>
            <Field>
              <Label>Ethnicity</Label>
              <InputRow>
                <Bar />
                <PickerDisplay
                  type="button"
                  onClick={() => setActivePicker("ethnicity")}
                >
                  {ethnicity || "Select ethnicity"}
                </PickerDisplay>
              </InputRow>
            </Field>

            <Field>
              <Label>Zodiac sign</Label>
              <InputRow>
                <Bar />
                <PickerDisplay
                  type="button"
                  onClick={() => setActivePicker("zodiac")}
                >
                  {zodiac || "Select zodiac"}
                </PickerDisplay>
              </InputRow>
            </Field>

            <Field>
              <Label>Family plans</Label>
              <InputRow>
                <Bar />
                <PickerDisplay
                  type="button"
                  onClick={() => setActivePicker("familyPlan")}
                >
                  {familyPlan || "Select plan"}
                </PickerDisplay>
              </InputRow>
            </Field>

            <Field>
              <Label>Pets</Label>
              <InputRow>
                <Bar />
                <PickerDisplay
                  type="button"
                  onClick={() => setActivePicker("pets")}
                >
                  {pets || "Select option"}
                </PickerDisplay>
              </InputRow>
            </Field>

            <Field>
              <Label>Politics</Label>
              <InputRow>
                <Bar />
                <PickerDisplay
                  type="button"
                  onClick={() => setActivePicker("politics")}
                >
                  {politics || "Select politics"}
                </PickerDisplay>
              </InputRow>
            </Field>

            <Field>
              <Label>Languages spoken</Label>
              <InputRow>
                <Bar />
                <PickerDisplay
                  type="button"
                  onClick={() => setActivePicker("languages")}
                >
                  {languages || "Select language"}
                </PickerDisplay>
              </InputRow>
            </Field>

            <Field>
              <Label>Personality traits</Label>
              <InputRow>
                <Bar />
                <PickerDisplay
                  type="button"
                  onClick={() => setActivePicker("personality")}
                >
                  {personality || "Select personality"}
                </PickerDisplay>
              </InputRow>
            </Field>

            <FieldFull>
              <Field>
                <Label>Home town</Label>
                <InputRow>
                  <Bar />
                  <TextInput
                    value={homeTown}
                    onChange={(e) => setHomeTown(e.target.value)}
                    placeholder="Where did you grow up?"
                  />
                </InputRow>
              </Field>
            </FieldFull>

            <FieldFull>
              <Field>
                <Label>Hobbies</Label>
                <InputRow>
                  <Bar />
                  <TextInput
                    value={hobbiesInput}
                    onChange={(e) => setHobbiesInput(e.target.value)}
                    placeholder="Type a hobby and click Add (max 5)"
                  />
                  <AddHobbyButton type="button" onClick={handleAddHobby}>
                    Add
                  </AddHobbyButton>
                </InputRow>
                {hobbies.length > 0 && (
                  <HobbiesList>
                    {hobbies.map((hobby) => (
                      <HobbyTag
                        key={hobby}
                        onClick={() => handleRemoveHobby(hobby)}
                        title="Click to remove"
                      >
                        {hobby}
                      </HobbyTag>
                    ))}
                  </HobbiesList>
                )}
                <HobbiesCount>{hobbies.length}/5 hobbies added</HobbiesCount>
              </Field>
            </FieldFull>
          </FormGrid>
        </SectionBlock>

        {/* Professional */}
        <SectionBlock>
          <SectionTitle>Let&apos;s get little Professional</SectionTitle>
          <SectionSub>Share what you do and where you studied.</SectionSub>

          <FormGrid>
            <FieldFull>
              <Field>
                <Label>Where I work?</Label>
                <InputRow>
                  <Bar />
                  <TextInput
                    value={workPlace}
                    onChange={(e) => setWorkPlace(e.target.value)}
                    placeholder="Company / organization name"
                  />
                </InputRow>
              </Field>
            </FieldFull>

            <Field>
              <Label>Job title</Label>
              <InputRow>
                <Bar />
                <TextInput
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="Your role"
                />
              </InputRow>
            </Field>

            <Field>
              <Label>College or University</Label>
              <InputRow>
                <Bar />
                <TextInput
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  placeholder="Name of college / uni"
                />
              </InputRow>
            </Field>

            <Field>
              <Label>Education level</Label>
              <InputRow>
                <Bar />
                <PickerDisplay
                  type="button"
                  onClick={() => setActivePicker("education")}
                >
                  {education || "Select level"}
                </PickerDisplay>
              </InputRow>
            </Field>
          </FormGrid>
        </SectionBlock>

        {/* Vices */}
        <SectionBlock>
          <SectionTitle>My vices</SectionTitle>
          <SectionSub>Be honest, no judgement here.</SectionSub>

          <FormGrid>
            <Field>
              <Label>Drinking?</Label>
              <InputRow>
                <Bar />
                <PickerDisplay
                  type="button"
                  onClick={() => setActivePicker("drinking")}
                >
                  {drinking || "Select"}
                </PickerDisplay>
              </InputRow>
            </Field>

            <Field>
              <Label>Smoking?</Label>
              <InputRow>
                <Bar />
                <PickerDisplay
                  type="button"
                  onClick={() => setActivePicker("smoking")}
                >
                  {smoking || "Select"}
                </PickerDisplay>
              </InputRow>
            </Field>

            <Field>
              <Label>Marijuana?</Label>
              <InputRow>
                <Bar />
                <PickerDisplay
                  type="button"
                  onClick={() => setActivePicker("marijuana")}
                >
                  {marijuana || "Select"}
                </PickerDisplay>
              </InputRow>
            </Field>

            <Field>
              <Label>Drugs?</Label>
              <InputRow>
                <Bar />
                <PickerDisplay
                  type="button"
                  onClick={() => setActivePicker("drugs")}
                >
                  {drugs || "Select"}
                </PickerDisplay>
              </InputRow>
            </Field>
          </FormGrid>
        </SectionBlock>

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
        />
      )}
    </Wrapper>
  );
}
