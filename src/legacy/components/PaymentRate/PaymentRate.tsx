import {FC} from 'react'
import styles from './PaymentRate.module.scss'
import MainBtn from '../../ui/Buttons/MainBtn/MainBtn'

interface PaymentRateProps {
    payment_title: string,
    description: string,
    payment_cost: string,
    rate: boolean
}

const PaymentRate:FC<PaymentRateProps> = ({payment_title, description, payment_cost, rate}) => {

    return (
        <div className={styles.payment_rate}>
            <span className={styles.title}>{payment_title}</span>
            <p className={styles.description}>{description}</p>
            <span className={styles.cost}>{payment_cost}</span>
            {
                rate ? 
                <span style={{color: '#469A1F'}}>Your Plan</span>
                : 
                <MainBtn onClick={() => null}>Switch to «Premium» plan</MainBtn>
            }
        </div>
    )
}

export default PaymentRate