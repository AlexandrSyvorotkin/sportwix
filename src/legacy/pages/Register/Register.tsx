import React, {FC, useState, ChangeEvent, FormEvent, useEffect } from 'react';
import styles from './Register.module.scss'
import {useNavigate} from "react-router-dom";
import MainBtn from '../../ui/Buttons/MainBtn/MainBtn';
import axios from 'axios';
import { API_VARIABLES } from '../../api/variables';
import RegisterAndLoginForm from '../../components/RegisterAndLoginForm/RegisterAndLoginFrom';

interface RegisterProps {
    header_type?: string,
    type?: string
}



const Register:FC<RegisterProps> = () => {

    const [showPassword, setShowPassword] = useState<boolean>(true);
    const navigate = useNavigate()

    const [successRegistration, setSuccessRegistration] = useState<boolean>(false)
    

    const redirectToCabinet = () => {
        navigate('/personal-accaunt')
    }

    return (
        <section className={styles.cabinet}>
                {
                    !successRegistration ?
                        <>
                            <RegisterAndLoginForm 
                            successRegistration={successRegistration} 
                            setSuccessRegistration={setSuccessRegistration} 
                            type='register'
                            />
                        </>
                        : <h1 style={{color: "white"}}>Вы успешно зарегистрированы!</h1>
                }
        </section>
    );
};

export default Register;