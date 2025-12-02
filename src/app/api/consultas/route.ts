import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  
  if (!secretKey) {
    console.warn('RECAPTCHA_SECRET_KEY no está configurado. Saltando validación en desarrollo.');
    // En desarrollo, si no hay secret key, permitir el envío
    return process.env.NODE_ENV !== 'production';
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await response.json();
    
    // Verificar que el score sea mayor a 0.5 (reCAPTCHA v3)
    // o que success sea true (reCAPTCHA v2)
    return data.success === true && (data.score === undefined || data.score >= 0.5);
  } catch (error) {
    console.error('Error verificando reCAPTCHA:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nombre, apellido, email, telefono, mensaje, recaptchaToken } = body;

    if (!nombre || !apellido || !email || !mensaje) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos: nombre, apellido, email y mensaje son obligatorios' },
        { status: 400 }
      );
    }

    // Verificar reCAPTCHA
    if (recaptchaToken) {
      const isValidRecaptcha = await verifyRecaptcha(recaptchaToken);
      if (!isValidRecaptcha) {
        return NextResponse.json(
          { error: 'Verificación de seguridad fallida. Por favor intenta nuevamente.' },
          { status: 400 }
        );
      }
    } else {
      // En producción, requerir token de reCAPTCHA
      if (process.env.NODE_ENV === 'production') {
        return NextResponse.json(
          { error: 'Token de seguridad requerido' },
          { status: 400 }
        );
      }
    }

    const stmt = db.prepare(`
      INSERT INTO consultas (nombre, apellido, email, telefono, mensaje)
      VALUES (?, ?, ?, ?, ?)
    `);

    await stmt.run(nombre, apellido, email, telefono || null, mensaje);

    return NextResponse.json(
      { success: true, message: 'Consulta enviada correctamente' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error guardando consulta:', error);
    return NextResponse.json(
      { error: 'Error al guardar la consulta' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Verificar sesión (simple check)
    const sessionId = request.cookies.get('admin_session')?.value;
    
    if (!sessionId) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    // Verificar que la sesión existe y no ha expirado
    const session = await db.prepare('SELECT * FROM sessions WHERE id = ?').get(sessionId) as any;
    
    if (!session) {
      return NextResponse.json(
        { error: 'Sesión no encontrada' },
        { status: 401 }
      );
    }

    // Verificar expiración comparando con la fecha actual
    const expiresAt = new Date(session.expires_at);
    const now = new Date();
    
    if (expiresAt <= now) {
      // Eliminar sesión expirada
      await db.prepare('DELETE FROM sessions WHERE id = ?').run(sessionId);
      return NextResponse.json(
        { error: 'Sesión expirada' },
        { status: 401 }
      );
    }

    // Renovar sesión si queda menos de 12 horas (extender a 24 horas más)
    const hoursUntilExpiry = (expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60);
    if (hoursUntilExpiry < 12) {
      const newExpiresAt = new Date();
      newExpiresAt.setHours(newExpiresAt.getHours() + 24);
      await db.prepare('UPDATE sessions SET expires_at = ? WHERE id = ?').run(
        newExpiresAt.toISOString(),
        sessionId
      );
    }

    const consultas = await db.prepare('SELECT * FROM consultas ORDER BY fecha DESC').all();

    const response = NextResponse.json({ consultas }, { status: 200 });
    
    // Renovar cookie también
    response.cookies.set('admin_session', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7 días
    });

    return response;
  } catch (error) {
    console.error('Error obteniendo consultas:', error);
    return NextResponse.json(
      { error: 'Error al obtener las consultas' },
      { status: 500 }
    );
  }
}

