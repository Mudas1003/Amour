// src/Profile4.jsx
import React, { useState } from "react";
import styled from "styled-components";
import ProfilePreview from "./preview"; // Keep your original import

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding-bottom: 80px;
`;

const MainTitle = styled.h2`
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  color: #4a1e2d;
  text-align: left;
`;

const Subtitle = styled.p`
  margin: 0;
  font-size: 14px;
  color: #777;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SectionHeading = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: #4a1e2d;
`;

const SectionSub = styled.p`
  margin: 0;
  font-size: 12px;
  color: #777;
`;

const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 12px;
`;

const AboutCard = styled.div`
  border-radius: 16px;
  border: 1px solid #f1dbe3;
  background: #ffffff;
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const PromptSelector = styled.button`
  width: 100%;
  border-radius: 12px;
  border: 1px solid #e5c9d0;
  background: #fdf7f9;
  padding: 8px 10px;
  font-size: 13px;
  color: #4a1e2d;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

const PromptPlaceholder = styled.span`
  opacity: 0.7;
`;

const SmallIcon = styled.span`
  font-size: 14px;
`;

const AnswerInput = styled.textarea`
  border-radius: 12px;
  border: 1px solid #e5c9d0;
  padding: 8px 10px;
  font-size: 13px;
  resize: vertical;
  min-height: 70px;
  outline: none;
  background: #ffffff;
  color: #333;

  &:focus {
    box-shadow: 0 0 0 1px #4a1e2d;
    border-color: #4a1e2d;
  }
`;

const AnswerCount = styled.span`
  align-self: flex-end;
  font-size: 11px;
  color: #999;
`;

const PollCard = styled.div`
  border-radius: 18px;
  border: 1px solid #f1dbe3;
  background: #ffffff;
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 520px;
`;

const PollPromptButton = styled(PromptSelector)`
  background: #ffffff;
`;

const PollOptionRow = styled.div`
  border-radius: 12px;
  border: 1px solid #ece2e6;
  padding: 8px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PollOptionInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 13px;
  color: #333;
`;

const PollCharCount = styled.span`
  font-size: 11px;
  color: #999;
`;

const SubmitRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 18px;
`;

const SubmitButton = styled.button`
  border: none;
  padding: 10px 26px;
  border-radius: 999px;
  background: #4a1e2d;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 40;
`;

const ModalCard = styled.div`
  width: 100%;
  max-width: 420px;
  max-height: 80vh;
  background: #ffffff;
  border-radius: 22px;
  padding: 14px 16px 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ModalHeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ModalTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: #4a1e2d;
`;

const CloseButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 18px;
  line-height: 1;
  color: #4a1e2d;
`;

const ModalTabs = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 4px;
`;

const TabButton = styled.button`
  border-radius: 999px;
  border: none;
  padding: 6px 14px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  background: ${(p) => (p.active ? "#4a1e2d" : "#f3e5ea")};
  color: ${(p) => (p.active ? "#ffffff" : "#4a1e2d")};
`;

const PromptList = styled.div`
  margin-top: 8px;
  padding-right: 4px;
  overflow-y: auto;
  max-height: 52vh;

  /* HIDE SCROLLBAR */
  scrollbar-width: none;
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;

const PromptItem = styled.button`
  width: 100%;
  border: none;
  background: #ffffff;
  text-align: left;
  padding: 10px 4px;
  font-size: 14px;
  color: #333;
  border-bottom: 1px solid #f1e3e7;
  cursor: pointer;

  &:hover {
    background: #fdf5f8;
  }
`;

const aboutMePrompts = [
  "The way to win me over is",
  "I go crazy for",
  "A random fact I love is",
  "A life goal of mine",
  "This year, I really want to",
  "Typical Sunday",
  "My greatest strength",
  "Unusual skills",
  "I recently discovered that",
  "My simple pleasures",
];

const myTypePrompts = [
  "My type in three words",
  "I’m a sucker for",
  "Green flags I look for",
  "Red flags for me are",
  "I’ll fall for you if",
];

const lgbtqPrompts = [
  "How I describe my identity",
  "What queer joy looks like to me",
  "A queer story I love is",
];

const pollPrompts = [
  "Two truths and a lie",
  "Ask me anything about",
  "Give me your honest opinion about",
  "Which is worth splurging on",
  "Let’s break the ice by",
  "Pick the one that’s got to go",
  "Pick the most underrated",
  "We’ll instantly hit it off if",
  "Instead of grabbing drinks, let’s",
  "Pick the best one",
];

function PromptModal({ mode, onSelect, onClose }) {
  const isAbout = mode === "about";

  const tabs = isAbout
    ? ["About me", "My type", "LGBTQIA+"]
    : ["Poll"];

  const promptMap = {
    "About me": aboutMePrompts,
    "My type": myTypePrompts,
    "LGBTQIA+": lgbtqPrompts,
    Poll: pollPrompts,
  };

  const [activeTab, setActiveTab] = useState(tabs[0]);

  const prompts = promptMap[activeTab] || [];

  return (
    <ModalOverlay>
      <ModalCard>
        <ModalHeaderRow>
          <ModalTitle>Prompts</ModalTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeaderRow>

        <ModalTabs>
          {tabs.map((tab) => (
            <TabButton
              key={tab}
              active={tab === activeTab}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </TabButton>
          ))}
        </ModalTabs>

        <PromptList>
          {prompts.map((text) => (
            <PromptItem
              key={text}
              onClick={() => {
                onSelect(text);
                onClose();
              }}
            >
              {text}
            </PromptItem>
          ))}
        </PromptList>
      </ModalCard>
    </ModalOverlay>
  );
}

