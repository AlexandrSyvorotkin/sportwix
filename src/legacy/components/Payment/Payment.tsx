import {FC} from 'react'
import styles from './Payment.module.scss'
import PaymentRate from '../PaymentRate/PaymentRate'

interface PaymentProps {

}

const Payment:FC<PaymentProps> = () => {

    let rate = 'Base'

    return (
        <div className={styles.payment}>
            <h2>Your Plan: {rate}</h2>
            <div className={styles.payment_rates}>
                <PaymentRate 
                payment_title='Base'
                description='Free access to recommendations and forecasts'
                payment_cost='0 ₽'
                rate={true}
                />
                <PaymentRate 
                payment_title='Premium'
                description='Maximum access to all features of the service'
                payment_cost='2 999 ₽ в год'
                rate={false}
                />
            </div>
        </div>
    )
}

export default Payment