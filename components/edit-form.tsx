"use client";

import { todoSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { useState } from "react";
import { Button } from "./ui/button";
import toast from "react-hot-toast";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { Todo } from "@prisma/client";
import { AlertModal } from "./modal/alert-modal";
import { Edit, Trash2 } from "lucide-react";


interface EditPageProps {
    initialData: Todo;
}


export const EditPage = ({ initialData }: EditPageProps) => {


    const params = useParams();

    const [loading, setLoading] = useState(false)

    const [open, setOpen] = useState(false)

    const router = useRouter()


    const form = useForm<z.infer<typeof todoSchema>>({
        resolver: zodResolver(todoSchema),
        defaultValues: initialData
    })


    const onSubmit = async (values: z.infer<typeof todoSchema>) => {
        try {
            setLoading(true)
            await axios.patch(`/api/todos/${params.todoId}`, values)
            toast.success("Update succesfully")
            router.push('/')
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }
    }


    const onDelete = async () => {

        try {
            setLoading(true)
            await axios.delete(`/api/todos/${params.todoId}`)
            router.push('/')
            toast.success("Deleted")
            router.refresh();

        } catch (error) {
            toast.error("Error Deleting Tdo")
        } finally {
            setLoading(false)
            setOpen(false)
        }
    }



    return (

        <>

            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />

            <div className="pt-10">
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
                            <div className="flex items-center justify-end pt-4 space-x-4">
                                <Button variant="outline" disabled={loading} type="submit"><Edit className="w-4 h-4 mr-2" />Save changes</Button>
                                <Button type="button" variant="destructive" onClick={() => setOpen(true)} disabled={loading}><Trash2 className="w-4 h-4 mr-2" />Delete</Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </>
    )
}