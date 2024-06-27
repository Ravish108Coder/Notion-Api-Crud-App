'use client'

import { useEffect, useState } from "react"
// 'use client'
// import { useQuery } from "react-query"

export const useFetchTodos = () => {
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

    return todos;
}