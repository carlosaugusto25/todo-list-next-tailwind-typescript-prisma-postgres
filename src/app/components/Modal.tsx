interface ModalProps {
    children: React.ReactNode
    title: string
    onClose: () => void;
}

export function Modal({ children, title, onClose }: ModalProps) {
    return (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center backdrop-blur-[5px] max-[768px]:p-4" style={{background: 'rgba(0,0,0, 0.5)'}}>
            <div className="w-[450px] max-[768px]:w-full  box-s">
                <div className="bg-slate-300 dark:bg-slate-900 w-full h-full rounded-2xl p-8">
                    <div className="flex items-center justify-between">
                        <p className="m-0 text-2xl font-[500]">{title}</p>
                        <div className="m-0 text-4xl font-[500] cursor-pointer" onClick={onClose}>x</div>
                    </div>
                    <div className="my-8">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}