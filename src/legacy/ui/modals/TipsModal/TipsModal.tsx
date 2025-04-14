import React, {FC, useState} from 'react'
import styles from './TipsModal.module.scss'
import TipsComponent from '../../../components/Tips/Tips'
import closeModal from '../../../assets/close_modal2.svg'

interface TipsModalProps {
    onClose: any
}

const TipsModal:FC<TipsModalProps> = ({onClose}) => {

    return (
        <div className={styles.news_modal_background} onClick={onClose}>
            <div className={styles.modal_content} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modal_header}>
                        <span>Usage tips</span>
                        <div className={styles.btns_header}>
                            <div className={styles.close_btn} onClick={onClose}>
                                <img src={closeModal} alt="" />
                            </div>
                        </div>
                    </div>
                <TipsComponent/>
            </div>
        </div>
    )
}

export default TipsModal
