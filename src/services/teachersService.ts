import { ref, get } from "firebase/database";
import { db } from "../firebase";
import type { Teacher } from "../types/teacher";

export async function fetchTeachers(): Promise<Teacher[]> {
  const snapshot = await get(ref(db, "teachers"));

  if (!snapshot.exists()) {
    return [];
  }

  return snapshot.val();
}
