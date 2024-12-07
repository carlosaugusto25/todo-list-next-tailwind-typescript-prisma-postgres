'use server'

import { Task } from "./getTasks";

export async function createTask(newTask: { title: string, description: string }): Promise<Task> {
    const response = await fetch('http://localhost:3000/api/todo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask),
    });
    if (!response.ok) throw new Error('Failed to create post');
    return response.json();
  }