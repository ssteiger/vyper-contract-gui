const Datastore = require('nedb')

const Files = new Datastore({ filename: 'datastore/datafile.json', autoload: true })
const Settings = new Datastore({ filename: 'datastore/settings.json', autoload: true })
console.log('SUCCESS: created Datastore')

export {
  Files,
  Settings
}
