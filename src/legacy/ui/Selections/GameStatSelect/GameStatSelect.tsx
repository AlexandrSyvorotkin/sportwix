import React, { FC, useRef, useEffect, useState, SetStateAction, Dispatch, useContext } from 'react'
import styles from './GameStatSelect.module.scss'
import arrowOpen from '../../../assets/select-arrows/open-arrow.svg'
import arrowClose from '../../../assets/select-arrows/close-arrow.svg'
import classNames from 'classnames'
import { useAppDispatch, useAppSelector } from '../../../types/hooks'
import { ThemeContext } from '../../../context/ThemeContext/ThemeContext'
import { RootState } from '../../../redux/store'
import { useOutside } from '../../../hooks/useOutsideClick'

type selector = {
    title: string,
    img?: string,
    metrics?: any
    params_first?: any
    params_second?: any
    localImg?: boolean
    componentVisible?: boolean
}


interface GamesTimeFrameStatSelectProps {
    selectors: selector[],
    onClose: () => void,
    defaultValue: string,
    setActiveGameTimeFrame?: Dispatch<SetStateAction<string>>,
    setSelectedTeamParameters?: any
    setSelectedOverageParameters?: any,
    activeGameTimeFrame?: any,
    setActiveTimeSelector: any
}

const GamesTimeFrameStatSelect: FC<GamesTimeFrameStatSelectProps> = ({ selectors, onClose, defaultValue, setActiveGameTimeFrame, setSelectedTeamParameters, setSelectedOverageParameters, activeGameTimeFrame, setActiveTimeSelector }) => {
  
    const [selectedValue, setSelectedValue] = useState<string>(defaultValue)
    const {theme} = useContext(ThemeContext)
  
    const {ref, isShow, setIsShow} = useOutside(false)

    const h2hTeamTable = useAppSelector((state:RootState) => state.tournamentSlice.h2h.isH2h.teamTable)

    const chooseActiveGamesTimeFrameHandler = (selector: string, params_first: any, params_second: any) => {
        if (h2hTeamTable) return null
        else {
            setIsShow(false)
            setSelectedValue(selector)
            setSelectedTeamParameters(params_first)
            setSelectedOverageParameters(params_second)

            if (setActiveGameTimeFrame) {
                setActiveGameTimeFrame(selector);
                setActiveTimeSelector(3)
            }
        }
    }


    const spanColor = classNames({
        [styles.colorDark]: theme === 'dark',
        [styles.colorLight]: theme === 'light',
        [styles.disabled]: h2hTeamTable
    })


    const openMenu = () => {
        if (h2hTeamTable) return null
        else {
            setIsShow(!isShow)
        }
    }

    const selectStyles = classNames({
        [styles.chart_select]: true,
        [styles.open]: isShow
    })

    return (
        <div className={styles.games_n_times_select} onClick={openMenu} ref={ref}>
            <span className={spanColor}>{activeGameTimeFrame}</span>
            <img src={isShow ? arrowClose : arrowOpen} alt="" />
                <div className={selectStyles}>
                    <div className={styles.selectors_list}>
                        {selectors.map(selector =>
                            <div key={selector.title} className={styles.select_metric} onClick={() => chooseActiveGamesTimeFrameHandler(selector.title, selector.params_first, selector.params_second)}>
                                <span >{selector.title} </span>
                            </div>
                        )}
                    </div>
                </div>
        </div>
    );
}

export default GamesTimeFrameStatSelect
