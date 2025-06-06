import { Link } from 'react-router-dom'

const Navbar = ({
  links,
  isFooter,
}: {
  links: { name: string; href: string }[]
  isFooter: boolean
}) => {
  const isFooterNavbar = isFooter ? 'flex lg:text-[16px]' : 'sm:hidden lg:flex'

  return (
    <nav className={`${isFooterNavbar} items-center justify-center gap-6`}>
      {links.map(link => (
        <Link to={link.href}>{link.name}</Link>
      ))}
    </nav>
  )
}

export { Navbar }
