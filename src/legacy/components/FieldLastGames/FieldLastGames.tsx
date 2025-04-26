import React, { Dispatch, FC, SetStateAction, useContext, useEffect, useState } from 'react';
import styles from './FiledLastGames.module.scss'
import CustomCheckboxInput from '../../ui/CustomInputs/CustomCheckboxInput/CustomCheckboxInput';
import { useAppDispatch, useAppSelector } from '../../types/hooks';
import { IMG_PATH } from '../../api/variables';
import { LanguageContext } from '../../context/LanguageContext/LanguageContext';
import games_selectors from '../../localization/team_detail_info_section/team_stats/games_selectors.json'
import axios from 'axios';
import { RootState } from '../../redux/store';
import classNames from 'classnames';


interface FiledLastGamesProps {
    selectedGamesCount: number,
    setSelectedGamesCount: Dispatch<SetStateAction<number>>,
    h2hHandler: any
}

const FieldLastGames:FC<FiledLastGamesProps> = ({selectedGamesCount, setSelectedGamesCount, h2hHandler }) => {


    const isH2hStatus = useAppSelector((state :RootState) => state.tournamentSlice.h2h.isH2h.field)

    
    

    // console.log(isH2H)

    const {language} = useContext(LanguageContext)


    const [activeTimeFrameEl, setActiveTimeFrameEl] = useState(1)

    useEffect(() => {
        if (isH2hStatus) {
            // setActiveTimeFrameEl(6)
            setSelectedGamesCount(38)
        } else if (isH2hStatus) {
            // setActiveTimeFrameEl(1)
            setSelectedGamesCount(1)
        }
    }, [isH2hStatus])

    const gameTimeFrames = [
        {id: 1, timeFrame: language === 'Eng' ? games_selectors['1game'].eng : games_selectors['1game'].ru, timeFrameIndex: 1},
        {id: 2, timeFrame: language === 'Eng' ? games_selectors['3games'].eng : games_selectors['3games'].ru, timeFrameIndex: 3},
        {id: 3, timeFrame: language === 'Eng' ? games_selectors['5games'].eng : games_selectors['5games'].ru, timeFrameIndex: 5},
        {id: 4, timeFrame: language === 'Eng' ? games_selectors['10games'].eng : games_selectors['10games'].ru, timeFrameIndex: 10},
        {id: 5, timeFrame: language === 'Eng' ? games_selectors['15games'].eng : games_selectors['15games'].ru, timeFrameIndex: 15},
        {id: 6, timeFrame: language === 'Eng' ? games_selectors.season.eng : games_selectors.season.ru, timeFrameIndex: 38},
    ]

    const clickHandler = (id: number, timeFrameIndex: number) => {
        // filterMidfieldByTimeFrame(timeFrameIndex)
        if (!isH2hStatus) {
            setSelectedGamesCount(timeFrameIndex)
            setActiveTimeFrameEl(id)
        } else return null
        
    }

    const secondSelectedTeam = useAppSelector(state => state.tournamentSlice.secondSelectedTeam)


    return (
        <div className={styles.plays}>
            <div className={styles.plays_header}>
                <div className={styles.games}>{language === 'Eng' ? "Games" : "Игры"}</div>
                {secondSelectedTeam?.team_name === 'Premier League' 
                    ? 
                    null 
                    : 
                    <div className={styles.games_selector}>H2H
                        <CustomCheckboxInput
                            isActive={isH2hStatus}
                            onChange={h2hHandler}
                        />
                    </div>
                }
            </div>
            <div className={styles.last_games_container}>
                {gameTimeFrames.map( it => {
                    const activeTimeFrameElStyles = classNames({
                        [styles.active_metric]: activeTimeFrameEl === it.id || isH2hStatus && it.id === 6,
                        [styles.metric]: activeTimeFrameEl !== it.id,
                        [styles.disable_metric]: isH2hStatus,
                    })
                    return (
                        <div 
                            className={activeTimeFrameElStyles} 
                            key={it.id}
                            onClick={() => clickHandler(it.id, it.timeFrameIndex)}
                            > 
                            {it.timeFrame}
                        </div>
                        )
                    }
                )}
            </div>
        </div>
    )
}

export default FieldLastGames