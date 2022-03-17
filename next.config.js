module.exports = {
    async redirects() {
      return [
        {
          source: '/Emote/:tokenId',
          destination: '/Emote/:tokenId/GM', // Matched parameters can be used in the destination
          permanent: true,
        },
      ]
    },
  }