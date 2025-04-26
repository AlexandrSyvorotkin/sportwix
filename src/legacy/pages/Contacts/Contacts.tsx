import React, {FC, useContext} from 'react'
import styles from './Contacts.module.scss'
import { LanguageContext } from '../../context/LanguageContext/LanguageContext'
import MainBtn from '../../ui/Buttons/MainBtn/MainBtn'
import { useNavigate } from 'react-router-dom'


const Contacts:FC = () => {

    const {language} = useContext(LanguageContext)
    const navigate = useNavigate()

    return (
        <div className={styles.contacts}>
            <div className={styles.contacts_info}>
                <MainBtn onClick={() => navigate('/chart/epl')}>Назад</MainBtn>
                <h2>{language === 'Eng' ? "Contact us" : "Свяжитесь с нами"}</h2>
                <div className={styles.links}>
                    <div className={styles.link_item}>
                        <span className={styles.link_name}>{language === "Eng" ? "Support service:" : "Поддержите нас:"}</span>
                        <a href="mailto:support@sportwix.com">support@sportwix.com</a>
                    </div>
                    <div className={styles.link_item}>
                        <span className={styles.link_name}>{language === "Eng" ? "Concering cooperation:" : "Предложение сотрудничества"}</span>
                        <a href="mailto:partners@sportwix.com">partners@sportwix.com</a>
                    </div>
                    <div className={styles.link_item}>
                        <span className={styles.link_name}>{language === "Eng" ? "Share your idea:" : "Поделитесь своими идеями"}</span>
                        <a href="mailto:feedback@sportwix.com">feedback@sportwix.com</a>
                    </div>
                </div>
            </div>
            <div className={styles.feedback}>
                <h2>{language === "Eng" ? "Feedback" : "Обратная связь"}</h2>
                <div className={styles.feedback_info}>
                    <span>{language === 'Eng' ? "Work in progress" : "В разработке"}</span>
                </div>
            </div>
        </div>
    )
}

export default Contacts