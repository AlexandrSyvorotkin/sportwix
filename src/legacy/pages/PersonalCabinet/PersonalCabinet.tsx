import React, { FC, useContext, useEffect, useState } from 'react';
import styles from './PersonalCabinet.module.scss'
import MainBtn from '../../ui/Buttons/MainBtn/MainBtn';
import UserPersonalData from '../../components/UserPersonalData/UserPersonalData';
import UserPasswordData from '../../components/UserPasswordData/UserPasswordData';
import UserSettings from '../../components/UserSettings/UserSettings';
import Payment from '../../components/Payment/Payment';
import { useAppDispatch, useAppSelector } from '../../types/hooks';
import { removeUser, setUser, setUserAvatar } from '../../redux/userSlice/userSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { RootState } from '../../redux/store';
import { LanguageContext } from '../../context/LanguageContext/LanguageContext';
import { IMG_PATH } from '../../api/variables';

interface PersonalCabinetProps {
    name: string
}

export type userData = {
    avatar?: string
    email?: string
    first_name?: string
    language?: string
    last_name?: string
    newsletter?: boolean
    notifications?: boolean
    phone_number?: string
    plan?: string
    theme?: string
    username?: string
}


const PersonalCabinet: FC<PersonalCabinetProps> = ({ name }) => {

    const [activeTabIndex, setActiveTabIndex] = useState<number>(0)
    const [updateText, setUpdateText] = useState<string>('')
    const [isSuccessUpdate, setIsSuccessUpdate] = useState(false)
    const auth = useAppSelector((state: RootState) => state.user.isAuth)

    const dispatch = useAppDispatch()

    const navigate = useNavigate()
    const [avatarPreview, setAvatarPreview] = useState<string | undefined>(undefined);

    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');


    const exitHandler = () => {
        dispatch(removeUser())
        navigate('/chart')
    }

    const [userData, setUserData] = useState<any>({})
    const user = useAppSelector((state: RootState) => state.user)

    // useEffect(() => {
    //     if (!auth) {
    //         navigate('/chart')
    //     }
    // }, [])

    useEffect(() => {
        if (accessToken) {
            // navigate('/personal-accaunt')
          } else {
            navigate('/chart')
          }
    }, [accessToken])
    // console.log(accessToken)

    useEffect(() => {
        // console.log(user.token, 'get user info')
        axios.get('https://dev.chart-sports.com/api/auth/profile/', {
            headers: {
                'Authorization': `Bearer ${user.accessToken}`,
            },
        })
            .then(response => {
                const { data } = response
                dispatch(setUserAvatar(data.avatar))
                setUserData({
                    username: data.username,
                    first_name: data.first_name,
                    last_name: data.last_name,
                    email: data.email,
                    phone_number: data.phone_number,
                    avatar: data.avatar
                })
                localStorage.setItem('userData', JSON.stringify(data));
            })
            .catch(error => {
            });
    }, [])

    const { language } = useContext(LanguageContext)

    // const refreshToken = useAppSelector((state:RootState) => state.user.refreshToken)

    useEffect(() => {
        if (accessToken && refreshToken) {
            dispatch(setUser({username: '', accessToken: accessToken, refreshToken: refreshToken}))
        }
    }, [])

    function decodeJwt(token: string) {
        const parts = token.split('.');
        const encodedPayload = parts[1];
        const decodedPayload = atob(encodedPayload);
        const parsedPayload = JSON.parse(decodedPayload);
        return parsedPayload;
      }
      
      useEffect(() => {
        const checkTokenExpiration = async () => {
            if (!accessToken || !refreshToken) return;
    
            const { exp } = decodeJwt(accessToken);
            const currentTime = Math.floor(Date.now() / 1000);
    
            // Проверяем, остается ли менее часа до истечения срока действия токена
            if (exp - currentTime < 3600) {
                try {
                    const response = await axios.post('https://dev.chart-sports.com/api/auth/token/refresh/', {
                        "refresh": refreshToken
                    });
                    const newAccessToken = response.data.access_token;
                    // Обновляем access токен в хранилище (например, в localStorage)
                    localStorage.setItem('accessToken', newAccessToken);
                } catch (error) {
                    // Обработка ошибок при обновлении токена
                    console.error('Ошибка при обновлении токена:', error);
                }
            }
        };
    
        // Проверяем каждые 30 секунд
        const interval = setInterval(checkTokenExpiration, 30000);
    
        // Очистка интервала при размонтировании компонента
        return () => clearInterval(interval);
    }, [accessToken, refreshToken]);


    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
    }, []);

    const Error = {
        emailError: language === 'Eng' ? 'Enter a valid email address.' : 'Введите правильный адрес электронной почты',
        phoneNumber: language === 'Eng' ? 'Ensure this field has no more than 15 characters.' : 'Введите корректный номер телефона не больше 15 символов',
        imageError: language === 'Eng' ?  'Upload a valid image. The file you uploaded was either not an image or a corrupt': 'Загрузите допустимое изображение. Загруженный вами файл либо не является изображением, либо поврежден.'
    }

    const updateUserDataHandler = () => {
        const formData = new FormData();
        formData.append('username', userData.username);
        formData.append('first_name', userData.first_name);
        formData.append('last_name', userData.last_name);
        formData.append('email', userData.email);
        formData.append('phone_number', userData.phone_number);
        if (userData.avatar instanceof File) {
            formData.append('avatar', userData.avatar);
        }

        axios.put('https://dev.chart-sports.com/api/auth/profile/', formData, {
            headers: {
                'Authorization': `Bearer ${user.accessToken}`,
                'Content-Type': 'multipart/form-data', // Убедитесь, что устанавливаете правильный заголовок для FormData
            },
        })
            .then(response => {
                console.log(response, 'update');
                if (response.status === 200) {
                    setUpdateText('Данные успешно обновлены');
                    setIsSuccessUpdate(true)
                    setTimeout(() => {
                        setUpdateText('');
                    }, 10000);
                }
            })
            .catch(error => {
                console.log(error, 'error')
            if (error.response && error.response.data) {
                setIsSuccessUpdate(false)
                const { email, phone_number, avatar } = error.response.data;
                if (email) {
                    setUpdateText(Error.emailError)
                } else if (phone_number) {
                    setUpdateText(Error.phoneNumber)
                } else if (avatar) {
                    setUpdateText(Error.imageError)
                }
                setTimeout(() => {
                    setUpdateText('');
                }, 10000);
            }
            });
    };



    const [password, setPassword] = useState({
        newPassword: '',
        oldPassword: ''
    })

    const [changePasswordMessage, setChangePasswordMessage] = useState('')

    const succesPasswordChangingMessage = language === 'Eng' ? "Password has changed successfuly" : "Пароль успешно изменен"
    const failedPasswordChangingMessage = language === 'Eng' ? "Invalid old password." : "Старый пароль введен неправильно"
    const [isSuccessPasswordChange, setIsSuccessPasswordChange] = useState(false)

    const changePassword = () => {
        axios.post('https://dev.chart-sports.com/api/auth/password/change/', {
            "old_password": password.oldPassword,
            "new_password": password.newPassword

        },
            {
                headers: {
                    'Authorization': `Bearer ${user.accessToken}`,
                },
            })
            .then(response => {
                const { data } = response
                // console.log(response, 'change password')
                if (response.data.message === 'Password successfully changed.') {
                    setChangePasswordMessage(succesPasswordChangingMessage)
                    setIsSuccessPasswordChange(true)
                }
                setTimeout(() => {
                    setChangePasswordMessage('')
                }, 3000)
            })
            .catch(error => {
                // console.log(error)
                setIsSuccessPasswordChange(false)
                setChangePasswordMessage(failedPasswordChangingMessage)
            });
    }

    const color = isSuccessUpdate ? 'green' : 'red' 

    return (
        <section className={styles.personal_cabinet}>
            <div className={styles.cabinet_wrapper}>
            <div className={styles.header}>
                {avatarPreview ?
                    <div className={styles.avatar}>
                    <img src={avatarPreview} alt="" />
                    </div>
                :
                    <>
                        {userData.avatar === null
                    ?
                    <div className={styles.avatar}>
                    </div>
                    :
                    <div className={styles.avatar}>
                        <img src={`${IMG_PATH}/${userData.avatar}`} alt="" />
                    </div>

                }
                    </>
                }
                <span className={styles.name}>{userData.first_name} {userData.last_name}</span>
            </div>
            <div className={styles.tabs}>
                <div className={activeTabIndex === 0 ? styles.active_tab : styles.tab_item}
                    onClick={() => setActiveTabIndex(0)}
                >
                    {language === 'Eng' ? 'Personal information' : 'Данные пользователя'}
                </div>
                {/* <div className={activeTabIndex === 1 ? styles.active_tab : styles.tab_item}
                    onClick={() => setActiveTabIndex(1)}
                >
                    {language === 'Eng' ? 'Settings' : 'Настройки'}
                </div> */}
                {/* <div className={activeTabIndex === 2 ? styles.active_tab : styles.tab_item}
                    onClick={() => setActiveTabIndex(2)}
                >
                    Payment
                </div> */}
            </div>
            <div className={styles.user_data}>
                <div className={activeTabIndex === 0 ? styles.user_information : styles.tab_disabled}>
                    <UserPersonalData userData={userData} setUserData={setUserData} avatarPreview={avatarPreview} setAvatarPreview={setAvatarPreview} />
                    <UserPasswordData password={password} setPassword={setPassword} changePasswordMessage={changePasswordMessage} isSuccessPasswordChange={isSuccessPasswordChange} />
                </div>
                {/* <div className={activeTabIndex === 1 ? styles.user_information : styles.tab_disabled}>
                    <UserSettings />
                </div> */}
                {/* <div className={activeTabIndex === 2 ? styles.user_information : styles.tab_disabled}>
                    <Payment />
                </div> */}
            </div>
            <div className={styles.commit_changes}>
                <div style={{ color: color }}>{updateText}</div>
                <div className={styles.buttons}>
                    <div className={styles.buttons_lk}>
                        <MainBtn onClick={updateUserDataHandler}>{language === 'Eng' ? 'Save Changes' : 'Сохранить изменения'}</MainBtn>
                        <MainBtn onClick={exitHandler}>{language === 'Eng' ? 'Exit' : 'Выйти'}</MainBtn>
                    </div>
                    <div className={styles.button_password}>
                        <MainBtn onClick={changePassword}>{language === 'Eng' ? 'Change Password' : 'Сменить пароль'}</MainBtn>
                    </div>

                </div>
            </div>
            </div>
        </section>
    );
};

export default PersonalCabinet;