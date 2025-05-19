// import { useState } from 'react';
import styles from './legacy-header.module.scss'
import Navbar from '../../components/navbar/navbar';
import { Logo } from "@components/logo";
// import {useNavigate} from 'react-router-dom';
import navbar from '../../localization/navbar/navbar.json';
import { switchPageToStartPostition } from '@store/tournament-slice/tournament-slice';
import { useNavigate } from 'react-router-dom';


const routes = [
	{id: 1, titleEng: navbar.chart.eng,titleRu: navbar.chart.ru, path: '/chart'},
	{id: 2, titleEng: navbar.news.eng,titleRu: navbar.news.ru, path: '/news'},
	{id: 3, titleEng: navbar.community.eng,titleRu: navbar.community.ru, path: '/community'},
	{id: 4, titleEng: navbar.best.eng,titleRu: navbar.best.ru, path: '/best'},
	{id: 5, titleEng: navbar.live.eng,titleRu: navbar.live.ru, path: '/live'},
]



// const languages = [
// 	{language: 'Eng'},
// 	{language: 'Ru'},
// ]


const LegacyHeader = () => {

	// const navigate = useNavigate()

	// const redirectToLogin = () => {
	// 	navigate('/login')
	// }

	// const redicerToCabinet = () => {
	// 	navigate('/personal-accaunt')
	// }

	const theme = 'dark'
	
	// const [isMobileMenuActive, setIsMobileMenuActive] = useState(false)

	const border = theme === 'dark' ? '1px solid #5C5C5C' : '1px solid #E1E3EA'
	const navigate = useNavigate()

	return (
		<header className={`${styles.header} ${styles[theme]}`} style={{borderBottom: border}}>
			<Logo onClick={() => navigate('/')}/>
			<Navbar routes={routes}/>
			<div className={styles.login_locales}>
				<div className={styles.lng_switcher}>
					Ru
				</div>
			</div>
		</header>
	);
};

export {LegacyHeader};
