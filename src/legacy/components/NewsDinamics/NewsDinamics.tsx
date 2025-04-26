import { FC } from 'react'
import styles from './NewsDinamics.module.scss'
import ControlPanelBtn from '../../ui/Buttons/ControlPanelBtn/ControlPanelBtn'
import settings from '../../assets/news/controlls-btns/settings2.svg'
import video_player from '../../assets/news/controlls-btns/youtube2.svg'
import sparkline from '../../assets/control_panels_logos/common/SwitchToSparklineIcon.svg'
import TeamsNewsDynamics from '../TeamsNewsDynamics/TeamsNewsDynamics'
import DetailNewsDynamics from '../DetailNewsDynamics/DetailNewsDynamics'

import email from '../../assets/email.svg';
import guide from '../../assets/roadmap2.svg'
import tech_support from "../../assets/control_panels_logos/matches_panel/TechSupport/TechSupport.svg";

const NewsDimanics: FC = () => {

    const CONTROL_BTNS_LEFT = [
        { id: 1, img: sparkline, imgActive: '', active: false, visible: true, imgLight: '', position: '', tooltipDescription: '', imgDisabled: '', disable: '', onCLick: () => null },
        { id: 2, img: settings, imgActive: settings, active: false, visible: true, imgLight: '', position: '', tooltipDescription: '', imgDisabled: '', disable: '', onCLick: () => null },
        { id: 3, img: video_player, imgActive: video_player, active: false, visible: true, imgLight: '', position: '', tooltipDescription: '', imgDisabled: '', disable: '', onCLick: () => null }

    ]

    const CONTROL_BTNS_RIGHT = [
        { id: 1, img: tech_support, imgActive: '', active: false, visible: true, imgLight: '', position: '', tooltipDescription: '', imgDisabled: '', disable: '', onCLick: () => null },
        { id: 2, img: email, imgActive: settings, active: false, visible: true, imgLight: '', position: '', tooltipDescription: '', imgDisabled: '', disable: '', onCLick: () => null },
        { id: 3, img: guide, imgActive: video_player, active: false, visible: true, imgLight: '', position: '', tooltipDescription: '', imgDisabled: '', disable: '', onCLick: () => null }

    ]

    return (
        <div className={styles.teams_news_dinamics}>
            <div className={styles.controlls_section}>
                {CONTROL_BTNS_LEFT.map(btn =>
                    <ControlPanelBtn
                        key={btn.id}
                        imgLight={btn.imgLight}
                        img={btn.img}
                        active={btn.active}
                        imgActive={btn.imgActive}
                        visible={btn.visible}
                        imgDisabled={btn.imgDisabled}
                        position={btn.position}
                        //@ts-ignore
                        tooltipDescription={btn.tooltipDescription}
                    />
                )}
            </div>
            <TeamsNewsDynamics />
            <DetailNewsDynamics />
            <div className={styles.controlls_section_left}>
                {CONTROL_BTNS_RIGHT.map(btn =>
                    <ControlPanelBtn
                        key={btn.id}
                        imgLight={btn.imgLight}
                        img={btn.img}
                        active={btn.active}
                        imgActive={btn.imgActive}
                        visible={btn.visible}
                        imgDisabled={btn.imgDisabled}
                        position={btn.position}
                        //@ts-ignore
                        tooltipDescription={btn.tooltipDescription}
                    />
                )}
            </div>
        </div>
    )
}

export default NewsDimanics