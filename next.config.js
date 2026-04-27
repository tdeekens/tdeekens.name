/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/',
        headers: [
          {
            key: 'Link',
            value:
              '</sitemap.xml>; rel="index"; type="application/xml", </robots.txt>; rel="service-meta"; type="text/plain"',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/cv',
        destination: '/curriculum-vitae',
        permanent: true,
      },
      {
        source: '/posts',
        destination: '/',
        permanent: false,
      },
    ];
  },
};
