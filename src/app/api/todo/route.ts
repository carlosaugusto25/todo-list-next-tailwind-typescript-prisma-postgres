import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
    return NextResponse.json(await prisma.task.findMany());
}

export async function POST(request: Request) {
    const body = await request.json();
    const newTodo = await prisma.task.create({data: {
        title: body.title,
        description: body.description,
        completed: body.completed,
        category: body.category

    }});
    return NextResponse.json({message: "success", newTodo});
}

export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const deletedTodo = await prisma.task.delete({where: {id: `${id}` }});
    return NextResponse.json({message: "Delete success", deletedTodo});
}

export async function PUT(request: Request) {
    const data = await request.json();
    const updateTodo = await prisma.task.update({
        where: {
            id: data.id
        },
        data: {
            title: data.title,
            description: data.description,
            completed: data.completed,
            category: data.category
        }
    })
    return NextResponse.json({message: "Edited success", updateTodo});
}