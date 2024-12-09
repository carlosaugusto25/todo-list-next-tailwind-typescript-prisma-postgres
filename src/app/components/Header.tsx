import { FaPlus } from "react-icons/fa";

interface HeaderProps {
    setModal: ()=>void;
}

export function Header({setModal}:HeaderProps){
    return(
        <header className="flex items-center justify-between w-full h-20 bg-slate-200 dark:bg-slate-800 px-8">
            <p className="font-[500] text-lg text-sky-500 dark:text-white">{'<devcarlos/>'}</p>
            <h1 className="text-center text-5xl font-[800] text-sky-500 dark:text-white">ToDo.List</h1>
            <button onClick={setModal} className="flex items-center gap-1 bg-sky-500 font-[600] p-2 rounded-md text-white"><FaPlus />Adicionar</button>
        </header>
    )
}