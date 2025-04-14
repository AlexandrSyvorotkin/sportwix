import { FC, useContext, useEffect, useState } from 'react'
import styles from './UserPersonalData.module.scss'
import axios from 'axios'
import { RootState } from '../../redux/store'
import { useAppSelector } from '../../types/hooks'
import { LanguageContext } from '../../context/LanguageContext/LanguageContext'
import { IMG_PATH } from '../../api/variables'

interface UserPersonalDataProps {
    userData: any,
    setUserData: any,
    avatarPreview: any,
    setAvatarPreview: any
}



const UserPersonalData: FC<UserPersonalDataProps> = ({userData, setUserData, avatarPreview, setAvatarPreview}) => {

    const user = useAppSelector((state: RootState) => state.user)
    


    // console.log(userData.avatar, 'get User')


    const deletePhotoHandler = () => {
        setUserData({...userData, avatar: null})
    }

    const {language} = useContext(LanguageContext)

    const updateAvatarHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e.target.files, 'files')
        const file = e.target.files?.[0]; // Get the first selected file
        // if (file) {
        //     // Perform any additional validation if needed
        //     // Set the file information in your state
        //     setUserData({ ...userData, avatar: file });
        // }

        if (file) {
            const imageUrl = URL.createObjectURL(file); // Создаем URL изображения
            setAvatarPreview(imageUrl); // Устанавливаем URL в состояние для предпросмотра
            setUserData({ ...userData, avatar: file }); // Устанавливаем файл в состояние данных пользователя
        }
    }

    

    return (
        <div className={styles.info_wrapper}>
            <h3 style={{ color: 'white' }}>{language === 'Eng' ? 'User information' : 'Данные пользователя'}</h3>
            <div className={styles.personal_info}>
                <div className={styles.info_user}>
                    <form action="" className={styles.form_information}>
                        <div className={styles.field}>
                            <label htmlFor="">{language === 'Eng' ? 'First name' : 'Имя'}</label>
                            <input 
                                type="text"
                                value={userData.first_name}
                                onChange={(e) => setUserData({ ...userData, first_name: e.target.value })}
                            />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="">{language === 'Eng' ? 'Last Name' : 'Фамилия'}</label>
                            <input 
                                type="text"
                                value={userData.last_name}
                                onChange={(e) => setUserData({ ...userData, last_name: e.target.value })}
                            />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="">{language === 'Eng' ? 'Nickname' : 'Имя пользователя'}</label>
                            <input 
                                type="text"
                                value={userData.username}
                                onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                            />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="">{language === 'Eng' ? 'Phone number' : 'Номер телефона'}</label>
                            <input 
                                type="number" 
                                value={userData.phone_number}
                                onChange={(e) => setUserData({ ...userData, phone_number: e.target.value })}
                            />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="">{language === 'Eng' ? 'Email' : 'Почта'}</label>
                            <input 
                                type="text" 
                                value={userData.email}
                                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                            />
                        </div>
                    </form>
                </div>
                <div className={styles.avatar_wrapper}>
                    <span>{language === 'Eng' ? 'Avatar' : 'Аватар'}</span>
                    <div className={styles.download_avatar}>
                        {avatarPreview ?
                            <div className={styles.download_avatar_img}>
                                <img src={avatarPreview} alt="Avatar Preview" />
                            </div>
                        : <>
                            {userData.avatar === null 
                            ? 
                            <div className={styles.download_avatar_img}></div> 
                            : 
                            <div className={styles.download_avatar_img}>
                                <img src={`${IMG_PATH}${userData.avatar}`} alt="" />
                            </div>
                        }
                        </>}
                        <div className={styles.img_format}>
                            <span>JPEG or PNG, size up to<br /> 770 kb</span>
                            <div className={styles.btn_section}>
                                <input type='file' placeholder='Upload photo' onChange={updateAvatarHandler} />
                                
                                <button onClick={deletePhotoHandler}>{language === 'Eng' ? 'Delete photo' : 'Удалить фото'}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserPersonalData