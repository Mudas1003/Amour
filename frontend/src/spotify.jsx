// src/Spotify.jsx
import React from "react";
import styled from "styled-components";
import spotifyLogo from "./assets/spotify.png"; 

const Card = styled.div`
  margin-top: 16px;
  background: #ffffff;
  border-radius: 18px;
  padding: 16px 16px 14px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.06);
  border: 1px solid #f1f1f1;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LogoBubble = styled.div`
  width: 26px;
  height: 26px;
  border-radius: 999px;
  background: #1db954;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  color: #000;
`;

const HeaderText = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: #111;
`;

const Subtitle = styled.span`
  font-size: 11px;
  color: #777;
`;

/* SONGS */

const SongsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  column-gap: 8px;
  row-gap: 8px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const SongCard = styled.div`
  background: #f7f7f7;
  border-radius: 14px;
  padding: 8px 8px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CoverCircle = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
  background: linear-gradient(135deg, #1db954, #0f8040);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  color: #fff;
`;

const CoverImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const SongInfo = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const SongName = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #111;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SongArtist = styled.span`
  font-size: 11px;
  color: #777;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

/* PLAYLIST */

const PlaylistCard = styled.div`
  margin-top: 2px;
  background: #f7f7f7;
  border-radius: 14px;
  padding: 9px 10px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const PlaylistThumb = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  overflow: hidden;
  background: radial-gradient(circle at 0 0, #1db954, #121212);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #fff;
`;

const PlaylistImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PlaylistInfo = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const PlaylistName = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: #111;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PlaylistMeta = styled.span`
  font-size: 11px;
  color: #777;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

/* ARTISTS */

const ArtistsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const ArtistsTitle = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: #111;
`;

const ArtistsChips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const ArtistChip = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px 4px 4px;
  border-radius: 999px;
  background: #f5f5f5;
  font-size: 12px;
  color: #111;
`;

const ArtistAvatar = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 999px;
  overflow: hidden;
  background: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 600;
  color: #333;
`;

const ArtistImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

/* FOOT / HELP */

const HelpText = styled.p`
  margin: 0;
  font-size: 10px;
  color: #999;
`;

/**
 * Spotify component
 *
 * Props for REAL data (when you hook Spotify API):
 *  - topTracks: [{ id, name, artists: "A, B", image }]
 *  - playlist:  { id, name, description, image }
 *  - artists:   [{ id, name, image }]
 *
 * For now, if you don't pass anything, it shows pretty mock data.
 */
export default function Spotify({
  topTracks,
  playlist,
  artists,
  selectedInterests, // optional, not used yet but you can log it if needed
}) {
  // ---- MOCK DATA (fallback until you plug real Spotify) ----
  const mockTopTracks = [
    {
      id: "1",
      name: "Kesariya",
      artists: "Arijit Singh",
      image: null,
    },
    {
      id: "2",
      name: "Asal Mein",
      artists: "Darshan Raval",
      image: null,
    },
    {
      id: "3",
      name: "Heeriye",
      artists: "Jasleen Royal, Arijit Singh",
      image: null,
    },
  ];

  const mockPlaylist = {
    id: "p1",
    name: "Feels & Late Night Drive",
    description: "Bollywood + lo-fi favourites",
    image: null,
  };

  const mockArtists = [
    "Pritam",
    "Vishal-Shekhar",
    "Tanishk Bagchi",
    "Badshah",
    "Salim-Sulaiman",
    "Shankar-Ehsaan-Loy",
    "Neha Kakkar",
    "Shreya Ghoshal",
    "Sonu Nigam",
    "Sunidhi Chauhan",
  ].map((name, idx) => ({
    id: String(idx + 1),
    name,
    image: null,
  }));

  const tracksToShow = topTracks && topTracks.length ? topTracks : mockTopTracks;
  const playlistToShow = playlist || mockPlaylist;
  const artistsToShow = artists && artists.length ? artists : mockArtists;

  return (
    <Card>
      {/* MAIN HEADER */}
      {/* MAIN HEADER */}
<SectionHeader>
  <img
    src={spotifyLogo}
    alt="Spotify"
    style={{
      width: "110px",
      height: "auto",
      objectFit: "contain",
      marginBottom: "4px",
    }}
  />
</SectionHeader>


      {/* TOP SONGS */}
      <div>
        <Subtitle style={{ color: "#555", marginBottom: 4 }}>
          Top 3 favourite songs
        </Subtitle>
        <SongsGrid>
          {tracksToShow.slice(0, 3).map((track) => (
            <SongCard key={track.id}>
              <CoverCircle>
                {track.image ? (
                  <CoverImg src={track.image} alt={track.name} />
                ) : (
                  track.name.charAt(0).toUpperCase()
                )}
              </CoverCircle>
              <SongInfo>
                <SongName title={track.name}>{track.name}</SongName>
                <SongArtist title={track.artists}>{track.artists}</SongArtist>
              </SongInfo>
            </SongCard>
          ))}
        </SongsGrid>
      </div>

      {/* PLAYLIST */}
      <div>
        <Subtitle style={{ color: "#555", marginBottom: 4 }}>
          Favourite playlist
        </Subtitle>
        <PlaylistCard>
          <PlaylistThumb>
            {playlistToShow.image ? (
              <PlaylistImg
                src={playlistToShow.image}
                alt={playlistToShow.name}
              />
            ) : (
              "♪"
            )}
          </PlaylistThumb>
          <PlaylistInfo>
            <PlaylistName title={playlistToShow.name}>
              {playlistToShow.name}
            </PlaylistName>
            {playlistToShow.description && (
              <PlaylistMeta title={playlistToShow.description}>
                {playlistToShow.description}
              </PlaylistMeta>
            )}
          </PlaylistInfo>
        </PlaylistCard>
      </div>

      {/* ARTISTS */}
      <ArtistsWrapper>
        <ArtistsTitle>My top artists on Spotify</ArtistsTitle>
        <ArtistsChips>
          {artistsToShow.slice(0, 10).map((artist) => (
            <ArtistChip key={artist.id}>
              <ArtistAvatar>
                {artist.image ? (
                  <ArtistImg src={artist.image} alt={artist.name} />
                ) : (
                  artist.name.charAt(0).toUpperCase()
                )}
              </ArtistAvatar>
              <span>{artist.name}</span>
            </ArtistChip>
          ))}
        </ArtistsChips>
      </ArtistsWrapper>

      <HelpText>
        To show real-time Spotify data: call the Spotify Web API on your
        backend, then pass <code>topTracks</code>, <code>playlist</code> and{" "}
        <code>artists</code> as props to this component.
      </HelpText>
    </Card>
  );
}
