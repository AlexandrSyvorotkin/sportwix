import Logo from "../../components/logo/logo";
import icon_registration from "../../assets/registration-icon.svg";
import Navbar from "../navbar/navbar";
import ArrowButton from "../../ui/arrow-button/arrow-button";

interface HeaderProps {
  tag?: React.ElementType;
  openModal: () => void;
}

const RoutingElement = ({ tag, openModal }: HeaderProps) => {

  const Tag = tag || "div";

  return (
    <Tag className="flex items-center justify-between pt-5 px-[152px] border-b-2 border-[#1A191D] pb-[30px]">
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
        <ArrowButton text="Поиск команды" onClick={() => openModal()} />
      </div>
    </Tag>
  );
};

export default RoutingElement;
