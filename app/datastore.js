import { remote } from 'electron';

// https://stackoverflow.com/questions/52900791/nedb-with-vue-electron-couldnt-save-local-db-file
const Files = remote.getGlobal('Files');
const Settings = remote.getGlobal('Settings');

export { Files, Settings };
