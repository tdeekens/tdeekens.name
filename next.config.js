/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/cv',
        destination: '/curriculum-vitae',
        permanent: true,
      },
    ];
  },
};
