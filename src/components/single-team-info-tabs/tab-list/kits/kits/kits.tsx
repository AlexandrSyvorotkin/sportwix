import styles from './kits.module.scss'
import {useAppSelector} from '../../../../../hooks/hooks'
import {KitItem} from './kit-item'

const Kits = () => {
    const firstTeamSelected = useAppSelector(state => state.tournamentSlice?.firstSelectedTeam)
    const theme = 'dark'
    const language = 'Eng'
    const textColor = theme === 'dark' ? 'white' : '#333333'

    const homeKit = firstTeamSelected?.tabs?.form?.home_form || ''
    const awayKit = firstTeamSelected?.tabs?.form?.away_form || ''
    const altKit = firstTeamSelected?.tabs?.form?.alt_form || ''

    return (
        <div className={styles.uniform_and_emblems}>
            <div className={styles.uniforms}>
                <KitItem uniform_img={homeKit} uniform_type={language === 'Eng' ? 'Home kit' : 'Домашняя форма'}/>
                <KitItem uniform_img={awayKit} uniform_type={language === 'Eng' ? 'Away kit' : 'Гостевая форма'}/>
                <KitItem uniform_img={altKit} uniform_type={language === 'Eng' ? 'Reserve kit' : 'Резервная форма'}/>
            </div>
            <div className={styles.club_description}>
                <div className={styles.img_wrapper}>
                    <img src={`${firstTeamSelected?.team_img}`} alt=""/>
                </div>
                <p className={styles.text} style={{color: textColor}}>{language === 'Eng' ? firstTeamSelected?.tabs?.form?.design_info : firstTeamSelected?.tabs?.form?.design_info_ru}</p>
            </div>
        </div>
    );
};

export {Kits}