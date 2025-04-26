import React, { useContext } from 'react';
import {FC, ReactNode, MouseEventHandler} from "react";
import styles from './LoginBtn.module.scss'
import { ThemeContext } from '../../context/ThemeContext/ThemeContext';

interface LoginBtnProps {
	onClick?: MouseEventHandler<HTMLButtonElement>;
	children?: ReactNode;
}

const LoginBtn:FC<LoginBtnProps> = ({onClick, children}) => {

	const {theme} = useContext(ThemeContext)

	return (
		<button className={`${styles.login_btn} ${styles[theme]}`} onClick={onClick}>
			{children}
		</button>
	);
};

export default LoginBtn;
