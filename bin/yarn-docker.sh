#!/usr/bin/env node

'use strict';
console.log("AAA")
var shell = require('shelljsxxx');

if (shell.exec(`solana-test-validator-docker exec "yarn ${process.argv.slice(2)}"`).code !== 0) {
  shell.echo('Error: yarn command failed');
  shell.exit(1);
}