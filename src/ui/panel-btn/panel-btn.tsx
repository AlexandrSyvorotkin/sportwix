interface PanelBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon: React.ReactNode
}

const PanelBtn = ({ icon, ...props }: PanelBtnProps) => {
    return (
        <button 
            {...props} 
            className='w-10 h-10 flex items-center justify-center hover:bg-btn-hover rounded disabled:opacity-50 disabled:cursor-not-allowed'
        >
            {icon}
        </button>
    )
}

export default PanelBtn