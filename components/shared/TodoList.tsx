'use client'

import { useEffect, useState } from "react"
import TodoComp from "./TodoComp"

interface TodoListProps {
    todos: any,
    setTodos: any
}

import { Skeleton } from "@/components/ui/skeleton"

function TodoSkeleton() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}


const TodoList = ({todos, setTodos} : TodoListProps) => {

    

    return (
        <ul className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-y-10 place-items-center">
            {
                todos.length > 0 ? (
                    todos.map((todo: any) => {
                        return <TodoComp key={todo.pageId} todo={todo} setTodos={setTodos} />
                    })
                ) : (
                    Array(6).fill(0).map((item, index) => {
                        return <TodoSkeleton key={index} />
                    })
                )
                
            }
        </ul>
    )
}

export default TodoList

