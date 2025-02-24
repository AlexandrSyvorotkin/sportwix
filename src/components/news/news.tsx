import ArrowButton from "../../ui/arrow-button/arrow-button";
import news_1 from "../../assets/news-bg/ImgNews1.png";
import news_2 from "../../assets/news-bg/ImgNews2.png";
import news_3 from "../../assets/news-bg/ImgNews3.png";
import { Swiper, SwiperSlide } from "swiper/react";

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
];

const News = () => {
  return (
    <div className="mt-[120px] pb-[120px]">
      <div className="flex items-center justify-center w-full flex-col gap-4">
        <h2 className="text-[57px]">Новости по командам</h2>
        <ArrowButton text="Все новости" />
      </div>
      <div className="mt-[52px] flex items-center justify-center">
        <div className="flex items-center justify-between gap-4">
          {NEWS.map((slide) => (
            <div className="flex flex-col gap-4 w-[525px]">
              <div className="w-full h-[309px]">
                <img src={slide.img} alt="" />
              </div>
              <h3 className="text-[19px] max-w-full">{slide.title}</h3>
              <span className="text-[17px] opacity-70">{slide.source}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
