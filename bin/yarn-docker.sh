#!/usr/bin/env node

'use strict';
console.log("AAA")
var shell = require('shelljsxxx');

if (shell.exec(`solana-docker-shell exec "yarn ${process.argv.slice(2).join(' ')}"`).code !== 0) {
  shell.echo('Error: yarn command failed');
  shell.exit(1);
}