import {FC} from 'react'
import styles from './TeamsNewsDynamics.module.scss'
import { useAppSelector } from '../../types/hooks'
import { RootState } from '../../redux/store'
import { ITeam } from '../../models/ITeam'
import Banner from '../Banner/Banner'
import { IMG_PATH } from '../../api/variables'
import Graph from '../DetailNewsDynamics/Grapth'

const stats = [
    {id: 1, title: 'Рейтинг', params: 10},
    {id: 1, title: 'xG (Ожидаемые голы)', params: 5},
    {id: 1, title: 'Точные пасы', params: 3},
    {id: 1, title: 'Выигранные дуэли', params: 7},
    {id: 1, title: 'Выигранные перехваты', params: 8},
    {id: 1, title: 'Сейвы', params: 12}
]

const TeamsNewsDynamics:FC = () => {

    // const teams = useAppSelector((state:RootState) => state.teams.teams).filter((team: ITeam) => !team.is_event)

    // console.log(teams)

    return (
        <div className={styles.teams_news_dynamics}>
            <div className={styles.header}>
                <div>#</div>
                <div>Команда</div>
                <div>Тренер</div>
                <div>Динамика новостей за неделю</div>
                <div>+</div>
            </div>
            <div className={styles.teams_list}>
                {/* {teams.map((team: ITeam, id) => 
                    <div key={team.team_uuid} className={styles.single_team}>
                        <div>{id + 1}</div>
                        <div className={styles.img_wrapper}>
                            <img src={`${IMG_PATH}${team.team_img}`} alt="" />
                        </div>
                        <div className={styles.team_name}>{team.team_name}</div>
                        <div className={styles.img_wrapper}>
                            <img src={`${IMG_PATH}${team.team_coach?.img}`} alt="" />
                        </div>
                        <Graph/>
                        <div>{team.score}</div>
                    </div>
                )} */}
            </div>
            <Banner/>
            <div className={styles.player_stat_wrapper}>
                <div className={styles.player_stat_header}>
                    <div>Имя игрока</div>
                    <div>За неделю </div>
                </div>
                <div className={styles.player_stat}>
                    <div className={styles.player_img_card}>
                        <div className={styles.img_wrapper_player}>
                        </div>
                    </div>
                    <div className={styles.player_params}>
                        {stats.map(it => 
                            <div key={it.id} className={styles.single_param}>
                                <div style={{width: '70%'}}>{it.title}</div>
                                <div>{it.params}</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeamsNewsDynamics