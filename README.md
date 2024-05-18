# Develop on Solana easily with Docker

Do not install Rust, Solana and Anchor on the developer machine.
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
solana-test-validator-docker init
```

## Start solana-test-validator container

Start the container. The directory where this command is executed must be somewhere in the project directory containing `.solrc` file

```sh
solana-test-validator-docker start
```


## Stop solana-test-validator container

```sh
solana-test-validator-docker stop
```


## Execute a command inside solana-test-validator container

```sh
solana-test-validator-docker exec "anchor --version"
solana-test-validator-docker exec "anchor build"
solana-test-validator-docker exec "cargo --version"
solana-test-validator-docker exec "yarn --version"
solana-test-validator-docker exec "solana --version"
solana-test-validator-docker exec "solana balance"
solana-test-validator-docker exec "solana airdrop 2"
...
```

But simplier, you can also use directly these commands:

```sh
anchor-docker --version
anchor-docker build
cargo-docker --version
yarn-docker --version
solana-docker --version
solana-docker balance
solana-docker airdrop 2
...
```

#