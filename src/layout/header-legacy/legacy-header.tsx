// import { useState } from 'react';
import styles from './legacy-header.module.scss'
import Navbar from '../../components/navbar/navbar';
import { Logo } from "@components/logo";
// import {useNavigate} from 'react-router-dom';
import navbar from '../../localization/navbar/navbar.json';
import { useNavigate } from 'react-router-dom';
import { Separator } from '@shared/separator';
import { InProgress } from '@shared/in-progress';

import icon_league2 from "../../assets/team-championships/IconLeague2.png";
import icon_league3 from "../../assets/team-championships/IconLeague3.png";
import icon_league4 from "../../assets/team-championships/IconLeague4.png";
import icon_league5 from "../../assets/team-championships/IconLeague5.png";
import { EnhancedSelect } from '@shared/ui/select';


const routes = [
	{id: 1, titleEng: navbar.chart.eng,titleRu: navbar.chart.ru, path: '/chart'},
	{id: 2, titleEng: navbar.news.eng,titleRu: navbar.news.ru, path: '/news'},
	{id: 3, titleEng: navbar.community.eng,titleRu: navbar.community.ru, path: '/community'},
	{id: 4, titleEng: navbar.best.eng,titleRu: navbar.best.ru, path: '/best'},
	{id: 5, titleEng: navbar.live.eng,titleRu: navbar.live.ru, path: '/live'},
]

const dispicplines_list = [
	{id: 1, name: 'Football'},
	{id: 2, name: 'Hockey'},
	{id: 3, name: 'Basketball'},
	{id: 4, name: 'Tennis'},
	{id: 5, name: 'Cricket'},
	{id: 6, name: 'Golf'},
	{id: 7, name: 'American Football'},
	{id: 8, name: 'Baseball'},
	{id: 9, name: 'Volleyball'},
]

const leagues_list = [
	{id: 1, name: 'Premier League', img: icon_league2},
	{id: 2, name: 'La Liga', img: icon_league3},
	{id: 3, name: 'Bundesliga', img: icon_league4},
	{id: 4, name: 'Serie A', img: icon_league5},
	{id: 5, name: 'Ligue 1', img: icon_league5},
]


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
			<div className="flex items-center gap-10">
				<EnhancedSelect items={dispicplines_list} placeholder="Футбол" onValueChange={(value) => console.log(value)}/>
				<Separator className="w-[1px] h-[34px]" />
				<EnhancedSelect customSelectElements={leagues_list} placeholder="Премьер-Лига" onValueChange={(value) => console.log(value)}/>
				<Navbar routes={routes}/>
			</div>
			<div className={styles.login_locales}>
				<div className={styles.lng_switcher}>
					<InProgress>Ru</InProgress>
				</div>
			</div>
		</header>
	);
};

export {LegacyHeader};
