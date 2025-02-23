import { cn } from "../../utils/utils";

interface MainButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}


const MainButton = ({ children, onClick, className }: MainButtonProps) => {
  return (
    <button className={cn("bg-violet-gradient rounded-[12px]", className)} onClick={onClick}>
      {children}
    </button>
  )
}

export default MainButton;

