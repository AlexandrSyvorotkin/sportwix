import React, {FC, useContext} from 'react';
import { ThemeContext } from '../../context/ThemeContext/ThemeContext';
import styles from './Logo.module.scss'
import logo from '../../assets/logo and favicon/Favicon.svg'
import {useAppDispatch} from "../../types/hooks";
import { LanguageContext } from '../../context/LanguageContext/LanguageContext';
import { switchPageToStartPostition } from '../../redux/tournament-slice/tournament-slice';

const Logo:FC = () => {

	const dispatch = useAppDispatch()

	const {theme} = useContext(ThemeContext)

	return (
		<div className={styles.logo} onClick={() => dispatch(switchPageToStartPostition())} style={{cursor: 'pointer'}}>
			<div className={styles.logo_img}  >
				<img src={logo} alt=""/>
			</div>
			<div className={`${styles.logo_name} ${styles[theme]}`}>
				Sport Wix
			</div>
		</div>
	);
};

export default Logo;
