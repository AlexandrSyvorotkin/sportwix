import { cn } from "../../utils/utils";

interface MainButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}


const MainButton = ({ children, onClick, className }: MainButtonProps) => {
  return (
    <button className={cn("bg-violet-gradient rounded-[12px] xl:py-[20px] xl:px-[57px] lg:py-[17px] lg:px-[30px] md:py-[17px] md:px-[37px] sm:py-[12px] sm:px-[29px]", className)} onClick={onClick}>
      {children}
    </button>
  )
}

export default MainButton;

