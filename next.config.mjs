/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "luzunpjyubwhdepirlww.supabase.co",
        pathname: "/storage/v1/object/public/corporatehub/*",
      },
    ],
  },
};

export default nextConfig;
