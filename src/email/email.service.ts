import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodeMailer from 'nodeMailer';
import { sendEmailDto } from 'src/dto/email.dto';

@Injectable()
export class EmailService {
  constructor(private readonly configService: ConfigService) {}
  emailTransport() {
    const transporter = nodeMailer.createTransport({
      host: this.configService.get<string>('MAIL_HOST'),
      port: this.configService.get<number>('MAIL_PORT'),
      secure: false,
      auth: {
        user: this.configService.get<string>('MAIL_USER'),
        pass: this.configService.get<string>('MAIL_PASS'),
      },
    });
    return transporter;
  }

  async sendEmail(dto: sendEmailDto) {
    const { recipients, subject, html } = dto;

    const transport = this.emailTransport();

    const options: nodeMailer.SendEmailOptions = {
      from: this.configService.get<string>('MAIL_USER'),
      to: recipients,
      subject: subject,
      html: html,
    };
    try {
      await transport.sendMail(options);
      console.log('Email enviado correctamente');
    } catch (error) {
      console.log('Error enviando el mail: ', error);
    }
  }
}

/*
async sendDowntimeAlert(
    email: string,
    serviceName: string,
    serviceHost: string,
    errorMessage: string,
  ) {
    console.log('Preparando correo');

    try {
      console.log('Iniciando envío de correo');
      const result = await this.mailerService.sendMail({
        to: email,
        from: '"Alertas Follow-Up" <josemiguel.carrillorojas@gmail.com>', // Asegúrate de incluir un email válido
        subject: '🚨 ALERTA 🚨 ',
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9; color: #333;">
            <h1 style="text-align: center; color: #d9534f; font-size: 24px; margin-bottom: 20px;">
                🚨 ALERTA: PROBLEMAS CON EL SISTEMA <span style="text-transform: uppercase;">${serviceName}</span>
            </h1>
            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                Estimado <strong>trabajador de Follow-up</strong>,
            </p>
            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                Queremos informarle que se ha detectado un problema con el sistema 
                <a href="${serviceHost}" style="color: #337ab7; text-decoration: none;">
                <strong>${serviceName}</strong>
                </a>.
            </p>
            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                A continuación, se adjunta el mensaje de error asociado:
            </p>
            <blockquote style="font-size: 14px; line-height: 1.6; color: #555; border-left: 4px solid #d9534f; padding-left: 15px; margin: 20px 0;">
                ${errorMessage}
            </blockquote>
            <p style="font-size: 14px; line-height: 1.6; text-align: center; margin-top: 30px; color: #666;">
                Este es un mensaje automático. Por favor, no responda a este correo.
            </p>
        </div>

        `,
      });

      console.log('Correo enviado con éxito', result);
      return { message: 'Alerta enviada con éxito', success: true };
    } catch (error) {
      console.error('Error al enviar alerta');
      console.error('ErrorMessage: ', error);

      // Loguear información específica del error
      if (error instanceof Error) {
        console.error('Nombre del error:', error.name);
        console.error('Mensaje del error:', error.message);
        console.error('Stack del error:', error.stack);
      }

      return {
        message: 'Error al enviar alerta',
        success: false,
        error: 'fallo',
      };
    }
  }
}

*/
