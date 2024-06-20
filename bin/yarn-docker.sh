#!/usr/bin/env node

'use strict';

var shell = require('shelljs');

if (shell.exec(`solana-docker-shell exec "yarn ${process.argv.slice(2).join(' ')}"`).code !== 0) {
  shell.echo('Error: yarn command failed');
  shell.exit(1);
}