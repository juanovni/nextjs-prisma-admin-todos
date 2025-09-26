import prisma from "@/lib/prisma"
import { Metadata } from "next"
import { TodosGrid } from "@/todos";
import { NewTodo } from "@/todos/components/NewTodo";


export const metadata: Metadata = {
  title: 'Listado de Todos',
  description: 'SEO TODOS'
}

export default async function RestTodosPage() {
  // USANDO PRISMA
  const todos = await prisma.todo.findMany({ orderBy: { description: 'asc' } });

  return (
    <div>
      <div className="w-full px-3 mx-5 mb-5">
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </div>
  )
}
