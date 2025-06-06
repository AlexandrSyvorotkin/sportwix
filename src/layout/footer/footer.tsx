import { Logo } from '@components/logo'
import ArrowButton from '@ui/arrow-button/arrow-button'
import { Navbar } from '../navbar'

const links = [
  {
    name: 'Графики',
    href: '/chart',
  },
  // {
  //     name: "Компания",
  //     href: "/company"
  // },
  {
    name: 'Новости',
    href: '/news',
  },
  {
    name: 'Комньюнити',
    href: '/community',
  },
  {
    name: 'FAQ',
    href: '/faq',
  },
]

const Footer = () => {
  return (
    <footer className="lg:flex-row sm:flex-col  lg:items-center sm:items-start sm:gap-4 lg:gap-0 flex  justify-between pt-5 xl:px-[152px] lg:px-[70px] md:px-[50px] sm:px-[23px] border-b-2 border-[#1A191D] pb-[30px]">
      <Logo />
      <Navbar links={links} isFooter={true} />
      <ArrowButton text="Связаться с поддержкой" onClick={() => null} />
    </footer>
  )
}

export { Footer }
