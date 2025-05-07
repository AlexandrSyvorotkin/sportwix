
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
    // const theme = 'dark'

    // const border = theme === 'dark' ? '1px solid #5C5C5C' : '1px solid #E1E3EA'

    return (
        <div className="flex h-full w-full">  
            <LastResultsSection />
            {/* <EducationOffer/> */}
        </div>
    );
};

export {CommonInfoSection};