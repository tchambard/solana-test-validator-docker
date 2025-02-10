#!/usr/bin/env node

'use strict';

var shell = require('shelljs');

if (shell.exec(`solana-docker-shell exec "light test-validator"`).code !== 0) {
  shell.echo('Error: light test-validator command failed');
  shell.exit(1);
}