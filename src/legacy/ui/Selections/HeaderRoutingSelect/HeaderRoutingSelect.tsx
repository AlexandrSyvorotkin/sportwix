import React, { FC, useState, useContext, useRef, useEffect } from 'react'
import { ThemeContext } from '../../../context/ThemeContext/ThemeContext'
import styles from './HeaderRoutingSelect.module.scss'
import { NavLink, useLocation } from "react-router-dom";
import classNames from 'classnames';
import arrowOpen from '../../../assets/select-arrows/open-arrow.svg'
import arrowClose from '../../../assets/select-arrows/close-arrow.svg'

type Route = {
    id: number,
    titleEng: string,
    titleRu: string
    path: string,
    img?: string,
    img_active?: string
}

interface HeaderRoutingSelectProps {
    routes: Route[],
    defaul_value: string
}

const HeaderRoutingSelect: FC<HeaderRoutingSelectProps> = ({ routes, defaul_value }) => {

    const [selectedRoute, isSelectedRoute] = useState<string>(defaul_value)
    const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false)
    const [activeLink, setActiveLink] = useState<number>(0)
    const location = useLocation()


    const { theme } = useContext(ThemeContext)

    const activeRouteHande = (id: number, route_name: string) => {
        setIsOpenMenu(false)
        setActiveLink(id)
        isSelectedRoute(route_name)
    }

    const ref = useRef<HTMLDivElement>(null)

    const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            setIsOpenMenu(false)
        }
    }
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])


    return (
        <div className={styles.header_routing_select} onClick={() => setIsOpenMenu(!isOpenMenu)} ref={ref}>
            <div className={styles.routing_header}>
                <div className={styles.selected_route}>{selectedRoute}</div>
                <div className={styles.img_wrapper}>
                    <img src={isOpenMenu ? arrowClose : arrowOpen} alt="" />
                </div>
            </div>
            {isOpenMenu
                ?
                <div className={styles.selections_variantes}>
                    {
                        routes.map(route => {
                            const isRouteActive = activeLink === route.id || location.pathname === route.path;
                            const navLinkStyles = classNames({
                                [styles.nav_link]: true,
                                [styles.dark]: theme === 'dark',
                                [styles.light]: theme === 'light',
                                [styles.active]: isRouteActive
                            })

                            return (
                                <NavLink
                                    key={route.id}
                                    to={route.path}
                                    className={navLinkStyles}
                                    onClick={() => activeRouteHande(route.id, route.titleEng)}
                                >
                                    {route.titleEng}
                                    <img src={activeLink === 5 ? route.img_active : route.img} alt="" />
                                </NavLink>
                            )
                        }
                        )
                    }
                </div>
                : null
            }
        </div>
    )
}

export default HeaderRoutingSelect;