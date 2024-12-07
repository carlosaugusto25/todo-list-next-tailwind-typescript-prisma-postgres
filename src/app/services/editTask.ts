'use server'

async function updateTask(updates: {id: string, title: string; description: string, completed: boolean }) {
    const response = await fetch(`http://localhost:3000/api/todo`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!response.ok) throw new Error('Failed to update task');
    return response.json();
  }
  