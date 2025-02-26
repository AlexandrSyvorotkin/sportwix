import Description from "../components/description/description";
import Suggest from "../components/suggest/suggest";
import News from "../components/news/news";
import Community from "../components/community/community";
import FAQ from "../components/faq/faq";
import Platform from "../components/platform/platform";
import Modal from "../ui/modal/modal";
import Teams from "../components/teams/teams";
interface MainProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Main = ({ isOpen, setIsOpen }: MainProps) => {
  return (
    <>
    <Description />
    <Suggest />
    <News />
    <Community />
    <FAQ />
    <Platform />
    
    <Modal 
    modalType="teams"
    className="w-[556px] h-[556px]"
    title=""
    isOpen={isOpen}
    onClose={() => setIsOpen(false)}
  >
    <Teams />
  </Modal>
  </>
  )
};

export default Main;
