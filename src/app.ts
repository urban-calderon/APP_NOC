import { Server } from './presentation/server';
import { LogModel, MongoDatabase } from './data/mongo';
import { envs } from './config/plugins/envs.plugin';

(async() => {
    main();
})();

async function main() {
    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME,
    });
    
    Server.start();

    //Crear una colección = tables, documento = registro
    /* const newLog = await LogModel.create({
        message: 'Test message desde mongo',
        origin: 'App.ts',
        level: 'low'
    });

    await newLog.save();
    console.log(newLog); */
    
    
}