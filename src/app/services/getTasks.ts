'use server'

export interface Task  {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    createdAt: string;
  };
  
  export async function getTasks(): Promise<Task[]> {
    const response = await fetch('https://todolistfullstackwithprisma.vercel.app/api/todo');
    if (!response.ok) throw new Error('Failed to fetch todos');
    const todos = await response.json();
    return todos;
  }
  