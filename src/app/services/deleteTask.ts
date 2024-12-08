'use client'

export async function deleteTask(id: number): Promise<void> {
    const response = await fetch(`/api/todo?id=${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete task');
  }
  