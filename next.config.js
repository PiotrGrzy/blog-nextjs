/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
      },
    ],
  },
};

module.exports = nextConfig;

// https://i.picsum.photos/id/238/800/600.jpg?hmac=x11Kjfo7lchZw_mrIGtTlwi_ncxdy1RXEYCkgGGaXcA
