import { useState } from "react";
import analyst from "../../assets/suggest/analyst.png";
import conscructor from "../../assets/suggest/constructor.png";
import strategy from "../../assets/suggest/strategy.png";

const SUGGESTIONS = [
    {
      name: 'Анализ',
      description: 'Сравнительный анализ в командных видах спорта',
      img: analyst,
      activeName: 'Analyst'
    },
    {
      name: 'Конструктор',
      description: 'Статистический конструктор с более 20 индикаторами',
      img: conscructor,
      activeName: 'Constructor'
    },
    {
      name: 'Стратегия',
      description: 'Возможность создания собственной уникальной стратегии',
      img: strategy,
      activeName: 'Strategy'
    }
]

const Suggest = () => {

  const [activeSuggestion, setActiveSuggestion] = useState('Analyst');

  return <div className="mt-[120px] w-full flex justify-center pb-[120px]">
    <div className="w-[1600px] flex justify-between gap-[20px]">
        <div className="flex flex-col gap-4">
            {SUGGESTIONS.map(it => (
                <div 
                  className={`w-[662px] h-[154px] bg-[#0F0F0F] relative overflow-hidden cursor-pointer`}
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

                    <div className="flex gap-4 flex-col mt-[32px] ml-[52px] relative">
                      <div className="text-[37px] text-white">{it.name}</div>
                      <div className="text-[19px] text-white/70">{it.description}</div>
                    </div>
                </div>
            ))}
        </div>
        <div className="">
          <img src={SUGGESTIONS.find(it => it.activeName === activeSuggestion)?.img} alt="" />
        </div>
    </div>
  </div>;
};

export default Suggest;
