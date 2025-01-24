import { MongoLogDatasource } from '../infraestructure/datasources/mongo-log.datasource';
import { CheckService } from '../domain/use-cases/checks/check-service';
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';
import { FileSystemDatasource } from '../infraestructure/datasources/file-system.datasource';
import { LogRepositoryImpl } from '../infraestructure/repositories/log.repository.impl';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email-service';

const logRepository = new LogRepositoryImpl(
    //new FileSystemDatasource()
    new MongoLogDatasource()
);

const emailService = new EmailService();

export class Server {

    public static start() {
        console.log('Server started....');

        // Enviar email
        // todo: Usamos el repositorio para mandar el email
       /*  new SendEmailLogs(
            emailService,
            fileSystemLogRepository
        ).execute('urbancalderon@outlook.com'); */
        //------------------------------------------
        
        // Ejemplo de enviar email con nodemailer
        /* emailService.sendEmail({
            to: 'urbancalderon@outlook.com',
            subject: 'Logs del sistema',
            htmlBody: `
                <h3>Desde logs de sistema NOC</h3>
                <p>Pariatur culpa minim eiusmod adipisicing mollit nulla veniam incididunt laboris consectetur ex esse aliqua non. Eiusmod dolor laboris pariatur et ullamco incididunt mollit voluptate ad qui elit. Aute veniam est eu fugiat</p>
            `
        }); */

        // Ejemplo para enviar un array con más de un correo
        /* emailService.sendEmailWithFileSystem(
            ['uncorreo@correo.com', 'otrocorreo@correo.com']
        ); */
        
        // Ejecucion del cronjob
        CronService.createJob(
            '*/5 * * * * *', 
            () => {
                const url = 'https://google.com67777';

                new CheckService(
                    logRepository,
                    () => console.log(`${url} is ok`),
                    ( error ) => console.log( error ),
                ).execute(url);
            }
        );
    }

}