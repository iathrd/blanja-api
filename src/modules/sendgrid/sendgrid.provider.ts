import * as sgMail from '@sendgrid/mail';

export const SendgridProvider = {
  provide: 'Sendgrid',
  useFactory: () => {
    return sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  },
};
