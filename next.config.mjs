/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/wp-content/uploads/:path*",
        destination: "https://cms.astrokaleido.com/wp-content/uploads/:path*",
        permanent: false,
      },
    ]
  },
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


