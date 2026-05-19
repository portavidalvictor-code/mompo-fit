// =============================================================
// API · Valoraciones de clientes
// Envía email al coach cuando alguien deja una valoración
// =============================================================

import { NextResponse } from 'next/server';

const COACH_EMAIL = process.env.COACH_EMAIL || 'portavidalvictor@gmail.com';
const RESEND_API_KEY = process.env.RESEND_API_KEY;

export async function POST(request) {
  try {
    const { name, rating, text } = await request.json();

    if (!name || !rating || !text) {
      return NextResponse.json({ error: 'Faltan datos' }, { status: 400 });
    }

    const subject = `Nueva valoración (${rating}★) · ${name}`;
    const html = `
<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="font-family: sans-serif; background: #070707; color: #F5F2EE; padding: 40px 20px;">
  <div style="max-width: 600px; margin: 0 auto; background: #0E0E0E; border: 1px solid rgba(255,255,255,0.1);">
    <div style="background: #0B5D3B; color: #F5F2EE; padding: 24px 32px;">
      <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.2em; opacity: 0.8; margin-bottom: 8px;">Nueva valoración</div>
      <h1 style="margin: 0; font-size: 20px; text-transform: uppercase;">${name}</h1>
    </div>
    <div style="padding: 32px;">
      <div style="font-size: 28px; color: #0B5D3B; margin-bottom: 16px;">${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}</div>
      <div style="background: rgba(11,93,59,0.05); border-left: 3px solid #0B5D3B; padding: 16px 20px; margin: 24px 0; font-style: italic; color: rgba(245,242,238,0.9);">
        ${text}
      </div>
      <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.2em; color: rgba(245,242,238,0.4); margin-top: 24px;">
        Recibido el ${new Date().toLocaleString('es-ES')}
      </div>
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
          subject,
          html,
        }),
      });
    } else {
      console.log('=== NUEVA VALORACIÓN ===');
      console.log(`${name} · ${rating}★`);
      console.log(text);
      console.log('========================');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error valoración:', error);
    return NextResponse.json({ error: 'Error al procesar' }, { status: 500 });
  }
}
