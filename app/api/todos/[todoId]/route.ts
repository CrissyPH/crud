import { prismadb } from "@/lib/db";
import { NextResponse } from "next/server";


export async function PATCH(req: Request, { params }: { params: { todoId: string } }) {
    try {

        const body = await req.json();

        const { title, description } = body;

        if (!title || !description) {
            return new NextResponse("Missing field requirments", { status: 400 })
        }

        const todo = await prismadb.todo.update({
            where: {
                id: params.todoId,
            },
            data: {
                title,
                description
            }
        })

        return NextResponse.json(todo)

    } catch (error) {
        console.log('[TODO_PATCH', error)
        return new NextResponse("Internal server error", { status: 500 })
    }
}

export async function DELETE(req: Request, { params }: { params: { todoId: string } }) {
    try {


        // const { userId } = auth();

        // if (!userId) {
        //     return new NextResponse("Unauthenticated", { status: 401 })
        // }



        const todo = await prismadb.todo.delete({
            where: {
                id: params.todoId,
            },
        })

        return NextResponse.json(todo)


    } catch (error) {
        console.log('[TODO_DELETE', error)
        return new NextResponse("Internal server error", { status: 500 })
    }
}

