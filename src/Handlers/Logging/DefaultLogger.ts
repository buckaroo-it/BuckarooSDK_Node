import { createLogger, transports } from 'winston';

export class DefaultLogger {
    private logger;

    constructor() {
        this.logger = createLogger({
            transports: [
                new transports.Console(),
                new transports.File({ filename: 'logs/error.log', level: 'error' }),
                new transports.File({ filename: 'logs/combined.log' }),
            ],
        });
    }

    public emergency(message: string, context: any = {}) {
        this.logger.log({ level: 'emergency', message, ...context });
    }

    public alert(message: string, context: any = {}) {
        this.logger.log({ level: 'alert', message, ...context });
    }

    public critical(message: string, context: any = {}) {
        this.logger.log({ level: 'critical', message, ...context });
    }

    public error(message: string, context: any = {}) {
        this.logger.log({ level: 'error', message, ...context });
    }

    public warning(message: string, context: any = {}) {
        this.logger.log({ level: 'warning', message, ...context });
    }

    public notice(message: string, context: any = {}) {
        this.logger.log({ level: 'notice', message, ...context });
    }

    public info(message: string, context: any = {}) {
        this.logger.log({ level: 'info', message, ...context });
    }

    public debug(message: string, context: any = {}) {
        this.logger.log({ level: 'debug', message, ...context });
    }
}
