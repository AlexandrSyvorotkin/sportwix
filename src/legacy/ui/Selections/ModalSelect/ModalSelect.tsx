import React, {FC, useState} from 'react';
import styles from './ModalSelect.module.scss'
import arrow_close from '../../../assets/select-arrows/open-arrow.svg'
import arrow_opened from '../../../assets/select-arrows/Vector 8.svg'

interface SingleTeam {
    team: string,
    img: string,
    points: number
}

interface Teams {
    teams: SingleTeam[]
}

const ModalSelect:FC<Teams> = ({teams}) => {

    const reverseTeams = teams.sort((a, b) => b.points - a.points)

    const [selectActive, setSelectActive] = useState<boolean>(false)
    const [activeTeamSelect, setActiveTeamSelect] = useState<boolean>(false)
    const [activeTeam, setActiveTeam] = useState({
        img: '',
        team: ''
    })
    const [searchTerm, setSearchTerm] = useState<string>('');
    const filteredTeams = reverseTeams.filter((team) =>
        team.team.toLowerCase().includes(searchTerm.toLowerCase())
    );


    const chooseActiveTeam = (img: string, team: string) => {
        setSelectActive(false)
        setActiveTeamSelect(true)
        setActiveTeam({
            img: img,
            team: team
        })
    }

    return (
        <>
            <div className={styles.modal_select} onClick={() => setSelectActive(!selectActive)}>
                    {activeTeamSelect
                        ?
                        <div className={styles.team_selected}>
                            <img
                                className={styles.team_img}
                                src={activeTeam.img} alt=""/>
                                {activeTeam.team}
                        </div>
                        : (<input
                            type="text"
                            className={styles.select_input}
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                            placeholder="Название команды"
                        />)}
                <img src={selectActive ? arrow_close : arrow_opened} alt=""/>
                {selectActive ?
                    <div className={styles.active_selection}>
                        {filteredTeams.map(team =>
                            <div className={styles.team} key={team.team} onClick={() => chooseActiveTeam(team.img, team.team)}>
                                <div className={styles.team_img} >
                                    <img src={team.img} alt=""/>
                                </div>
                                <span className={styles.team_name}>{team.team}</span>
                            </div>
                        )}
                    </div>
                    : null
                }
            </div>
        </>
    );
};

export default ModalSelect;