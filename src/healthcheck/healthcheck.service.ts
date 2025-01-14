import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { EmailService } from 'src/email/email.service';

const RECIPIENTS = ['jcarrillo@follow-up.cl'];

@Injectable()
export class HealthcheckService {
  constructor(private readonly emailService: EmailService) {}

  //URL De las páginas a monitorear
  private servicesToMonitor = [
    { name: 'Reportes-core', url: 'http://reportescore.follow-up.cl' },
    { name: 'my-page', url: 'http://192.168.100.71:3000/' },
    { name: 'Yeastar', url: 'https://190.196.221.42:8088/login' },
    { name: 'Rich', url: 'http://rich.follow-up.cl/' },
    { name: 'Orbyta', url: 'https://clientes.orbyta.com/' },
  ];

  async checkServices() {
    for (const service of this.servicesToMonitor) {
      try {
        const response = await axios.get(service.url, { timeout: 5000 });
        console.log(
          `Servicio: ${service.name}, funciona correctamente. Url: ${service.url}`,
        );
      } catch (error) {
        console.error(`${service.name} está fallando.
             Url: ${service.url}
             Error: ${error.message}`);

        await this.emailService.sendEmail({
          recipients: RECIPIENTS,
          subject: '🚨 ALERTA 🚨 ',
          html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9; color: #333;">
            <h1 style="text-align: center; color: #d9534f; font-size: 24px; margin-bottom: 20px;">
                ALERTA: PROBLEMAS CON EL SISTEMA <span style="text-transform: uppercase;">${service.name}</span>
            </h1>
            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                Estimado <strong>trabajador de Follow-up</strong>,
            </p>
            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                Queremos informarle que se ha detectado un problema con el sistema 
                <a href="${service.url}" style="color: #337ab7; text-decoration: none;">
                <strong>${service.name}</strong>
                </a>.
            </p>
            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                A continuación, se adjunta el mensaje de error asociado:
            </p>
            <blockquote style="font-size: 14px; line-height: 1.6; color: #555; border-left: 4px solid #d9534f; padding-left: 15px; margin: 20px 0;">
                ${error.message}
            </blockquote>
            <p style="font-size: 14px; line-height: 1.6; text-align: center; margin-top: 30px; color: #666;">
                Este es un mensaje automático. Por favor, no responda a este correo.
            </p>
        </div>`,
        });
      }
    }
  }
}
