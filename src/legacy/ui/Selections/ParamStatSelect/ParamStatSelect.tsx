import React, { FC, useRef, useEffect, useState, SetStateAction, Dispatch, useContext } from 'react'
import styles from './ParamStatSelect.module.scss'
import arrowOpen from '../../../assets/select-arrows/open-arrow.svg'
import arrowClose from '../../../assets/select-arrows/close-arrow.svg'
import classNames from 'classnames'
import { useAppDispatch, useAppSelector } from '../../../types/hooks'
import TeamStatCheckbox from '../../CustomInputs/TeamStatCheckbox/TeamStatCheckbox'
import { LanguageContext } from '../../../context/LanguageContext/LanguageContext'
import { ThemeContext } from '../../../context/ThemeContext/ThemeContext'
import CustomCheckboxInput from '../../CustomInputs/CustomCheckboxInput/CustomCheckboxInput'
import { RootState } from '../../../redux/store'
import axios from 'axios'
import { h2h } from '../../../types/ResponseTypes/h2h/h2h'
import { h2hTogle, setH2hTeamTableData } from '../../../redux/tournament-slice/tournament-slice'

type selector = {
    title: string,
    metrics?: any
    componentVisible?: boolean
    ruTitle?: string,
    engTitle?: string
}


interface ParamStatSelectProps {
    selectors: selector[],
    onClose: () => void,
    metricsVisibility?: any
    setMetricsVisibility: Dispatch<SetStateAction<any>>
    setIsLoading: Dispatch<SetStateAction<boolean>>
}

const ParamStatSelect: FC<ParamStatSelectProps> = ({ selectors, onClose, setMetricsVisibility, metricsVisibility, setIsLoading }) => {

    // console.log(selectors)

    const ref = useRef<HTMLDivElement>(null)
    const dispatch = useAppDispatch()

    const {language} = useContext(LanguageContext)

    const [menuOpen, setMenuOpen] = useState<boolean>(false)

    const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            setMenuOpen(false)
        }
    }

    const [hthGames, setHthGames] = useState<boolean>(false)

    const hthGamesHandler = () => {
        setHthGames(!hthGames);
    };


    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])


    const selectorStyles = classNames({
        // [styles.games_n_times_select]: type === 'games',
        [styles.params_select]: true
    })

    const chartSelectStyles = classNames({
        [styles.chart_select]: true,
        [styles.chart_select_open]: menuOpen,
        [styles.chart_select_close]: !menuOpen
    })

    const {theme} = useContext(ThemeContext)
    const textColor = theme === 'dark' ? 'white' : '#333333'


    const {firstSelectedTeam, secondSelectedTeam} = useAppSelector((state:RootState) => state.tournamentSlice)
    const h2hHandler= () => {
        dispatch(h2hTogle('teamTable'))
        if (firstSelectedTeam && secondSelectedTeam) {
            setIsLoading(true);
            getH2Hdata(firstSelectedTeam?.team_uuid, secondSelectedTeam?.team_uuid)
        }
    }

    async function getH2Hdata(firstTeamUuid: string, secondTeamUuid: string) {
        try {
            const response = await axios.get<h2h>(`https://dev.chart-sports.com/api/v1/h2h/?uuid_team_1=${firstTeamUuid}&uuid_team_2=${secondTeamUuid}&uuid_event=2694d35e-c157-4497-9957-56f4e93ab7bb&league_season=2023-2024`);
            
            dispatch(setH2hTeamTableData({
                firstTeamH2hTableParams: response.data.result[0].metrics,
                secondTeamH2hTableParams: response.data.result[1].metrics
            }));
            
            console.log(response);
        } catch (error) {
            console.error('Error fetching H2H data:', error);
        } finally {
            setIsLoading(false);
        }
    }
    

    const isH2hStatus = useAppSelector((state: RootState) => state.tournamentSlice.h2h.isH2h.teamTable)


    return (
        <div className={selectorStyles} onClick={() => setMenuOpen(!menuOpen)} ref={ref}>
            {isH2hStatus 
            ? 
            <span style={{color: textColor}}>{language === 'Eng' ? 'H2H Options' : 'H2H Параметры'}</span>
            :
            <span style={{color: textColor}}>{language === 'Eng' ? 'Options' : 'Параметры'}</span>
            }
            <img src={menuOpen ? arrowClose : arrowOpen} alt="" />
            <div className={chartSelectStyles} onClick={(e) => e.stopPropagation()}>
                {secondSelectedTeam?.team_name === 'Premier League' 
                    ? 
                    null 
                    : 
                    <div className={styles.h2h}>
                        <span>H2H</span>
                        <CustomCheckboxInput onChange={h2hHandler} isActive={isH2hStatus} />
                    </div>
                }
                <div className={styles.selectors_list}>
                    {selectors.map((selector: selector, id) =>
                        <TeamStatCheckbox 
                            title={selector.title} 
                            key={selector.title} 
                            componentVisible={selector.componentVisible} 
                            metricsVisibility={metricsVisibility} 
                            setMetricsVisibility={setMetricsVisibility} 
                            onClick={() => setMetricsVisibility(!selector.componentVisible)}
                            ruTitle={selector.ruTitle}
                            engTitle={selector.engTitle}
                        />
                    )}
                </div>

            </div>
        </div>
    );
}

export default ParamStatSelect
