// src/ProfilePreview.jsx
import React from "react";
import styled from "styled-components";

// Icons
import mapleIcon from "./assets/leaf.png";
import crossIcon from "./assets/cross.png";
import heartIcon from "./assets/like.png";

/* =======================
   PAGE + MAIN CONTAINER
======================= */

const PageWrapper = styled.div`
  min-height: 100vh;
  padding: 24px 16px 48px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  background: #fff5f5;
  font-family: "DM Sans";
`;

const ProfileCard = styled.div`
  width: 100%;
  max-width: 980px;
  background: #ffffff;
  border-radius: 26px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  padding: 18px;
  display: grid;
  grid-template-columns: 1.7fr 1.2fr;
  gap: 16px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

/* =======================
   LEFT COLUMN
======================= */

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const MainPhotoCard = styled.div`
  position: relative;
  border-radius: 22px;
  overflow: hidden;
  background: #ddd;
  min-height: 360px;
`;

const MainPhoto = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const MainPhotoOverlay = styled.div`
  position: absolute;
  inset: auto 0 0 0;
  padding: 18px 16px 14px;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.7),
    rgba(0, 0, 0, 0.3),
    transparent
  );
  color: white;
`;

const NameRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 6px;
`;

const Name = styled.span`
  font-size: 22px;
  font-weight: 700;
`;

const NameMeta = styled.span`
  font-size: 13px;
  opacity: 0.9;
`;

const BasicInfoRow = styled.div`
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const InfoChip = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.45);
  font-size: 11px;
  color: white;
`;

const InfoIcon = styled.span`
  font-size: 13px;
`;

/* =======================
   RIGHT COLUMN
======================= */

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const MiniCard = styled.div`
  border-radius: 18px;
  background: #fff9fb;
  border: 1px solid #f2dde6;
  padding: 10px 12px;
`;

const MiniTitle = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #4a1e2d;
`;

const MiniGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const MiniPill = styled.div`
  padding: 4px 8px;
  border-radius: 999px;
  background: #ffffff;
  border: 1px solid #f1dde5;
  font-size: 11px;
  color: #4a1e2d;
`;

const PhotoCard = styled.div`
  border-radius: 18px;
  overflow: hidden;
  background: #ddd;
  min-height: 140px;
`;

const SmallPhoto = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

/* ABOUT CARDS */
const TwoColumnRow = styled.div`
  display: grid;
  grid-template-columns: 1.6fr 1.1fr;
  gap: 12px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const AboutCard = styled.div`
  border-radius: 18px;
  border: 1px solid #f1dde5;
  background: #ffffff;
  padding: 12px 14px;
`;

const AboutPrompt = styled.p`
  margin: 0;
  font-size: 13px;
  font-weight: 600;
  color: #4a1e2d;
`;

const AboutAnswer = styled.p`
  margin: 0;
  font-size: 13px;
  color: #444;
`;

/* SPOTIFY CARD */
const SpotifyCard = styled.div`
  border-radius: 18px;
  background: #050814;
  color: white;
  padding: 10px 12px;
  display: flex;
  gap: 10px;
`;

const SpotifyCover = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 10px;
  overflow: hidden;
`;

const SpotifyCoverImg = styled.img`
  width: 100%;
  height: 100%;
`;

const SpotifyMeta = styled.div`
  display: flex;
  flex-direction: column;
`;

const SpotifyLabel = styled.span`
  font-size: 11px;
  opacity: 0.75;
`;

const SpotifyTrack = styled.span`
  font-size: 13px;
  font-weight: 600;
`;

const SpotifyArtist = styled.span`
  font-size: 11px;
  opacity: 0.9;
`;

/* POLL + VIDEO */
const PollAndMediaRow = styled.div`
  display: grid;
  grid-template-columns: 1.4fr 1.1fr;
  gap: 12px;
`;

const PollCard = styled.div`
  border-radius: 18px;
  border: 1px solid #f1dde5;
  background: white;
  padding: 12px 14px;
`;

const PollPrompt = styled.p`
  margin: 0;
  font-size: 13px;
  font-weight: 600;
`;

const PollOption = styled.div`
  border-radius: 12px;
  border: 1px solid #f0e2e8;
  padding: 8px 10px;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
`;

const PollDot = styled.span`
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: #4a1e2d;
`;

const MediaStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const VideoCard = styled.div`
  border-radius: 18px;
  overflow: hidden;
  background: #000;
  position: relative;
  min-height: 160px;
`;

const VideoThumb = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PlayBadge = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PlayCircle = styled.div`
  width: 54px;
  height: 54px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.55);
  border: 2px solid rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PlayIcon = styled.div`
  margin-left: 3px;
  width: 0;
  height: 0;
  border-top: 9px solid transparent;
  border-bottom: 9px solid transparent;
  border-left: 14px solid white;
`;

/* FOOTER */
const ActionRow = styled.div`
  margin-top: 6px;
  display: flex;
  justify-content: flex-end;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 14px;
`;

const ActionButton = styled.button`
  width: ${(p) => (p.variant === "super" ? "60px" : "44px")};
  height: ${(p) => (p.variant === "super" ? "60px" : "44px")};
  border-radius: 999px;
  border: none;
  background: ${(p) =>
    p.variant === "reject"
      ? "#ffe5e7"
      : p.variant === "super"
      ? "#4a1e2d"
      : "#ffe9f2"};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const IconImg = styled.img`
  width: ${(p) => (p.big ? "36px" : "26px")};
