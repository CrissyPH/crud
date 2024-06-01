

import { EditPage } from '@/components/edit-form'
import { prismadb } from '@/lib/db'
import { redirect } from 'next/navigation'
import React from 'react'

interface UpdatePageProps {
    params: {
        todoId: string
    }
}


const UpdatePage = async ({ params }: UpdatePageProps) => {

    const todo = await prismadb.todo.findFirst({
        where: {
            id: params.todoId
        }
    })

    if (!todo) {
        redirect("/")
    }

    return (
        <div>
            <EditPage initialData={todo} />
        </div>
    )
}

export default UpdatePage