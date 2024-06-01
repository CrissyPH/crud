import { prismadb } from "@/lib/db";
import { NextResponse } from "next/server"



export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { title, description } = body;

        if (!title || !body) {
            return new NextResponse("Missing required fields", { status: 400 })
        }


        const todo = await prismadb.todo.create({
            data: {
                title,
                description
            }
        })

        return NextResponse.json(todo)


    } catch (error) {
        console.log(error)
        return new NextResponse("Internal error", { status: 500 })
    }
}