import { FC, useState } from 'react'
import styles from './RestorePassword.module.scss'
import MainBtn from '../../ui/Buttons/MainBtn/MainBtn'
import { useNavigate } from 'react-router-dom'
import backsvg from '../../assets/backsvg.svg'
import axios from 'axios'
import { RootState } from '../../redux/store'
import { useAppSelector } from '../../types/hooks'
import RestorePasswordModal from '../../ui/modals/RestorePasswordModal/RestorePasswordModal'

const RestorePassword: FC = () => {

    const user = useAppSelector((state: RootState) => state.user)
    const [email, setEmail] = useState<string>('')
    const [successRestore, setSuccessRestore] = useState<boolean>(false)
    const [responseText, setResponseText] = useState<string>('')
    const [textColor, setTextColor] = useState('')

    const [isRestoreModalActive, setIsRestoreModalActive] = useState<boolean>(true)


    const restorePasswordEmailHandler = () => {
        axios.post('https://dev.chart-sports.com/api/auth/password/reset/', {
            "email": email
        },
            {
                headers: {
                    'Authorization': `Bearer ${user.accessToken}`,
                },
            })
            .then(response => {
                const { data } = response
                // console.log(response, 'change password')
                if (response.data.message === "User not found") {
                    setResponseText("Пользователь не найден")
                    setTextColor('red')
                } else if (response.data.message === 'A password reset email has been sent.') {
                    setSuccessRestore(true)
                }
            })
            .catch(error => {
                const {email} = error.response.data
                if (email) {
                    setTextColor('red')
                    setResponseText('Введите корректный почтовый адресс')
                }
                // console.log(error)
            });
    }

    const navigate = useNavigate()

    return (
        <div className={styles.restore_password_section}>
            {successRestore ?
                <>
                    <h2>Проверьте почту</h2>
                    <span style={{color: 'white'}}>Ссылка отправлена <br/> на {email}</span>
                    <MainBtn onClick={() => null}>Отправить повторно</MainBtn>
                </>
                :
                <>
                    <div className={styles.restore_password_header}>
                        <div className={styles.back}>
                            <img src={backsvg} alt="" />
                            <span onClick={() => navigate('/personal-accaunt')}>Назад</span>
                        </div>
                    </div>
                    <h2>Восстановить пароль</h2>
                    <p>Введите почту, указанную при создании аккаунта. Отправим на нее ссылку для восстановления пароля</p>
                    <input type="text" placeholder='Эл. почта' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <div style={{ color: textColor }}>{responseText}</div>
                    <MainBtn onClick={restorePasswordEmailHandler}>Отправить</MainBtn>
                </>
            }
            {isRestoreModalActive ? <RestorePasswordModal/> : null}
        </div>
    )
}

export default RestorePassword