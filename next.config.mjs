/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/wp-content/uploads/:path*",
        destination: "https://cms.astrokaleido.com/wp-content/uploads/:path*",
        permanent: false,
      },
      {
        source: "/blog/signos-zodiaco-aries-guerrero-espiritual",
        destination: "/blog/aries-astrologia-psicologica",
        permanent: true,
      },
      {
        source: "/servicios/sesion-de-carta-astral",
        destination: "/servicios/sesion-de-carta-natal",
        permanent: true,
      },
      {
        source: "/servicios/sesion-integral-carta-natal-y-anual",
        destination: "/servicios/sesion-integral-carta-natal-y-revolucion-solar",
        permanent: true,
      },
      {
        source: "/tauro-astrologia-psicologica/",
        destination: "/blog/tauro-astrologia-psicologica/",
        permanent: true,
      },
      {
        source: "/tauro-astrologia-psicologica",
        destination: "/blog/tauro-astrologia-psicologica",
        permanent: true,
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
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;


