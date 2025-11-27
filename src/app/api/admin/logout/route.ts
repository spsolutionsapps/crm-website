import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const sessionId = request.cookies.get('admin_session')?.value;
    
    if (sessionId) {
      // Eliminar sesión de la base de datos
      await db.prepare('DELETE FROM sessions WHERE id = ?').run(sessionId);
    }

    const response = NextResponse.json(
      { success: true, message: 'Sesión cerrada correctamente' },
      { status: 200 }
    );

    // Eliminar cookie
    response.cookies.set('admin_session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0, // Expirar inmediatamente
      path: '/'
    });

    return response;
  } catch (error) {
    console.error('Error en logout:', error);
    return NextResponse.json(
      { error: 'Error al cerrar sesión' },
      { status: 500 }
    );
  }
}




