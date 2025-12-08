import type { APIRoute } from 'astro';

export const prerender = false;

// 🛑 MEJORA IMPORTANTE: Usar variables de entorno de forma segura
// Astro carga las variables del archivo .env automáticamente.
// NUNCA hardcodees la clave API directamente en el código.
const BREVO_API_KEY = import.meta.env.BREVO_API_KEY;

// La URL del endpoint de Brevo para enviar un email transaccional
const BREVO_SEND_EMAIL_URL = 'https://api.sendinblue.com/v3/smtp/email';

export const POST: APIRoute = async ({ request, redirect }) => {
    try {
        // 1. Obtener los datos del formulario usando formData()
        const data = await request.formData();
        const nombre = data.get('nombre') as string;
        const email = data.get('email') as string;
        const mensaje = data.get('mensaje') as string;
        
        // 🚨 VALIDACIÓN: Asegurar que los campos necesarios existan
        if (!nombre || !email || !mensaje) {
            return new Response('Error: Faltan campos en el formulario.', { status: 400 });
        }

        // 2. Verificar que la clave API esté configurada (Ahora usa import.meta.env)
        if (!BREVO_API_KEY) {
            console.error('La clave API de Brevo no está configurada en .env');
            return new Response('Error interno: Clave API no configurada en el servidor.', { status: 500 });
        }

        // 3. Preparar el cuerpo de la solicitud para Brevo
        const emailData = {
            sender: {
                // 🛑 DEBE ser un remitente verificado en Brevo
                name: 'Formulario de Contacto Web', 
                email: 'soporte10@logimportperusac.com', 
            },
            to: [
                {
                    // Email donde quieres recibir el mensaje
                    email: 'soporte10@logimportperusac.com', 
                    name: 'Destinatario',
                },
            ],
            subject: `Nuevo mensaje de contacto de ${nombre} - (${email})`,
            htmlContent: `
                <html>
                    <body>
                        <h2>Detalles del Contacto</h2>
                        <p><strong>Nombre:</strong> ${nombre}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Mensaje:</strong></p>
                        <p>${mensaje.replace(/\n/g, '<br>')}</p>
                    </body>
                </html>
            `,
        };

        // 4. Enviar la solicitud a la API de Brevo
        const response = await fetch(BREVO_SEND_EMAIL_URL, {
            method: 'POST',
            headers: {
                'api-key': BREVO_API_KEY,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(emailData),
        });

        // 5. Manejar la respuesta
        if (response.ok) {
            // Éxito: Redirigir al usuario
            return redirect('/gracias'); 
        } else {
            const errorData = await response.json(); // Intentar leer el error en formato JSON
            console.error('Error al enviar a Brevo:', response.status, errorData);
            // Redirigir al error y, opcionalmente, pasar un parámetro de error
            return redirect('/error-envio');
        }
    } catch (error) {
        console.error('Error fatal en el endpoint:', error);
        return new Response('Error interno del servidor.', { status: 500 });
    }
};