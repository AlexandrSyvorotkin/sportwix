import styles from './RegisterAndLoginForm.module.scss'
import React, {FC, useState, ChangeEvent, FormEvent, useEffect, Dispatch, SetStateAction, useContext } from 'react';
import MainBtn from '../../ui/Buttons/MainBtn/MainBtn'
import google from '../../assets/accaunt/Frame 1014.png'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../types/hooks';
import { AppDispatch, RootState } from '../../redux/store';
import { setUser, setUserAvatar } from '../../redux/userSlice/userSlice';
import { LanguageContext } from '../../context/LanguageContext/LanguageContext';
import showPassword from '../../assets/accaunt/passwordVisible.svg'
import hidePassword from '../../assets/accaunt/passwordHidden.svg'


interface RegisterAndLoginFormProps {
    type?: string,
    successRegistration: boolean | undefined,
    setSuccessRegistration: any,
}

type RegistrationData = {
    first_name: string;
    last_name: string;
    email: string;
    username: string;
    password: string;
}

const RegisterAndLoginForm:FC<RegisterAndLoginFormProps> = ({type, successRegistration, setSuccessRegistration}) => {

    const navigate = useNavigate()
    const {language} = useContext(LanguageContext)

    const dispatch = useAppDispatch()
    const user = useAppSelector((state: RootState) => state.user)
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    

    const [registrationData, setRegistrationData] = useState<RegistrationData>({
        first_name: "",
        last_name: "",
        email: "",
        username: "",
        password: ""
    })

    const [errorMessage, setErrorMessage] = useState<string>('')

    // console.log(registrationData)

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setRegistrationData(prevData => ({
          ...prevData,
          [name]: value
        }));
    };

    const Errors = {
        emailError: language === 'Eng' ? "custom user with this email already exists." : "Пользователь с таким почтовым адресом уже существует",
        userNameError: language === 'Eng' ? "custom user with this email already exists." : "Пользователь с таким почтовым адресом уже существует",
        LoginError: language === 'Eng' ? "No active account found with the given credentials" : "Активная учетная запись с указанными учетными данными не найдена.",
    }


    const registerHanler = (event: FormEvent) => {
        event.preventDefault();
        
        axios.post('https://dev.chart-sports.com/api/auth/register/', {
            "first_name": registrationData.first_name,
            "last_name": registrationData.last_name,
            "email": registrationData.email,
            "username": registrationData.username,
            "password": registrationData.password
        })
          .then(response => {
            console.log(response.data);
            setSuccessRegistration(true)
          })
          .catch(error => {
            console.log(error, 'error')
            if (error.response && error.response.data) {
                
                const { email, username } = error.response.data;
                if (email) {
                    setErrorMessage(Errors.emailError);
                } else if (username && !email) {
                    setErrorMessage(Errors.userNameError);
                } else {
                    setErrorMessage('Произошла неизвестная ошибка');
                }
            } else {
                setErrorMessage('Что-то пошло не так');
            }
        });
    }

    const loginHandler = (event: FormEvent) => {
        event.preventDefault();
        
        axios.post('https://dev.chart-sports.com/api/auth/token/', {
            "username": registrationData.username,
            "password": registrationData.password
        })
          .then(response => {

            localStorage.setItem('accessToken', response.data.access);
            localStorage.setItem('refreshToken', response.data.refresh);
            console.log(response.data);
            dispatch(setUser({username: registrationData.username, accessToken: response.data.access, refreshToken: response.data.refresh}))
            navigate('/personal-accaunt')
          })
          .catch(error => {
            if (error.response && error.response.data) {
            setErrorMessage(Errors.LoginError)  
            }    
            }
        );
    };


    useEffect(() => {
        if (successRegistration) {
            setTimeout(() => {
                navigate('/chart-epl')
            }, 3000)
        }
    }, [])

    const showPasswordHandler = (e:any) => {
        e.preventDefault()
        setIsPasswordVisible(!isPasswordVisible)
    } 


    return (
        <>
            {
                type=== 'register' 
                ?
                <div className={styles.enter_acc}>
                    <h2 className={styles.enter_acc_header}>{language === 'Eng' ? 'Sing up' : 'Регистрация'}</h2>
                            <span className={styles.enter_header}>{language === 'Eng' ? 'Follow the best analysts and get daily recommendations' : 'Следуйте за лучшими аналитиками и получайте ежедневные рекомендации'}</span>
                            {/* <img className={styles.img} src={google} alt=""/>
                            <p>or google</p> */}
                            <form action="submit" className={styles.reg_form}>
                                <input type="text" name="first_name" placeholder={language === 'Eng' ? 'Name' : 'Имя'} value={registrationData.first_name} onChange={(e) => handleChange(e)} required/>
                                <input type="text" name="last_name" placeholder={language === 'Eng' ? 'Surname' : 'Фамилия'} value={registrationData.last_name} onChange={(e) => handleChange(e)} required/>
                                <input type="text" name="email" placeholder={language === 'Eng' ? 'Email' : 'Эл. почта'}  value={registrationData.email} onChange={(e) => handleChange(e)} required/>
                                <input type="text" name="username" placeholder={language === 'Eng' ? 'Username' : 'Имя пользователя'} value={registrationData.username} onChange={(e) => handleChange(e)} required/>
                                <div className={styles.password_input_wrapper}>
                                    <input
                                        className={styles.password_input} 
                                        type={isPasswordVisible ? 'text' : 'password'} 
                                        name="password" 
                                        placeholder={language === 'Eng' ? 'password' : 'пароль'} 
                                        value={registrationData.password} 
                                        onChange={(e) => handleChange(e)}
                                        required
                                    />
                                    <button className={styles.show_password_btn} onClick={showPasswordHandler}>
                                        <img src={isPasswordVisible ? showPassword : hidePassword} alt="" />
                                    </button>
                                </div>
                            </form>
                            <MainBtn onClick={registerHanler}>{language === 'Eng' ? 'Create account' : 'Создать аккаунт'}</MainBtn>
                            {errorMessage && !successRegistration ? <p style={{color: 'red'}}>{errorMessage}</p> : null}
                            <p>{language === 'Eng' ? 'Have account?' : 'Есть аккаунт?'} <span style={{cursor: 'pointer'}} onClick={() => navigate('/login')} className={styles.violet}>{language === 'Eng' ? 'Login' : 'Войдите'}</span></p>
                </div>
                : 
                <div className={styles.enter_acc}>
                    <h2 className={styles.enter_acc_header}>{language === 'Eng' ? 'Login' : "Вход"}</h2>
                            <span className={styles.enter_header}>{language === 'Eng' ? 'Follow the best analysts and get daily recommendations' : 'Следуйте за лучшими аналитиками и получайте ежедневные рекомендации'}</span>
                            {/* <img className={styles.img} src={google} alt=""/>
                            <p>или через почту</p> */}
                            <form action="submit" className={styles.reg_form}>
                                <input 
                                    type="text" 
                                    name="username" 
                                    placeholder={language === 'Eng' ? 'username' : 'имя пользователя'} 
                                    value={registrationData.username} 
                                    onChange={(e) => handleChange(e)} required/>
                                <div className={styles.password_input_wrapper}>
                                    <input
                                        className={styles.password_input} 
                                        type={isPasswordVisible ? 'text' : 'password'} 
                                        name="password" 
                                        placeholder={language === 'Eng' ? 'password' : 'пароль'} 
                                        value={registrationData.password} onChange={(e) => handleChange(e)}
                                        required
                                    />
                                    <button className={styles.show_password_btn} onClick={showPasswordHandler}>
                                        <img src={isPasswordVisible ? showPassword : hidePassword} alt="" />
                                    </button>
                                </div>
                            </form>
                            <span className={styles.violet} onClick={() => navigate('/restore-password')}>{language === 'Eng' ? 'Restore password' : 'Востановление пароля'}</span>
                            <MainBtn onClick={loginHandler}>{language === 'Eng' ? 'Login' : 'Войти'}</MainBtn>
                            {errorMessage && !successRegistration ? <p style={{color: 'red'}}>{errorMessage}</p> : null}
                            <p>{language === 'Eng' ? 'Dont have account?' : 'Нету аккаунат?'} <span style={{cursor: 'pointer'}} onClick={() => navigate('/register')} className={styles.violet}>{language === 'Eng' ? 'Sing up' : 'Зарегистрируйтесь'}</span></p>
                </div>
                
            }
            
        </>
    )
}

export default RegisterAndLoginForm