import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class MailService {
    private readonly logger = new Logger('MailService');

    constructor(
        private readonly mailerService: MailerService,
    ) {}

async sendEmail( email: string) {
    const toEmails = email;

    const template = './active.hbs';

    await this.mailerService.sendMail({
        to: toEmails,
        subject: 'Active Account',
        template,
        context: {
            name: 'Elmer Mejias',
        },
    });

    this.logger.log(`Email sent to ${toEmails}`);

}

}
