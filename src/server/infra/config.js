const convict = require('convict')

module.exports = convict({
  app: {
    env: {
      doc: 'The environment that the app is run on.',
      format: ['production', 'local'],
      default: 'production',
      env: 'APP_ENV'
    },
    port: {
      doc: 'The port the app is listening to.',
      format: 'port',
      default: 3000,
      env: 'PORT'
    },
  },
}).validate({ allowed: 'strict' })