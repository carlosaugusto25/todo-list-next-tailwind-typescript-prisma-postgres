interface ListProps {
  id: number;
  title: string;
  description: string;
  position: number;
  category: string;
  completed: boolean;
}


export async function updateTask(updates: {id: number, title: string, description: string, position: number, category: string, completed: boolean}) {
    const response = await fetch(`/api/todo`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!response.ok) throw new Error('Failed to update task');
    return response.json();
  }

  export async function updateAllTask(updates: ListProps[]) {
    const response = await fetch(`/api/updatedata`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!response.ok) throw new Error('Failed to update task');
    return response.json();
  }
  