# Vyper Contract GUI

A simple and easy to use interface for compiling and interacting with [Vyper](https://github.com/ethereum/vyper) contracts.

![Vyper_Contract_GUI_01](./resources/screenshots/01.png?raw=true 'Vyper_Contract_GUI_01')

## Installation

```bash
# clone repository
$ git clone

# enter project folder
$ cd Vyper-Contract-GUI

# install submodules (vyper)
$ git submodule init
$ git submodule update

# install dependencies
$ yarn install
```

Note: Prerequisite is a working [installation of vyper](https://vyper.readthedocs.io/en/latest/installing-vyper.html)

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
$ yarn run dev
```

## Screenshots

![Vyper_Contract_GUI_02](./resources/screenshots/02.png?raw=true 'Vyper_Contract_GUI_02')
![Vyper_Contract_GUI_03](./resources/screenshots/03.png?raw=true 'Vyper_Contract_GUI_03')
![Vyper_Contract_GUI_04](./resources/screenshots/04.png?raw=true 'Vyper_Contract_GUI_04')

## Build app for macOS, Windows and Linux

```bash
$ yarn run package-all
```

## Notes

- [nedb update/delete](https://stackoverflow.com/questions/32038709/nedb-method-update-and-delete-creates-a-new-entry-instead-updating-existing-one)
- Use `web3` version `1.0.0-beta.37`!
