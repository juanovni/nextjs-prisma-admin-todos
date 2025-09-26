import prisma from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'
import { object, string, boolean } from 'yup';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const take = Number(searchParams.get('take') ?? '10');
  const skip = Number(searchParams.get('skip') ?? '0');

  if (isNaN(take)) {
    return NextResponse.json({ message: 'Take tiene que ser un numero' }, { status: 400 });
  }

  if (isNaN(skip)) {
    return NextResponse.json({ message: 'Skip tiene que ser un numero' }, { status: 400 });
  }

  const todos = await prisma.todo.findMany({
    take,
    skip
  });

  return NextResponse.json(todos);

}

let postShema = object({
  description: string().required(),
  complete: boolean().optional().default(false),
});

export async function POST(request: Request) {
  try {
    //const body = await request.json();
    // Usando YUP
    const { description, complete } = await postShema.validate(await request.json());
    const todo = await prisma.todo.create({ data: { description, complete } });
    return NextResponse.json(todo)
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    const deleteTodoComplete = await prisma.todo.deleteMany({ where: { complete: true } });

    return NextResponse.json(deleteTodoComplete)
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}