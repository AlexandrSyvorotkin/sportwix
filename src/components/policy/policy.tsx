import { useNavigate } from 'react-router-dom'

const Policy = () => {
  const navigate = useNavigate()

  return (
    <div className="lg:flex-row sm:flex-col  lg:items-center sm:items-start sm:gap-4 lg:gap-0 flex items-center justify-between px-[152px] md:px-[50px] sm:px-[23px] py-[40px] w-full">
      <span className="text-[16px] opacity-70">© Sport Wix, Inc., 2024 Все права защищены.</span>
      <span className="text-[16px] opacity-70 cursor-pointer" onClick={() => navigate('/policy')}>
        Политика конфиденциальности
      </span>
    </div>
  )
}

export default Policy
