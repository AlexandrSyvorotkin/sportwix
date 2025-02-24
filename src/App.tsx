import './App.css'
import Community from './components/community/community'
import Description from './components/description/description'
import FAQ from './components/faq/faq'
import News from './components/news/news'
import Platform from './components/platform/platform'
import Suggest from './components/suggest/suggest'
import RoutingElement from './layout/header/header'
import Policy from './components/policy/policy'
import Modal from './ui/modal/modal'
import { useState } from 'react'
import Teams from './components/teams/teams'

function App() {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className=" w-full h-screen">
        <RoutingElement tag="header" openModal={() => setIsOpen(true)} />
        <Description />
        <Suggest />
        <News />
        <Community />
        <FAQ />
        <Platform />
        <RoutingElement tag="footer" openModal={() => setIsOpen(true)} />
        <Policy />
        <Modal 
        modalType="teams"
        className="w-[556px] h-[556px]"
        title=""
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <Teams />
      </Modal>
    </div>  
  )
} 

export default App
