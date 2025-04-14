import React, { FC } from 'react'
import styles from './GuidelineModal.module.scss'
import GuidelineModalBtn from '../../Buttons/GuidelineBtn/GuidelineModalBtn'
import close from '../../../assets/close (5).svg'
import { useAppDispatch, useAppSelector } from '../../../types/hooks'
import { disableGuidelineMode, disableRoadmap, skipAll, disableInteractiveRoadmap, startRoadmap } from '../../../redux/GuidelineRoadmapSlice/GuidelineRoadmapSlice'
import { switchActiveTeamDetailInfoTab, switchActiveSingleTeamInfoTab, switchActiveTeamDetailInfoTabMobile } from '../../../redux/TeamTabsSlice/TeamTabsSlice'
import { RootState } from '../../../redux/store'
import { switchPageToStartPostition } from '../../../redux/tournament-slice/tournament-slice'

const GuidelineModal: FC = () => {

    const dispatch = useAppDispatch()
    const mobile_sparkline = document.getElementById('mobile_sparkline')
    const orientation = useAppSelector((state: RootState) => state.interfaceState.mobile)


    const closeModal = () => {
        dispatch(switchActiveTeamDetailInfoTab(1))
        dispatch(switchActiveSingleTeamInfoTab(1))
        dispatch(switchPageToStartPostition())
        dispatch(disableGuidelineMode())
        dispatch(disableRoadmap())
        dispatch(switchActiveTeamDetailInfoTabMobile(1))
        if (mobile_sparkline) {
            mobile_sparkline.scrollLeft = 0;
        }
        if (orientation.isMobile) {
            dispatch(skipAll('mobile'))// Переходим к последнему шагу (пропускаем все)
        }
        dispatch(skipAll('desktop'))
        dispatch(disableInteractiveRoadmap())
    }

    return (
        <div className={styles.modal_overlay}>
            <div className={styles.modal_content}>
                <div className={styles.modal_header}>
                    <div className={styles.close_modal} onClick={closeModal}>
                        <img src={close} alt="" />
                    </div>
                </div>
                <div className={styles.modal_content_inner}>
                    <span className={styles.welcome}>Добро пожаловать на платформу SportWix!</span>
                    <div className={styles.modal_controllers}>
                        <GuidelineModalBtn onClick={() => dispatch(startRoadmap())}>Ознакомиться с функционалом</GuidelineModalBtn>
                        <GuidelineModalBtn onClick={closeModal}>В другой раз</GuidelineModalBtn>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GuidelineModal