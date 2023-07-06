/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
        domains: ['lh3.googleusercontent.com','pbs.twimg.com'],
    },
    async redirects() {
        return [
          {
            source: '/',
            destination: '/meal',
            permanent: true,
          },
        ];
      },

}

module.exports = nextConfig
