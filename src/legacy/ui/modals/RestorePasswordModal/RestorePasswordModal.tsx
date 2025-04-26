import { FC, useContext, useState } from 'react'
import styles from './RestorePasswordModal.module.scss'
import axios from 'axios'
import { LanguageContext } from '../../../context/LanguageContext/LanguageContext'
import MainBtn from '../../Buttons/MainBtn/MainBtn'

// post https://dev.chart-sports.com/api/auth/password/confirm/

const RestorePasswordModal: FC = () => {
    const { language } = useContext(LanguageContext)

    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [error, setError] = useState<string>('')

    const restorePasswordHandler = () => {
        if (password !== confirmPassword) {
            setError(language === 'Eng' ? 'Passwords do not match' : 'Пароли не совпадают')
            return; // Stop further execution
        }

        axios.post('https://dev.chart-sports.com/api/auth/password/confirm/', {
            "new_password": password,
            "uid": "b6d15775-b368-46e3-b3a4-58b508aaf4bd",
            "token": "c1glzj-d82a6a79e53bc2e5d16926832d64cffe"
        }).then(response => console.log(response))
    }

    return (
        <div className={styles.restore_password_modal_overlay}>
            <div className={styles.restore_password_moda_content}>
                <div className={styles.modal_header}>
                    Восстановление пароля
                </div>
                <form className={styles.restore_password_from}>
                    <div className={styles.field}>
                        <label htmlFor="">{language === 'Eng' ? 'Enter new password' : 'Введите новый пароль'}</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="">{language === 'Eng' ? 'Confirm new password' : 'Подтвердите новый пароль'}</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                </form>
                {error && <div className={styles.error_message}>{error}</div>}
                <div className={styles.btn_container}>
                    <MainBtn onClick={restorePasswordHandler}>{language === 'Eng' ? 'Confirm' : 'Подтвердить'}</MainBtn>
                </div>
            </div>
        </div>
    )
}

export default RestorePasswordModal;
