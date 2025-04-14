import { FC, useContext, useState } from "react";
import styles from './EducationOffer.module.scss'
import closeModal from '../../assets/close_modal2.svg'
import { RootState } from "../../redux/store";
import { useAppDispatch, useAppSelector } from "../../types/hooks";
import { disableEducationOffer } from "../../redux/GuidelineRoadmapSlice/GuidelineRoadmapSlice";
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";


interface EducationOfferProps {
    top?: number,
    left?: number
}

const EducationOffer:FC<EducationOfferProps> = (top,left) => {

    const dispatch = useAppDispatch()
    const isEdicationOfferActive =  useAppSelector((state:RootState) => state.guidelineRoadmap.educationOffer)
    const {language} = useContext(LanguageContext)

    if (!isEdicationOfferActive) return null

    const text = {
        eng: 'We recommend going through the step-by-step SportWix instructions',
        ru: 'Рекомендуем пройти пошаговую инструкцию SportWix'
    }

    return (
        <div className={styles.education_offer}>
            <p>{language === 'Eng' ? text.eng : text.ru}</p>
            <div className={styles.triangle_right}></div>
            <div className={styles.header}>
                <button onClick={() => dispatch(disableEducationOffer())} className={styles.close_button}>Закрыть</button>
            </div>
        </div>
    )
}

export default EducationOffer