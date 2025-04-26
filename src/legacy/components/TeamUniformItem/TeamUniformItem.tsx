import React, {FC} from 'react';
import styles from './TeamUniformItem.module.scss'
import {IMG_PATH} from "../../api/variables";

interface TeamUniformItemProps {
    uniform_img?: string,
    uniform_type?: string
}

const TeamUniformItem:FC<TeamUniformItemProps> = ({uniform_img, uniform_type}) => {
    return (
        <div className={styles.team_uniform_item}>
            <div className={styles.img_container}>
                <div className={styles.img_wrapper}>
                    <img src={`${IMG_PATH}/${uniform_img}`} alt=""/>
                </div>
            </div>
            <span className={styles.uniform_type}>{uniform_type}</span>
        </div>
    );
};

export default TeamUniformItem;