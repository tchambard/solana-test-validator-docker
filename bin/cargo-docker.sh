#!/usr/bin/env node

'use strict';

var shell = require('shelljs');

if (shell.exec(`solana-docker-shell exec "cargo ${process.argv.slice(2).join(' ')}"`).code !== 0) {
  shell.echo('Error: cargo command failed');
  shell.exit(1);
}