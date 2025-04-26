import React, { FC, useRef, useEffect, useState, SetStateAction, Dispatch, useContext } from 'react'
import styles from './TeamStatSelect.module.scss'
import arrowOpen from '../../../assets/select-arrows/open-arrow.svg'
import arrowClose from '../../../assets/select-arrows/close-arrow.svg'
import classNames from 'classnames'
import { IMG_PATH } from '../../../api/variables'
import CustomCheckboxInput from '../../CustomInputs/CustomCheckboxInput/CustomCheckboxInput'
import { ITeam } from '../../../models/ITeam'
import { useAppDispatch, useAppSelector } from '../../../types/hooks'
import TeamStatCheckbox from '../../CustomInputs/TeamStatCheckbox/TeamStatCheckbox'
import { stat } from 'fs'
import { ThemeContext } from '../../../context/ThemeContext/ThemeContext'
import { chooseSecondTeam, disableH2h } from '../../../redux/tournament-slice/tournament-slice'
import { useOutside } from '../../../hooks/useOutsideClick'


interface TeamStateSelectProps {
    selectors: any,
}

const TeamStatSelect: FC<TeamStateSelectProps> = ({ selectors}) => {
    const dispatch = useAppDispatch()
    const {theme} = useContext(ThemeContext)

    const {ref, isShow, setIsShow} = useOutside(false)

    const [hthGames, setHthGames] = useState<boolean>(false)

    const hthGamesHandler = () => {
        setHthGames(!hthGames);
    };


    function chooseActiveTeamSelect(selector: string, img: string | undefined, team: any) {
        setIsShow(false)
        dispatch(chooseSecondTeam(team))
        dispatch(disableH2h('teamTable'))
    }

    const selectStyles = classNames({
        [styles.chart_select]: true,
        [styles.chart_select_open]: isShow
    })

    const secondTeamimg = useAppSelector(state => state.tournamentSlice.secondSelectedTeam?.team_img)
    const secondTeam = useAppSelector(state => state.tournamentSlice.secondSelectedTeam)

    const textColor = theme === 'dark' ? 'white' : '#333333'

    return (
        <div className={styles.params_select} onClick={() => setIsShow(!isShow)} ref={ref}>
            <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                <div className={styles.img_wrapper}>
                    <img src={`${IMG_PATH}${secondTeamimg}`} alt="" />
                </div>
                <span style={{color: textColor}}>{secondTeam?.team_name === 'Premier League' ? secondTeam.category_name : secondTeam?.team_name}</span>
            </div>
            <img src={isShow ? arrowClose : arrowOpen} alt="" />
            <div className={selectStyles}>
                <div className={styles.selectors_list}>
                    {selectors?.map((team: ITeam, id: number) =>
                        <div key={id} className={styles.select_metric} onClick={() => chooseActiveTeamSelect(team.team_name, team.team_img, team)}>
                            <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }} className={styles.img_wrapper}>
                                <img src={`${IMG_PATH}${team.team_img}`} alt="" />
                                <span>{team.team_name === 'Premier League' ? team.category_name : team.team_name}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TeamStatSelect
