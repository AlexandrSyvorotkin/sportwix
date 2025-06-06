import { Container } from '@shared/main-page-container'
import img_1 from '../../assets/community/ImgCommunity1.png'
import img_2 from '../../assets/community/ImgCommunity2.png'
import img_3 from '../../assets/community/ImgCommunity3.png'
import img_4 from '../../assets/community/ImgCommunity4.png'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

const COMMUNITY = [
  {
    id: 1,
    title: '@Gfidi23',
    img: img_1,
  },
  {
    id: 2,
    title: '@Gfidi23',
    img: img_2,
  },
  {
    id: 3,
    title: '@Gfidi23',
    img: img_3,
  },
  {
    id: 4,
    title: '@Gfidi23',
    img: img_4,
  },
]
const Community = () => {
  return (
    <Container>
      <div className="mt-[120px] pb-[120px]">
        <div className="flex items-center justify-center w-full flex-col gap-4">
          <h2 className="xl:text-[54px] lg:text-[40px] md:text-[40px] sm:text-[24px] text-[24px] text-center">
            Следи за спортивными событиями в нашем сообществе
          </h2>
          <div className="flex items-center justify-center gap-4 mt-[56px] w-full">
            <Swiper
              direction="horizontal"
              className="w-full"
              modules={[Navigation, Pagination]}
              spaceBetween={20}
              breakpoints={{
                360: {
                  slidesPerView: 1.1,
                },
                768: {
                  slidesPerView: 3.1,
                },
                1366: {
                  slidesPerView: 4,
                },
                1920: {
                  slidesPerView: 4,
                },
              }}
            >
              {COMMUNITY.map(item => (
                <SwiperSlide className="w-full">
                  <div className="flex flex-col gap-4 xl:w-[389px] lg:w-[292px] md:w-[208px] sm:w-[242px]">
                    <div className="w-full xl:h-[510px] lg:h-[383px] md:h-[272px] sm:h-[317px]">
                      <img src={item.img} className="w-full h-full object-cover" alt="" />
                    </div>
                    <span className="text-[19px] opacity-60">{item.title}</span>
                  </div>
                </SwiperSlide>
              ))}
              {/* <div className="pointer-events-none absolute top-0 right-0 h-full w-32 bg-gradient-to-l from-black to-transparent z-10"></div> */}
            </Swiper>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Community
