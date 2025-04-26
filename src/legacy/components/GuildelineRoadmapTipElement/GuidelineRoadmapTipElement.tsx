import { FC, useContext, useEffect } from 'react'
import styles from './GuidelineRoadmapTipElement.module.scss'
import classNames from 'classnames'
import { LanguageContext } from '../../context/LanguageContext/LanguageContext'
import GuideTipElementBtn from '../../ui/Buttons/GuidelineTipElementControllers/GuideTipElementBtn'
import { useAppDispatch, useAppSelector } from '../../types/hooks'
import { RootState } from '../../redux/store'
import { disableGuidelineMode, disableInteractiveRoadmap, disableRoadmap, nextStep, prevStep, skipAll } from '../../redux/GuidelineRoadmapSlice/GuidelineRoadmapSlice'
import close from '../../assets/close (5).svg'
import { switchActiveTeamDetailInfoTab, switchActiveSingleTeamInfoTab, switchActiveTeamDetailInfoTabMobile } from '../../redux/TeamTabsSlice/TeamTabsSlice'
import { switchPageToStartPostition } from '../../redux/tournament-slice/tournament-slice'

type TriandlgePos = 'left' | 'top' | 'bottom' | 'right'

interface GuldelineRoadmapTipElementProps {
    element: any,
    element1?: any,
    element2?: any,
    text?: {
        ru: string,
        eng: string
    },
    position?: {
        guideElement?: {
            top: number,
            left: number,
            width: number
            height: number
        }
    },
    content?: any,
    lastEl?: boolean,
    textPos?: string
    callback?: any,
    test: boolean
}

