import React, {FC, useState, useEffect} from 'react';
import styles from './FootballField.module.scss'
import FieldDefence from '../FieldDefence/FieldDefence';
import FieldMidfield from '../FieldMidfield/FieldMidfield';
import FieldAttack from '../FieldAttack/FieldAttack';

interface FootballFieldProps {
    selectedGamesCount: number,
    activeTimeFrame: {
        gametimeframe_1: number,
        gametimeframe_3: number,
        gametimeframe_5: number,
        gametimeframe_10: number,
        gametimeframe_15: number,
        gametimeframe_all: number
    },
}


const FootballField:FC<FootballFieldProps> = ({selectedGamesCount, activeTimeFrame}) => {
    
    return (
        <div className={styles.field}>
            <FieldDefence selectedGamesCount={selectedGamesCount} activeTimeFrame={activeTimeFrame}/>
            <FieldMidfield selectedGamesCount={selectedGamesCount} activeTimeFrame={activeTimeFrame}/>
            <FieldAttack selectedGamesCount={selectedGamesCount} activeTimeFrame={activeTimeFrame}/>
        </div>
    );
};

export default FootballField;