import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
    const allTodos = await prisma.task.findMany();
    return NextResponse.json({allTodos});
}

export async function POST(request: Request) {
    const body = await request.json();
    const newTodo = await prisma.task.create({data: {
        title: body.title,
        description: body.description,
        completed: body.completed
    }});
    return NextResponse.json({message: "success", newTodo});
}