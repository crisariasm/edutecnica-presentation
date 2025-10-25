import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!process.env.EMAIL_ACCESS_PASSWORD) {
      return NextResponse.json(
        { error: 'Contraseña no configurada en el servidor' },
        { status: 500 }
      );
    }

    if (password !== process.env.EMAIL_ACCESS_PASSWORD) {
      return NextResponse.json(
        { error: 'Contraseña incorrecta' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Acceso autorizado' },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Error en verificación de contraseña:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}