const GuidelineRoadmapTipElement: FC<GuldelineRoadmapTipElementProps> = ({ element, text, position, content, lastEl, element1, element2, callback, textPos, test}) => {

    // console.log(element, 'textPos')

    useEffect(() => {
        // Вызов коллбэка при монтировании компонента
        callback && callback();
      }, [callback]);


    const guideElTop = position?.guideElement ? position.guideElement.top : 0
    const guideElLeft = position?.guideElement ? position.guideElement.left : 0
    const guideElWidth = position?.guideElement ? position.guideElement.width : 0
    const guideElHeight = position?.guideElement ? position.guideElement.height : 0

    const bottomOffset = textPos === 'bottom' ? `${element.height + 50}px` : ''

    const textPositionStyles = classNames({
        [styles.text]: true,
        [styles.text_top]: textPos === 'top',
        [styles.text_bottom]: textPos === 'bottom',
        [styles.text_left]: textPos === 'left',
        [styles.text_right]: textPos === 'right',
        [styles.text_center_horizontal]: textPos === 'top' || textPos === 'bottom',
        [styles.text_center_vertical]: textPos === 'left' || textPos === 'right',
        [styles.text_items_normal]: textPos === 'bottom' || textPos === 'right' || textPos === 'left' || textPos === 'bottom-mobile' || 'bottom-mobile-sparkline' || 'bottom-team-mobile',
        [styles.text_items_reverse]: textPos === 'top'
      })
    
    const triangleStyles = classNames({
        [styles.triangle]: true,
        [styles.triangle_bottom]: textPos === 'top',
        [styles.triangle_left]: textPos === 'left' || textPos === 'mobile-control-btn' || textPos === 'desktop-control-btn',
        [styles.triangle_right]: textPos === 'right',
        [styles.triangle_top]: textPos === 'bottom' || textPos === 'bottom-mobile',
        [styles.triangle_bottom_mobile_sparkline]: textPos === 'bottom-mobile-sparkline',
        [styles.triangle_bottom_mobile_team]: textPos === 'bottom-team-mobile'
    })

    const {language} = useContext(LanguageContext)

    const guideElementStye = {
        position: 'absolute',
        top: position?.guideElement?.top ? `${element.top - guideElTop}px` : element.top, 
        left: position?.guideElement?.left ?`${element.left - guideElLeft}px` : element.left, 
        width: position?.guideElement?.width ? `${element.width + guideElWidth}px` : element.width, 
        height: position?.guideElement?.height ? `${element.height + guideElHeight}px` : element.height,
        backgroundColor: test ? 'transparent' : 'grey'
    }

    const orientation = useAppSelector((state: RootState) => state.interfaceState.mobile)
    
    const dispatch = useAppDispatch()
    
    const nextStepHandler = () => {
        if (orientation.isMobile) {
            dispatch(nextStep('mobile'))
        }
        if (!orientation.isMobile) {
            dispatch(nextStep('desktop'))
        }
        
    }

    const prevStepHandler = () => {
        if (orientation.isMobile) {
            dispatch(prevStep('mobile'))
        }
        if (!orientation.isMobile) {
            dispatch(prevStep('desktop'))
        }
    }

    const currentText = useAppSelector((state: RootState) => state.guidelineRoadmap.stepText)
    const mobile_sparkline = document.getElementById('mobile_sparkline')


    const handleSkipAll = () => {
        dispatch(switchActiveTeamDetailInfoTab(1))
        dispatch(switchActiveSingleTeamInfoTab(1))
        dispatch(switchPageToStartPostition())
        dispatch(disableGuidelineMode())
        dispatch(disableRoadmap())
        dispatch(switchActiveTeamDetailInfoTabMobile(1))
        if (mobile_sparkline) {
            mobile_sparkline.scrollLeft = 0;
        }
        if (orientation.isMobile) {
            dispatch(skipAll('mobile'))// Переходим к последнему шагу (пропускаем все)
        } 
        dispatch(skipAll('desktop'))
        dispatch(disableInteractiveRoadmap())
    };


    let topPosition
    let leftPosition
    let transform

    

    switch (textPos) {
        case 'left': {
            topPosition = element.height / 2 + "px";
            leftPosition = element.width + 75 + "px";
            transform = "translateY(-50%)"
            break;
        }
        case 'bottom': {
            topPosition = element.height + 40 + "px";
            leftPosition = element.width / 2 - 50 + "px";
            // transform = "translateX(-25%)"
            break;
        }
        case 'top': {
            topPosition = - 200 + "px";
            leftPosition = element.width / 2 + "px";
            transform = "translateX(-50%)"
            break;
        }
        case 'right': {
            topPosition = element.height / 2 - 20 + "px";
            leftPosition = - element.width / 2 + 40 + "px";
            transform = "translateX(-50%)"
            break;
        }
        case 'bottom-mobile': {
            topPosition = element.height + 40 + "px";
            leftPosition = element.width / 2 - 150 + "px";
            // transform = "translateX(-25%)"
            break;
        }
        case 'bottom-mobile-sparkline': {
            topPosition = element.height + 40 + "px";
            leftPosition = element.width / 2 - 150 + "px";
            break;
        }
        case 'bottom-team-mobile': {
            topPosition = element.height + 40 + "px";
            leftPosition = element.width / 2 - 200 + "px";
            break;
        }
        case 'mobile-control-btn': {
            topPosition = element.height / 2 + 30 + "px";
            leftPosition = element.width + 15 + "px";
            transform = "translateY(-50%)"
            break;
        }
        case 'desktop-control-btn': {
            topPosition = element.height / 2 + 70 + "px";
            leftPosition = element.width + 75 + "px";
            transform = "translateY(-50%)"
        }
    }

    return (
        //@ts-ignore
            <div className={styles.guide_element} style={guideElementStye}>
                    {test ? <div className={textPositionStyles} style={{ top: topPosition, left: leftPosition, transform: transform}}>
                        <div className={styles.text_content}>   
                            <div className={styles.text_content_header}>
                                <span className={styles.title}>{currentText}</span>
                                <div className={styles.close} onClick={handleSkipAll}>
                                    <img src={close} alt="" />
                                </div>
                            </div>
                            <div className={styles.current_text}>{content}</div>
                            <div className={triangleStyles}/>
                        </div>
                        
                        <div className={styles.controllers}>
                            <GuideTipElementBtn type='left' onClick={prevStepHandler}/>
                            <GuideTipElementBtn type='right' onClick={nextStepHandler}/>
                        </div>
                    </div> : null}
            </div>
    )
}

export default GuidelineRoadmapTipElement