import MainButton from "@ui/button/main-button"
import arrow_icon from "@assets/arrow-up-right.svg"
import { Link } from "react-router-dom"
import ArrowButton from "@ui/arrow-button/arrow-button"
import { Separator } from "@shared/separator"

const menuStyles = 'fixed top-[88px] right-0 h-full w-full bg-[#0D0C0E] transform transition-transform duration-300 ease-in-out flex flex-col items-center z-50'

const MenuMobile = ({ isOpen, links }: { isOpen: boolean, links: { name: string, href: string }[] }): JSX.Element => {
    const isMenuOpen = isOpen ? 'translate-x-0' : 'translate-x-full'
    return (
        <div className={`${menuStyles} ${isMenuOpen}`}>
            <div className="flex flex-col items-center gap-4 w-full mt-[100px]">
                {links.map((link) => (
                    <Link key={link.name} to={link.href} className="text-white text-[24px]">
                        <div className="flex items-center flex-col gap-[20px]">
                            <span className="text-white sm:text-[24px] md:text-[32px]">{link.name}</span>
                            <Separator className="bg-[#1A191D] w-[200px] h-[1px]"/>
                        </div>
                    </Link>
                ))}
            </div>
            <div className="flex flex-col items-center w-full mt-[100px]">
                <MainButton className="py-[22px] px-[57px] flex items-center gap-2 mt-[110px]">
                    Регистрация
                    <div className="">
                        <img src={arrow_icon} alt="" className="w-full h-full object-cover" />
                    </div>
                </MainButton>
                <ArrowButton text="Поиск команды" onClick={() => null} className="mt-[32px]"/>
                <span className="text-white text-[24px] mt-[120px]">RU</span>
            </div>
        </div>
    )
}

export { MenuMobile }
