import './App.css'
import Community from './components/community/community'
import Description from './components/description/description'
import FAQ from './components/faq/faq'
import News from './components/news/news'
import Suggest from './components/suggest/suggest'
import Header from './layout/header/header'

function App() {


  return (
    <div className=" w-full h-screen">
        <Header />
        <Description />
        <Suggest />
        <News />
        <Community />
        <FAQ />
    </div>  
  )
}

export default App
