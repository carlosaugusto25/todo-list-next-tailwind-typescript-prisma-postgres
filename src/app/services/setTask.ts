"use server";
import { Task } from "./getTasks";

export async function createTask(newTask: { title: string, description: string, category: string }): Promise<Task> {
    const response = await fetch('/api/todo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask),
    });
    if (!response.ok) throw new Error('Failed to create post');
    return response.json();
  }