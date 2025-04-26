import React from 'react';
import styles from './Community.module.scss'
import WorkInProgress from '../../components/WorkInProgress/WorkInProgress';

const Community = () => {
    return (
        <div className={styles.community}>
            <WorkInProgress/>
        </div>
    );
};

export default Community;