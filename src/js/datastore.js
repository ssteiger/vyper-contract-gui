const Datastore = require('nedb')

// make name more descriptive -> files
const Files = new Datastore({ filename: 'datastore/datafile.json', autoload: true })
const Settings = new Datastore({ filename: 'datastore/settings.json', autoload: true })
