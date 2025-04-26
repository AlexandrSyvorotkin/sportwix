import { FC, lazy, useContext, useState } from 'react'
import styles from './UserPasswordData.module.scss'
import { useNavigate } from 'react-router-dom'
import { LanguageContext } from '../../context/LanguageContext/LanguageContext'
import showPassword from '../../assets/accaunt/passwordVisible.svg'
import hidePassword from '../../assets/accaunt/passwordHidden.svg'

interface UserPasswordData {
    password: any,
    setPassword: any,
    changePasswordMessage: string,
    isSuccessPasswordChange: boolean
}

const UserPasswordData: FC<UserPasswordData> = ({ password, setPassword, changePasswordMessage, isSuccessPasswordChange }) => {

    const navigate = useNavigate()
    const { language } = useContext(LanguageContext)
    const [passwordVisibility, setPasswordVisibility] = useState({
        oldPasswordVisible: false,
        newPasswordVisible: false
    })

    const color = isSuccessPasswordChange ? 'green' : 'red' 

    return (
        <div className={styles.change_password}>
            <div className={styles.change_password_header}>
                <h3>{language === 'Eng' ? 'Change password' : 'Сменить пароль'}</h3>
                <span className={styles.purple} onClick={() => navigate('/restore-password')}>{language === 'Eng' ? 'I do not remember the password' : 'Я не помню пароль'}</span>
            </div>
            <div className={styles.password_inputs}>
                <div className={styles.field}>
                    <label htmlFor="">{language === 'Eng' ? 'Old password' : 'Старый пароль'}</label>
                    <div className={styles.input_wrapper}>
                        <input
                            type={passwordVisibility.oldPasswordVisible ? 'text' : 'password'}
                            placeholder={language === 'Eng' ? 'Old password' : 'Старый пароль'}
                            onChange={(e) => setPassword({ ...password, oldPassword: e.target.value })}
                            value={password.oldPassword}
                            autoComplete='password'
                        />
                        <div className={styles.button_wrapper}>
                            <button className={styles.show_password} onClick={() => setPasswordVisibility(prevState => ({ ...prevState, oldPasswordVisible: !prevState.oldPasswordVisible }))}>
                                <img src={passwordVisibility.oldPasswordVisible ? showPassword : hidePassword}  alt="" />
                            </button>
                        </div>
                    </div>

                </div>
                <div className={styles.field}>
                    <label htmlFor="">{language === 'Eng' ? 'New password' : 'Новый пароль'}</label>
                    <div className={styles.input_wrapper}>
                        <input
                            type={passwordVisibility.newPasswordVisible ? 'text' : 'password'}
                            placeholder={language === 'Eng' ? 'New password' : 'Новый пароль'}
                            onChange={(e) => setPassword({ ...password, newPassword: e.target.value })}
                            value={password.newPassword}
                        />
                        <div className={styles.button_wrapper}>
                            <button className={styles.show_password} onClick={() => setPasswordVisibility(prevState => ({ ...prevState, newPasswordVisible: !prevState.newPasswordVisible }))}>
                                <img src={passwordVisibility.newPasswordVisible ? showPassword : hidePassword} alt="" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ color: color }}>{changePasswordMessage}</div>
        </div>
    )
}

export default UserPasswordData