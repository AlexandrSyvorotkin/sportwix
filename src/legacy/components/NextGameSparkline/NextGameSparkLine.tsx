import React, {FC, useContext} from 'react';
import styles from './NextGameSparkLine.module.scss'
import { IMG_PATH } from '../../api/variables';
import { LanguageContext } from '../../context/LanguageContext/LanguageContext';

interface NextGameSparkLineProps {
    team_logo: string,
    match_type?: boolean,
    possible_winning_percentage: number
}

const NextGameSparkLine:FC<NextGameSparkLineProps> = ({team_logo, match_type, possible_winning_percentage}) => {
    const {language} = useContext(LanguageContext)

    const homeGameType = language === 'Eng' ? 'H' : 'Д'
    const awayGameType = language === 'Eng' ? 'A' : 'Г'


    let borderColor = '';

    if (possible_winning_percentage === 50) {
        borderColor = '#FF7B33';
    } else if (possible_winning_percentage > 50) {
        borderColor = '#51B136';
    } else {
        borderColor = '#C00000';
    }


    //#C00000 #51B136 #FF7B33

    return (
        <div className={styles.next_game_sparkline}>
            <div className={styles.game_info}>
                <span style={{color: borderColor}}>{match_type ? homeGameType : awayGameType}</span>
                <span className={styles.possible_winning_percentage}>{possible_winning_percentage}%</span>
            </div>
            <div className={styles.img_wrapper}>
                <img src={`${IMG_PATH}${team_logo}`} alt=""/>
            </div>
        </div>
    );
};

export default NextGameSparkLine;