export default function Profile4({ onSubmit }) {
  const [aboutBlocks, setAboutBlocks] = useState([
    { prompt: "", answer: "" },
    { prompt: "", answer: "" },
    { prompt: "", answer: "" },
  ]);

  const [pollPrompt, setPollPrompt] = useState("");
  const [pollOptions, setPollOptions] = useState(["", "", ""]);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState(null);
  const [activeAboutIndex, setActiveAboutIndex] = useState(null);

  const [goToPreview, setGoToPreview] = useState(false);

  const openAboutModal = (index) => {
    setActiveAboutIndex(index);
    setModalMode("about");
    setModalOpen(true);
  };

  const openPollModal = () => {
    setModalMode("poll");
    setModalOpen(true);
  };

  const handleAboutPromptSelect = (promptText) => {
    if (activeAboutIndex == null) return;
    setAboutBlocks((prev) =>
      prev.map((block, idx) =>
        idx === activeAboutIndex ? { ...block, prompt: promptText } : block
      )
    );
  };

  const handleAboutAnswerChange = (index, value) => {
    setAboutBlocks((prev) =>
      prev.map((block, idx) =>
        idx === index ? { ...block, answer: value } : block
      )
    );
  };

  const handlePollOptionChange = (index, value) => {
    setPollOptions((prev) =>
      prev.map((opt, idx) => (idx === index ? value : opt))
    );
  };

  const handleSubmit = () => {
    const payload = {
      aboutBlocks,
      poll: {
        prompt: pollPrompt,
        options: pollOptions,
      },
    };

    if (onSubmit) {
      onSubmit(payload);
    } else {
      setGoToPreview(true);
    }
  };

  if (goToPreview) {
    return <ProfilePreview data={{ aboutBlocks, poll: { prompt: pollPrompt, options: pollOptions } }} />;
  }

  return (
    <>
      <Wrapper>
        <MainTitle>You&apos;re almost there..</MainTitle>
        <Subtitle>About Me</Subtitle>

        <Section>
          <SectionHeading>About me</SectionHeading>
          <SectionSub>
            Pick up to three prompts and answer them so people get the real you.
          </SectionSub>

          <AboutGrid>
            {aboutBlocks.map((block, index) => {
              const answerLength = block.answer.length;
              const answerLimit = 250;
              return (
                <AboutCard key={index}>
                  <PromptSelector onClick={() => openAboutModal(index)}>
                    {block.prompt ? (
                      <span>{block.prompt}</span>
                    ) : (
                      <PromptPlaceholder>
                        Choose a prompt to answer
                      </PromptPlaceholder>
                    )}
                    <SmallIcon>✏️</SmallIcon>
                  </PromptSelector>

                  <AnswerInput
                    value={block.answer}
                    onChange={(e) =>
                      handleAboutAnswerChange(index, e.target.value)
                    }
                    placeholder="Type your answer here..."
                    maxLength={answerLimit}
                  />
                  <AnswerCount>
                    {answerLength}/{answerLimit}
                  </AnswerCount>
                </AboutCard>
              );
            })}
          </AboutGrid>
        </Section>

        <Section>
          <SectionHeading>Prompt Poll</SectionHeading>
          <SectionSub>
            Create a poll prompt and options so people can vote and start
            conversations.
          </SectionSub>

          <PollCard>
            <PollPromptButton onClick={openPollModal}>
              {pollPrompt ? (
                <span>{pollPrompt}</span>
              ) : (
                <PromptPlaceholder>Pick a poll prompt</PromptPlaceholder>
              )}
              <SmallIcon>✏️</SmallIcon>
            </PollPromptButton>

            {pollOptions.map((opt, idx) => {
              const limit = 75;
              return (
                <PollOptionRow key={idx}>
                  <PollOptionInput
                    placeholder={`Option ${idx + 1}`}
                    value={opt}
                    maxLength={limit}
                    onChange={(e) =>
                      handlePollOptionChange(idx, e.target.value)
                    }
                  />
                  <PollCharCount>
                    {limit - opt.length}
                  </PollCharCount>
                </PollOptionRow>
              );
            })}

            <SectionSub>3 answers required</SectionSub>
          </PollCard>
        </Section>

        <SubmitRow>
          <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
        </SubmitRow>
      </Wrapper>

      {modalOpen && (
        <PromptModal
          key={modalMode}
          mode={modalMode}
          onClose={() => setModalOpen(false)}
          onSelect={modalMode === "about" ? handleAboutPromptSelect : setPollPrompt}
        />
      )}
    </>
  );
}
