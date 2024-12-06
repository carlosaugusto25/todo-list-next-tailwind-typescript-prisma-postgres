'use server'

import { Task } from "./getTasks";

export async function createTask(newTask: { title: string, description: string, completed: boolean }): Promise<Task> {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask),
    });
    if (!response.ok) throw new Error('Failed to create post');
    return response.json();
  }