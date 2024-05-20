#!/usr/bin/env node

'use strict';

var shell = require('shelljs');

if (shell.exec(`solana-test-validator-docker exec "anchor ${process.argv.slice(2).join(' ')}"`).code !== 0) {
  shell.echo('Error: anchor command failed');
  shell.exit(1);
}