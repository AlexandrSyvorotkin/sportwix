import React, {FC, useContext, useEffect, useState} from 'react';
import Header from "../Header/Header";
import { useLocation, Outlet } from 'react-router-dom';
import Ticker from "../../components/Ticker/Ticker";
import { ThemeContext } from '../../context/ThemeContext/ThemeContext';
import background from '../../assets/background.png'
import styles from './Layout.module.scss'
import { useAppDispatch } from '../../types/hooks';
import { setCurrentChampionshipIdAndSeason, switchPageToStartPostition } from '../../redux/tournament-slice/tournament-slice';



const Layout:FC = () => {
	const dispatch = useAppDispatch()
	const {theme} = useContext(ThemeContext)
	const [backgroundVisible, setBackgroundVisible] = useState(false)

	const location = useLocation()

	useEffect(() => {

		if (location.pathname === '/live' || 
			location.pathname === '/community'  || 
			location.pathname === '/login' ||
			location.pathname === '/news' 
		) {
			setBackgroundVisible(true)
		} else {
			setBackgroundVisible(false)

			dispatch(switchPageToStartPostition())
		}
	}, [location])

	useEffect(() => {
		dispatch(setCurrentChampionshipIdAndSeason({championshipId: '2694d35e-c157-4497-9957-56f4e93ab7bb', season: '2023-2024'}))
	}, [])


	const backgroud = theme === 'dark' ? '#1F1F1F' : 'white'

	return (
		<>
			<Ticker/>
			<Header/>
				<main style={{backgroundColor: `${backgroud}`}} className={styles.main}>
					<Outlet/>
				</main>
				{backgroundVisible ? <div className={styles.bg}>
					<img src={background} alt="" />
				</div> : null}
		</>
	);
};

export default Layout;
