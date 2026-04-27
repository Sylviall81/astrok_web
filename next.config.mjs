/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "cms.astrokaleido.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "kaleidoastro.local",
        pathname: "/**",
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;


