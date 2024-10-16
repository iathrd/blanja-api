import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';
import SendEmailDto from 'src/common/dto/send-emai.dto';

@Injectable()
export class SendgridService {
  async sendEmail(sendEmailDto: SendEmailDto) {
    return sgMail
      .send({
        to: sendEmailDto.to,
        from: sendEmailDto.from || process.env.EMAIL_SENDER,
        subject: sendEmailDto.subject,
        text: sendEmailDto.text,
        html: sendEmailDto.html,
      })
      .then(() => ({ message: 'Email sent successfully', success: true }))
      .catch(() => {
        throw new InternalServerErrorException('Email not sent.');
      });
  }
}
