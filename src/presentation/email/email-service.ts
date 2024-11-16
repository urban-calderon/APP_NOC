import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments ?: Attachement[];
}

interface Attachement {
    filename: string;
    path: string;
}

export class EmailService {

    constructor() {}
    
    // TODO 1: Resolver la deduda tecnica de la dependencia oculta y pasar esto hacia el constructor
    // TODO 2: Crear un nuevo caso de uso para crear los logs
    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY,
        }
    });


    async sendEmail(options: SendMailOptions):Promise<boolean> {
        
        const { to, subject, htmlBody, attachments = [] } = options;

        try {
            const setInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachments 
            });
            console.log('Email enviado')
            //console.log(setInformation);
            return true;
        } catch (error) {
            console.log('hubo un error: ', error);
            return false;
        }
    }

    async sendEmailWithFileSystem( to: string | string[] ) {
        const subject = 'Logs del servidor';
        const htmlBody = `
            <h3>Logs del sistema NOC</h3>
            <p>Reprehenderit tempor in officia elit occaecat in Lorem minim ipsum et incididunt. Ad consequat</p>
            <p>Ver logs adjuntos</p>
        `;

        const attachments: Attachement[] = [
            { filename: 'logs-all.log', path: './logs/logs-all.log'},
            { filename: 'logs-high.log', path: './logs/logs-high.log'},
            { filename: 'logs-medium.log', path: './logs/logs-medium.log'},
        ];

        return this.sendEmail({to, subject, htmlBody, attachments});
    }
}