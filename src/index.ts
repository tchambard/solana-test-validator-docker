/* eslint-disable no-console */

import * as exeunt from 'exeunt';
import * as _ from 'lodash';
import * as yargs from 'yargs';

import { DockerShell } from './DockerShell';
import { Logger, Verbosity } from './Logger';
import { initConfig, loadConfig } from './Utils';

type YargsGlobalArgs = {
    verbosity: Verbosity;
};

(async (): Promise<void> => {
    const logger = new Logger();
    let dockerShell: DockerShell;

    const _argv = await yargs
        .middleware(async (argv: yargs.Arguments<YargsGlobalArgs>) => {
            logger.verbosity = (argv.verbosity);

            if (argv._[0] !== 'init') {
                try {
                    const config = await loadConfig();
                    logger.prefix = config.containerName;
                    dockerShell = new DockerShell(logger, config);
                } catch (e) {
                    logger.printError(e.message);
                    logger.flushOuput();
                    process.exit(1);
                }
            }
        })
        .command('init', 'Initialize configuration file in current directory',
            () => _.noop(), async () => {
                try {
                    await initConfig();
                } catch (e) {
                    logger.printError(e.message);
                }
            })
        .command('exec [command]', 'Exec command on docker container',
            () => _.noop(), async (argv: yargs.Arguments) => {
                await dockerShell.exec(argv.command as string);
            })
        .command('start', 'Start solana-test-validator docker container',
            () => _.noop(), async () => {
                await dockerShell.start();
            })
        .command('stop', 'Stop solana-test-validator docker container',
            () => _.noop(), async () => {
                await dockerShell.stop();
            })
        .option('v', {
            alias: 'verbosity',
            describe: 'Verbosity (1=log, 2=info, 3=warning, 4=error)',
            type: 'number',
            default: Verbosity.Info,
        })
        .usage('Usage: $0 <command>')
        .strict(false)
        .version(false)
        .help('help')
        .showHelpOnFail(false)
        .locale('en')
        .argv;

    logger.flushOuput();
    if (!(_argv as yargs.Arguments)._.length) {
        Logger.print('You must specify one action', 'red');
        yargs.showHelp();
        exeunt(1);
    }
})().catch((e) => {
    Logger.print(e.stack);
    exeunt(1);
});
