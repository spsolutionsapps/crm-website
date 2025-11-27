import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { randomUUID } from 'crypto';
import { comparePassword, hashPassword } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Usuario y contraseña requeridos' },
        { status: 400 }
      );
    }

    // Buscar usuario
    let user = await db.prepare('SELECT * FROM admin_users WHERE username = ?').get(username) as any;

    // Si no existe el usuario admin, crearlo con la contraseña hasheada
    if (!user && username === 'sebaspado@gmail.com' && password === 'Gojira2019!') {
      const hashedPassword = await hashPassword('Gojira2019!');
      await db.prepare('INSERT INTO admin_users (username, password) VALUES (?, ?)').run(username, hashedPassword);
      user = await db.prepare('SELECT * FROM admin_users WHERE username = ?').get(username) as any;
    }

    if (!user) {
      return NextResponse.json(
        { error: 'Credenciales incorrectas' },
        { status: 401 }
      );
    }

    // Si la contraseña guardada no es un hash de bcrypt (migración de texto plano a bcrypt)
    if (!user.password.startsWith('$2')) {
      // Verificar contraseña en texto plano
      if (user.password === password) {
        // Migrar a bcrypt
        const hashedPassword = await hashPassword(password);
        await db.prepare('UPDATE admin_users SET password = ? WHERE username = ?').run(hashedPassword, username);
        user.password = hashedPassword;
      } else {
        return NextResponse.json(
          { error: 'Credenciales incorrectas' },
          { status: 401 }
        );
      }
    } else {
      // Comparar contraseña con bcrypt
      const passwordMatch = await comparePassword(password, user.password);

      if (!passwordMatch) {
        return NextResponse.json(
          { error: 'Credenciales incorrectas' },
          { status: 401 }
        );
      }
    }

    // Eliminar sesiones antiguas del mismo usuario
    await db.prepare('DELETE FROM sessions WHERE username = ?').run(username);
    
    // Crear sesión
    const sessionId = randomUUID();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // Expira en 7 días

    await db.prepare('INSERT INTO sessions (id, username, expires_at) VALUES (?, ?, ?)').run(
      sessionId,
      username,
      expiresAt.toISOString()
    );

    const response = NextResponse.json(
      { success: true, message: 'Login exitoso' },
      { status: 200 }
    );

    // Establecer cookie con duración más larga
    response.cookies.set('admin_session', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 días
      path: '/'
    });

    return response;
  } catch (error) {
    console.error('Error en login:', error);
    return NextResponse.json(
      { error: 'Error en el login' },
      { status: 500 }
    );
  }
}

