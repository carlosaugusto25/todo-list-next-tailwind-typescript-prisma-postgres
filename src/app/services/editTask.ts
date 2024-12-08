'use client'

export async function updateTask(updates: {id: number, title: string; description: string, category: string}) {
    const response = await fetch(`/api/todo`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!response.ok) throw new Error('Failed to update task');
    return response.json();
  }
  