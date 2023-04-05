import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

type TSendMailPayload = {
  email: string;
  subject: string;
  template: string;
  context: Object;
};

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(data: TSendMailPayload) {
    await this.mailerService.sendMail({
      to: data.email,
      subject: data.subject,
      template: data.template,
      context: data.context,
    });
  }
}
