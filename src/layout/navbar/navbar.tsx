import { Link } from "react-router-dom";

const links = [
    {
        name: "Графики",
        href: "/chart"
    },
    {
        name: "Компания",
        href: "/company"
    },
    {
        name: "Новости",
        href: "/news"
    },
    {
        name: "Комньюнити",
        href: "/community"
    },
    {
        name: "FAQ",
        href: "/faq"
    }
]

const Navbar = () => {
    return (
        <nav className="flex items-center justify-center gap-6">
            {links.map((link) => (
                <Link to={link.href}>{link.name}</Link>
            ))}
        </nav>
    )
}

export default Navbar;