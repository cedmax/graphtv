
const Trakt = require('trakt.tv')
const cached = require('trakt.tv-cached')
const trakt = new Trakt({
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.SECRET,
  plugins: { cached },
  options: {
    cached: {
      defaultTTL: 36000,
      connection: 'sqlite://cache.sqlite',
      handleError: console.log,
      storageOptions: {
        namespace: 'graphtv',
        table: 'apicache',
        busyTimeout: 30000
      }
    }
  }
}).cached

module.exports = trakt