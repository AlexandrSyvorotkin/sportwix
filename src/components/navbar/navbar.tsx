import { FC, useState } from 'react';
import styles from './navbar.module.scss'
import { NavLink, useLocation } from "react-router-dom";
import classNames from 'classnames';
// import sportVariants from '../../localization/navbar/sportVariants.json'


interface Route {
    id: number,
    titleEng: string,
    titleRu: string
    path: string,
    img?: string,
    img_active?: string
}

interface Routes {
    routes: Route[]
}

// interface Option {
//     to: string;
//     label: string;
// }



// const sportOptions = [
//     { ruTitle: sportVariants.football.ru, engTitle: sportVariants.football.eng, path: '#' },
//     { ruTitle: sportVariants.hockey.ru, engTitle: sportVariants.hockey.eng, path: '#' },
//     { ruTitle: sportVariants.basketball.ru, engTitle: sportVariants.basketball.eng, path: '#' },
// ]

const Navbar:FC<Routes> = ({ routes }) => {

    // const championshipsOptions = [
    //     {
    //         engTitle: championships.epl.eng,
    //         ruTitle: championships.epl.ru,
    //         path: 'chart/epl', 
    //         img: EPL, 
    //         tournamentPath: GET_PREMIER_LEAGUE_DATA,
    //         championshipId: '2694d35e-c157-4497-9957-56f4e93ab7bb',
    //         season: '2023-2024'
    //     },
    //     { 
    //         engTitle: 'EURO', 
    //         ruTitle: 'ЕВРО', 
    //         path: 'chart/euro-2024', 
    //         img: EURO_2024, 
    //         tournamentPath: GET_EURO_2024,
    //         championshipId: 'b6b0d1b3-87b0-4431-9305-7a4e377062bb',
    //         season: '2024'
    //     },
    //     { 
    //         engTitle: championships.la_liga.eng, 
    //         ruTitle: championships.la_liga.ru, 
    //         path: 'chart/la-liga', 
    //         img: LA_LIGA, 
    //         tournamentPath: GET_LA_LIGA_DATA,
    //         championshipId: '94497550-7f1a-4aef-91bf-ffcd6f67fc77',
    //         season: '2023-2024'
    //     },
    //     {   engTitle: 'World Cup', 
    //         ruTitle: 'World Cup', 
    //         path: '/world-cup', 
    //         img: SERIA_A, 
    //         tournamentPath: '',
    //         championshipId: '',
    //         season: ''
    //     },
    // ]



    // const dispatch = useAppDispatch()

    // const fetchChampionshipData = (championship_id: string, season: string) => {
    //     dispatch(setCurrentChampionshipIdAndSeason({ championshipId: championship_id, season: season }))
    // }

    const theme = 'dark'
    const language = 'Ru'


    const [activeLink, setActiveLink] = useState<number>(0)

    const location = useLocation()

    const border = theme === 'dark' ? '1px solid #5C5C5C' : '1px solid #E1E3EA'

    // const sportsDefaultValue = language === 'Eng' ? sportOptions[0].engTitle : sportOptions[0].ruTitle
    // const championshipDefaultValue = language === 'Eng' ? championshipsOptions[0].engTitle : championshipsOptions[0].ruTitle

    // const getChampionsLeague = () => {
    //     axios.get('http://localhost:3001/api/data/new_format').then((response: any) => {
    //         dispatch(changeTournamentType())
    //         dispatch(getTournamentData(response.data))
    //     })
    // }
    // <button onClick={getChampionsLeague}>Tournament</button>

    return (
        <nav className={styles.navbar}>
            {/* <CustomSelect defaultValue={sportsDefaultValue} options={sportOptions} type='routing' /> */}
            {/* <CustomSelect defaultValue={championshipDefaultValue} options={championshipsOptions} type='routing' fetchChampionshipData={fetchChampionshipData} /> */}
            {/* <HeaderRoutingSelect routes={routes} defaul_value={routes[0].titleEng} /> */}
            <ul className={styles.navbar_list}>
                {
                    routes.map(route => {
                        const isRouteActive = activeLink === route.id || location.pathname === route.path;
                        const navLinkStyles = classNames({
                            [styles.NavLink]: true,
                            [styles.dark]: theme === 'dark',
                            [styles.active]: isRouteActive
                        })

                        return (
                            <NavLink
                                key={route.id}
                                to={route.path}
                                className={navLinkStyles}
                                onClick={() => setActiveLink(route.id)}
                            >
                                {language === 'Ru' ? route.titleRu : route.titleRu}
                                <img src={activeLink === 5 ? route.img_active : route.img} alt="" />
                            </NavLink>
                        )
                    }
                    )
                }
            </ul>
        </nav>
    );
};

export default Navbar;
