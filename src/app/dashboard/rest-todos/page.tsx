import prisma from "@/lib/prisma"
import { Metadata } from "next"
import { TodosGrid } from "@/todos";
import { NewTodo } from "@/todos/components/NewTodo";
import { getUserSessionServer } from "@/app/auth/actions/auth-actions";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: 'Listado de Todos',
  description: 'SEO TODOS'
}

export default async function RestTodosPage() {

  const user = await getUserSessionServer();
  if (!user) redirect('/api/auth/signin');

  const todos = await prisma.todo.findMany({
    where: { userId: user.id },
    orderBy: { description: 'asc' }
  });

  return (
    <div>
      <div className="w-full px-3 mx-5 mb-5">
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </div>
  )
}
