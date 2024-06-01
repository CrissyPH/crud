"use client"

import { useParams, useRouter } from "next/navigation"
import { Button } from "./ui/button"
import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { Trash } from "lucide-react"

interface UpdateButtonProps {
    todoId: string
}


export const DeleteButton = ({ todoId }: UpdateButtonProps) => {

    const params = useParams();

    const [loading, setLoading] = useState(false)
    const router = useRouter();

    const onDelete = async (todoId: string) => {
        try {
            setLoading(true)

            await axios.delete(`/api/todos/${params.todoId}`)
            router.refresh();
            router.push('/')
            toast.success
        } catch (error) {
            toast.error("Error Deleting")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Button size="icon" disabled={loading} variant="destructive" onClick={() => onDelete(todoId)}><Trash /></Button>
    )
}
