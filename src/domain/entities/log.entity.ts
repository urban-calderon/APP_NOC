export enum LogSeverityLevel {
    low    = 'low',
    medium = 'medium',
    high   = 'high',
}

export interface LogEntityOptions {
    level: LogSeverityLevel; //Enum
    message: string;
    createdAt?: Date;
    origin: String;
}

export class LogEntity {

    public level: LogSeverityLevel; //Enum
    public message: string;
    public createdAt: Date;
    public origin: String;

    constructor( options: LogEntityOptions ) {

        const { level, message, origin, createdAt = new Date() } = options;

        this.message = message;
        this.level = level;
        this.createdAt = createdAt;
        this.origin = origin;
    }

    static fromJson = ( json: string ): LogEntity => {
        const { message, level, createdAt } = JSON.parse(json)

        const log = new LogEntity({
            message: message,
            level: level,
            createdAt: createdAt,
            origin: 'log.entity.ts'
        });

        return log;
    }

    static fromObject = ( object: { [key: string]: any } ): LogEntity => {

        const { message, level, createdAt, origin } = object;
        
        const log = new LogEntity({
            message, level, createdAt, origin
        });

        return log;
    }
}

