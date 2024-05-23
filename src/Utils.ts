import * as fs from 'fs-extra';
import * as path from 'path';

export interface IConfig {
    projectRootPath: string;
    containerName: string;
    imageName: string;
    uid?: number;
}

const SOLANA_DOCKER_RC = '.solrc';

async function findConfigFile(directory: string): Promise<string> {
    const parentPath = path.dirname(directory);
    if (parentPath === directory) {
        throw new Error(`${SOLANA_DOCKER_RC} configuration file not found`);
    }
    // path must be absolute
    if (!path.isAbsolute(directory)) {
        throw new Error(`Path must be absolute: ${directory}`);
    }
    const configPath: string = path.join(directory, SOLANA_DOCKER_RC);
    if (await fs.pathExists(configPath)) {
        return configPath;
    }
    return findConfigFile(path.dirname(directory));
}

export async function loadConfig(): Promise<IConfig> {
    const configPath: string = await findConfigFile(process.cwd());
    const config: IConfig = fs.readJsonSync(configPath);
    return {
        projectRootPath: path.normalize(path.dirname(configPath)).replace(/\/?$/, ''),
        imageName: config.imageName,
        containerName: config.containerName,
        uid: config.uid,
    };
}

export async function initConfig(): Promise<void> {
    const configPath = path.join(process.cwd(), SOLANA_DOCKER_RC);
    if (await fs.pathExists(configPath)) {
        throw new Error(`${SOLANA_DOCKER_RC} file already exists !`);
    }
    await fs.writeFile(configPath, JSON.stringify({
        imageName: 'tchambard/solana-test-validator:latest',
        containerName: 'solana-test-validator',
    }, null, 2));
}
