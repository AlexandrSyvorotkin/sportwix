import MainButton from "../../ui/button/main-button";
import arrow_icon from "../../assets/arrow-up-right.svg";
import img_bg from "../../assets/bg/ImgPrimary.png";

import epl from "../../assets/ligues/epl.png";
import laliga from "../../assets/ligues/laliga.svg";
import bundesliga from "../../assets/ligues/bundesliga.png";
import ligueone from "../../assets/ligues/ligueone.svg";
import nfl from "../../assets/ligues/nfl.svg";
import erd from "../../assets/ligues/eridivise.svg";
import Marquee from "react-fast-marquee";

const LIGUES = [
  {
    name: "Premier League",
    img: epl,
  },
  {
    name: "La-Liga",
    img: laliga,
  },
  {
    name: "Bundesliga",
    img: bundesliga,
  },
  {
    name: "Ligue 1",
    img: ligueone,
  },
  {
    name: "NFL",
    img: nfl,
  },
  {
    name: "Eridivisie",
    img: erd,
  },
];

const Description = () => {
  return (
    <div className="mt-36 flex flex-col items-center relative pb-[120px]">
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
        </div>
      </div>

      <h1 className="text-[73px] text-center ">
        SportWix — революционная платформа спортивной аналитики
      </h1>
      <p className="text-[21px] text-center w-full mt-[20px]">
        Используйте инструменты графического анализа в командных видах спорта
      </p>
      <MainButton className="py-[22px] px-[57px] flex items-center gap-2 mt-[52px]">
        Поиск команды
        <div className="">
          <img src={arrow_icon} alt="" className="w-full h-full object-cover" />
        </div>
      </MainButton>
      <div className="relative mt-[200px]">
        {/* Градиент */}
        <div className="absolute w-full h-[400px] -top-[200px] z-0">
          <div className="w-full h-full bg-[radial-gradient(60%_50%_at_50%_50%,#6366F1_0%,rgba(99,102,241,0.05)_60%,rgba(99,102,241,0)_80%)]"></div>
        </div>

        {/* Изображение */}
        <div className="relative z-10">
          <img src={img_bg} alt="" className="w-full h-full object-cover" />
        </div>

        <div className="flex justify-center mt-[80px]">
          <div className="w-[1200px] relative">
            {/* Градиенты по бокам */}
            <div className="absolute inset-y-0 left-0 w-[100px] bg-gradient-to-r from-[#0D0C0E] to-transparent z-10"></div>
            <div className="absolute inset-y-0 right-0 w-[100px] bg-gradient-to-l from-[#0D0C0E] to-transparent z-10"></div>
            
            <Marquee>
              <div className="flex gap-[64px]">
                {LIGUES.map((ligue) => (
                  <div className="flex items-center gap-2">
                    <div className="w-[40px] h-[40px]">
                      <img
                        src={ligue.img}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-[21px]">{ligue.name}</p>
                  </div>
                ))}
              </div>
            </Marquee>
          </div>
        </div>


      </div>
    </div>
  );
};

export default Description;
