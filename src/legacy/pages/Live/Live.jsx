import React from 'react';
import styles from './Live.module.scss'
import WorkInProgress from '../../components/WorkInProgress/WorkInProgress';

const Live = () => {
    return (
        <div className={styles.live}>
            <WorkInProgress/>
        </div>
    );
};

export default Live;