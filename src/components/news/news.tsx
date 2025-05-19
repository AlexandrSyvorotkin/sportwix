import ArrowButton from "../../ui/arrow-button/arrow-button";
import news_1 from "../../assets/news-bg/ImgNews1.png";
import news_2 from "../../assets/news-bg/ImgNews2.png";
import news_3 from "../../assets/news-bg/ImgNews3.png";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";


const NEWS = [
  {
    id: 1,
    title:
      "«Ньюкасл Юнайтед» — «Манчестер Юнайтед» 2:0: Уиллок и Уилсон выводят Сорок на места в Лиге чемпионов",
    source: "The Guardian • about 3 hours ago",
    img: news_1,
  },
  {
    id: 2,
    title:
      "«Ньюкасл Юнайтед» — «Манчестер Юнайтед» 2:0: Уиллок и Уилсон выводят Сорок на места в Лиге чемпионов два раза",
    source: "The Guardian • about 3 hours ago",
    img: news_2,
  },
  {
    id: 3,
    title:
      "«Ньюкасл Юнайтед» — «Манчестер Юнайтед» 2:0: Уиллок и Уилсон выводят Сорок на места в Лиге чемпионов",
    source: "The Guardian • about 3 hours ago",
    img: news_3,
  },
  {
    id: 4,
    title:
      "«Ньюкасл Юнайтед» — «Манчестер Юнайтед» 2:0: Уиллок и Уилсон выводят Сорок на места в Лиге чемпионов",
    source: "The Guardian • about 3 hours ago",
    img: news_3,
  },
  {
    id: 5,
    title:
      "«Ньюкасл Юнайтед» — «Манчестер Юнайтед» 2:0: Уиллок и Уилсон выводят Сорок на места в Лиге чемпионов",
    source: "The Guardian • about 3 hours ago",
    img: news_3,
  },
  {
    id: 6,
    title:
      "«Ньюкасл Юнайтед» — «Манчестер Юнайтед» 2:0: Уиллок и Уилсон выводят Сорок на места в Лиге чемпионов",
    source: "The Guardian • about 3 hours ago",
    img: news_3,
  },
  {
    id: 7,
    title:
      "«Ньюкасл Юнайтед» — «Манчестер Юнайтед» 2:0: Уиллок и Уилсон выводят Сорок на места в Лиге чемпионов",
    source: "The Guardian • about 3 hours ago",
    img: news_3,
  },
  {
    id: 8,
    title:
      "«Ньюкасл Юнайтед» — «Манчестер Юнайтед» 2:0: Уиллок и Уилсон выводят Сорок на места в Лиге чемпионов",
    source: "The Guardian • about 3 hours ago",
    img: news_3,
  },
];

const News = () => {
  return (
    <div className="xl:mt-[120px] lg:mt-[85px] md:mt-[65px] sm:mt-[55px] pb-[120px]">
      <div className="flex items-center justify-center w-full flex-col gap-4">
        <h2 className="xl:text-[54px] lg:text-[40px] md:text-[40px] sm:text-[24px]">Новости по командам</h2>
        <ArrowButton text="Все новости" className="xl:text-[19px] lg:text-[16px] md:text-[13px]"/>
      </div>
      <div className="mt-[52px] flex items-center justify-center w-full xl:pl-[152px] lg:pl-[69px] md:pl-[56px] sm:pl-[16px]">
        <Swiper
          direction="horizontal"
          className="w-full"
          modules={[Navigation, Pagination]}
          spaceBetween={10}
          breakpoints={{
            360: {
              slidesPerView: 1.2,
            },
            768: {
              slidesPerView: 2.3,
            },
            1366: {
              slidesPerView: 3.3,
            },
            1920: {
              slidesPerView: 3.3,
            },
          }}
        >
          {NEWS.map((slide) => (
            <SwiperSlide className="flex flex-col gap-4 xl:w-[525px] lg:w-[400px] md:w-[320px] sm:w-[242px]">
              <div className="w-full xl:h-[309px] lg:h-[233px] md:h-[189px] sm:h-[145px]">
                <img src={slide.img} className="w-full h-full object-cover" alt="" />
              </div>
              <h3 className="xl:text-[19px] lg:text-[16px] md:text-[13px] text-[13px] max-w-full">{slide.title}</h3>
              <span className="xl:text-[17px] lg:text-[14px] md:text-[11px] text-[11px] opacity-70">{slide.source}</span>
            </SwiperSlide>
          ))}
           <div className="pointer-events-none absolute top-0 right-0 h-full w-32 bg-gradient-to-l from-black to-transparent z-10"></div>
        </Swiper>
       
      </div>
    </div>
  );
};

export default News;
