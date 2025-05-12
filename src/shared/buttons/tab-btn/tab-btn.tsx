interface TabBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode,
    isActive:boolean
}

const btnStyles = 'p-1.5 border border-[#5C5C5C] h-6 flex justify-center items-center rounded-full font-normal text-sm leading-[17px] text-white cursor-pointer whitespace-nowrap'

const TabBtn = ({children, isActive, ...props}: TabBtnProps) => {
    return (
        <button {...props} className={`${btnStyles} ${isActive ? 'bg-[#A266F4]' : 'bg-transparent'}`}>{children}</button>
    )
}

export {TabBtn} 
