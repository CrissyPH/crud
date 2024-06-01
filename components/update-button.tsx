"use client"

import { useRouter } from "next/navigation"
import { Button } from "./ui/button"

interface UpdateButtonProps {
    todoId: string
}


export const UpdateButton = ({ todoId }: UpdateButtonProps) => {
    const router = useRouter();

    const onEdit = (todoId: string) => {
        router.push(`/update/${todoId}`);
    }

    return (
        <Button onClick={() => onEdit(todoId)}>Actions</Button>
    )
}
