FROM ubuntu:24.04

ENV VERSION_LIB_SSL=2.22
ENV VERSION_NODE=20.x
ENV VERSION_YARN=4.2.1
ENV VERSION_SOLANA=1.18.12
ENV VERSION_ANCHOR=0.30.0

RUN apt update && apt upgrade -y
RUN DEBIAN_FRONTEND=noninteractive TZ=Etc/UTC apt install -y bash sudo bzip2 curl gcc-multilib git libssl-dev pkg-config wget

RUN adduser --disabled-password --gecos "" --uid 1001 runner \
    && groupadd docker --gid 123 \
    && usermod -aG ubuntu runner \
    && usermod -aG sudo runner \
    && usermod -aG docker runner \
    && echo "%sudo   ALL=(ALL:ALL) NOPASSWD:ALL" > /etc/sudoers \
    && echo "Defaults env_keep += \"DEBIAN_FRONTEND\"" >> /etc/sudoers

# Install nodejs
RUN curl -fsSL https://deb.nodesource.com/setup_${VERSION_NODE} | bash -
RUN apt-get install -y nodejs
RUN npm i -g yarn && corepack enable && yarn set version ${VERSION_YARN}

# Install libssl
RUN wget http://nz2.archive.ubuntu.com/ubuntu/pool/main/o/openssl/libssl1.1_1.1.1f-1ubuntu${VERSION_LIB_SSL}_amd64.deb
RUN dpkg -i libssl1.1_1.1.1f-1ubuntu${VERSION_LIB_SSL}_amd64.deb

USER ubuntu
WORKDIR /toolbox

RUN chmod 775 -R /toolbox

ENV SOLANA_HOME=/toolbox/solana-release
ENV CARGO_HOME=/toolbox/.cargo
ENV RUSTUP_HOME=/toolbox/.rust
ENV PATH=$PATH:/toolbox/.cargo/bin

# Install rust
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y -q

# Install solana
RUN wget -o solana-release.tar.bz2 https://github.com/solana-labs/solana/releases/download/v${VERSION_SOLANA}/solana-release-x86_64-unknown-linux-gnu.tar.bz2
RUN tar jxf solana-release-x86_64-unknown-linux-gnu.tar.bz2
RUN rm solana-release-x86_64-unknown-linux-gnu.tar.bz2

ENV PATH=$CARGO_HOME/bin:$SOLANA_HOME/bin:$PATH

RUN solana config set -ud

# Install anchor
RUN cargo install --git https://github.com/project-serum/anchor --tag v${VERSION_ANCHOR} anchor-cli

ENV PATH=$CARGO_HOME/bin:$SOLANA_HOME/bin:$PATH

# Setup configuration
RUN solana-keygen new --no-bip39-passphrase -s -o /toolbox/.config/solana/id.json &&\
    solana config set --url localhost --keypair /toolbox/.config/solana/id.json

RUN chmod 775 -R /toolbox/.cargo/bin
RUN chmod 775 -R /toolbox/solana-release/bin
RUN chmod 775 -R /toolbox/.config

# Launch solana-test-validator
ENTRYPOINT solana-test-validator --ledger /toolbox/.config/solana/.ledger && sh