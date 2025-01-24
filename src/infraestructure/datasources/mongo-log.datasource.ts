import { LogModel } from "../../data/mongo";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogDatasource } from "../../domain/datasources/log.datasource";


export class MongoLogDatasource implements LogDatasource {
    async saveLog( log: LogEntity ): Promise<void> {
        
        const newLog = await LogModel.create(log)
        console.log('Mongo Log created', newLog.id);
        
    }
    async getLogs( severityLevel: LogSeverityLevel ): Promise<LogEntity[]> {
        
        const logs = await LogModel.find({
            level: severityLevel
        });

        return logs.map(LogEntity.fromObject);
    }
}