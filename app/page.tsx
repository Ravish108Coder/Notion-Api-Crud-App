'use client'

import CreateTodoDialog from "@/components/shared/CreateTodoDialog";
import TodoList from "@/components/shared/TodoList";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function Home() {

  const [todos, setTodos] = useState([])
    useEffect(() => {

        const fetchTodos = async () => {
            const response = await fetch('/api/todos', {
                method: 'GET'
            })

            const data = await response.json();
            setTodos(data.todos)
        }

        fetchTodos()

    }, [])
  
  return (
    <main className="pt-20 flex flex-col gap-10">
      <div className="flex items-center justify-center">
        <CreateTodoDialog setTodos={setTodos}/>
      </div>
      <TodoList todos={todos} setTodos={setTodos}/>
    </main>
  );
}
