import React, { FC } from 'react'
import styles from './TeamStatsControls.module.scss'
import ControlPanelBtn from '../../ui/Buttons/ControlPanelBtn/ControlPanelBtn'
import information_table from "../../assets/control_panels_logos/matches_panel/InformationTable/InformationTable.svg";
import information_table_active from "../../assets/control_panels_logos/matches_panel/InformationTable/InformationTableActive.svg"
import switchToChampionshipChart from '../../assets/control_panels_logos/common/SwitchToChampionshipChartIcon.svg'
import teamStatsDisabled from '../../assets/control_panels_logos/common/TeamStatsChartDisabled.svg'
import control_btns_tooltips from '../../localization/control-buttons/control-buttons.json'

interface TeamStatsControlsProps {

}

const TeamStatsControls: FC<TeamStatsControlsProps> = () => {

    const leftPanelTeamStats = [
        { id: 1, img: information_table, imgActive: information_table_active, onClick: () => null, active: true, visible: true, position: 'left', tooltipDescription: control_btns_tooltips.information_table },
        { id: 4, onClick: () => null, img: switchToChampionshipChart, imgActive: '', active: '', visible: true, imgLight: '', position: 'left', tooltipDescription: control_btns_tooltips.information_table, disabled: true, imgDisabled: teamStatsDisabled},
    ]

    return (
        <div className={styles.team_stats_controls}>
            <div className={styles.stats_wrapper}>
                {leftPanelTeamStats.map(btn =>
                    <ControlPanelBtn
                        key={btn.id}
                        imgLight={btn.imgLight}
                        img={btn.img}
                        onClick={btn.onClick}
                        active={btn.active}
                        imgActive={btn.imgActive}
                        visible={btn.visible}
                        position={btn.position}
                        tooltipDescription={btn.tooltipDescription}
                        disabled={btn.disabled}
                        imgDisabled={btn.imgDisabled}
                    />
                )}
            </div>
        </div>
    )
}

export default TeamStatsControls