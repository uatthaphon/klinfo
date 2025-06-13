import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(private readonly config: ConfigService) {
    const host = this.config.get<string>('SMTP_HOST');
    const port = this.config.get<number>('SMTP_PORT');
    const user = this.config.get<string>('SMTP_USER');
    const pass = this.config.get<string>('SMTP_PASS');

    if (host && port && user && pass) {
      this.transporter = nodemailer.createTransport({
        host,
        port,
        auth: { user, pass },
      });
    } else {
      // For development, create a test account
      nodemailer.createTestAccount().then((acc) => {
        this.transporter = nodemailer.createTransport({
          host: acc.smtp.host,
          port: acc.smtp.port,
          secure: acc.smtp.secure,
          auth: { user: acc.user, pass: acc.pass },
        });
        Logger.log(`Test mail account created: ${acc.user}`);
      });
    }
  }

  async sendPasswordReset(to: string, token: string) {
    const appUrl = this.config.get<string>('FRONTEND_URL') || 'http://localhost:3001';
    const resetLink = `${appUrl}/auth/reset-password?token=${token}&email=${encodeURIComponent(to)}`;
    const message = {
      from: this.config.get<string>('SMTP_FROM', 'noreply@example.com'),
      to,
      subject: 'Reset your password',
      text: `Click the following link to reset your password: ${resetLink}`,
      html: `<p>Click the following link to reset your password:</p><p><a href="${resetLink}">${resetLink}</a></p>`,
    };

    const info = await this.transporter.sendMail(message);
    if (nodemailer.getTestMessageUrl(info)) {
      Logger.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
    }
  }

  async sendEmailVerification(to: string, token: string) {
    const appUrl = this.config.get<string>('FRONTEND_URL') || 'http://localhost:3001';
    const verifyLink = `${appUrl}/auth/verify-email?token=${token}&email=${encodeURIComponent(to)}`;
    const message = {
      from: this.config.get<string>('SMTP_FROM', 'noreply@example.com'),
      to,
      subject: 'Verify your email',
      text: `Click the following link to verify your email: ${verifyLink}`,
      html: `<p>Click the following link to verify your email:</p><p><a href="${verifyLink}">${verifyLink}</a></p>`,
    };

    const info = await this.transporter.sendMail(message);
    if (nodemailer.getTestMessageUrl(info)) {
      Logger.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
    }
  }
}
