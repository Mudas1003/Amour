// src/Profile3.jsx
import React, { useState } from "react";
import styled from "styled-components";
import Spotify from "./spotify";
import Profile4 from "./profile4"; // ✅ NEW: import Profile4

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding-bottom: 80px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  color: #4a1e2d;
  text-align: left;
`;

const SectionBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SectionTitle = styled.h3`
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

const ChipGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 4px;
`;

const Chip = styled.button`
  border-radius: 999px;
  padding: 6px 12px;
  border: 1px solid ${(props) => (props.selected ? "#4A1E2D" : "#e5c9d0")};
  background: ${(props) => (props.selected ? "#4A1E2D" : "#ffffff")};
  color: ${(props) => (props.selected ? "#ffffff" : "#4a1e2d")};
  font-size: 12px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  min-height: 30px;
`;

const SelectedCount = styled.p`
  margin: 0;
  font-size: 11px;
  color: #777;
`;

const NextWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
`;

const NextButton = styled.button`
  border: none;
  padding: 10px 28px;
  border-radius: 999px;
  background: #4a1e2d;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    opacity: 0.88;
  }
`;

/* ---------- OPTIONS ARRAYS ---------- */

const allEntertainment = [
  { id: "ent_bolly", label: "🍿 Bollywood movies" },
  { id: "ent_holly", label: "🎬 Hollywood movies" },
  { id: "ent_tollywood", label: "🎥 Tollywood" },
  { id: "ent_netflix", label: "📺 Netflix binges" },
  { id: "ent_series", label: "📽️ Web series" },
  { id: "ent_got", label: "🐉 Game of Thrones" },
  { id: "ent_stranger", label: "🧲 Stranger Things" },
  { id: "ent_friends", label: "👯 Friends" },
  { id: "ent_modernfamily", label: "👨‍👩‍👧‍👦 Modern Family" },
  { id: "ent_kdrama", label: "🇰🇷 K-dramas" },
  { id: "ent_anime", label: "🎌 Anime" },
  { id: "ent_romcom", label: "❤️ Rom-coms" },
  { id: "ent_horror", label: "😱 Horror" },
  { id: "ent_thriller", label: "🔍 Thrillers" },
  { id: "ent_documentary", label: "🎞️ Documentaries" },
  { id: "ent_standup", label: "😂 Stand-up comedy" },
  { id: "ent_reality", label: "📺 Reality shows" },
  { id: "ent_notmuch", label: "😴 Don’t watch much" },
];

const allPets = [
  { id: "pet_dog", label: "🐶 Dogs" },
  { id: "pet_cat", label: "🐱 Cats" },
  { id: "pet_bird", label: "🐦 Birds" },
  { id: "pet_fish", label: "🐠 Fish" },
  { id: "pet_rabbit", label: "🐰 Rabbits" },
  { id: "pet_hamster", label: "🐹 Hamsters" },
  { id: "pet_reptile", label: "🦎 Reptiles" },
  { id: "pet_horse", label: "🐴 Horses" },
  { id: "pet_farm", label: "🐄 Farm animals" },
  { id: "pet_exotic", label: "🦜 Exotic pets" },
  { id: "pet_street", label: "🐕 Street animal feeder" },
  { id: "pet_safari", label: "🦁 Safari / zoo lover" },
  { id: "pet_all", label: "🌍 Every animal ever" },
  { id: "pet_nopets", label: "😅 Not really a pet person" },
];

const allMusic = [
  { id: "music_bolly", label: "🎵 Bollywood" },
  { id: "music_pop", label: "🎧 Pop" },
  { id: "music_hiphop", label: "🎤 Hip-hop / Rap" },
  { id: "music_lofi", label: "🌙 Lo-fi" },
  { id: "music_indie", label: "🪕 Indie" },
  { id: "music_edm", label: "🎚️ EDM" },
  { id: "music_rock", label: "🎸 Rock" },
  { id: "music_classical", label: "🎻 Classical" },
  { id: "music_sufi", label: "🕊️ Sufi / Ghazals" },
  { id: "music_punjabi", label: "💥 Punjabi" },
  { id: "music_kpop", label: "💜 K-pop" },
  { id: "music_jazz", label: "🎷 Jazz" },
  { id: "music_instrumental", label: "🎹 Instrumental" },
  { id: "music_podcast", label: "🎙️ Podcasts" },
  { id: "music_anything", label: "🔀 Whatever’s trending" },
];

const allSports = [
  { id: "sport_cricket", label: "🏏 Cricket" },
  { id: "sport_football", label: "⚽ Football" },
  { id: "sport_basketball", label: "🏀 Basketball" },
  { id: "sport_tennis", label: "🎾 Tennis" },
  { id: "sport_badminton", label: "🏸 Badminton" },
  { id: "sport_tt", label: "🏓 Table tennis" },
  { id: "sport_volleyball", label: "🏐 Volleyball" },
  { id: "sport_swim", label: "🏊‍♀️ Swimming" },
  { id: "sport_gym", label: "🏋️‍♂️ Gym" },
  { id: "sport_run", label: "🏃 Running" },
  { id: "sport_yoga", label: "🧘 Yoga / Pilates" },
  { id: "sport_chess", label: "♟️ Chess" },
  { id: "sport_esports", label: "🎮 E-sports / gaming" },
  { id: "sport_fantasy", label: "📱 Fantasy leagues" },
  { id: "sport_nosport", label: "😌 Not into sports much" },
];

