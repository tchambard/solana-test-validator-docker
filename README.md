# Develop on Solana easily with Docker

Do not install Rust, Solana and Anchor on the developer machine.
Also bring ZK compression with light-protocol
You only need to install Docker.

[dockerhub](https://hub.docker.com/r/tchambard/solana-test-validator)

# Installation

```sh
npm install -g solana-test-validator-docker
```

# Usage

## Initialize .solrc configuration file

In order to mount a docker volume, a `.solrc` configuration file needs to be created in the folder you want to be mounted.

```json
{
  "imageName": "tchambard/solana-test-validator:latest",
  "containerName": "solana-test-validator"
}
```

The following command will create it.

```sh
solana-docker-shell init
```

## Start container

Start the container. The directory where this command is executed must be somewhere in the project directory containing `.solrc` file

```sh
solana-docker-shell start
```


## Stop container

```sh
solana-docker-shell stop
```

## Volumes

When starting the container, three volumes are mounted:

- solana-docker:/opt
  Every tools needed are installed in `/opt` and mounted to named volume `solana-docker`.
  This volume makes rust/cargo installations and builds caches persistent.

- solana-docker-cache:/home/node/.cache
  Some solana caches are stored in user home directory `/home/node/.cache` and mounted to named volume `solana-docker-cache`.
  This volume makes solana caches persistent.

- ${.solrc_directory}:/working_dir
  When running `solana-docker-shell init`, a configuration file `.solrc` is created. The directory containing this file is mounted to `/working_dir`.

## How to execute a command inside solana-test-validator container

```sh
solana-docker-shell exec "solana-test-validator --ledger ~/.config/solana/.ledger -r --bind-address 0.0.0.0 --rpc-port 8899"
solana-docker-shell exec "light-test-validator"
solana-docker-shell exec "anchor --version"
solana-docker-shell exec "anchor build"
solana-docker-shell exec "cargo --version"
solana-docker-shell exec "yarn --version"
solana-docker-shell exec "solana --version"
solana-docker-shell exec "solana balance"
solana-docker-shell exec "solana airdrop 2"
...
```

But simplier, you can also use directly these commands:

```sh
# Launch solana-test-validator. Any options of classic command solana-test-validator are supported...
solana-test-validator-docker --ledger ~/.config/solana/.ledger -r --bind-address 0.0.0.0 --rpc-port 8899
# Launch light protocol + photon
light-test-validator-docker

# Use anchor
anchor-docker --version
anchor-docker build
...

# or cargo
cargo-docker --version
cargo-docker build
...

# or yarn
yarn-docker --version
yarn-docker install
...

# or solana
solana-docker --version
solana-docker balance
solana-docker airdrop 2

# or light cli
light-docker --version
light-docker init
...
```
