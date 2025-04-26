import { FC, useRef, useState, useEffect } from 'react'
import styles from './FieldStatSelectTeam.module.scss'
import arrowOpen from '../../../assets/select-arrows/open-arrow.svg'
import arrowClose from '../../../assets/select-arrows/close-arrow.svg'
import { IMG_PATH } from '../../../api/variables'
import { useAppDispatch, useAppSelector } from '../../../types/hooks'
import { ITeam } from '../../../models/ITeam'
import { RootState } from '../../../redux/store'
import { Root } from 'react-dom/client'
import { chooseSecondTeam, disableH2h } from '../../../redux/tournament-slice/tournament-slice'



interface FieldStatSelectTeamProps {
    selectors: any,
    onClose?: () => void,
    defaultValue: string
}

const FieldStatSelectTeam: FC<FieldStatSelectTeamProps> = ({ selectors, onClose, defaultValue }) => {


    const ref = useRef<HTMLDivElement>(null)

    const img = useAppSelector(state => state.tournamentSlice.secondSelectedTeam?.team_img)

    const [ismMenuOpen, setIsMenuOpen] = useState<boolean>(false)
    const [isParamListOpen, setIsParamListOpen] = useState<boolean>(false)
    const [selectedValue, setSelectedValue] = useState<string>('')
    const {isSingleTeamView, isDoubleTeamView} = useAppSelector((state: RootState) => state.tournamentSlice)

    const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            setIsMenuOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])


    const dispatch = useAppDispatch()

    const selectTeam = (team: ITeam) => {
        dispatch(chooseSecondTeam(team))
        dispatch(disableH2h('field'))
    }

    return (
        <>
            <div className={styles.selected_params} onClick={() => setIsMenuOpen(!ismMenuOpen)} ref={ref}>
                <div className={styles.select_teams}>
                    <img src={ismMenuOpen ? arrowClose : arrowOpen} alt="" />
                    <div className={styles.img_wrapper}>
                        <img src={`${IMG_PATH}${img}`} alt="" />
                    </div>
                </div>
                {ismMenuOpen
                    ?
                    <div className={styles.football_field_selection}>
                        {selectors.map((team: ITeam, id: number) =>
                            <div className={styles.wrapper} key={id} onClick={() => selectTeam(team)}>
                                <div className={styles.params_lists} >
                                    <div className={styles.img_wrapper}>
                                        <img src={`${IMG_PATH}${team.team_img}`} alt="" />
                                    </div>
                                    <span>{team.team_name === 'Premier League' ? team.category_name : team.team_name}</span>
                                </div>
                            </div>
                        )}
                    </div>
                    :
                    null
                }
            </div>
        </>
    )
}

export default FieldStatSelectTeam