import MainButton from '../ui/button/main-button'
import arrow_icon from '../assets/arrow-up-right.svg'
const NotFound = () => {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-84px)] w-full relative">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Контейнер с градиентами по бокам */}
        <div className="relative w-full h-full">
          {/* Сама сетка */}
          <div className="w-full h-full grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] grid-rows-[repeat(auto-fill,minmax(100px,1fr))]">
            {Array(200)
              .fill(null)
              .map((_, i) => (
                <div key={i} className="border border-white/[0.03]"></div>
              ))}
          </div>

          {/* Градиенты по бокам */}
          <div className="absolute inset-y-0 left-0 w-[1200px] bg-gradient-to-r from-[#0D0C0E] to-transparent"></div>
          <div className="absolute inset-y-0 right-0 w-[1200px] bg-gradient-to-l from-[#0D0C0E] to-transparent"></div>

          <div className="absolute w-full h-[400px] -bottom-[200px] z-0 ">
            <div className="w-full h-full bg-[radial-gradient(60%_50%_at_50%_50%,#6366F1_0%,rgba(99,102,241,0.05)_60%,rgba(99,102,241,0)_80%)]"></div>
          </div>

          <div className="flex flex-col items-center justify-center absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <h2 className="text-grey-gradient text-[130px] opacity-70">404</h2>
            <span className="text-[54px] mt-[20px]">Страница не найдена</span>
            <p className="text-grey-gradient text-[18px] mt-[16px]">
              Возможно она была перемещена, или вы неверно указали адрес страницы
            </p>
            <MainButton className="p-[20px] mt-[44px] flex items-center gap-2 cursor-pointer">
              <span>Вернуться на главную</span>
              <div className="w-[20px] h-[20px]">
                <img src={arrow_icon} alt="" className="w-full h-full object-cover" />
              </div>
            </MainButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
