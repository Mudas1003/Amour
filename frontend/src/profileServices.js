// src/profileServices.js
import { auth, db, storage } from "./firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

//
// 🔥 Upload one image/video and return its Firebase URL
//
export async function uploadMediaFile(userId, file, index) {
  if (!file) return null;

  const path = `users/${userId}/media/media-${index}-${Date.now()}`;
  const storageRef = ref(storage, path);

  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);

  return url; // 👈 return URL only
}

//
// 🔥 Save FULL profile to Firestore
// (including uploaded media URLs)
//
export async function saveUserProfile(fullData) {
  const user = auth.currentUser;
  if (!user) throw new Error("User not logged in.");

  const userId = user.uid;

  // Upload media one-by-one
  const mediaURLs = [];

  for (let i = 0; i < fullData.media.length; i++) {
    const item = fullData.media[i];

    if (!item || !item.file) {
      mediaURLs[i] = null;
      continue;
    }

    const url = await uploadMediaFile(userId, item.file, i);

    mediaURLs[i] = {
      url,
      isVideo: item.isVideo,
      prompt: fullData.prompts[i] || "",
    };
  }

  // Build final JSON for Firestore
  const payload = {
    ...fullData,
    media: mediaURLs,
  };

  await setDoc(doc(db, "users", userId), payload);

  return true;
}

//
// 🔥 Load user profile
//
export async function loadUserProfile() {
  const user = auth.currentUser;
  if (!user) return null;

  const snap = await getDoc(doc(db, "users", user.uid));
  return snap.exists() ? snap.data() : null;
}
