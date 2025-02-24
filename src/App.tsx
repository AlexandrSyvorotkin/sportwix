import './App.css'
import Community from './components/community/community'
import Description from './components/description/description'
import FAQ from './components/faq/faq'
import News from './components/news/news'
import Platform from './components/platform/platform'
import Suggest from './components/suggest/suggest'
import RoutingElement from './layout/header/header'
import Policy from './components/policy/policy'

function App() {


  return (
    <div className=" w-full h-screen">
        <RoutingElement tag="header" />
        <Description />
        <Suggest />
        <News />
        <Community />
        <FAQ />
        <Platform />
        <RoutingElement tag="footer" />
        <Policy />
    </div>  
  )
} 

export default App
