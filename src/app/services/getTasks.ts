'use client'

export interface Task  {
    id: number;
    title: string;
    description: string;
    category: string;
    completed: boolean;
    createdAt: string;
  };
  
  export async function getTasks(): Promise<Task[]> {
    const response = await fetch('/api/todo');
    if (!response.ok) throw new Error('Failed to fetch todos');
    const todos = await response.json();
    return todos;
  }
  