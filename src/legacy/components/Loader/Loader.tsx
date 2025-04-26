import React, { FC } from 'react';
import styles from './Loader.module.scss'

const Loader:FC = () => {
    return (
        <div className={styles.loader}>
            <div className={styles.img_wrapper}>
                <img src={require('../../assets/loader/loader2.gif')} alt=""/>
            </div>
        </div>
    );
};

export default Loader;