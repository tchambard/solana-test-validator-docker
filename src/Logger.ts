import * as colors from 'colors';
import * as _ from 'lodash';
import * as memoryStreams from 'memory-streams';

export enum Verbosity {
    Log = 1,
    Info,
    Warning,
    Error,
}

export class Logger {

    public static print(message: string = '', color: string = 'white'): void {
        // eslint-disable-next-line no-console
        console.log(colors[color](message));
    }

    public verbosity: Verbosity;
    public prefix: string = '';
    protected _stdio: { stdout: NodeJS.WritableStream };

    constructor(verbosity: Verbosity = Verbosity.Info) {
        this.verbosity = verbosity;
        this._stdio = {
            stdout: new memoryStreams.WritableStream(),
        };
    }

    public printError(message: string = ''): void {
        (this.verbosity <= Verbosity.Error) && this.print(colors.red(message));
    }

    public printLog(message: string = '', color: string = 'reset'): void {
        (this.verbosity <= Verbosity.Log) && this.print(colors[color](message));
    }

    public printInfo(message: string = '', color: string = 'cyan'): void {
        (this.verbosity <= Verbosity.Info) && this.print(colors[color](message));
    }

    public printWarning(message: string = ''): void {
        (this.verbosity <= Verbosity.Warning) && this.print(colors.yellow(message));
    }

    public flushOuput(): void {
        // eslint-disable-next-line @typescript-eslint/no-base-to-string
        const rawOutput = _.trimEnd(this._stdio.stdout.toString());
        // eslint-disable-next-line no-console
        rawOutput && console.log(this.formatOutput(rawOutput));
    }

    protected formatOutput(message: string): string {
        const prefix = colors.grey(this.padPrefix(this.prefix));
        return prefix + _.join(_.split(message, '\n'), `\n${prefix}`);
    }

    protected padPrefix(prefix: string): string {
        return prefix ? `${_.padEnd(prefix, 0)} | ` : '';
    }

    private print(message: string): void {
        this._stdio.stdout.write(message + '\n', 'utf-8');
    }
}
