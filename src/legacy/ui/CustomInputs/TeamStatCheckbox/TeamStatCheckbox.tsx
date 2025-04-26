import React, { FC, useRef, useEffect, useState, SetStateAction, Dispatch, useContext } from 'react'
import styles from './TeamStatCheckbox.module.scss'
import { LanguageContext } from '../../../context/LanguageContext/LanguageContext'

interface TeamStatCheckboxProps {
    title: string,
    componentVisible?: boolean,
    setMetricsVisibility?: Dispatch<SetStateAction<any>>,
    onClick: any,
    metricsVisibility: any,
    ruTitle?: string,
    engTitle?: string
}

const TeamStatCheckbox: FC<TeamStatCheckboxProps> = ({ title, componentVisible, setMetricsVisibility, onClick, metricsVisibility, engTitle, ruTitle }) => {

    const {language} = useContext(LanguageContext)

    const clickHandler = () => {
        const updatedMetricsVisibility = {
            ...metricsVisibility,
            [title]: !metricsVisibility[title],
        };
        setMetricsVisibility && setMetricsVisibility(updatedMetricsVisibility);
    };


    function formatFieldName(fieldName: string) {
        const words = fieldName.split('_');


        const formattedWords = words.map((word: string) => {
            return word.charAt(0).toUpperCase() + word.slice(1);
        });

        const formattedFieldName = formattedWords.join(' ');

        return formattedFieldName;
    }

    return (
        <div key={title} className={styles.select_metric} onClick={clickHandler}>
            <input type="checkbox" className={styles.checkbox} checked={metricsVisibility[title]} onChange={clickHandler} />
            <span>{language === 'Eng' ? engTitle : ruTitle}</span>
        </div>
    )
}

export default TeamStatCheckbox

