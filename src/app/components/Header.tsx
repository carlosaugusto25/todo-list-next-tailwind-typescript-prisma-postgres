import { FaPlus } from "react-icons/fa";
import { useTheme } from "../context/theme-context";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { IoSunny } from "react-icons/io5";

interface HeaderProps {
    setModal: ()=>void;
}

export function Header({setModal}:HeaderProps){
    
    const { theme, toggleTheme } = useTheme()
    
    return(
        <header className="flex items-center justify-between w-full h-20 bg-slate-200 dark:bg-slate-800 max-[768px]:px-4 px-8">
            <p className="max-[768px]:hidden font-[600] text-lg text-blue-500 dark:text-white">{'<devcarlos/>'}</p>
            <h1 className="text-center max-[768px]:text-3xl text-5xl font-[800] text-blue-500 dark:text-white">ToDo.List</h1>
            <div className="flex gap-2">
            <button onClick={toggleTheme} className={`${theme === 'light' ? 'bg-slate-900' : 'bg-slate-700'} max-[768px]:text-sm rounded-md text-white py-2 px-4`}>{theme === 'light' ? <BsFillMoonStarsFill/> : <IoSunny/>}</button>
            <button onClick={setModal} className="flex max-[768px]:text-xs items-center gap-1 bg-blue-500 font-[600] p-2 rounded-md text-white"><FaPlus />Adicionar</button>
            </div>
        </header>
    )
}