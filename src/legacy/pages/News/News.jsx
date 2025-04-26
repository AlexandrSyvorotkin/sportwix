import React from 'react';
import styles from './News.module.scss'
import WorkInProgress from '../../components/WorkInProgress/WorkInProgress';
import PlayoffGridSVG from '../../components/Playoffs/PlayoffGrid';
import burnley from '../../assets/teams/burney.svg'
import shefield from '../../assets/teams/shefield.svg'
import wolverhamptom from '../../assets/teams/wolverhampton.svg'
import chelsea from '../../assets/teams/chelsea.svg'
import luton from '../../assets/teams/luton.svg'
import brandford from '../../assets/teams/brandford.svg'
import mu from '../../assets/teams/mu.svg'
import nottingham from '../../assets/teams/nf.svg'
import newcastle from '../../assets/teams/newcastle.svg'
import westham from '../../assets/teams/westham.svg'
import tottenham from '../../assets/teams/tottenham.svg'
import mc from '../../assets/teams/mc.svg'
import brighton from '../../assets/teams/brighton.svg'
import boormut from '../../assets/teams/boormut.svg'
import fulham from '../../assets/teams/fulham.svg'
import { playoffData } from '../../components/Playoffs/data';
import NewsDimanics from '../../components/NewsDinamics/NewsDinamics';


const News = () => {

    return (
        <section className={styles.news}>
            <WorkInProgress/>
            {/* <NewsDimanics/> */}
        </section>
    );
};

export default News;










