import './App.css'
import Description from './components/description/description'
import Suggest from './components/suggest/suggest'
import Header from './layout/header/header'

function App() {


  return (
    <div className=" w-full h-screen">
        <Header />
        <Description />
        <Suggest />
    </div>
  )
}

export default App
