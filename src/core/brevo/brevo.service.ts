import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Brevo from '@getbrevo/brevo';

@Injectable()
export class BrevoService {
  constructor(private config: ConfigService) {}
  async sendMail(data: {
    receivers: Brevo.SendSmtpEmailToInner[];
    subject: string;
  }): Promise<boolean> {
    try {
      const apiKey = this.config.getOrThrow<string>('BREVO_API_KEY');
      const senderEmail = this.config.getOrThrow<string>('BREVO_SENDER_EMAIL');
      const senderName = this.config.getOrThrow<string>('BREVO_SENDER_NAME');

      const apiInstance = new Brevo.TransactionalEmailsApi();
      apiInstance.setApiKey(0, apiKey);

      const { receivers, subject } = data;

      await apiInstance.sendTransacEmail({
        sender: {
          email: senderEmail || '',
          name: senderName || '',
        },
        to: receivers,
        subject: subject,
        htmlContent: ``,
      });

      return true;
    } catch (error) {
      console.log('ERROR SENDING EMAIL: ', error);
      return false;
    }
  }
}
