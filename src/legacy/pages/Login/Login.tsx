import styles from './Login.module.scss'
import { FC, useState } from 'react'
import RegisterAndLoginForm from '../../components/RegisterAndLoginForm/RegisterAndLoginFrom'
import WorkInProgress from '../../components/WorkInProgress/WorkInProgress'

interface LoginProps {

}

const Login:FC<LoginProps> = () => {

    const [successRegistration, setSuccessRegistration] = useState<boolean | undefined>(undefined)
    

    return (
        // <section className={styles.cabinet}>
        //         {
        //             !successRegistration ?
        //                 <>
        //                     <RegisterAndLoginForm 
        //                     successRegistration={successRegistration} 
        //                     setSuccessRegistration={setSuccessRegistration}
        //                     />
        //                 </>
        //                 : <p>Вы успешно зарегистрированы!</p>
        //         }
        // </section>

        <WorkInProgress/>
    )
}

export default Login