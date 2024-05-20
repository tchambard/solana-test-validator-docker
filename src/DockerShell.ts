import { execSync } from 'node:child_process';
import * as path from 'node:path';

import { Logger } from './Logger';
import { Processor } from './Processor';
import { IConfig } from './Utils';

const WORKING_DIR = '/working_dir';

export class DockerShell {
    private readonly logger: Logger;
    private readonly processor: Processor;
    private readonly config: IConfig;

    constructor(logger: Logger, config: IConfig) {
        this.logger = logger;
        this.processor = new Processor(logger);
        this.config = config;
    }

    public async exec(command: string): Promise<void> {
        const containerName = this.config.containerName;

        if (await this.containerExists(this.config.containerName)) {
            try {
                const workingDir = path.relative(this.config.projectRootPath, process.cwd());
                const uid = this.config.uid || `$(id -u \${USER})`;
                const gid = 1000;
                const attachCommand = `docker exec ${process.stdout.isTTY ? '-ti' : '-t'} ` +
                    `-u ${uid}:${gid} ` +
                    `-w="${path.join(WORKING_DIR, workingDir)}" "${containerName}" sh -c '${command}'`;
                this.logger.printLog(attachCommand);
                execSync(attachCommand, {
                    stdio: [0, 1, 2],
                });
            } catch (e) {
                this.logger.printLog(`Container exited with code ${e.status}`);
                this.logger.flushOuput();
                process.exit(e.status);
            }
            return;
        }
        this.logger.printError(`Container ${this.config.containerName} is not running !`);
    }

    public async start(detached: boolean): Promise<void> {
        if (!(await this.containerExists(this.config.containerName))) {
            const uid = this.config.uid || `$(id -u \${USER})`;
            const gid = 1000;
            const launchCommand = `docker run ${detached ? '-d' : `${process.stdout.isTTY ? '-ti' : '-t'}`} --rm --name "${this.config.containerName}" ` +
                `--net=host ` +
                `-e TZ=${Intl.DateTimeFormat().resolvedOptions().timeZone} ` +
                `-u ${uid}:${gid} ` +
                `-v ${this.config.projectRootPath}:${WORKING_DIR} ${this.config.imageName} ` +
                `bash`;

            try {
                this.logger.printLog(launchCommand);
                execSync(launchCommand, { stdio: [0, 1, 2] });
            } catch (e) {
                this.logger.printLog(`Container exited with code ${e.status}`);
                this.logger.flushOuput();
                process.exit(e.status);
            }
            return;
        }
        this.logger.printError(`Container ${this.config.containerName} is already running !`);
    }

    public async stop(): Promise<void> {
        if (await this.containerExists(this.config.containerName)) {
            const launchCommand = `docker stop "${this.config.containerName}"`;
            try {
                this.logger.printLog(launchCommand);
                execSync(launchCommand, { stdio: [0, 1, 2] });
            } catch (e) {
                this.logger.printLog(`Container exited with code ${e.status}`);
                this.logger.flushOuput();
                process.exit(e.status);
            }
            return;
        }
        this.logger.printWarning(`Container ${this.config.containerName} is already stopped !`);
    }

    private async containerExists(containerName: string): Promise<boolean> {
        try {
            // check if the container is already running
            await this.processor.execAndReturn(`docker container inspect "${containerName}"`);
            return true;
        } catch (e) {
            // continue, docker $containerName not exist
            return false;
        }
    }
}
