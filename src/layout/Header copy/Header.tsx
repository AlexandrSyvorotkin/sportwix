import React, {FC, useContext, useState} from 'react';
import { ThemeContext } from '../../context/ThemeContext/ThemeContext';
import styles from './Header.module.scss'
import Navbar from "../../components/navbar/navbar";
import Logo from "../../components/Logo/Logo";
import live from '../../assets/live/live.svg'
import live_active from '../../assets/live/live-active.svg'
import Dropdown from "../../components/Dropdown/Dropdown";
import LoginBtn from "../../ui/Buttons/LoginBtn";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import {useNavigate} from 'react-router-dom';
import ModeSwitcher from "../../components/ModeSwitcher/ModeSwitcher";
import mobilemenu from '../../assets/mobile/mobilemenu.svg'
import MobileBurgerMenu from '../../components/MobileBurgerMenu/MobileBurgerMenu';
import MobileSideMenu from '../../components/MobileSideMenu/MobileSideMenu';
import { useAppSelector } from '../../types/hooks';
import { RootState } from '../../redux/store';
import { LanguageContext } from '../../context/LanguageContext/LanguageContext';
import navbar from '../../localization/navbar/navbar.json'
import { IMG_PATH } from '../../api/variables';

const routes = [
	{id: 1, titleEng: navbar.chart.eng,titleRu: navbar.chart.ru, path: '/chart/epl'},
	{id: 2, titleEng: navbar.news.eng,titleRu: navbar.news.ru, path: '/news'},
	{id: 3, titleEng: navbar.community.eng,titleRu: navbar.community.ru, path: '/community'},
	{id: 4, titleEng: navbar.best.eng,titleRu: navbar.best.ru, path: '/best'},
	{id: 5, titleEng: navbar.live.eng,titleRu: navbar.live.ru, path: '/live', img: live, img_active: live_active},
]



const languages = [
	{language: 'Eng'},
	{language: 'Ru'},
]


const Header:FC = () => {

	const navigate = useNavigate()

	const redirectToLogin = () => {
		navigate('/login')
	}

	const redicerToCabinet = () => {
		navigate('/personal-accaunt')
	}

	const {theme, setTheme} = useContext(ThemeContext)
	
	const isAuth = useAppSelector((state: RootState) => state.user.isAuth)

	const [isMobileMenuActive, setIsMobileMenuActive] = useState(false)

	const {language} = useContext(LanguageContext)
	
	const userAvatar = useAppSelector((state: RootState) => state.user.userAvatar)

	const border = theme === 'dark' ? '1px solid #5C5C5C' : '1px solid #E1E3EA'

	return (
		<header className={`${styles.header} ${styles[theme]}`} style={{borderBottom: border}}>
			<Logo/>
			<Navbar routes={routes}/>
			<div className={styles.login_locales}>
				<div className={styles.lng_switcher}>
					<CustomSelect type='localization' defaultValue={language === 'Eng' ? 'Eng' : "Ru"} languages={languages}/>
					{/* <ModeSwitcher mode={theme} onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}/> */}
				</div>
				{/* {
					isAuth 
						? 
						<div className={styles.img_wrapper} onClick={redicerToCabinet}>
								<img src={`${IMG_PATH}${userAvatar}`} alt="" />
						</div> 
						: 
						<LoginBtn onClick={redirectToLogin}>{language === 'Eng' ? "Login" : "Авторизируйтесь"}</LoginBtn>
				} */}
				<LoginBtn onClick={redirectToLogin}>{language === 'Eng' ? "Login" : "Авторизируйтесь"}</LoginBtn>
				{/* <MobileBurgerMenu onClick={() => setIsMobileMenuActive(true)}/> */}
			</div>
			{/* <MobileSideMenu 
				isMenuActive={isMobileMenuActive} 
				setIsMobileMenuActive={setIsMobileMenuActive}
				routes={routes}
			/> */}
		</header>
	);
};

export default Header;
