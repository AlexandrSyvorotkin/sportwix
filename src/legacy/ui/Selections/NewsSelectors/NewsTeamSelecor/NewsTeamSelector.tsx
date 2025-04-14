import styles from './MewsTeamSelector.module.scss'
import { FC, useState, useRef, useEffect, useContext, Dispatch, SetStateAction } from 'react'
import arrowOpen from '../../../../assets/select-arrows/open-arrow.svg'
import arrowClose from '../../../../assets/select-arrows/close-arrow.svg'
import { useAppDispatch, useAppSelector } from '../../../../types/hooks'
import { ITeam } from '../../../../models/ITeam'
import { IMG_PATH } from '../../../../api/variables'
import { LanguageContext } from '../../../../context/LanguageContext/LanguageContext'
import { ThemeContext } from '../../../../context/ThemeContext/ThemeContext'
import { useFetchChampionshipInfoQuery } from '../../../../services/championships-api/championship-api'
import { filterTeams } from '../../../../utils/filterTeams'


interface NewsTeamSelecorProps {
    filterNewsBySelectedTeam: any,
    teamFilterName: string,
    setTeamFilterName: Dispatch<SetStateAction<string>>
}

const NewsTeamSelector: FC<NewsTeamSelecorProps> = ({filterNewsBySelectedTeam, teamFilterName, setTeamFilterName}) => {

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
    const ref = useRef<HTMLDivElement>(null)
    const {language} = useContext(LanguageContext)
    


    const {championshipId, season} = useAppSelector(state => state.tournamentSlice)
    const { data } = useFetchChampionshipInfoQuery({championshipId, season})

    const filteredTeams = filterTeams(data?.teams)
    // data?.teams.filter(it => !it.is_event)

    // console.log(filterTeams)

    const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            setIsMenuOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const {theme} = useContext(ThemeContext)
    const textColor = theme === 'dark' ? '#333333' : 'white'

    return (
        <div className={styles.news_team_selector} ref={ref}>
            <div className={styles.news_team_selector_header} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <div>
                    <span>{language === "Eng" ? "Teams" : "Команды"}</span>
                </div>
                <img src={isMenuOpen ? arrowClose : arrowOpen} alt="" />
            </div>
            {isMenuOpen ?
                <div className={styles.available_teams}>
                    {filteredTeams?.map((team: ITeam) =>
                        <div className={styles.team_wrapper} key={team.team_name}>
                            {team.team_name === teamFilterName ? <div className={styles.active_indicator}/> :  <div style={{width: '10px'}}/>}
                            <div className={styles.team} onClick={() => filterNewsBySelectedTeam(team.team_uuid, team.team_name)} >
                                <div className={styles.img_wrapper}>
                                    <img src={`${IMG_PATH}${team.team_img}`} alt="" />
                                </div>
                                <span style={{color: textColor}}>{team.team_name}</span>
                            </div> 
                        </div>
                    )}
                </div> : null
            }
        </div>
    )
}

export default NewsTeamSelector;