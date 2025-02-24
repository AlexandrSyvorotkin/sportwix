interface ArrowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

const ArrowButton = ({ text, ...props }: ArrowButtonProps) => {
  return (
    <button className="flex items-center text-white/80 gap-1 flex-col" {...props}>
          <div className="flex items-center gap-2">
            <span className="text-lg">{text}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 -rotate-45"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </div>
          <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-color-violet to-transparent"></div>
        </button>
  )
};

export default ArrowButton;