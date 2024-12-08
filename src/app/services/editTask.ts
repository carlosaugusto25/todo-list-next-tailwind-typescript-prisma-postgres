'use server'

export async function updateTask(updates: {id: number, title: string; description: string }) {
    const response = await fetch(`https://todolistfullstackwithprisma.vercel.app/api/todo`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!response.ok) throw new Error('Failed to update task');
    return response.json();
  }
  