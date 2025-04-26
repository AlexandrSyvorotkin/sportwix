import React, {FC, useContext, useEffect, useRef, useState} from 'react';
import arrowOpen from '../../assets/select-arrows/open-arrow.svg'
import arrowClose from '../../assets/select-arrows/close-arrow.svg'
import styles from './CustomSelect.module.scss'
import {Link} from "react-router-dom";
import { ThemeContext } from '../../context/ThemeContext/ThemeContext';
import classNames from 'classnames';
import { LanguageContext } from '../../context/LanguageContext/LanguageContext';
import { useOutside } from '../../hooks/useOutsideClick';

interface RoutingLinks {
    img?: string
    ruTitle: string,
    path: string,
    engTitle: string,
    tournamentPath: string,
    championshipId: string,
    season: string
}

interface Languages {
    language: string
}

interface CustomSelectProps {
    options?: RoutingLinks[],
    languages?: Languages[]
    defaultValue?: string;
    type: string,
    setActiveParameter?: (activeParameter:number) => void,
    fetchChampionshipData?: any
}

//Понять как работает

const CustomSelect: FC<CustomSelectProps> = ({options, defaultValue, type, languages, setActiveParameter, fetchChampionshipData}) => {

    const {language} = useContext(LanguageContext)
    const {ref, isShow, setIsShow} = useOutside(false)

    const [selectedValue, setSelectedValue] = useState(defaultValue)


    useEffect(() => {
        setSelectedValue(defaultValue)
    }, [defaultValue])
  
    const ChooseChampionshipHandler = (name: string, championshipId: string, season: string) => {
        setIsShow(false)
        setSelectedValue(name)
        fetchChampionshipData(championshipId, season)
    }

    const {setLanguage} = useContext(LanguageContext)

    const ChooseActiveTab = (name: string, activeIndex: number) => {
        if (setActiveParameter) {
            setActiveParameter(activeIndex);
        }
        setIsShow(false);
        setSelectedValue(name);
        setLanguage(name)
    }


    const {theme} = useContext(ThemeContext)

    const textStyles = classNames({
        [styles.default_close]: !isShow,
        [styles.default_active]: isShow,
        [styles.default_close_light_theme]: theme === 'light'
    })


    return (
        <div ref={ref} className={styles.select_container}>
            <div className={styles.select_close_default} onClick={() => setIsShow(!isShow)}>
                <span className={textStyles}>{selectedValue}</span>
                <img src={isShow ? arrowClose : arrowOpen} alt=""/>
            </div>
            <div className={isShow ? styles.select_opened : styles.select}>
                {type === 'routing'
                    ? <>
                        {options?.map((it, id) =>
                            <Link to={it.path} key={id}>
                                <div onClick={() => ChooseChampionshipHandler(language === 'eng' ? it.engTitle : it.ruTitle, it.championshipId, it.season)} className={styles.link_item}>
                                    {it.img ? <div className={styles.img_wrapper}>
                                        <img src={it.img} alt=""/>
                                    </div> : null}
                                    <span>{language === 'Eng' ? it.engTitle : it.ruTitle}</span>
                                </div>
                            </Link>
                        )}
                    </>
                    : null
                }
                {type === 'localization'
                    ? <>
                        {languages?.map((it, index) =>
                            <div key={it.language} className={styles.link_item}
                                onClick={() => ChooseActiveTab(it.language, (index + 1))}>
                                <span>{it.language}</span>
                            </div>
                    )}
                    </>
                    : null
                }
            </div>
        </div>
    );
};

export default CustomSelect;