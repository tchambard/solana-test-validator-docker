#!/usr/bin/env node

'use strict';

var shell = require('shelljs');

if (shell.exec(`solana-docker-shell exec "solana-test-validator --ledger /opt/.config/solana/.ledger -r --bind-address 0.0.0.0 --rpc-port 8899"`).code !== 0) {
  shell.echo('Error: solana-test-validator command failed');
  shell.exit(1);
}