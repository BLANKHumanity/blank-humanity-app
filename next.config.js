module.exports = {
    async redirects() {
      return [
        {
          source: '/Emote/:tokenId/:emote',
          destination: '/api/emote/:tokenId/:emote', // Matched parameters can be used in the destination
          permanent: true,
        },{
          source: '/api/emote/:tokenId/:emote',
          destination: '/api/emote/:tokenId/:emote/med', // Matched parameters can be used in the destination
          permanent: false,
        },
      ]
    },
  }