// src/ProfileFlow.jsx
import React, { useState, useEffect } from "react";
import { auth } from "./firebase";
import Profile from "./profile";
import Profile1 from "./profile1";
import Profile2 from "./profile2";
import Profile3 from "./profile3";
import Profile4 from "./profile4";
import ProfilePreview from "./preview";
import { saveUserProfile, loadUserProfile } from "./profileServices";

export default function ProfileFlow() {
  const [stage, setStage] = useState(0);
  const [loading, setLoading] = useState(true);

  // ALL DATA FROM ALL SCREENS
  const [media, setMedia] = useState([null, null, null, null, null, null]);
  const [prompts, setPrompts] = useState([]);

  const [basic, setBasic] = useState({});
  const [vitals, setVitals] = useState({});
  const [interests, setInterests] = useState([]);
  const [aboutPoll, setAboutPoll] = useState({ aboutBlocks: [], poll: {} });

  const [finalData, setFinalData] = useState(null);

  // LOAD USER PROFILE IF EXISTS
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (!user) return setLoading(false);

      const existing = await loadUserProfile();

      if (existing) {
        setFinalData(existing);
        setStage(5);
      } else {
        setStage(0);
      }

      setLoading(false);
    });
  }, []);

  const saveStage1 = (data) => {
    setBasic(data);
    setStage(2);
  };

  const saveStage2 = (data) => {
    setVitals(data);
    setStage(3);
  };

  const saveStage3 = (selectedInterests) => {
    setInterests(selectedInterests);
    setStage(4);
  };

  const saveStage4 = async (data) => {
    setAboutPoll(data);

    const finalPayload = {
      media,
      prompts,

      ...basic,
      ...vitals,
      interests,
      ...data // {aboutBlocks, poll}
    };

    setFinalData(finalPayload);

    await saveUserProfile(finalPayload);

    setStage(5);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      {stage === 0 && (
        <Profile
          media={media}
          prompts={prompts}
          onMediaChange={setMedia}
          onPromptsChange={setPrompts}
          onCompleted={() => setStage(1)}
        />
      )}

      {stage === 1 && (
        <Profile1
          media={media}
          prompts={prompts}
          onMediaChange={setMedia}
          onPromptsChange={setPrompts}
          onCompleted={(data) => saveStage1(data)}
        />
      )}

      {stage === 2 && <Profile2 onCompleted={(d) => saveStage2(d)} />}

      {stage === 3 && (
        <Profile3 onNext={(selected) => saveStage3(selected)} />
      )}

      {stage === 4 && <Profile4 onSubmit={(d) => saveStage4(d)} />}

      {stage === 5 && <ProfilePreview data={finalData} />}
    </>
  );
}
