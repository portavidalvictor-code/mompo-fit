// =============================================================
// API · Recepción de solicitudes + reserva de llamada
// Envía email al coach con todos los datos
// =============================================================
//
// PARA QUE FUNCIONE EN PRODUCCIÓN:
// 1. Crear cuenta gratis en https://resend.com
// 2. Conseguir tu API Key (Settings → API Keys)
// 3. En Vercel → Project → Settings → Environment Variables, añadir:
//    - RESEND_API_KEY = re_xxxxxxxx
//    - COACH_EMAIL = portavidalvictor@gmail.com
// 4. Redesplegar
//
// Mientras no esté configurado, los datos se guardan en logs.

import { NextResponse } from 'next/server';

const COACH_EMAIL = process.env.COACH_EMAIL || 'portavidalvictor@gmail.com';
const RESEND_API_KEY = process.env.RESEND_API_KEY;

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      age,
      weight,
      height,
      goal,
      experience,
      daysWeek,
      where,
      injuries,
      history,
      plan,
      appointmentDate,
      appointmentTime,
      appointmentLabel,
    } = body;

    if (!name || !email || !phone) {
      return NextResponse.json({ error: 'Faltan datos obligatorios' }, { status: 400 });
    }

    const subject = appointmentLabel
      ? `🟢 Nueva reserva · ${name} · ${appointmentLabel}`
      : `Nueva solicitud · ${name}`;

    const row = (label, value) =>
      value ? `<tr><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.08);font-size:11px;text-transform:uppercase;letter-spacing:0.15em;color:rgba(245,242,238,0.5);width:160px;">${label}</td><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.08);color:#F5F2EE;">${value}</td></tr>` : '';

    const html = `
<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;background:#070707;color:#F5F2EE;padding:40px 20px;">
  <div style="max-width:640px;margin:0 auto;background:#0E0E0E;border:1px solid rgba(255,255,255,0.1);">

    <div style="background:#0B5D3B;color:#F5F2EE;padding:28px 32px;">
      <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.25em;opacity:0.85;margin-bottom:8px;">
        ${appointmentLabel ? '📅 Nueva reserva de llamada' : 'Nueva solicitud'}
      </div>
      <h1 style="margin:0;font-size:24px;text-transform:uppercase;letter-spacing:-0.02em;">${name}</h1>
      ${plan ? `<div style="margin-top:8px;font-size:12px;opacity:0.85;">Plan ${plan}</div>` : ''}
    </div>

    ${appointmentLabel ? `
      <div style="background:rgba(11,93,59,0.15);border-left:3px solid #0B5D3B;padding:18px 32px;">
        <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.25em;color:rgba(245,242,238,0.6);margin-bottom:6px;">Cita reservada</div>
        <div style="font-size:18px;color:#F5F2EE;text-transform:uppercase;letter-spacing:-0.01em;">${appointmentLabel}h</div>
      </div>
    ` : ''}

    <table style="width:100%;border-collapse:collapse;">
      ${row('Email', email ? `<a href="mailto:${email}" style="color:#0B5D3B;">${email}</a>` : '')}
      ${row('Teléfono', phone ? `<a href="tel:${phone}" style="color:#0B5D3B;">${phone}</a>` : '')}
      ${row('Edad', age)}
      ${row('Peso', weight ? `${weight} kg` : '')}
      ${row('Altura', height ? `${height} cm` : '')}
      ${row('Experiencia', experience)}
      ${row('Días/semana', daysWeek)}
      ${row('Dónde entrena', where)}
    </table>

    <div style="padding:24px 32px;border-top:1px solid rgba(255,255,255,0.1);">
      <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.25em;color:rgba(245,242,238,0.5);margin-bottom:8px;">Objetivo</div>
      <div style="color:#F5F2EE;line-height:1.6;">${(goal || '—').replace(/\n/g, '<br>')}</div>
    </div>

    ${injuries ? `
      <div style="padding:24px 32px;border-top:1px solid rgba(255,255,255,0.1);">
        <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.25em;color:rgba(245,242,238,0.5);margin-bottom:8px;">Lesiones / limitaciones</div>
        <div style="color:#F5F2EE;line-height:1.6;">${injuries.replace(/\n/g, '<br>')}</div>
      </div>
    ` : ''}

    ${history ? `
      <div style="padding:24px 32px;border-top:1px solid rgba(255,255,255,0.1);">
        <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.25em;color:rgba(245,242,238,0.5);margin-bottom:8px;">Lo que ha probado antes</div>
        <div style="color:#F5F2EE;line-height:1.6;">${history.replace(/\n/g, '<br>')}</div>
      </div>
    ` : ''}

    <div style="padding:20px 32px;background:#070707;font-size:10px;text-transform:uppercase;letter-spacing:0.25em;color:rgba(245,242,238,0.4);">
      Recibido el ${new Date().toLocaleString('es-ES', { dateStyle: 'medium', timeStyle: 'short' })} · Mompofit
    </div>

  </div>
</body></html>
    `.trim();

    if (RESEND_API_KEY) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Mompofit <onboarding@resend.dev>',
          to: COACH_EMAIL,
          replyTo: email,
          subject,
          html,
        }),
      });
    } else {
      console.log('=== NUEVA SOLICITUD ===');
      console.log(JSON.stringify(body, null, 2));
      console.log('=======================');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error solicitud:', error);
    return NextResponse.json({ error: 'Error al procesar' }, { status: 500 });
  }
}
