"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTasks, Task } from "./services/getTasks";
import { createTask } from "./services/setTask";
import { deleteTask } from "./services/deleteTask";
import { updateTask } from "./services/editTask";
import { useState } from "react";

export default function Home() {

  const queryClient = useQueryClient();

  const { data, isLoading, error, isFetching, isSuccess } = useQuery<Task[]>({ queryKey: ['todos'], queryFn: getTasks, initialData: [] });

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [id, setId] = useState(0)

  const [editMode, setEditMode] = useState(false)

  const mutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      setTitle('')
      setDescription('')
    }
  })

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    }
  })

  const editMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      setEditMode(false)
      setTitle('')
      setDescription('')
      setId(0)
  }
  })

  const handleCreateTask = () => {
    mutation.mutate({
      title,
      description
    })
  }

  const editTaskFunction = (title: string, description: string, id: number) => {
    setTitle(title)
    setDescription(description)
    setId(id)
    setEditMode(true)
  }

  const handleEditTask = () => {
    editMutation.mutate({id, title, description})
  }

  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-4">
      <h1 className="text-center text-5xl ">ToDo.List</h1>
      {
        (isLoading || isFetching || isFetching) ?
          <div className="flex items-center justify-center h-96">
            <p className="text-2xl text-white">Carregando...</p>
          </div>
          :
          <ul className="overflow-y-auto h-96">
            {data?.map((todo) => (
              <div className="flex flex-col gap-2" key={todo.id}>
                <li>{todo.title}</li>
                <li>{todo.description}</li>
                <li>{todo.completed ? "true" : "false"}</li>
                <li>{Intl.DateTimeFormat().format(new Date(todo.createdAt)) || todo.createdAt}</li>
                <li className="flex gap-2">
                  <button className="bg-red-500 border-none outline-none rounded-md text-white p-4" onClick={() => deleteMutation.mutate(todo.id)}>Deletar</button>
                  <button className="bg-blue-500 border-none outline-none rounded-md text-white p-4" onClick={() => editTaskFunction(todo.title, todo.description, todo.id)}>Editar</button>
                </li>
                <li>-------------------------------------</li>
              </div>
            ))}
          </ul>
      }

      <br />
      <h2>Nova tarefa</h2>
      {
        mutation.isPending ?
          <p>Carregando...</p>
          :
          <form className="flex flex-col gap-2" action={ editMode ? handleEditTask : handleCreateTask}>
            <label htmlFor="title">Título</label>
            <input className="text-black rounded-md outline-none p-4" value={title} onChange={(e) => setTitle(e.target.value)} type="text" name="title" id="title" />
            <br />
            <label htmlFor="description">Descrição</label>
            <input className="text-black rounded-md outline-none p-4" value={description} onChange={(e) => setDescription(e.target.value)} type="text" name="description" id="description" />
            <br />
            {
              editMode ?
              <div className="flex gap-2">
                <button type="submit" className="bg-blue-500 border-none outline-none rounded-md text-white p-4">editar</button>
                <button type="button" className="bg-red-500 border-none outline-none rounded-md text-white p-4" onClick={() => {setEditMode(false); setId(0); setTitle(''); setDescription('');setDescription('');}}>cancelar</button>
              </div>
                :
                <button type="submit" className="bg-blue-500 border-none outline-none rounded-md text-white p-4">criar</button>
            }
            
          </form>
      }


    </div>
  );
}