const allCuisines = [
  { id: "food_northindian", label: "🍛 North Indian" },
  { id: "food_southindian", label: "🍲 South Indian" },
  { id: "food_street", label: "🌶️ Indian street food" },
  { id: "food_chinese", label: "🥡 Chinese" },
  { id: "food_italian", label: "🍕 Italian" },
  { id: "food_mexican", label: "🌮 Mexican" },
  { id: "food_thai", label: "🍜 Thai" },
  { id: "food_japanese", label: "🍣 Japanese / Sushi" },
  { id: "food_mediterranean", label: "🥙 Mediterranean" },
  { id: "food_middleeast", label: "🧆 Middle Eastern" },
  { id: "food_korean", label: "🍱 Korean" },
  { id: "food_dessert", label: "🧁 Desserts" },
  { id: "food_healthy", label: "🥗 Healthy bowls" },
  { id: "food_anything", label: "😋 I eat anything tasty" },
  { id: "food_notfoodie", label: "🙈 Not a foodie" },
];

const allHolidays = [
  { id: "trip_maldives", label: "🏝️ Maldives" },
  { id: "trip_bali", label: "🌴 Bali" },
  { id: "trip_paris", label: "🗼 Paris" },
  { id: "trip_london", label: "🇬🇧 London" },
  { id: "trip_ny", label: "🗽 New York" },
  { id: "trip_goa", label: "🏖️ Goa" },
  { id: "trip_kerala", label: "🚤 Kerala backwaters" },
  { id: "trip_shimla", label: "🏔️ Shimla" },
  { id: "trip_manali", label: "🏔️ Manali" },
  { id: "trip_rajasthan", label: "🏰 Rajasthan" },
  { id: "trip_mountains", label: "⛰️ Any mountains" },
  { id: "trip_beaches", label: "🏝️ Any beaches" },
  { id: "trip_road", label: "🛣️ Road trips" },
  { id: "trip_solo", label: "🧳 Solo trips" },
  { id: "trip_staycation", label: "🛏️ Staycations" },
  { id: "trip_notrips", label: "😴 Don’t like trips much" },
];

const allCooking = [
  { id: "cook_indianbasic", label: "🍲 Indian home food" },
  { id: "cook_indianfeast", label: "🍛 Full Indian feast" },
  { id: "cook_international", label: "🌍 International recipes" },
  { id: "cook_bakingcakes", label: "🎂 Cake baking" },
  { id: "cook_bakingcookies", label: "🍪 Cookies & brownies" },
  { id: "cook_desserts", label: "🍨 Desserts" },
  { id: "cook_healthy", label: "🥗 Healthy meal prep" },
  { id: "cook_breakfast", label: "🥞 Breakfast lover" },
  { id: "cook_snacks", label: "🍟 Snacks & chaat" },
  { id: "cook_mocktails", label: "🍹 Drinks / mocktails" },
  { id: "cook_bbq", label: "🔥 BBQ / grilling" },
  { id: "cook_airfryer", label: "🍟 Air-fryer experiments" },
  { id: "cook_help", label: "🧑‍🍳 Can follow YouTube recipes" },
  { id: "cook_dontknow", label: "😅 Don’t know how to cook" },
  { id: "cook_burnmaggi", label: "🔥 I burn even Maggi" },
];

export default function Profile3({ onNext }) {
  const [selected, setSelected] = useState([]);
  const [goToProfile4, setGoToProfile4] = useState(false); // ✅ NEW

  const toggleChip = (id) => {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 15) {
        alert("You can select up to 15 things only.");
        return prev;
      }
      return [...prev, id];
    });
  };

  const renderGroup = (title, subtitle, options) => (
    <SectionBlock key={title}>
      <SectionTitle>{title}</SectionTitle>
      {subtitle && <SectionSub>{subtitle}</SectionSub>}
      <ChipGrid>
        {options.map((opt) => (
          <Chip
            key={opt.id}
            selected={selected.includes(opt.id)}
            onClick={() => toggleChip(opt.id)}
          >
            {opt.label}
          </Chip>
        ))}
      </ChipGrid>
    </SectionBlock>
  );

  const handleNext = () => {
    if (onNext) {
      onNext(selected);       // 🔹 let parent handle navigation if provided
    } else {
      setGoToProfile4(true);  // 🔹 fallback: show Profile4 directly
    }
  };

  // 🔥 If user clicked Next and no parent is handling it, render Profile4
  if (goToProfile4) {
    return <Profile4 />;
  }

  return (
    <Wrapper>
      <Title>The Fun part starts here...</Title>
      <SelectedCount>Selected interests: {selected.length} / 15</SelectedCount>

      {renderGroup("Entertainment", "Pick what you actually binge.", allEntertainment)}
      {renderGroup("Pets", "What kind of fur (or scales) person are you?", allPets)}
      {renderGroup("Music", "Your go-to sounds.", allMusic)}
      {renderGroup("Sports", "Outdoor to E-sports — what are you into?", allSports)}
      {renderGroup("Cuisines", "Your taste-buds’ happy place.", allCuisines)}
      {renderGroup("Holidays / Trips", "Dream destinations.", allHolidays)}
      {renderGroup("Cooking", "Even if you burn Maggi.", allCooking)}

      {/* SPOTIFY SECTION */}
      <Spotify selectedInterests={selected} />

      {/* NEXT BUTTON */}
      <NextWrapper>
        <NextButton type="button" onClick={handleNext}>
          Next
        </NextButton>
      </NextWrapper>
    </Wrapper>
  );
}
