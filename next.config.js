module.exports = {
    async redirects() {
      return [
        {
          source: '/Emote/:tokenId/:emote',
          destination: '/api/emote/:tokenId/:emote', // Matched parameters can be used in the destination
          permanent: true,
        }
      ]
    },
    async rewrites() {
      return [{
        source: '/(V|v)erify',
        destination: '/Verify', // Matched parameters can be used in the destination
      },{
        source: '/(E|e)mote/:tokenId',
        destination: '/Emote/:tokenId', // Matched parameters can be used in the destination
      }]
    }
  }