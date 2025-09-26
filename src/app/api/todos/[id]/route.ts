import prisma from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'
import { object, string, boolean } from 'yup';

interface Segments {
  params: {
    id: string
  }
}

export async function GET(request: Request, { params }: Segments) {
  const { id } = params;
  const todo = await prisma.todo.findUnique({ where: { id } });

  if (!todo) {
    return NextResponse.json({ message: `La tarea con ${id} no existe` }, { status: 404 });
  }

  return NextResponse.json(todo)
}

let putShema = object({
  description: string().optional(),
  complete: boolean().optional().default(false),
});

export async function PUT(request: Request, { params }: Segments) {

  try {
    const { id } = params;
    const todo = await prisma.todo.findUnique({ where: { id } });

    if (!todo) {
      return NextResponse.json({ message: `La tarea con ${id} no existe` }, { status: 404 });
    }
    //const body = await request.json();
    const { description, complete } = await putShema.validate(await request.json());

    const updateTodo = await prisma.todo.update({
      where: { id },
      data: { description, complete }
    })

    return NextResponse.json(updateTodo)
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}