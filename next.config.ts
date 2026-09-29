import type { NextConfig } from "next";

// Locally these come from .env.local (not in git). On the host they must be set as environment
// variables — see .env.example.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
if (!supabaseUrl) {
  throw new Error(
    "NEXT_PUBLIC_SUPABASE_URL mangler. Tilføj den (og de andre variabler i .env.example) " +
      "som environment variables hos din hosting, fx Vercel → Settings → Environment Variables.",
  );
}
const supabaseHost = new URL(supabaseUrl).hostname;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Uploaded item images in Supabase Storage.
      {
        protocol: "https",
        hostname: supabaseHost,
        pathname: "/storage/v1/object/public/**",
      },
      // Photos used by the test data in supabase/seed.sql.
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  experimental: {
    serverActions: {
      // Creating an item uploads one photo. It's resized in the browser first (usually well under
      // 1 MB), and the action rejects anything over 4 MB; this leaves room for form overhead.
      bodySizeLimit: "5mb",
    },
  },
};

export default nextConfig;
