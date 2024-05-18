FROM ubuntu:22.04

ENV VERSION_LIB_SSL=2.22
ENV VERSION_NODE=20.x
ENV VERSION_YARN=4.2.1
ENV VERSION_SOLANA=1.18.12
ENV VERSION_ANCHOR=0.30.0

RUN apt update && apt upgrade -y
RUN DEBIAN_FRONTEND=noninteractive TZ=Etc/UTC apt install -y bash bzip2 curl gcc-multilib git libssl-dev pkg-config wget

# Install nodejs
RUN curl -fsSL https://deb.nodesource.com/setup_${VERSION_NODE} | bash -
RUN apt-get install -y nodejs
RUN npm i -g yarn && corepack enable && yarn set version ${VERSION_YARN}

# Install rust
RUN apt update && apt upgrade -y
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y -q

# Install libssl
RUN wget http://nz2.archive.ubuntu.com/ubuntu/pool/main/o/openssl/libssl1.1_1.1.1f-1ubuntu${VERSION_LIB_SSL}_amd64.deb
RUN dpkg -i libssl1.1_1.1.1f-1ubuntu${VERSION_LIB_SSL}_amd64.deb

# Install solana
RUN wget -o solana-release.tar.bz2 https://github.com/solana-labs/solana/releases/download/v${VERSION_SOLANA}/solana-release-x86_64-unknown-linux-gnu.tar.bz2
RUN tar jxf solana-release-x86_64-unknown-linux-gnu.tar.bz2
RUN mv solana-release /root/solana-release
ENV HOME=/root
ENV PATH=$HOME/.cargo/bin:$HOME/solana-release/bin:$PATH
RUN solana config set -ud

# Install anchor
RUN cargo install --git https://github.com/project-serum/anchor --tag v${VERSION_ANCHOR} anchor-cli

# Launch solana-test-validator
ENTRYPOINT solana-keygen new --no-bip39-passphrase -s -o $HOME/.config/solana/id.json &&\
    solana config set --url localhost --keypair $HOME/.config/solana/id.json &&\
    solana-test-validator --ledger ~/.config/solana/.ledger &&\
    sh