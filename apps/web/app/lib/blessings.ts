/**
 * Blessing portraits on the homepage.
 *
 * Option A — put JPG/WEBP in `public/blessings/` as:
 *   grandfather.jpg, mother.jpg, divine.jpg
 *
 * Option B — set any full URL (e.g. Cloudinary) in env:
 *   NEXT_PUBLIC_BLESSING_GRANDFATHER
 *   NEXT_PUBLIC_BLESSING_MOTHER
 *   NEXT_PUBLIC_BLESSING_DIVINE
 *
 * If a file is missing, the UI falls back to the matching `.svg` placeholder.
 */
export const BLESSING_PATHS = {
    divine: {
    primary: process.env.NEXT_PUBLIC_BLESSING_DIVINE?.trim() || "/blessings/divine.jpeg",
    fallback: "/blessings/divine.svg",
  },
   mother: {
    primary: process.env.NEXT_PUBLIC_BLESSING_MOTHER?.trim() || "/blessings/mother.jpeg",
    fallback: "/blessings/mother.svg",
  },
  grandfather: {
    primary: process.env.NEXT_PUBLIC_BLESSING_GRANDFATHER?.trim() || "/blessings/fatherji.jpeg",
    fallback: "/blessings/grandfather.svg",
  },
 
 
} as const;
