import './App.css'
import RoutingElement from './layout/header/header'
import Policy from './components/policy/policy'
import { useEffect, useState } from 'react'
import { Route, useLocation } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import NotFound from './pages/404'
import Main from './pages/main'
import PolicyPage from './pages/policy-page'
import Best from './pages/best/Best'
import Community from './pages/community/Community'
import News from './pages/news/news'
import background from './assets/bg/background.png'
import Chart from './pages/chart/chart'
import Header from './layout/header-legacy/legacy-header'

function App() {

  const [isOpen, setIsOpen] = useState(false);  
  
  const [backgroundVisible, setBackgroundVisible] = useState(false);
  const location = useLocation()
  useEffect(() => {

		if ( location.pathname === '/community'  || location.pathname === '/news' ) {
			setBackgroundVisible(true)
		} else {
			setBackgroundVisible(false)

		}
	}, [location])

  const is404Page = location.pathname !== '/' && location.pathname !== '/policy';

  const isStartPage = location.pathname === '/';

  return (
    <div className=" w-full h-screen">
      {isStartPage ? <RoutingElement tag="header" openModal={() => setIsOpen(true)} />  : <Header />}
      <Routes>
        <Route path="/" element={<Main isOpen={isOpen} setIsOpen={setIsOpen} />} />
        <Route path="/policy" element={<PolicyPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/chart" element={<Chart />} />


        {/* legacy routes */}
        <Route path="/best" element={<Best />} />
        <Route path="/community" element={<Community />} />
        <Route path="/news" element={< News/>} />
      </Routes>
      {!is404Page && (
        <>
          <RoutingElement tag="footer" openModal={() => setIsOpen(true)} />
          <Policy />
        </>
      )}
      {backgroundVisible ? <div className='absolute w-full h-full top-0 left-0 pointer-events-none'>
					<img src={background} alt="" className='w-full h-full bg-cover bg-no-repeat bg-fixed'/>
				</div> : null}
    </div>  
  )
} 

export default App


        
