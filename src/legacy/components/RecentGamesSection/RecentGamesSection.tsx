import React, {Dispatch, FC, SetStateAction, useContext, useState} from 'react';
import RecentResults from "../RecentResults/RecentResults";
import styles from "../../layout/MainLayout/Layout.module.scss";
import ControlPanelBtn from "../../ui/Buttons/ControlPanelBtn/ControlPanelBtn";
import information_table from "../../assets/control_panels_logos/matches_panel/InformationTable/InformationTable.svg";
import information_table_active
    from "../../assets/control_panels_logos/matches_panel/InformationTable/InformationTableActive.svg";

import chat from "../../assets/control_panels_logos/matches_panel/Chat/Chat.svg";
import chat_active from "../../assets/control_panels_logos/matches_panel/Chat/ChatActive.svg";
import chat_disabled from "../../assets/control_panels_logos/matches_panel/Chat/chart_disabled.svg";


import email from '../../assets/email.svg';

import tech_support from "../../assets/control_panels_logos/matches_panel/TechSupport/TechSupport.svg";
import tech_support_active from "../../assets/control_panels_logos/matches_panel/TechSupport/TechSupportActive.svg";
import {ILastMatch} from "../../models/ILastMatch";
import {redirect, useNavigate} from 'react-router-dom';

import tips from '../../assets/icons8-idea.svg'
import guide from '../../assets/roadmap2.svg'
import control_btns_tooltips from '../../localization/control-buttons/control-buttons.json'
import { useAppDispatch } from '../../types/hooks';
import { activateGuidelineMode, disableEducationOffer } from '../../redux/GuidelineRoadmapSlice/GuidelineRoadmapSlice';
import EducationOffer from '../EducationOffer/EducationOffer';
import { ThemeContext } from '../../context/ThemeContext/ThemeContext';
import { ROUTER_PATHS } from '../../constants/routes';

interface RecentGamesSectionProps {
    leftPaneWidthPercentage: number,
    setIsTipsModal: Dispatch<SetStateAction<boolean>>
    setShowGuideline: Dispatch<SetStateAction<boolean>>
}

const RecentGamesSection:FC<RecentGamesSectionProps> = ({leftPaneWidthPercentage, setIsTipsModal, setShowGuideline}) => {

    const [activeTabDetailTeam, setActiveTabDetailTeam] = useState<number>(1)


    const navigate = useNavigate()


    function redirectToPath (path:string) {
        navigate(path)
    }

    const recentGamesSectionTabs = [
        {id: 1, component: <RecentResults/>},
        {id: 2, component: null},
        {id: 3, component: null},
        {id: 4, component: null},
    ]

    const dispatch = useAppDispatch()

    const guidelineRoadmapActivate = () => {
        setShowGuideline(true)
        dispatch(activateGuidelineMode())
        dispatch(disableEducationOffer())
    }


    const scrollToTop = () => {
        const gamesList = document.getElementById('recent-games') as HTMLElement | null;
    
        if (gamesList) {
            const scrollTop = gamesList.scrollTop;
            const duration = 500; // время анимации в миллисекундах
            const startTime = performance.now();
    
            const animateScroll = (currentTime: number) => {
                const elapsedTime = currentTime - startTime;
                const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
                const timeFraction = Math.min(elapsedTime / duration, 1);
                const animationProgress = easeInOutCubic(timeFraction);
    
                gamesList.scrollTop = scrollTop * (1 - animationProgress);
    
                if (elapsedTime < duration) {
                    requestAnimationFrame(animateScroll);
                }
            };
    
            requestAnimationFrame(animateScroll);
        }
    };
    

    const recentGamesSectionTabsControls = [
        {
            id: 1,
            img: information_table,
            imgActive: information_table_active,
            onClick: scrollToTop,
            active: activeTabDetailTeam === 1,
            visible: true,
            position: 'left', 
            tooltipDescription: control_btns_tooltips.information_table
        },
        {
            id: 2,
            img: chat,
            imgActive: chat_active,
            onClick: () => setActiveTabDetailTeam(2),
            active: activeTabDetailTeam === 2,
            visible: true,
            disabled: true,
            imgDisabled: chat_disabled,
            position: 'left', 
            tooltipDescription: control_btns_tooltips.about_team
        },
        {
            id: 3,
            img: tech_support,
            imgActive: tech_support_active,
            onClick: () => redirectToPath(ROUTER_PATHS.FAQ),
            active: activeTabDetailTeam === 3,
            visible: true,
            position: 'left', 
            tooltipDescription: control_btns_tooltips.support
        },
        {
            id: 4,
            img: email,
            imgActive: tech_support_active,
            onClick: () => redirectToPath(ROUTER_PATHS.CONTACTS),
            active: activeTabDetailTeam === 4,
            visible: true,
            position: 'left', 
            tooltipDescription: control_btns_tooltips.email,
            btnId: ''
        },
        // {
        //     id: 5,
        //     img: tips,
        //     imgActive: tech_support_active,
        //     onClick: () => setIsTipsModal(true),
        //     active: activeTabDetailTeam === 4,
        //     visible: true,
        //     position: 'left', 
        //     tooltipDescription: control_btns_tooltips.tips,
        //     btnId: 'tips'
        // },
        {
            id: 6,
            img: guide,
            imgActive: tech_support_active,
            onClick: guidelineRoadmapActivate,
            active: activeTabDetailTeam === 4,
            visible: true,
            position: 'left', 
            tooltipDescription: control_btns_tooltips.user_guide,
            btnId: 'user-guide'
        },
    ]

    const tabActive = (id:number) => id === activeTabDetailTeam ? 'block' : 'none'

    const roadmap = document.getElementById('user-guide')?.getBoundingClientRect()

    const {theme} = useContext(ThemeContext)
    const border = theme === 'dark' ? '1px solid #5C5C5C' : '1px solid #E1E3EA'

    return (
        <>  
            {recentGamesSectionTabs.map(({id, component}) =>
                <div key={id} style={{display: `${tabActive(id)}`, width: '100%', overflowY: 'auto'}} id='recent-games'>
                    {component}
                </div>
            )}
            
            <div className={styles.panel_section} style={{borderLeft: border}}>
                {recentGamesSectionTabsControls.map(({id, img, onClick, imgActive, active, visible, disabled, imgDisabled, position, tooltipDescription, btnId}) =>
                    <ControlPanelBtn
                        key={id}
                        img={img}
                        onClick={onClick}
                        imgActive={imgActive}
                        active={active}
                        visible={visible}
                        disabled={disabled}
                        imgDisabled={imgDisabled}
                        tooltipDescription={tooltipDescription}
                        position={position}
                        btnId={btnId}
                    />
                )}
                <EducationOffer/>
            </div>
        </>
    );
};

export default RecentGamesSection;