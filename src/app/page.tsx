"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTasks, Task } from "./services/getTasks";
import { createTask } from "./services/setTask";
import { deleteTask } from "./services/deleteTask";
import { updateTask } from "./services/editTask";
import { FiEdit } from "react-icons/fi";
import { FaTrashAlt, FaListUl } from "react-icons/fa";
import { IoMdCheckboxOutline } from "react-icons/io";
import { Header } from "./components/Header";
import { Modal } from "./components/Modal";
import Image from "next/image";
import { FaBullseye } from "react-icons/fa6";
import { useTheme } from "./context/theme-context";
import { toast } from "react-toastify";

export default function Home() {

  const { theme } = useTheme()

  const queryClient = useQueryClient();

  const { data, isLoading, isFetching, isSuccess } = useQuery<Task[]>({ queryKey: ['todos'], queryFn: getTasks, initialData: [] });



  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [id, setId] = useState(0)
  const [completed, setCompleted] = useState(false)

  const [editMode, setEditMode] = useState(false)

  const [modalNewTask, setModalNewTask] = useState(false)
  const [modalEditTask, setModalEditTask] = useState(false)
  const [modalDeleteTask, setModalDeleteTask] = useState(false)
  const [modalDetailsTask, setModalDetailsTask] = useState(false)

  const mutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      setTitle('')
      setDescription('')
      setCategory('')
      setModalNewTask(false)
      toast.success('Tarefa criada com sucesso!')
    },
    onError: () => {
      toast.error('Erro ao criar nova tarefa.')
    }
  })

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      setId(0)
      setModalDeleteTask(false)
      toast.success('Tarefa excluída com sucesso!')
    },
    onError: () => {
      toast.error('Erro ao excluir tarefa')
    }
  })

  const editMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      setEditMode(false)
      setTitle('')
      setDescription('')
      setCategory('')
      setId(0)
      if (modalEditTask) {
        toast.success('Tarefa editada com sucesso!')
      }
      setModalEditTask(false)
    },
    onError: () => {
      toast.error('Erro ao editar tarefa')
    }
  })

  const handleCreateTask = () => {
    mutation.mutate({
      title,
      description,
      category
    })
  }

  const editTaskFunction = (title: string, description: string, id: number, category: string, completedTask: boolean) => {
    setTitle(title)
    setDescription(description)
    setId(id)
    setEditMode(true)
    setCategory(category)
    setCompleted(completedTask)
    setModalEditTask(true)
  }

  const openModalDelete = (idDelete: number) => {
    setId(idDelete)
    setModalDeleteTask(true)
  }

  const openModalDetails = (title: string, description: string, category: string, completedTask: boolean) => {
    setTitle(title)
    setDescription(description)
    setCategory(category)
    setCompleted(completedTask)
    setModalDetailsTask(true)
  }

  const closeModalDetailsTask = () => {
    setModalDetailsTask(false)
    setTitle('')
    setDescription('')
    setCategory('')
    setCompleted(false)
  }

  const handleEditTask = () => {
    editMutation.mutate({ id, title, description, category, completed })
  }

  return (
    <>
      <Header setModal={() => setModalNewTask(true)} />
      <div className="p-4 max-w-4xl mx-auto h-[calc(100vh-5rem)]">
        {
          (isLoading || isFetching || isSuccess) ?
            <div className="flex items-center justify-center h-[calc(100vh-6rem)]">
              {theme === 'light' ? <Image src="/assets/spinner-blue.svg" alt="spinner" width={100} height={100} /> : <Image src="/assets/spinner-white.svg" alt="spinner" width={100} height={100} />}
            </div>
            :
            <div className="">
              {data?.map((todo) => (
                <div className={`flex w-full ${todo.completed ? 'bg-gray-100 dark:bg-slate-600' : 'bg-gray-200 dark:bg-slate-500'} rounded-md p-4 mb-4 justify-between max-[768px]:flex-col max-[768px]:gap-4`} key={todo.id}>
                  <div>
                    <p className={`text-blue-500 ${todo.completed ? 'line-through text-slate-300 dark:text-slate-500' : ''} dark:text-slate-100 font-[800] text-4xl `}>{todo.title.charAt(0).toUpperCase() + todo.title.slice(1)}</p>
                    <p className={`${todo.completed ? 'line-through text-slate-500' : ''} text-base font-[500] text-ellipsis text-nowrap overflow-hidden w-[600px] max-[768px]:w-[300px]`}>{todo.description.charAt(0).toUpperCase() + todo.description.slice(1)}</p>
                    <div className="flex items-center gap-2">
                      <p className="font-[300] text-xs">{Intl.DateTimeFormat().format(new Date(todo.createdAt)) || todo.createdAt}</p>
                      <p className="font-[500] text-xs text-white bg-blue-500 p-1 rounded-md">{todo.category.charAt(0).toUpperCase() + todo.category.slice(1)}</p>
                      <>
                        {
                          todo.completed ?
                            <p className="font-[500] text-xs text-white bg-green-500 p-1 rounded-md">Concluido</p>
                            :
                            <p className="font-[500] text-xs text-white bg-red-500 p-1 rounded-md">Pendente</p>
                        }
                      </>
                    </div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <button className="bg-blue-500 border-none outline-none rounded-md text-white p-3" onClick={() => openModalDetails(todo.title, todo.description, todo.category, todo.completed)} ><FaListUl /></button>
                    <button className="bg-blue-500 border-none outline-none rounded-md text-white p-3" onClick={() => openModalDelete(todo.id)}><FaTrashAlt /></button>
                    {!todo.completed && <button className="bg-blue-500 border-none outline-none rounded-md text-white p-3" onClick={() => editTaskFunction(todo.title, todo.description, todo.id, todo.category, todo.completed)}><FiEdit /></button>}
                    <button className={`${todo.completed ? 'bg-slate-700' : 'bg-green-500'} border-none outline-none rounded-md ${todo.completed ? 'text-slate-400' : 'text-white'} text-2xl p-2`} onClick={() => editMutation.mutate({ title: todo.title, description: todo.description, id: todo.id, category: todo.category, completed: !todo.completed })}><IoMdCheckboxOutline /></button>
                  </div>
                </div>
              ))}
            </div>
        }

        {
          modalNewTask &&
          <Modal onClose={() => { setModalNewTask(false); setTitle(''); setDescription(''); setCategory('') }} title="Nova Tarefa">
            {
              mutation.isPending ?
                <div className="flex items-center justify-center h-48">
                  {theme === 'light' ? <Image src="/assets/spinner-blue.svg" alt="spinner" width={100} height={100} /> : <Image src="/assets/spinner-white.svg" alt="spinner" width={100} height={100} />}
                </div>
                :
                <form className="flex flex-col gap-2" action={editMode ? handleEditTask : handleCreateTask}>
                  <label htmlFor="title">Título</label>
                  <input className="text-black rounded-md outline-none p-4" value={title} onChange={(e) => setTitle(e.target.value)} type="text" name="title" id="title" />
                  <label htmlFor="description">Descrição</label>
                  <input className="text-black rounded-md outline-none p-4" value={description} onChange={(e) => setDescription(e.target.value)} type="text" name="description" id="description" />
                  <label htmlFor="categroy">Categoria</label>
                  <input className="text-black rounded-md outline-none p-4 mb-6" value={category} onChange={(e) => setCategory(e.target.value)} type="text" name="categoryy" id="category" />
                  <button type="submit" className="bg-blue-500 border-none outline-none rounded-md text-white p-4">Criar Tarefa</button>
                </form>
            }
          </Modal>
        }

        {
          modalEditTask &&
          <Modal onClose={() => { setModalEditTask(false); setTitle(''); setDescription(''); setCategory('') }} title="Editar Tarefa">
            {
              editMutation.isPending ?
                <div className="flex items-center justify-center h-48">
                  {theme === 'light' ? <Image src="/assets/spinner-blue.svg" alt="spinner" width={100} height={100} /> : <Image src="/assets/spinner-white.svg" alt="spinner" width={100} height={100} />}
                </div>
                :
                <form className="flex flex-col gap-2" action={editMode ? handleEditTask : handleCreateTask}>
                  <label htmlFor="title">Título</label>
                  <input className="text-black rounded-md outline-none p-4" value={title} onChange={(e) => setTitle(e.target.value)} type="text" name="title" id="title" />
                  <label htmlFor="description">Descrição</label>
                  <input className="text-black rounded-md outline-none p-4" value={description} onChange={(e) => setDescription(e.target.value)} type="text" name="description" id="description" />
                  <label htmlFor="categroy">Categoria</label>
                  <input className="text-black rounded-md outline-none p-4 mb-6" value={category} onChange={(e) => setCategory(e.target.value)} type="text" name="categoryy" id="category" />
                  <button type="submit" className="bg-blue-500 border-none outline-none rounded-md text-white p-4">Editar</button>
                </form>
            }
          </Modal>
        }

        {
          modalDeleteTask &&
          <Modal title="Excluir Tarefa" onClose={() => setModalDeleteTask(false)}>
            <p className="font-[500] text-lg mb-4">Tem certeza que deseja excluir esta tarefa?</p>
            <button className="w-full bg-red-500 border-none outline-none rounded-md text-white p-4" onClick={() => deleteMutation.mutate(id)}>Excluir</button>
          </Modal>
        }

        {
          modalDetailsTask &&
          <Modal title="Detalhes" onClose={closeModalDetailsTask}>
            <p className="font-[300] text-lg mb-4 flex flex-col">Título: <span className="font-[700] text-5xl">{title.charAt(0).toUpperCase() + title.slice(1)}</span></p>
            <p className="font-[300] text-lg mb-4 flex flex-col">Descrição: <span className="font-[500] text-3xl">{description.charAt(0).toUpperCase() + description.slice(1)}</span></p>
            <div className="flex gap-4 mt-4">
              <p className="font-[500] text-base text-white bg-blue-500 py-1 px-2 rounded-md">{category.charAt(0).toUpperCase() + category.slice(1)}</p>
              <>
                {
                  completed ?
                    <p className="font-[500] text-base text-white bg-green-500 py-1 px-2 rounded-md">Concluido</p>
                    :
                    <p className="font-[500] text-base text-white bg-red-500 py-1 px-2 rounded-md">Pendente</p>
                }
              </>
            </div>
          </Modal>
        }

      </div>
    </>
  );
}
