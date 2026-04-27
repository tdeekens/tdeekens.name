/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Vary',
            value: 'Accept',
          },
        ],
      },
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
  async rewrites() {
    const markdownAcceptHeader = {
      type: 'header',
      key: 'accept',
      value: '.*\\b[Tt][Ee][Xx][Tt]/[Mm][Aa][Rr][Kk][Dd][Oo][Ww][Nn]\\b.*',
    };

    return {
      beforeFiles: [
        {
          source: '/',
          has: [markdownAcceptHeader],
          destination: '/api/accept-md?path=/',
        },
        {
          source:
            '/:path((?!api/|_next/|favicon.ico|robots.txt|sitemap.xml|site.webmanifest|.*\\..*).*)',
          has: [markdownAcceptHeader],
          destination: '/api/accept-md?path=/:path',
        },
      ],
    };
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
