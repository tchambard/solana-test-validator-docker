FROM node:22-bookworm-slim

ENV VERSION_LIB_SSL=2.22
ENV VERSION_YARN=4.2.2
ENV VERSION_SOLANA=1.18.22
ENV VERSION_ANCHOR=0.30.1
ENV VERSION_LIGHTPROTOCOL=0.22.0
ENV VERSION_PHOTON_INDEXER=0.50.0

RUN apt update && apt upgrade -y
RUN DEBIAN_FRONTEND=noninteractive TZ=Etc/UTC apt install -y bash bzip2 curl gcc-multilib build-essential autoconf automake libtool zlib1g-dev git libssl-dev pkg-config wget procps libudev-dev llvm libclang-dev protobuf-compiler
 
# Install yarn
RUN corepack enable && yarn set version $VERSION_YARN

# Setup permissions on opt and working dir
RUN mkdir /working_dir
RUN chown node:node /opt
RUN chown node:node /working_dir

# Configure npm pour installer globalement dans un répertoire accessible
RUN mkdir -p /opt/.npm-global
RUN chown -R node:node /opt/.npm-global
ENV NPM_CONFIG_PREFIX=/opt/.npm-global

USER node
ENV PATH=/opt/.npm-global/bin:$PATH
WORKDIR /opt

# # Install rust
ENV RUSTUP_HOME=/opt/.rust
ENV CARGO_HOME=/opt/.cargo
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y -q
ENV PATH=$CARGO_HOME/bin:$PATH

# # Install solana
RUN sh -c "$(curl -sSfL https://release.anza.xyz/v${VERSION_SOLANA}/install)"
ENV PATH=/home/node/.local/share/solana/install/active_release/bin:$PATH

# Install anchor and light-protocol
RUN npm i -g @coral-xyz/anchor-cli@$VERSION_ANCHOR @lightprotocol/zk-compression-cli@$VERSION_LIGHTPROTOCOL

# Install photon indexer
RUN cargo install photon-indexer --version $VERSION_PHOTON_INDEXER --locked

# Prepare working directory
WORKDIR /working_dir

# Disable strict mode on corepack
ENV COREPACK_ENABLE_STRICT=0

# Setup configuration
RUN solana config set -ud
RUN solana-keygen new --no-bip39-passphrase -s -o ~/.config/solana/id.json &&\
    solana config set --url localhost --keypair ~/.config/solana/id.json