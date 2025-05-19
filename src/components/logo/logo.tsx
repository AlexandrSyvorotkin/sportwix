import styles from './Logo.module.scss'
import logo from '../../assets/logo.svg'
import {useAppDispatch} from "../../hooks/hooks";
import { switchPageToStartPostition } from '../../store/tournament-slice/tournament-slice';

const Logo = () => {

	const dispatch = useAppDispatch()


	return (
		<div className={styles.logo} onClick={() => dispatch(switchPageToStartPostition())} style={{cursor: 'pointer'}}>
			<div className={styles.logo_img}  >
				<img src={logo} alt=""/>
			</div>
			<div className={`${styles.logo_name}`}>
				Sport Wix
			</div>
		</div>
	);
};

export {Logo};
