import { FC } from 'react'
import styles from './work-in-progress.module.scss'
import imgWork from '../../assets/work-in-progress.svg'

const WorkInProgress:FC = () => {

    return (
        <div className={styles.work_in_progress_wrapper}>
            <div className={styles.work_in_progress}>
            <div className={styles.img_background}>
                <div className={styles.img_wrapper}>
                    <img src={imgWork} alt="" />
                </div>
            </div>
            {/* <span>{language === 'Eng' ? 'Work in progress' : 'Раздел в разработке'}</span>
            <span>{language === 'Eng' ? "We'll be back soon with updates" : "Мы скоро вернемся с обновлениями"}</span> */}

            <span>Раздел в разработке</span>
            
        </div>
        {/* <SubscribeBtn>Subscribe our updates</SubscribeBtn> */}
        </div>
    )
}

export default WorkInProgress