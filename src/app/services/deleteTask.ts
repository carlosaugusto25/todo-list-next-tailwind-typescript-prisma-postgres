'use server'

export async function deleteTask(id: number): Promise<void> {
    const response = await fetch(`https://todolistfullstackwithprisma.vercel.app/api/todo?id=${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete task');
  }
  