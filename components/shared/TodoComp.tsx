interface TodoCompProps {
    todo: any,
    setTodos: any
}

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import EditTodoDialog from "./EditTodoDialog"

export default function TodoComp({ todo, setTodos }: TodoCompProps) {
    const handleDeleteTodo = async (pageId : string) => {
        const response = await fetch('/api/todos', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pageId }),
        })
        const data = await response.json();

        const response2 = await fetch('/api/todos', {
            method: 'GET'
        })

        const data2 = await response2.json();
        setTodos(data2.todos)
    }
    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>{todo.title}</CardTitle>
            </CardHeader>
            <CardContent>
                {todo.description}
                <div className="mt-4"><span className="font-bold">Status:</span> {todo.status}</div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button onClick={() =>handleDeleteTodo(todo.pageId)} variant="destructive">Delete</Button>
                <EditTodoDialog todo={todo} setTodos={setTodos} />
            </CardFooter>
        </Card>
    )
}
