import { FC , useContext, useEffect, useState} from 'react'
import styles from './FootballFieldMobile.module.scss'
import FootballFieldDefenseMobile from '../FootballFIeldDefenseMobile/FootballFieldDefenseMobile'
import FootballFieldMidfieldMobile from '../FootballFieldMidfieldMobile/FootballFiledMidfieldMobile'
import FootballFieldAttackMobile from '../FootballFieldAttackMobile/FootballFieldAttackMobile'
import GamesTimeFrameStatSelect from '../../ui/Selections/GameStatSelect/GameStatSelect'
import FieldMobileSelector from '../../ui/Selections/FieldMobileSelector/FieldMobileSelector'
import { LanguageContext } from '../../context/LanguageContext/LanguageContext'
import games_selectors from '../../localization/team_detail_info_section/team_stats/games_selectors.json'

const FootballFieldMobile: FC = () => {

    

    const [activeGameTime, setActiveGameTime] = useState(1)
    const [activeGamesCount, setActiveGamesCount] = useState(1)
    const {language} = useContext(LanguageContext)


    const gamesCountSelectors = [
        {id: 1, title: language === 'Eng' ? games_selectors['1game'].eng : games_selectors['1game'].ru, timeFrame: 1},
        {id: 2, title: language === 'Eng' ? games_selectors['3games'].eng : games_selectors['3games'].ru, timeFrame: 3},
        {id: 3, title: language === 'Eng' ? games_selectors['5games'].eng : games_selectors['5games'].ru, timeFrame: 5},
        {id: 4, title: language === 'Eng' ? games_selectors['10games'].eng : games_selectors['10games'].ru, timeFrame: 10},
        {id: 5, title: language === 'Eng' ? games_selectors['15games'].eng : games_selectors['15games'].ru, timeFrame: 15},
        {id: 6, title: language === 'Eng' ? games_selectors.season.eng : games_selectors.season.ru, timeFrame: 38},
    ]

    const gameTimesSelectors = [
        {id: 1, title: language === 'Eng' ? "1 time" : "1 тайм", timeFrame: 1},
        {id: 2, title: language === 'Eng' ? "2 time" : "2 тайм", timeFrame: 2},
        {id: 3, title: language === 'Eng' ? "Full time" : "Полный матч", timeFrame: 3},
    ]

    useEffect(() => {
        setActiveGameTime(3)
    })

    // console.log(activeGameTime, 'times')
    // console.log(activeGamesCount, 'games')

    return (
        <div className={styles.football_field_mobile}>
            <div className={styles.controllers_n_filters}>
                <FieldMobileSelector selectors={gamesCountSelectors} setActiveGameTime={setActiveGamesCount} activeSelector={gamesCountSelectors[0].title}/>
                <FieldMobileSelector selectors={gameTimesSelectors} setActiveGameTime={setActiveGameTime} activeSelector={gameTimesSelectors[2].title}/>
                <div style={{width: "100%", display: 'flex', justifyContent: 'center', padding: '12px 8px', borderRight: "1px solid #5C5C5C", color: 'grey'}}>H2H</div>
                {/* <FieldMobileSelector selectors={gameTimesSelectors} activeSelector=''/> */}
            </div>
            <FootballFieldDefenseMobile selectedGamesCount={activeGamesCount} activeTimeGameFrame={activeGameTime}/>
            <FootballFieldMidfieldMobile selectedGamesCount={activeGamesCount} activeTimeGameFrame={activeGameTime}/>
            <FootballFieldAttackMobile selectedGamesCount={activeGamesCount} activeTimeGameFrame={activeGameTime} />
        </div>
    )
}

export default FootballFieldMobile