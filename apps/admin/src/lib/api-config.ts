/**
 * Single source for admin → API wiring (avoid drift across screens).
 * Set on Vercel (web project, admin is embedded at build time):
 * - VITE_API_URL = https://your-api.vercel.app/api
 * - VITE_ADMIN_API_KEY optional if API auth is off
 */
export const ADMIN_API_URL =
  (import.meta.env.VITE_API_URL as string) || "http://localhost:4000/api";

export const ADMIN_API_KEY = import.meta.env.VITE_ADMIN_API_KEY as string | undefined;

/** Thumbnail when product has no image (same as catalogue grid). */
export const ADMIN_IMAGE_PLACEHOLDER =
  "https://picsum.photos/seed/jwell-admin-thumb/400/300";
