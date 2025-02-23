import Logo from "../../components/logo/logo";
import icon_registration from "../../assets/registration-icon.svg";
import Navbar from "../navbar/navbar";

const Header = () => {
  return (
    <header className="flex items-center justify-between pt-5 px-[152px] border-b-2 border-[#1A191D] pb-[30px]">
      <Logo />
      <Navbar />
      <div className="flex items-center gap-3">
        <span>RU</span>
        <div className="">
          <img
            src={icon_registration}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <button className="flex items-center text-white/80 gap-1 flex-col">
          <div className="flex items-center gap-2">
            <span className="text-lg">Поиск команды</span>
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
      </div>
    </header>
  );
};

export default Header;
