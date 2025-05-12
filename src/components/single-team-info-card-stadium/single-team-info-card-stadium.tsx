import styles from './single-team-info-card-stadium.module.scss'
import {useAppSelector} from "../../legacy/types/hooks";
// import {IMG_PATH} from "../../legacy/api/variables";

const SingleTeamInfoStadiumCard = () => {
    const firstTeamSelected = useAppSelector(state => state.tournamentSlice?.firstSelectedTeam) || null
    // const {language} = useContext(LanguageContext)

    const stadium_name = firstTeamSelected?.tabs?.stadium?.stadion_name || ''
    const stadium_found_date = firstTeamSelected?.tabs?.stadium?.stadion_found_date || ''
    const stadium_capacity = firstTeamSelected?.tabs?.stadium?.stadion_capacity || ''
    const stadium_img = firstTeamSelected?.tabs?.stadium?.stadion_img || ''
    const stadium_alt_name = firstTeamSelected?.tabs?.stadion?.stadion_alt_name_ru || ''

    return (
        <div className={styles.stadium_description}>
            <div className={styles.description_text}>
                Стадион <span>{stadium_name} {stadium_found_date}</span>
                <span>{stadium_alt_name}</span>
                <span>Вместимость {stadium_capacity} мест.</span>
            </div>
            <div className={styles.stadium_img}>
                {stadium_img && <img src={stadium_img} alt="Stadium" />}
            </div>
        </div>
    )
}

export {SingleTeamInfoStadiumCard}