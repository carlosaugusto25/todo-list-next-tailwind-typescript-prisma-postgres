"use client";
import { useQuery } from "@tanstack/react-query";
import { getTasks, Task } from "./services/getTasks";

export default function Home() {

  const { data, isLoading, error } = useQuery<Task[]>({ queryKey: ['todos'], queryFn: getTasks, initialData: [] });

  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  console.log(data)

  return (
    <div className="p-4">
      <h1 className="text-center text-5xl ">todo.List</h1>
      <ul>
        {data?.map((todo) => (
          <div key={todo.id}>
            <li>{todo.title}</li>
            <li>{todo.description}</li>
            <li>{todo.completed ? "true" : "false"}</li>
            <li>{todo.createdAt}</li>
          </div>
        ))}
      </ul>
    </div>
  );
}
