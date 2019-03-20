# Vyper contract GUI

A simple [electron](https://electronjs.org/) app for compiling and interacting with smart contracts written in [vyper](https://github.com/ethereum/vyper).

![Screenshot01](./assets/screenshots/01.png?raw=true "Screenshot01")

## Installation
Initialize submodules ([vyper](https://github.com/ethereum/vyper))
```bash
# clone repository
$ git clone

# enter project folder
$ cd vyper-electron-gui

# install submodules
$ git submodule init
$ git submodule update

# install dependencies
$ npm install
```
Note: Prerequisite is a working installation of [vyper](https://vyper.readthedocs.io/en/latest/installing-vyper.html)

## Getting started
Open two terminals:

### 1. Terminal:
```bash
# start local vyper server (for compiling .vy contracts)
$ sh ./start-vyper-server.sh
```

### 2. Terminal:
```bash
# start app
$ npm run dev
```

## Screenshots
![Screenshot02](./assets/screenshots/02.png?raw=true "Screenshot02")
![Screenshot03](./assets/screenshots/03.png?raw=true "Screenshot03")
![Screenshot04](./assets/screenshots/04.png?raw=true "Screenshot04")

## Developers
### Build executable apps for mac/win/linux
```bash
# executables are saved in ./builds
$ npm run package-mac
$ npm run package-win
$ npm run package-linux
```

### Generate icons
- mac (icns): [link](https://itunes.apple.com/de/app/image2icon-make-your-icons/id992115977?l=en&mt=12)
- win (.icns -> .ico): [link](https://convertico.com/)
- png: [link](https://convertico.com/ico-to-png/)

### Run project formatters
```bash
# javascript
$ standard
# scss
$ csscomb src/styles/
```

### Log browser console output in nodejs console
```bash
$ export ELECTRON_ENABLE_LOGGING=true
```

## TODO's
* [ ] add [event logging](https://github.com/plasma-group/watch-eth)

## License
This project is released under the MIT license.
