import React, {FC, MouseEventHandler, useEffect, useState} from 'react'
import styles from './FAQ.module.scss'
import FaqQuestion from '../../components/FaqQuesiton/FaqQuestion'
import axios from 'axios'
import TabBtn from '../../ui/Buttons/TabBtn/TabBtn'
import MainBtn from '../../ui/Buttons/MainBtn/MainBtn'
import { useLocation, useNavigate } from 'react-router-dom'

type Faq = {
    title: string,
    text: string
}

const FAQ:FC = () => {

    const [faqQuestions, setFaqQuestions] = useState<Faq[] | []>([])

    async function fetchFaqQuestions() {
		try {
			const {data} = await axios.get('https://dev.chart-sports.com/api/v1/faq')

            setFaqQuestions(data.results)
			
		} catch {
			// setError(true)
		} finally {
			// setLoading(false)
		}
	}


	useEffect(() => {
		fetchFaqQuestions()
	},[])

    const navigate = useNavigate()

    return (
        <div className={styles.faq}>
            <div className={styles.faq_header}>
                <MainBtn onClick={() => navigate('/chart/epl')}>Назад</MainBtn>
            </div>
            <div className={styles.faq_content}>
                <span>FAQ</span>
                <div className={styles.question_list}>
                    {faqQuestions.map((it:Faq) => 
                         <FaqQuestion key={it.text} title={it.title} text={it.text}/>   
                    )}
                </div>
            </div>
        </div>
    )
}

export default FAQ

