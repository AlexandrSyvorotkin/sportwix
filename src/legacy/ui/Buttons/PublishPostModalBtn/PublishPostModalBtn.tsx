import React, {FC, ReactNode} from 'react';
import styles from './PublishPostModalBtn.module.scss'

interface PublishPostModalBtnProps {
    children: ReactNode
}

const PublishPostModalBtn:FC <PublishPostModalBtnProps> = ({children}) => {
    return (
        <button className={styles.publishpost_modal_btn}>
            {children}
        </button>
    );
};

export default PublishPostModalBtn;