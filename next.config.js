module.exports = {
    async redirects() {
      return [
        {
          source: '/Emote/:tokenId/:emote',
          destination: '/Emote/:tokenId', // Matched parameters can be used in the destination
          permanent: true,
        },
      ]
    },
  }