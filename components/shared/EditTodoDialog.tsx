'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { set, useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

const formSchema = z.object({
    title: z.string().min(3, {
        message: "Title must be at least 3 characters.",
    }),
    description: z.string().min(6, {
        message: "Description must be at least 6 characters.",
    }).max(50, {
        message: "Description must be at most 50 characters."
    }),
    status: z.string().min(1, {
        message: "Please select todo status.",
    })
})


import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"
import { Loader2 } from "lucide-react"

interface EditTodoDialogProps {
    todo: any,
    setTodos: any
}

export default function EditTodoDialog({todo, setTodos} : EditTodoDialogProps) {

    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false)

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: todo.title,
            description: todo.description,
            status: todo.status

        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        // console.log(values)
        setLoading(true)

        const editTodoAndUpdateTodos = async () => {
            const response = await fetch('/api/todos', {
                method: 'PUT',
                body: JSON.stringify({...values, pageId: (todo as any).pageId}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const data = await response.json()
            console.log(data)

            const response2 = await fetch('/api/todos', {
                method: 'GET'
            })

            const data2 = await response2.json();
            setTodos(data2.todos)

            
        }
        editTodoAndUpdateTodos().then(() =>{setLoading(false), setIsOpen(false)})

    }

    return (
        <Dialog open={isOpen} onOpenChange={() => {
            isOpen ? (form.reset(), setIsOpen(false)) : setIsOpen(true)
        }}>
            <DialogTrigger asChild>
                <Button variant="outline">Edit</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Todo</DialogTitle>
                </DialogHeader>
                
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => {
                                const {ref, ...rest} = field
                                return <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} autoComplete="off" placeholder="Add Title..." {...rest} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            }}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => {
                                const {ref, ...rest} = field
                                return <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} autoComplete="off" placeholder="Add Description..." {...rest} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            }}
                        />
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => {
                                const {ref, ...rest} = field
                                return <FormItem>
                                    <FormLabel>Product Name</FormLabel>
                                    <FormControl>
                                        <Select {...rest} value={field.value} onValueChange={(value : any) => field.onChange(value)}>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select Status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Todo Status</SelectLabel>
                                                    <SelectItem value="In Progress">In Progress</SelectItem>
                                                    <SelectItem value="Done">Done</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            }}
                        />
                        {
                            loading ? (

                                <Button type="button"><Loader2 /> Saving</Button>
                            ) : (
                                <Button type="submit">Save changes</Button>
                            )
                        }

                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
