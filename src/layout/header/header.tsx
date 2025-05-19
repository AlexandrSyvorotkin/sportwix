import { Logo } from "@components/logo";
import icon_registration from "@assets/registration-icon.svg";
import { Navbar } from "../navbar";
import ArrowButton from "../../ui/arrow-button/arrow-button";
import BurgerMenu from "@assets/icons/burger-menu.svg?react";
import { MenuMobile } from "@components/menu-mobile";
import CloseIcon from "@assets/icons/close-icon.svg?react";
import { useState } from "react";

interface HeaderProps {
  openModal: () => void;
}

const links = [
  {
      name: "Графики",
      href: "/chart"
  },
  // {
  //     name: "Компания",
  //     href: "/company"
  // },
  {
      name: "Новости",
      href: "/news"
  },
  {
      name: "Комньюнити",
      href: "/community"
  },
  {
      name: "FAQ",
      href: "/faq"
  }
]

const Header = ({ openModal }: HeaderProps) => {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="flex items-center justify-between pt-5 xl:px-[152px] lg:px-[70px] md:px-[50px] sm:px-[23px] border-b-2 border-[#1A191D] pb-[30px]">
      <Logo />
      <Navbar links={links} isFooter={false}/>
      <div className="items-center gap-3 sm:hidden lg:flex">
        <span>RU</span>
        <div className="">
          <img
            src={icon_registration}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <ArrowButton text="Поиск команды" onClick={() => openModal()} />
      </div>
      {isOpen 
        ? <CloseIcon className="lg:hidden md:block" onClick={() => setIsOpen(false)}/> 
        : <BurgerMenu className="lg:hidden md:block" onClick={() => setIsOpen(true)} />
        }
      <MenuMobile isOpen={isOpen} links={links} />
    </header>
  );
};

export {Header};
