import {FC, useContext} from 'react'
import styles from './SparklineHeader.module.scss'
import { ThemeContext } from '../../context/ThemeContext/ThemeContext'
import { LanguageContext } from '../../context/LanguageContext/LanguageContext'
import sparklineCap from '../../localization/sparkline/sparkline-cap.json'
import classNames from 'classnames'

interface SparklineHeaderProps {

}



const SparklineHeader:FC<SparklineHeaderProps> = () => {

    // console.log(sparklineCap)

    const {theme} = useContext(ThemeContext)
    const {language} = useContext(LanguageContext)

    const sparklineHeaderColors = classNames({
        [styles.bkg_light]: theme === 'light',
        [styles.bkg_dark]: theme === 'dark'
    })

    return (
        <div className={styles.sparkline_header}>
            {sparklineCap.map(it => 
                    <div>{language === 'Eng' ? it.eng : it.ru}</div>
                )}
        </div>
    )
}

export default SparklineHeader