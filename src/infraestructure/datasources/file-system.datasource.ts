import fs from 'fs';
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

export class FileSystemDatasource implements LogDatasource {
    private readonly logPath        = 'logs/';
    private readonly allLogsPath    = 'logs/logs-all.log';
    private readonly mediumLogsPath = 'logs/logs-medium.log';
    private readonly highLogsPath   = 'logs/logs-high.log';

    constructor() {
        this.createLogsFiles();
    }

    /*
        Función para crear los archivos y verificación en caso de que las
        carpetas de los archivos no existan
    */
    private createLogsFiles = () => {

        // Verificamos que la carpeta logPath exista!
        if( !fs.existsSync( this.logPath )) {

            // Si no existe creamos la carpeta de logs
            fs.mkdirSync( this.logPath );
        }

        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath,
        ].forEach( path => {

            if ( fs.existsSync( path )) return;
                fs.writeFileSync( path, '');
        })
    }

    async saveLog( newLog: LogEntity ): Promise<void> {
        const logAsJson = `${ JSON.stringify(newLog)}\n`;

        // Grabamos todos los logs no importa su tipo en la carpeta logs-all
        fs.appendFileSync( this.allLogsPath, logAsJson);

        // Verificamos el tipo de log y lo guardamos en su respectiva carpeta
        if ( newLog.level === LogSeverityLevel.low ) return;

        if ( newLog.level === LogSeverityLevel.medium ) {
            fs.appendFileSync( this.mediumLogsPath, logAsJson);

        } else {
            fs.appendFileSync( this.highLogsPath, logAsJson)
        }
    }

    private getLogsFromFile = ( path: string ): LogEntity[] => {
        const content = fs.readFileSync(path, 'utf-8');
        const logs = content.split('\n').map(
            log => LogEntity.fromJson(log)
        );

        return logs;
    }

    async getLogs( severityLevel: LogSeverityLevel ): Promise<LogEntity[]> {
        switch ( severityLevel) {
            case LogSeverityLevel.low:
                return this.getLogsFromFile(this.allLogsPath);

            case LogSeverityLevel.medium:
                return this.getLogsFromFile(this.mediumLogsPath);

            case LogSeverityLevel.high:
                return this.getLogsFromFile(this.highLogsPath);
            
        
            default:
                throw new Error(`${ severityLevel } not implement`);
        }
    }

    
}