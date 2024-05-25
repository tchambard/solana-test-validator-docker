FROM node:20-bookworm-slim

ENV VERSION_LIB_SSL=2.22
ENV VERSION_YARN=4.2.1
ENV VERSION_SOLANA=1.18.12
ENV VERSION_ANCHOR=0.30.0

RUN apt update && apt upgrade -y
RUN DEBIAN_FRONTEND=noninteractive TZ=Etc/UTC apt install -y bash bzip2 curl gcc-multilib git libssl-dev pkg-config wget

# Install yarn
RUN corepack enable && yarn set version $VERSION_YARN

# Install anchor
RUN npm i -g @coral-xyz/anchor-cli@$VERSION_ANCHOR

# Setup permissions on working dir
RUN chown node:node /opt

USER node
WORKDIR /opt

# Install rust
ENV RUSTUP_HOME=/opt/.rust
ENV CARGO_HOME=/opt/.cargo
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y -q
ENV PATH=$CARGO_HOME/bin:$PATH

# Install solana
ENV SOLANA_HOME=/opt/solana-release
RUN wget https://github.com/solana-labs/solana/releases/download/v${VERSION_SOLANA}/solana-release-x86_64-unknown-linux-gnu.tar.bz2
RUN tar jxf solana-release-x86_64-unknown-linux-gnu.tar.bz2 --no-same-owner
RUN rm solana-release-x86_64-unknown-linux-gnu.tar.bz2
ENV PATH=$SOLANA_HOME/bin:$PATH

# Prepare working directory
RUN mkdir /opt/working_dir

# Setup configuration
RUN solana config set -ud
RUN solana-keygen new --no-bip39-passphrase -s -o /opt/.config/solana/id.json &&\
    solana config set --url localhost --keypair /opt/.config/solana/id.json

# Launch solana-test-validator
ENTRYPOINT solana-test-validator --ledger ~/.config/solana/.ledger && sh