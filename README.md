# Vyper Contract GUI
A simple and easy to use interface for compiling and interacting with [Vyper](https://github.com/ethereum/vyper) contracts.

![Screenshot01](./app/static/screenshots/01.png?raw=true "Screenshot01")

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
![Screenshot02](./app/static/screenshots/02.png?raw=true "Screenshot02")
![Screenshot03](./app/static/screenshots/03.png?raw=true "Screenshot03")
![Screenshot04](./app/static/screenshots/04.png?raw=true "Screenshot04")

### notes:
* [nedb update/delete](https://stackoverflow.com/questions/32038709/nedb-method-update-and-delete-creates-a-new-entry-instead-updating-existing-one)
* Use `web3` version `1.0.0-beta.37`!
