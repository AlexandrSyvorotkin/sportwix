
import InformationTableIcon from '@assets/icons/information-table.svg?react'
import ChatIcon from '@assets/icons/chart.svg?react'
import TechSupportIcon from '@assets/icons/tech-support.svg?react'
import EmailIcon from '@assets/icons/email.svg?react'
import UserGuideIcon from '@assets/icons/user-guide.svg?react'

// interface RecentGamesSectionProps {
//     leftPaneWidthPercentage: number,
//     setIsTipsModal: Dispatch<SetStateAction<boolean>>
//     setShowGuideline: Dispatch<SetStateAction<boolean>>
// }

import PanelBtn from "@ui/panel-btn/panel-btn";
import { useMemo } from "react";
import { LastResultsSection } from '@components/last-games/last-games'

const CommonInfoSection = ({}) => {

    // const [activeTabDetailTeam, setActiveTabDetailTeam] = useState<number>(1)


    // const navigate = useNavigate()


    // function redirectToPath (path:string) {
    //     navigate(path)
    // }

    // const recentGamesSectionTabs = [
    //     {id: 1, component: <RecentResults/>},
    //     {id: 2, component: null},
    //     {id: 3, component: null},
    //     {id: 4, component: null},
    // ]

    // const dispatch = useAppDispatch()

    // const guidelineRoadmapActivate = () => {
    //     setShowGuideline(true)
    //     dispatch(activateGuidelineMode())
    //     dispatch(disableEducationOffer())
    // }


    // const scrollToTop = () => {
    //     const gamesList = document.getElementById('recent-games') as HTMLElement | null;
    
    //     if (gamesList) {
    //         const scrollTop = gamesList.scrollTop;
    //         const duration = 500; // время анимации в миллисекундах
    //         const startTime = performance.now();
    
    //         const animateScroll = (currentTime: number) => {
    //             const elapsedTime = currentTime - startTime;
    //             const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    //             const timeFraction = Math.min(elapsedTime / duration, 1);
    //             const animationProgress = easeInOutCubic(timeFraction);
    
    //             gamesList.scrollTop = scrollTop * (1 - animationProgress);
    
    //             if (elapsedTime < duration) {
    //                 requestAnimationFrame(animateScroll);
    //             }
    //         };
    
    //         requestAnimationFrame(animateScroll);
    //     }
    // };
    

    // const recentGamesSectionTabsControls = [
    //     {
    //         id: 1,
    //         img: information_table,
    //         imgActive: information_table_active,
    //         onClick: scrollToTop,
    //         active: activeTabDetailTeam === 1,
    //         visible: true,
    //         position: 'left', 
    //         tooltipDescription: control_btns_tooltips.information_table
    //     },
    //     {
    //         id: 2,
    //         img: chat,
    //         imgActive: chat_active,
    //         onClick: () => setActiveTabDetailTeam(2),
    //         active: activeTabDetailTeam === 2,
    //         visible: true,
    //         disabled: true,
    //         imgDisabled: chat_disabled,
    //         position: 'left', 
    //         tooltipDescription: control_btns_tooltips.about_team
    //     },
    //     {
    //         id: 3,
    //         img: tech_support,
    //         imgActive: tech_support_active,
    //         onClick: () => redirectToPath(ROUTER_PATHS.FAQ),
    //         active: activeTabDetailTeam === 3,
    //         visible: true,
    //         position: 'left', 
    //         tooltipDescription: control_btns_tooltips.support
    //     },
    //     {
    //         id: 4,
    //         img: email,
    //         imgActive: tech_support_active,
    //         onClick: () => redirectToPath(ROUTER_PATHS.CONTACTS),
    //         active: activeTabDetailTeam === 4,
    //         visible: true,
    //         position: 'left', 
    //         tooltipDescription: control_btns_tooltips.email,
    //         btnId: ''
    //     },
    //     // {
    //     //     id: 5,
    //     //     img: tips,
    //     //     imgActive: tech_support_active,
    //     //     onClick: () => setIsTipsModal(true),
    //     //     active: activeTabDetailTeam === 4,
    //     //     visible: true,
    //     //     position: 'left', 
    //     //     tooltipDescription: control_btns_tooltips.tips,
    //     //     btnId: 'tips'
    //     // },
    //     {
    //         id: 6,
    //         img: guide,
    //         imgActive: tech_support_active,
    //         onClick: guidelineRoadmapActivate,
    //         active: activeTabDetailTeam === 4,
    //         visible: true,
    //         position: 'left', 
    //         tooltipDescription: control_btns_tooltips.user_guide,
    //         btnId: 'user-guide'
    //     },
    // ]

    // const tabActive = (id:number) => id === activeTabDetailTeam ? 'block' : 'none'

    // const roadmap = document.getElementById('user-guide')?.getBoundingClientRect()

    // const {theme} = useContext(ThemeContext)
    const theme = 'dark'

    // const border = theme === 'dark' ? '1px solid #5C5C5C' : '1px solid #E1E3EA'

    const rightChartBtns = useMemo(() => [
        {
            id: 1,
            icon: <InformationTableIcon/>,
            onClick: () => null,
            disabled: true
        },
        {
            id: 2,
            icon: <ChatIcon/>,
            onClick: () => null,
            disabled: true
        },
        {
            id: 3,
            icon: <TechSupportIcon/>,
            onClick: () => null,
            disabled: true
        },
        {
            id: 4,
            icon: <EmailIcon/>,
            onClick: () => null,
            disabled: true
        },
        {
            id: 5,
            icon: <UserGuideIcon/>,
            onClick: () => null,
            disabled: true
        }
    ], [])

    return (
        <>  
            <div style={{width: '100%', overflowY: 'auto'}} id='recent-games' className='border-t-[1px] border-[#5C5C5C]'>
                <LastResultsSection />
            </div>
            <div className="max-w-[55px] border-l border-[#5C5C5C] p-[7px] flex flex-col items-center gap-[3px] relative">
                {rightChartBtns.map(({id, ...btnProps}) => (
                    <PanelBtn key={id} {...btnProps} />
                ))}
                {/* <EducationOffer/> */}
            </div>

        </>
    );
};

export {CommonInfoSection};