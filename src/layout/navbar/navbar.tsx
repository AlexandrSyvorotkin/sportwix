import { Link } from "react-router-dom";

const links = [
    {
        name: "Компания",
        href: "/"
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
        href: "/login"
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