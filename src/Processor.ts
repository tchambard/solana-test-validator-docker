import * as _ from 'lodash';
import { spawn } from 'node:child_process';
import * as os from 'node:os';

import { Logger } from './Logger';

const shell = (os.platform() === 'win32') ? process.env.ComSpec : '/bin/sh';

export class ExecError extends Error {
    public code: number;
    public output: string;

    constructor(message: string, code: number, output: string = '') {
        super(message);
        this.code = code;
        this.output = output;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class Processor {

    protected logger: Logger;

    constructor(logger: Logger) {
        this.logger = logger;
    }

    public async execAndReturn(cmd: string, cwd: string = process.cwd()): Promise<string> {
        this.logger.printLog(`Execute command: '${cmd}' in directory '${cwd}'`);
        const res = await this.fexec(cmd, { cwd, shell, encoding: 'utf8' }, false);
        return _.trimEnd(res);
    }

    private async fexec(cmd: string, options: object = {}, stdio: boolean = false): Promise<string> {
        return new Promise((resolve, reject) => {
            const spawnCmd = cmd.split(' ');
            const proc = spawn(spawnCmd[0], _.slice(spawnCmd, 1), options);
            let output = '';
            const onOutput = (data: Buffer): void => {
                output += data.toString();
                if (stdio && output.endsWith('\n')) {
                    this.logger.printLog(_.trimEnd(output), 'grey');
                    output = '';
                }
            };
            proc.stdout && proc.stdout.on('data', onOutput);
            proc.stderr && proc.stderr.on('data', onOutput);

            proc.on('close', (code) => {
                if (code !== 0) {
                    reject(new ExecError(`Command '${cmd}' failed with code ${code}`, code || -1, output));
                }
                resolve(output);
            });
        });
    }
}
