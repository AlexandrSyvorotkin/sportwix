import React, {FC, useState} from 'react'
import styles from './NewsModal.module.scss'
import { News } from '../../../types/types'
import closeModal from '../../../assets/close_modal2.svg'
import {useNavigate, Link} from 'react-router-dom'

interface NewsModalProps {
    img: string
    title: string
    time: string
    source_link: string
    source: string,
    close: () => void,
    text: string,
    header_text: string,
    uuid: number
}

const NewsModal:FC<NewsModalProps> = ({img, title, time, source_link, source, close, text, header_text, uuid}) => {

    const cuttedSource = source.split('').slice(12,21).join('')

    const navigate = useNavigate

    const redirectToSingleNewsPage = () => {
        // console.log(uuid)
        // navigate(`/chart-epl/news/:${uuid}`)
    }



    return (
        <div className={styles.news_modal_background} onClick={close}>
            <div className={styles.modal_content} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modal_header}>
                    <span>{title}</span>
                    <div className={styles.btns_header}>
                        {/* <button onClick={redirectToSingleNewsPage}><Link to={`/chart-epl/news/:${uuid}`}>перейти</Link></button> */}
                        <div className={styles.close_btn} onClick={close}>
                            <img src={closeModal} alt="" />
                        </div>
                    </div>
                </div>
                <div className={styles.header_text}>
                    <p>{header_text}</p>
                    <div className={styles.news_info}>
                        <span><a href={source} target='_blank'>{cuttedSource}</a></span>
                        <span>{time}</span>
                    </div>
                </div>
                <div className={styles.img_wrapper}>
                    <img src={img} alt="" />
                </div>
                <div className={styles.text} dangerouslySetInnerHTML={{ __html: text }}></div>
            </div>
        </div>
    )
}

export default NewsModal