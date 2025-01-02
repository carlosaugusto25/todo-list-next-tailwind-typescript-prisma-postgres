import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(request: Request) {
    const data = await request.json();

    // Verifica se a estrutura dos dados está correta
    if (!Array.isArray(data) || data.some(item => !item.id || item.position == null)) {
        return NextResponse.json({ message: "Invalid data format" }, { status: 400 });
    }

    try {
        // Cria as operações de atualização
        const updateOperations = data.map(item =>
            prisma.task.update({
                where: { id: item.id },
                data: { position: item.position },
            })
        );

        // Executa todas as atualizações em uma transação
        await prisma.$transaction(updateOperations);

        return NextResponse.json({ message: "Tasks updated successfully" });
    } catch (error) {
        console.error('Error updating tasks:', error);
        return NextResponse.json({ message: "Error updating tasks" }, { status: 500 });
    }
}