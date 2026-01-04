import { SendSmtpEmailToInner } from '@getbrevo/brevo';

export interface ISendEmail {
  receivers: SendSmtpEmailToInner[];
  subject: string;
  htmlContent: string;
}

export interface IGenerateOtp {
  otp: number;
  otpSecret: string;
}