`;

/* ============================
   FINAL PREVIEW COMPONENT
============================ */

export default function ProfilePreview({ data = {} }) {

  // ---------------------------
  // SAFE DATA EXTRACTION
  // ---------------------------

  const {
    name = "",
    age = "",
    sex = "",
    orientation = "",
    height = "",
    weight = "",
    homeTown = "",
    currentLocation = "",
    zodiac = "",
    relationType = "",
    datingIntent = "",
    familyPlan = "",
    pets = "",
    politics = "",
    languages = "",
    personality = "",
    hobbies = [],
    workPlace = "",
    jobTitle = "",
    college = "",
    education = "",
    drinking = "",
    smoking = "",
    marijuana = "",
    drugs = "",
    interests = [],
    aboutBlocks = [],
    poll = {},
    media = [],
    spotify = {}
  } = data;

  // Photos
  const mainPhoto = media[0]?.url || "";
  const photo2 = media[1]?.url || "";
  const photo3 = media[2]?.url || "";
  const photo4 = media[3]?.url || "";
  const photo5 = media[4]?.url || "";
  const videoThumb = media[5]?.url || "";

  // About blocks
  const ab1 = aboutBlocks[0] || {};
  const ab2 = aboutBlocks[1] || {};
  const ab3 = aboutBlocks[2] || {};

  return (
    <PageWrapper>
      <ProfileCard>

        {/* LEFT COLUMN */}
        <LeftColumn>

          {/* MAIN PHOTO */}
          <MainPhotoCard>
            <MainPhoto src={mainPhoto} />
            <MainPhotoOverlay>
              <NameRow>
                <Name>{name}</Name>
                <NameMeta>{age}</NameMeta>
              </NameRow>

              <NameMeta>{homeTown || currentLocation}</NameMeta>

              <BasicInfoRow>
                <InfoChip><InfoIcon>🎂</InfoIcon>{age}</InfoChip>
                <InfoChip><InfoIcon>⚧</InfoIcon>{sex}</InfoChip>
                <InfoChip><InfoIcon>🌈</InfoIcon>{orientation}</InfoChip>
                <InfoChip><InfoIcon>📏</InfoIcon>{height}</InfoChip>
                <InfoChip><InfoIcon>⚖️</InfoIcon>{weight}</InfoChip>
              </BasicInfoRow>
            </MainPhotoOverlay>
          </MainPhotoCard>

          {/* ABOUT + SMALL PHOTO */}
          <TwoColumnRow>
            <AboutCard>
              <AboutPrompt>{ab1.prompt}</AboutPrompt>
              <AboutAnswer>{ab1.answer}</AboutAnswer>
            </AboutCard>

            <PhotoCard>
              <SmallPhoto src={photo2} />
            </PhotoCard>
          </TwoColumnRow>

          {/* ABOUT 2 + SPOTIFY */}
          <TwoColumnRow>
            <AboutCard>
              <AboutPrompt>{ab2.prompt}</AboutPrompt>
              <AboutAnswer>{ab2.answer}</AboutAnswer>
            </AboutCard>

            <SpotifyCard>
              <SpotifyCover>
                {spotify.cover && <SpotifyCoverImg src={spotify.cover} />}
              </SpotifyCover>
              <SpotifyMeta>
                <SpotifyLabel>Your top vibe</SpotifyLabel>
                <SpotifyTrack>{spotify.track}</SpotifyTrack>
                <SpotifyArtist>{spotify.artist}</SpotifyArtist>
              </SpotifyMeta>
            </SpotifyCard>
          </TwoColumnRow>
        </LeftColumn>

        {/* RIGHT COLUMN */}
        <RightColumn>

          {/* MINI DETAILS */}
          <MiniCard>
            <MiniTitle>Quick Vibes</MiniTitle>
            <MiniGrid>
              {zodiac && <MiniPill>♐ {zodiac}</MiniPill>}
              {relationType && <MiniPill>❤️ {relationType}</MiniPill>}
              {datingIntent && <MiniPill>🎯 {datingIntent}</MiniPill>}
              {personality && <MiniPill>✨ {personality}</MiniPill>}
            </MiniGrid>
          </MiniCard>

          <PhotoCard>
            <SmallPhoto src={photo3} />
          </PhotoCard>

          <AboutCard>
            <AboutPrompt>{ab3.prompt}</AboutPrompt>
            <AboutAnswer>{ab3.answer}</AboutAnswer>
          </AboutCard>

          <PhotoCard>
            <SmallPhoto src={photo4} />
          </PhotoCard>

          <PollAndMediaRow>

            {/* POLL */}
            <PollCard>
              <PollPrompt>{poll.prompt}</PollPrompt>

              {(poll.options || []).map((op, i) => (
                op ? (
                  <PollOption key={i}>
                    {op}
                    <PollDot />
                  </PollOption>
                ) : null
              ))}
            </PollCard>

            {/* VIDEO + LAST PHOTO */}
            <MediaStack>
              <VideoCard>
                <VideoThumb src={videoThumb} />
                <PlayBadge>
                  <PlayCircle>
                    <PlayIcon />
                  </PlayCircle>
                </PlayBadge>
              </VideoCard>

              <PhotoCard>
                <SmallPhoto src={photo5} />
              </PhotoCard>
            </MediaStack>
          </PollAndMediaRow>

          {/* FOOTER BUTTONS */}
          <ActionRow>
            <ActionButtons>
              <ActionButton variant="reject">
                <IconImg src={crossIcon} />
              </ActionButton>

              <ActionButton variant="super">
                <IconImg src={mapleIcon} big />
              </ActionButton>

              <ActionButton variant="like">
                <IconImg src={heartIcon} />
              </ActionButton>
            </ActionButtons>
          </ActionRow>

        </RightColumn>

      </ProfileCard>
    </PageWrapper>
  );
}
