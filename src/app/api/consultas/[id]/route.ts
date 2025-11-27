import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Verificar sesión
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

    // Verificar expiración
    const expiresAt = new Date(session.expires_at);
    const now = new Date();
    
    if (expiresAt <= now) {
      await db.prepare('DELETE FROM sessions WHERE id = ?').run(sessionId);
      return NextResponse.json(
        { error: 'Sesión expirada' },
        { status: 401 }
      );
    }

    // Eliminar consulta
    const { id } = await params;
    const consultaId = parseInt(id);
    if (isNaN(consultaId)) {
      return NextResponse.json(
        { error: 'ID de consulta inválido' },
        { status: 400 }
      );
    }

    const result = await db.prepare('DELETE FROM consultas WHERE id = ?').run(consultaId);

    if (result.changes === 0) {
      return NextResponse.json(
        { error: 'Consulta no encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Consulta eliminada correctamente' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error eliminando consulta:', error);
    return NextResponse.json(
      { error: 'Error al eliminar la consulta' },
      { status: 500 }
    );
  }
}


