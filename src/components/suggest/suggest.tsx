import { useState } from 'react'
import analyst from '../../assets/suggest/analyst.png'
import conscructor from '../../assets/suggest/constructor.png'
import strategy from '../../assets/suggest/strategy.png'
import { Container } from '@shared/index'

const SUGGESTIONS = [
  {
    name: 'Анализ',
    description: 'Сравнительный анализ в командных видах спорта',
    img: analyst,
    activeName: 'Analyst',
  },
  {
    name: 'Конструктор',
    description: 'Статистический конструктор с более 20 индикаторами',
    img: conscructor,
    activeName: 'Constructor',
  },
  {
    name: 'Стратегия',
    description: 'Возможность создания собственной уникальной стратегии',
    img: strategy,
    activeName: 'Strategy',
  },
]

const Suggest = () => {
  const [activeSuggestion, setActiveSuggestion] = useState('Analyst')

  return (
    <Container>
      <div className="xl:mt-[120px] lg:mt-[85px] md:mt-[65px] sm:mt-[55px] w-full flex justify-center flex-col items-center gap-4 xl:pb-[120px] lg:pb-[85px] md:pb-[65px] sm:pb-[55px]">
        <div className="flex items-center justify-center flex-col gap-4">
          <h2 className="xl:text-[54px] lg:text-[40px] md:text-[40px] sm:text-[24px]">
            Что мы предлагаем?
          </h2>
          <span className="xl:text-[19px] lg:text-[16px] md:text-[13px] opacity-70 text-center">
            Используйте наш инструментарий графического анализа и статистический конструктор
          </span>
        </div>
        <div className="flex justify-between gap-[20px] sm:hidden lg:flex mt-[50px]">
          <div className="flex flex-col gap-4">
            {SUGGESTIONS.map(it => (
              <div
                className={`xl:w-[662px] lg:w-[500px] xl:h-[154px] lg:h-[120px] bg-[#0F0F0F] relative overflow-hidden cursor-pointer`}
                onMouseEnter={() => setActiveSuggestion(it.activeName)}
              >
                {/* Верхний градиент для активного элемента */}
                {activeSuggestion === it.activeName && (
                  <div className="absolute top-0 left-0 right-0 h-[100px] bg-[radial-gradient(50%_50%_at_50%_0%,rgba(106,45,191,0.15)_0%,rgba(106,45,191,0)_100%)]" />
                )}

                {/* Нижний градиент для активного элемента */}
                {activeSuggestion === it.activeName && (
                  <div className="absolute bottom-0 left-0 right-0 h-[100px] bg-[radial-gradient(50%_50%_at_50%_100%,rgba(106,45,191,0.15)_0%,rgba(106,45,191,0)_100%)]" />
                )}

                <div className="flex gap-4 flex-col xl:mt-[32px] xl:ml-[52px] lg:mt-[28px] lg:ml-[28px] relative">
                  <div className="xl:text-[37px] lg:text-[24px] text-white">{it.name}</div>
                  <div className="xl:text-[19px] lg:text-[16px] text-white/70">
                    {it.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="xl:w-[930px] lg:w-[710px]">
            <img src={SUGGESTIONS.find(it => it.activeName === activeSuggestion)?.img} alt="" />
          </div>
        </div>
        <div className="sm:flex lg:hidden mt-[50px]">
          <div className="flex flex-col gap-4">
            {SUGGESTIONS.map(it => (
              <div className="flex flex-col gap-4 md:px-[44px] md:py-[20px] sm:px-[24px] sm:py-[20px] bg-[#111012] rounded-[12px]">
                <div className="flex flex-col gap-4">
                  <span className="text-white md:text-[24px] sm:text-[20px]">{it.name}</span>
                  <span className="text-white/70 md:text-[14px] sm:text-[13px]">
                    {it.description}
                  </span>
                </div>
                <div className="bg-[#0F0F0F] relative overflow-hidden cursor-pointer">
                  <img src={it.img} alt="" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Suggest
