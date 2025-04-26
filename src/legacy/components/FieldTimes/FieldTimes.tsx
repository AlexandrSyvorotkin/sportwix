import React, { Dispatch, FC, SetStateAction, useContext, useState } from 'react'
import styles from './FieldTimes.module.scss'
import { LanguageContext } from '../../context/LanguageContext/LanguageContext'

interface FieldTimesProps {
    activeTimeFrame: {
        gametimeframe_1: number,
        gametimeframe_3: number,
        gametimeframe_5: number,
        gametimeframe_10: number,
        gametimeframe_15: number,
        gametimeframe_all: number
    },
    setActiveTimeFrame: any
}

const FieldTimes: FC<FieldTimesProps> = ({ activeTimeFrame, setActiveTimeFrame }) => {

    const {language} = useContext(LanguageContext)


    const times = [
        { id: 1, time: language === 'Eng' ? "1T" : "1Т", active: false},
        { id: 2, time: language === 'Eng' ? "2T" : "2Т" , active: false},
        { id: 3, time: language === 'Eng' ? "FT" : "ПМ", active: true}
    ]

    return (
        <div className={styles.stat_times}>
            <div className={styles.header}>
                <span>{language === 'Eng' ? "Times" : 'Тайм'}</span>
            </div>
            <div className={styles.list_times}>
                <div className={styles.times}>
                    {times.map(it =>
                        <div key={it.id} className={it.id === activeTimeFrame.gametimeframe_1 ? styles.active_time : styles.t} onClick={() => setActiveTimeFrame((prevState: any) => ({ ...prevState, gametimeframe_1: it.id }))}>{it.time}</div>
                    )}
                </div>
                <div className={styles.times}>
                    {times.map(it =>
                        <div key={it.id} className={it.id === activeTimeFrame.gametimeframe_3 ? styles.active_time : styles.t} onClick={() => setActiveTimeFrame((prevState: any) => ({ ...prevState, gametimeframe_3: it.id }))}>{it.time}</div>
                    )}
                </div>
                <div className={styles.times}>
                    {times.map(it =>
                        <div key={it.id} className={it.id === activeTimeFrame.gametimeframe_5 ? styles.active_time : styles.t} onClick={() => setActiveTimeFrame((prevState: any) => ({ ...prevState, gametimeframe_5: it.id }))}>{it.time}</div>
                    )}
                </div>
                <div className={styles.times}>
                    {times.map(it =>
                        <div key={it.id} className={it.id === activeTimeFrame.gametimeframe_10 ? styles.active_time : styles.t} onClick={() => setActiveTimeFrame((prevState: any) => ({ ...prevState, gametimeframe_10: it.id }))}>{it.time}</div>
                    )}
                </div>
                <div className={styles.times}>
                    {times.map(it =>
                        <div key={it.id} className={it.id === activeTimeFrame.gametimeframe_15 ? styles.active_time : styles.t} onClick={() => setActiveTimeFrame((prevState: any) => ({ ...prevState, gametimeframe_15: it.id }))}>{it.time}</div>
                    )}
                </div>
                <div className={styles.times}>
                    {times.map(it =>
                        <div key={it.id} className={it.id === activeTimeFrame.gametimeframe_all ? styles.active_time : styles.t} onClick={() => setActiveTimeFrame((prevState: any) => ({ ...prevState, gametimeframe_all: it.id }))}>{it.time}</div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default FieldTimes

