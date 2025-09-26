/* rag comands */

import prisma from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'

export async function POST(request: Request) {

  /* const todo = await prisma.todo.create({
    data: { description: 'Piedra del alma' }
  }); */

  await prisma.todo.deleteMany(); // delete * from

  await prisma.todo.createMany({
    data: [
      { description: 'Piedra del alma', complete: true },
      { description: 'Piedra del poder' },
      { description: 'Piedra del tiempo' },
      { description: 'Piedra del espacio' },
    ]
  })



  return NextResponse.json({ message: 'Seed Executed' })
}