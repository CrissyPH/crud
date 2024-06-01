"use client";

import { todoSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { todo } from "node:test";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { useState } from "react";
import { Button } from "./ui/button";
import toast from "react-hot-toast";

import axios from "axios";
import { useRouter } from "next/navigation";


export const TodoForm = () => {

    const [loading, setLoading] = useState(false)

    const router = useRouter()


    const form = useForm<z.infer<typeof todoSchema>>({
        resolver: zodResolver(todoSchema),
        defaultValues: {
            title: "",
            description: ""
        }
    })


    const onSubmit = async (values: z.infer<typeof todoSchema>) => {
        try {
            setLoading(true)

            await axios.post('/api/todos', values)
            router.refresh();
            toast.success("Todo created")


        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }
    }


    return (
        <div className="">
            <div className="flex items-center justify-center">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Title" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="">Description</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} className="w-[500px]" placeholder="Description" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center justify-end pt-2">
                            <Button disabled={loading} type="submit">Create</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}