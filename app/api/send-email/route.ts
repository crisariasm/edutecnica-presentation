import { NextRequest, NextResponse } from 'next/server';
import * as brevo from '@getbrevo/brevo';
import nodemailer from 'nodemailer';

// Generar HTML del email
const generateEmailHTML = (message: string) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; color: white; text-align: center; margin-bottom: 30px;">
      <h1 style="margin: 0; font-size: 28px; font-weight: bold;">Correo Corporativo</h1>
      <p style="margin: 10px 0 0; opacity: 0.9;">Sistema de comunicación profesional</p>
    </div>
    
    <div style="background: #f8f9fa; padding: 30px; border-radius: 10px; border-left: 4px solid #667eea;">
      <h2 style="color: #333; margin-top: 0;">Mensaje:</h2>
      <div style="line-height: 1.6; color: #555; white-space: pre-wrap;">${message}</div>
    </div>
    
    <div style="margin-top: 30px; padding: 20px; background: #e8f4fd; border-radius: 8px; text-align: center;">
      <p style="margin: 0; color: #0066cc; font-size: 14px;">
        <strong>Este es un correo de demostración</strong><br>
        Enviado desde el sistema de correos corporativos
      </p>
    </div>
    
    <div style="margin-top: 30px; text-align: center; color: #999; font-size: 12px;">
      <p>© ${new Date().getFullYear()} Sistema de Correos Corporativos</p>
    </div>
  </div>
`;

// Generar texto plano del email
const generateEmailText = (message: string) => `
Correo Corporativo - Sistema de comunicación profesional

Mensaje:
${message}

---
Este es un correo de demostración
Enviado desde el sistema de correos corporativos

© ${new Date().getFullYear()} Sistema de Correos Corporativos
`;

// Función para enviar con API de Brevo
const sendWithBrevoAPI = async (to: string, subject: string, message: string) => {
  const apiInstance = new brevo.TransactionalEmailsApi();
  apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY!);

  const emailData = new brevo.SendSmtpEmail();
  emailData.sender = {
    name: process.env.BREVO_SENDER_NAME || 'Sistema Corporativo',
    email: process.env.BREVO_SENDER_EMAIL!,
  };
  emailData.to = [{ email: to }];
  emailData.subject = subject;
  emailData.htmlContent = generateEmailHTML(message);
  emailData.textContent = generateEmailText(message);

  return await apiInstance.sendTransacEmail(emailData);
};

// Función para enviar con SMTP
const sendWithSMTP = async (to: string, subject: string, message: string) => {
  const transporter = nodemailer.createTransport({
    host: process.env.BREVO_SMTP_SERVER!,
    port: parseInt(process.env.BREVO_SMTP_PORT || '587'),
    secure: false, // true para 465, false para otros puertos
    auth: {
      user: process.env.BREVO_SMTP_LOGIN!,
      pass: process.env.BREVO_SMTP_PASSWORD!,
    },
  });

  const mailOptions = {
    from: `"${process.env.BREVO_SENDER_NAME || 'Sistema Corporativo'}" <${process.env.BREVO_SENDER_EMAIL}>`,
    to: to,
    subject: subject,
    html: generateEmailHTML(message),
    text: generateEmailText(message),
  };

  return await transporter.sendMail(mailOptions);
};

export async function POST(request: NextRequest) {
  try {
    const { to, subject, message } = await request.json();

    // Validar los datos requeridos
    if (!to || !subject || !message) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos: to, subject, message' },
        { status: 400 }
      );
    }

    // Validar que las variables de entorno estén configuradas
    const hasAPIKey = process.env.BREVO_API_KEY;
    const hasSMTPConfig = process.env.BREVO_SMTP_SERVER && 
                          process.env.BREVO_SMTP_LOGIN && 
                          process.env.BREVO_SMTP_PASSWORD;

    if (!process.env.BREVO_SENDER_EMAIL || (!hasAPIKey && !hasSMTPConfig)) {
      return NextResponse.json(
        { 
          error: 'Variables de entorno no configuradas',
          details: 'Necesitas configurar BREVO_SENDER_EMAIL y ya sea BREVO_API_KEY o las credenciales SMTP'
        },
        { status: 500 }
      );
    }

    // Enviar el correo usando API o SMTP según disponibilidad
    let responseId = '';
    let method = '';
    
    if (hasAPIKey) {
      await sendWithBrevoAPI(to, subject, message);
      responseId = 'API-Success';
      method = 'API';
    } else if (hasSMTPConfig) {
      const response = await sendWithSMTP(to, subject, message);
      responseId = response.messageId || 'SMTP-Success';
      method = 'SMTP';
    } else {
      throw new Error('No hay método de envío configurado');
    }
    
    return NextResponse.json(
      { 
        success: true, 
        messageId: responseId,
        method: method,
        message: `Correo enviado exitosamente usando ${method}` 
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Error al enviar correo:', error);
    
    // Manejar errores específicos de Brevo
    if (error.response) {
      const errorMessage = error.response.data?.message || 'Error desconocido de Brevo';
      return NextResponse.json(
        { 
          error: 'Error al enviar correo', 
          details: errorMessage,
          code: error.response.status
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { 
        error: 'Error interno del servidor', 
        details: error.message 
      },
      { status: 500 }
    );
  }
}