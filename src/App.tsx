import './App.css'
import RoutingElement from './layout/header/header'
import Policy from './components/policy/policy'
import { useState } from 'react'
import { Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import NotFound from './pages/404'
import Main from './pages/main'
import PolicyPage from './pages/policy-page'


function App() {

  const [isOpen, setIsOpen] = useState(false);
  const is404Page = location.pathname !== '/' && location.pathname !== '/policy';

  return (
    <div className=" w-full h-screen">
      <RoutingElement tag="header" openModal={() => setIsOpen(true)} />
      <Routes>
        <Route path="/" element={<Main isOpen={isOpen} setIsOpen={setIsOpen} />} />
        <Route path="/policy" element={<PolicyPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!is404Page && (
        <>
          <RoutingElement tag="footer" openModal={() => setIsOpen(true)} />
          <Policy />
        </>
      )}
    </div>  
  )
} 

export default App


        
