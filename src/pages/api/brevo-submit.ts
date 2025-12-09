import type { APIRoute } from 'astro';

export const prerender = false;

// Carga la clave API desde el archivo .env
const BREVO_API_KEY = import.meta.env.BREVO_API_KEY;

// La URL del endpoint de Brevo para enviar un email transaccional
const BREVO_SEND_EMAIL_URL = 'https://api.sendinblue.com/v3/smtp/email';

export const POST: APIRoute = async ({ request, redirect }) => {
  try {
    // 1. Obtener y asegurar los datos
    const data = await request.formData();

    // Mapear campos. Usamos '|| "N/A"' para evitar errores si un campo opcional está vacío.
    const empresa = (data.get('empresa') as string) || 'N/A';
    const email = (data.get('email') as string) || ''; // Usar 'correo' según tu HTML
    const ciudad = (data.get('ciudad') as string) || 'N/A';
    const rucdni_type = (data.get('rucdni_type') as string) || 'N/A';
    const rucdni_value = (data.get('rucdni_value') as string) || 'N/A';
    const rucdni = `${rucdni_type}: ${rucdni_value}`; const contacto = (data.get('contacto') as string) || 'N/A';
    const telefono = (data.get('telefono') as string) || 'N/A';
    const capacidad = (data.get('capacidad') as string) || 'N/A';
    const material = (data.get('material') as string) || 'N/A';
    const diseno = (data.get('diseno') as string) || 'No especificado';
    const mensaje = (data.get('mensaje') as string) || 'Sin comentarios adicionales'; // Asumimos 'comentario' es el campo

    // 🚨 VALIDACIÓN: Email y Empresa son críticos
    if (!empresa || !email) {
      return new Response('Error: Faltan campos Empresa o Correo.', { status: 400 });
    }
    if (!BREVO_API_KEY) {
      console.error('La clave API de Brevo no está configurada en .env');
      return new Response('Error interno: Clave API no configurada en el servidor.', { status: 500 });
    }

    // --- HTML para el EQUIPO DE VENTAS (Tu código de email sofisticado) ---
    const htmlContentVentas = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Solicitud de Cotización de Big Bag</title>
            </head>
            <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f7f7f7;">
                <center>
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
                        <tr>
                            <td align="center" style="padding: 20px 0;">
                                <table border="0" cellpadding="0" cellspacing="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.05); border: 1px solid #e01f34;">
                                    <tr>
                                        <td align="center" style="padding: 20px; background-color: #ffffff; border-radius: 8px 8px 0 0;">
                                            <img src="https://i.imgur.com/vFZehdl.png" alt="Logo de la Empresa" style="max-width: 150px; height: auto; display: block; margin: 0 auto;">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 0 30px;">
                                            <h1 style="color: #0f2f5ae8; font-size: 24px; text-align: center; margin: 0 0 15px 0; border-bottom: 3px solid #e01f34; padding-bottom: 10px;">
                                                Solicitud de Cotización de Big Bag
                                            </h1>
                                            <p style="color: #555; font-size: 16px; text-align: center; margin-bottom: 25px;">
                                                A continuación, se detallan las especificaciones para la cotización solicitada.
                                            </p>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style="padding: 0 30px;">
                                            <h2 style="color: #e01f34; font-size: 18px; margin: 25px 0 10px 0; border-bottom: 1px solid #eee; padding-bottom: 5px;">
                                                👤 Datos de Contacto
                                            </h2>
                                            <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
                                                <tr><td style="padding: 8px 10px; background-color: #f4f4f4; width: 35%; border-radius: 4px 0 0 0;"><strong>Empresa:</strong></td><td style="padding: 8px 10px; background-color: #f4f4f4; border-radius: 0 4px 0 0;">${empresa}</td></tr>
                                                <tr><td style="padding: 8px 10px; background-color: #ffffff; width: 35%;"><strong>RUC/DNI:</strong></td><td style="padding: 8px 10px; background-color: #ffffff;">${rucdni}</td></tr>
                                                <tr><td style="padding: 8px 10px; background-color: #f4f4f4; width: 35%;"><strong>Persona de Contacto:</strong></td><td style="padding: 8px 10px; background-color: #f4f4f4;">${contacto}</td></tr>
                                                <tr><td style="padding: 8px 10px; background-color: #ffffff; width: 35%;"><strong>Ciudad:</strong></td><td style="padding: 8px 10px; background-color: #ffffff;">${ciudad}</td></tr>
                                                <tr><td style="padding: 8px 10px; background-color: #f4f4f4; width: 35%;"><strong>Correo Electrónico:</strong></td><td style="padding: 8px 10px; background-color: #f4f4f4;">${email}</td></tr>
                                                <tr><td style="padding: 8px 10px; background-color: #ffffff; width: 35%; border-radius: 0 0 0 4px;"><strong>Teléfono:</strong></td><td style="padding: 8px 10px; background-color: #ffffff; border-radius: 0 0 4px 0;">${telefono}</td></tr>
                                            </table>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style="padding: 0 30px;">
                                            <h2 style="color: #e01f34; font-size: 18px; margin: 25px 0 10px 0; border-bottom: 1px solid #eee; padding-bottom: 5px;">
                                                📦 Especificaciones del Big Bag
                                            </h2>
                                            <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
                                                <tr><td style="padding: 8px 10px; background-color: #f4f4f4; width: 35%; border-radius: 4px 0 0 0;"><strong>Capacidad de carga:</strong></td><td style="padding: 8px 10px; background-color: #f4f4f4; border-radius: 0 4px 0 0;">${capacidad}</td></tr>
                                                <tr><td style="padding: 8px 10px; background-color: #ffffff; width: 35%;"><strong>Material a cargar:</strong></td><td style="padding: 8px 10px; background-color: #ffffff;">${material}</td></tr>
                                                <tr><td style="padding: 8px 10px; background-color: #f4f4f4; width: 35%; border-radius: 0 0 0 4px;"><strong>Diseño seleccionado:</strong></td><td style="padding: 8px 10px; background-color: #f4f4f4; border-radius: 0 0 4px 0;">${diseno}</td></tr>
                                            </table>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style="padding: 0 30px;">
                                            <h2 style="color: #e01f34; font-size: 18px; margin: 25px 0 10px 0; border-bottom: 1px solid #eee; padding-bottom: 5px;">
                                                📝 Comentarios Adicionales
                                            </h2>
                                            <div style="border: 1px solid #ccc; padding: 15px; margin-bottom: 30px; background-color: #fcfcfc; border-radius: 4px; font-size: 14px; color: #333; ">
                                                ${mensaje.replace(/\n/g, '<br>')}
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td align="center" style="padding: 20px 30px; background-color: #0f2f5ae8; color: #ffffff; font-size: 12px; border-radius: 0 0 8px 8px;">
                                            <p style="margin: 0;">
                                                Favor de enviar la cotización a: <strong>${email}</strong> o contactar al teléfono: <strong>${telefono}</strong>
                                            </p>
                                        </td>
                                    </tr>

                                </table>
                            </td>
                        </tr>
                    </table>
                </center>
            </body>
            </html>
        `;

    // 3.1. Objeto de Datos para el EQUIPO DE VENTAS
    const emailDataVentas = {
      sender: {
        name: 'Formulario de Cotización Web',
        email: 'soporte10@logimportperusac.com',
      },
      to: [
        {
          email: 'soporte10@logimportperusac.com', // Destino: Equipo de Ventas
          name: 'Destinatario Cotizaciones',
        },
      ],
      subject: `📧 NUEVA COTIZACIÓN BIG BAG de ${empresa} (${ciudad})`,
      htmlContent: htmlContentVentas,
    };

    // --- HTML y Objeto de Datos para el CLIENTE (Confirmación) ---

    const htmlContentCliente = `
           <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Solicitud de Cotización Recibida - Logimport Perú SAC</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f7f7f7;">
    <center>
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
            <tr>
                <td align="center" style="padding: 20px 0;">
                    <table border="0" cellpadding="0" cellspacing="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.05); border-top: 5px solid #e01f34;">
                        
                        <tr>
                            <td align="center" style="padding: 20px 30px 10px 30px; background-color: #ffffff; border-radius: 8px 8px 0 0;">
                                <img src="https://i.imgur.com/vFZehdl.png" alt="Logimport Perú SAC Logo" style="max-width: 150px; height: auto; display: block; margin: 0 auto;">
                            </td>
                        </tr>

                        <tr>
                            <td style="padding: 10px 30px 20px 30px; text-align: center;">
                                <h1 style="color: #0f2f5ae8; font-size: 24px; margin: 0 0 10px 0; border-bottom: 2px solid #0f2f5ae8; padding-bottom: 10px;">
                                    ✅ Solicitud de Cotización Recibida
                                </h1>
                            </td>
                        </tr>

                        <tr>
                            <td style="padding: 0 30px;">
                                <p style="font-size: 16px; color: #333; margin-top: 0;">
                                    Estimado(a) **${contacto || empresa}**,
                                </p>
                                <p style="font-size: 16px; color: #333;">
                                    Gracias por tu interés en nuestros Big Bags. Hemos recibido tu solicitud de cotización y nuestro equipo de ventas la está revisando cuidadosamente.
                                </p>
                                <p style="font-size: 16px; color: #333; font-weight: bold;">
                                    Te contactaremos pronto con una propuesta formal.
                                </p>
                            </td>
                        </tr>

                        <tr>
                            <td style="padding: 20px 30px;">
                                <h2 style="color: #e01f34; font-size: 18px; margin: 0 0 10px 0; border-bottom: 1px solid #eee; padding-bottom: 5px;">
                                    Resumen de tu Solicitud
                                </h2>
                                <table style="width: 100%; border-collapse: collapse; font-size: 14px; border: 1px solid #ccc; border-radius: 4px;">
                                    <tr><td style="padding: 10px; background-color: #f4f4f4; width: 35%; border-right: 1px solid #ccc;"><strong>Empresa:</strong></td><td style="padding: 10px; background-color: #f4f4f4;">${empresa}</td></tr>
                                    <tr><td style="padding: 10px; background-color: #ffffff; width: 35%; border-right: 1px solid #ccc;"><strong>Material a cargar:</strong></td><td style="padding: 10px; background-color: #ffffff;">${material}</td></tr>
                                    <tr><td style="padding: 10px; background-color: #f4f4f4; width: 35%; border-right: 1px solid #ccc;"><strong>Capacidad de carga:</strong></td><td style="padding: 10px; background-color: #f4f4f4;">${capacidad}</td></tr>
                                    <tr><td style="padding: 10px; background-color: #ffffff; width: 35%; border-right: 1px solid #ccc;"><strong>Diseño seleccionado:</strong></td><td style="padding: 10px; background-color: #ffffff;">${diseno}</td></tr>
                                </table>
                            </td>
                        </tr>
                        
                        <tr>
                            <td style="padding: 0 30px 20px 30px;">
                                <p style="margin-top: 15px; font-size: 15px; color: #555;">
                                    Si tienes alguna pregunta, necesitas modificar tu solicitud, o deseas contactar directamente con ventas, no dudes en responder a este correo.
                                </p>
                            </td>
                        </tr>

                        <tr>
                            <td align="center" style="padding: 20px 30px; background-color: #0f2f5ae8; color: #ffffff; font-size: 12px; border-radius: 0 0 8px 8px;">
                                <p style="margin: 0; font-size: 14px; font-weight: bold;">
                                    Atentamente,<br>El equipo de Logimport Perú SAC.
                                </p>
                            </td>
                        </tr>

                    </table>
                </td>
            </tr>
        </table>
    </center>
</body>
</html>
        `;

    const emailDataCliente = {
      sender: {
        name: 'Logimport Perú SAC',
        email: 'soporte10@logimportperusac.com',
      },
      to: [
        {
          email: email, // Destino: Cliente
          name: contacto || 'Cliente',
        },
      ],
      subject: `Confirmación de Solicitud de Cotización - Logimport Perú SAC`,
      htmlContent: htmlContentCliente,
    };


    // 4. Envío Secuencial

    // 4.1. Enviar el 1er correo: AL EQUIPO DE VENTAS (Prioridad 1)
    const responseVentas = await fetch(BREVO_SEND_EMAIL_URL, {
      method: 'POST',
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(emailDataVentas),
    });

    // 5. Manejar la respuesta del 1er envío
    if (responseVentas.ok) {

      // 5.1. Si el envío a ventas fue OK, enviar el 2do correo: AL CLIENTE
      try {
        const responseCliente = await fetch(BREVO_SEND_EMAIL_URL, {
          method: 'POST',
          headers: {
            'api-key': BREVO_API_KEY,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(emailDataCliente),
        });

        if (!responseCliente.ok) {
          // Advertencia: El correo de soporte se fue, pero la confirmación falló
          const errorCliente = await responseCliente.json();
          console.warn('Advertencia: Falló el envío de confirmación al cliente:', errorCliente);
        }
      } catch (error) {
        console.error('Error al intentar enviar la confirmación al cliente:', error);
      }

      // 5.2. Éxito: Redirigir al usuario (independiente del 2do envío)
      return redirect('/gracias');

    } else {
      // 5.3. Falla crítica en el 1er envío (a Ventas)
      const errorData = await responseVentas.json();
      console.error('Error FATAL al enviar a Brevo (a Ventas):', responseVentas.status, errorData);
      return redirect('/error-envio');
    }

  } catch (error) {
    console.error('Error fatal en el endpoint:', error);
    return new Response('Error interno del servidor.', { status: 500 });
  }
};