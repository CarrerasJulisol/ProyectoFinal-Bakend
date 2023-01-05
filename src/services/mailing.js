import mailer from 'nodemailer';
import config from '../config/config.js';

export default class MailingService {
    constructor(){
        this.client = mailer.createTransport({
            service: 'gmail',
            port: 587,
            auth: {
                user:`${config.gmail.MAILING_EMAIL}`,
                pass:`${config.gmail.MAILING_PWD}`
            }
        })
    }
    
    async changePassword({form,to,subject,html}){
        let result = await this.client.sendMail({
            form,
            to,
            subject,
            html
        })
        return result;
    }

    async newClient({form,to,subject,html,attachments=[]}){
        let result = await this.client.sendMail({
            form,
            to,
            subject,
            html,
            attachments
        })
        return result;
    }
}