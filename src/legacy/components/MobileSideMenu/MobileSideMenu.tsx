import {Dispatch, FC, SetStateAction, useContext, useState, useRef} from 'react'
import styles from './MobileSideMenu.module.scss'
import classNames from 'classnames'
import Logo from '../Logo/Logo'
import ModeSwitcher from '../ModeSwitcher/ModeSwitcher'
import { ThemeContext } from '../../context/ThemeContext/ThemeContext'
import { NavLink, useLocation} from 'react-router-dom'
import CustomSelect from '../CustomSelect/CustomSelect'
import laliga from '../../assets/logo-dropdown/laliga.jpg'
import epl from '../../assets/logo-dropdown/epl.jpg'
import bundesliga from '../../assets/logo-dropdown/bundesliga.png'
import seriaa from '../../assets/logo-dropdown/seriaa.png'
import league1 from '../../assets/logo-dropdown/png-transparent-france-ligue-1-premier-league-serie-a-paris-saint-germain-f-c-mls-kodi.png'


type Route = {
    id: number,
    title: string,
    path: string,
    img?: string,
    img_active?: string
}

interface MobileSideMenuProps {
    isMenuActive: boolean,
    setIsMobileMenuActive: Dispatch<SetStateAction<boolean>>
    routes: Route[],
}

const MobileSideMenu:FC<MobileSideMenuProps> = ({isMenuActive, setIsMobileMenuActive, routes,}) => {

    const championshipsOptions = [
        { name: 'Premier League', path: '/', img: epl, },
        { name: 'La-liga', path: '/chart-la-liga', img: laliga },
        { name: 'Seria-a', path: '/chart-seria-a', img: seriaa },
        { name: 'Bundesliga', path: '/chart-bundesliga', img: bundesliga },
        { name: 'League 1', path: '/chart-league-one', img: league1 },
    ]
    
    const sportOptions = [
        { name: 'Football', path: '#' },
        { name: 'Hockey', path: '#' },
        { name: 'Basketball', path: '#' },
    ]

    const menuStyles = classNames({
        [styles.mobile_side_menu]: true,
        [styles.menu_disabled]: !isMenuActive,
        [styles.menu_active]: isMenuActive
    })

    const backdropStyles = classNames({
        [styles.backdrop]: isMenuActive,
        [styles.backdrop_disabled]: !isMenuActive
    })

    const {theme, setTheme} = useContext(ThemeContext)
    const [activeLink, setActiveLink] = useState<number>(0)
    const location = useLocation()

    function routingHandler (id: number) {
        setActiveLink(id)
        setIsMobileMenuActive(false)
    }

    const ref = useRef<HTMLDivElement>(null);


    return (
        // <div className={backdropStyles} onClick={() => setIsMobileMenuActive(false)}>
            <div className={menuStyles} onClick={(e) => e.stopPropagation()} ref={ref}>
                <Logo/>
                <div className={styles.routes}>
                    <ul className={styles.routes_list}>
                    {
                        routes.map(route => {
                            const isRouteActive = activeLink === route.id || location.pathname === route.path;
                            const navLinkStyles = classNames({
                                [styles.NavLink]: true,
                                [styles.dark]: theme === 'dark',
                                [styles.light]: theme === 'light',
                                [styles.active]: isRouteActive
                            })

                            return (
                                <NavLink
                                    key={route.id}
                                    to={route.path}
                                    className={navLinkStyles}
                                    onClick={() => routingHandler(route.id)}
                                >
                                    {route.title}
                                    <img src={activeLink === 5 ? route.img_active : route.img} alt="" />
                                </NavLink>
                                )
                            }
                        )
                    }
                </ul>
                </div>
                {/* <CustomSelect defaultValue={sportOptions[0].name} options={sportOptions} type='routing' />
                <CustomSelect defaultValue={championshipsOptions[0].name} options={championshipsOptions} type='routing' /> */}
                {/* <ModeSwitcher mode={theme} onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}/> */}
            </div>
        // </div>
    )
}

export default MobileSideMenu