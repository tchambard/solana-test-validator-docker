FROM ubuntu:24.04

ENV VERSION_LIB_SSL=2.22
ENV VERSION_NODE=20.13.1
ENV VERSION_YARN=4.2.1
ENV VERSION_SOLANA=1.18.12
ENV VERSION_ANCHOR=0.30.0

RUN apt update && apt upgrade -y
RUN DEBIAN_FRONTEND=noninteractive TZ=Etc/UTC apt install -y bash bzip2 curl gcc-multilib git libssl-dev pkg-config wget

RUN USER=ubuntu && \
    GROUP=ubuntu && \
    curl -SsL https://github.com/boxboat/fixuid/releases/download/v0.6.0/fixuid-0.6.0-linux-amd64.tar.gz | tar -C /usr/local/bin -xzf - && \
    chown root:root /usr/local/bin/fixuid && \
    chmod 4755 /usr/local/bin/fixuid && \
    mkdir -p /etc/fixuid && \
    printf "user: $USER\ngroup: $GROUP" > /etc/fixuid/config.yml

USER root
WORKDIR /opt

# Install libssl
RUN wget http://nz2.archive.ubuntu.com/ubuntu/pool/main/o/openssl/libssl1.1_1.1.1f-1ubuntu${VERSION_LIB_SSL}_amd64.deb
RUN dpkg -i libssl1.1_1.1.1f-1ubuntu${VERSION_LIB_SSL}_amd64.deb
RUN rm libssl1.1_1.1.1f-1ubuntu${VERSION_LIB_SSL}_amd64.deb

# Install nodejs
ENV NODE_HOME=/opt/node-v${VERSION_NODE}-linux-x64
RUN wget https://nodejs.org/download/release/v${VERSION_NODE}/node-v${VERSION_NODE}-linux-x64.tar.gz
RUN tar -pxzf node-v${VERSION_NODE}-linux-x64.tar.gz --no-same-owner
RUN rm node-v${VERSION_NODE}-linux-x64.tar.gz
ENV PATH=$NODE_HOME/bin:$PATH

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

# Install anchor
RUN npm i -g @coral-xyz/anchor-cli@$VERSION_ANCHOR

USER ubuntu
WORKDIR /home/ubuntu

ENV PATH=$NODE_HOME/bin:$CARGO_HOME/bin:$SOLANA_HOME/bin:$PATH

# Prepare working directory
RUN mkdir $HOME/working_dir

# Setup configuration
ENV SOLANA_CONFIG=/home/ubuntu/.config/solana
RUN solana config set -ud
RUN solana-keygen new --no-bip39-passphrase -s -o $SOLANA_CONFIG/id.json &&\
    solana config set --url localhost --keypair $SOLANA_CONFIG/id.json

# Launch solana-test-validator
ENTRYPOINT fixuid && solana-test-validator --ledger $SOLANA_CONFIG/.ledger && sh