import { FC, useRef, useState, useEffect, Dispatch, SetStateAction, useContext } from 'react'
import styles from './FootballFieldSelection.module.scss'
import arrowOpen from '../../../assets/select-arrows/open-arrow.svg'
import arrowClose from '../../../assets/select-arrows/close-arrow.svg'
import altArrowOpen from '../../../assets/select-arrows/arrow_open3.svg'
import SubMenuSelections from '../SubMenuSelections/SubMenuSelections'
import { LanguageContext } from '../../../context/LanguageContext/LanguageContext'
import ParamTooltip from '../../../components/ParamTooltip/ParamTooltip'
import FootballSelectionCheckboxParamItem from '../../../components/FootballSelectionCheckboxParamItem/FootballSelectionCheckboxParamItem'

type parameter = {
    id: number,
    title: string,
    tooltipText: string
}

type selector = {
    id: number,
    title: string,
    parameters: parameter[]
}
type fieldVariants = 'defense' | 'midfield' | 'attack'
interface FootballFieldSelectionProps {
    selectors: selector[],
    onClose: () => void,
    setFirstActiveFieldParam?: Dispatch<SetStateAction<number>>
    firstActiveFieldParam: number,
    secondActiveFieldParam?: number
    setSecondActiveFieldParam?: Dispatch<SetStateAction<number>>,
    typeVariant: fieldVariants,
    ruTitle: string,
    engTitle: string,
}




const FootballFieldSelection: FC<FootballFieldSelectionProps> = ({ selectors, onClose, setFirstActiveFieldParam, firstActiveFieldParam,secondActiveFieldParam, setSecondActiveFieldParam, ruTitle, engTitle}) => {

    const ref = useRef<HTMLDivElement>(null)
    const [ismMenuOpen, setIsMenuOpen] = useState<boolean>(false)
    const [isFirstParamMenuOpen, setIsFirstParamMenuOpen] = useState(false)
    const [isSecondParamMenuOpen, setIsSecondParamMenuOpen] = useState(false)
   


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


    function openParamsListHandler(e: any, type: number) {
        e.stopPropagation()

        if (type === 1) {
            setIsFirstParamMenuOpen(!isFirstParamMenuOpen)
        } else if (type === 2) {
            setIsSecondParamMenuOpen(!isSecondParamMenuOpen)
        }
    }

    const chooseActiveFieldParam = (id: number, type: number) => {
        if (setFirstActiveFieldParam && setSecondActiveFieldParam) {
            if (type === 1) {
                setFirstActiveFieldParam(id)
            } else if (type === 2) {
                setSecondActiveFieldParam(id)
            }
        }
        
    }

    const [isChecked, setIsChecked] = useState(false);

    // Обработчик события для изменения состояния checked
    const handleCheckboxChange = (type: number) => {
        setIsChecked(!isChecked); // Инвертируем текущее состояние
        if (type === 1) {
            setIsFirstParamMenuOpen(false)
        } else {
            setIsSecondParamMenuOpen(false)
        }
    };

    const {language} = useContext(LanguageContext)

    const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false)

    return (
        <>
            <div className={styles.selected_params} onClick={() => setIsMenuOpen(!ismMenuOpen)} ref={ref} style={{padding: '10px'}}>
                <span>{language === 'Eng' ? engTitle : ruTitle}</span>
                <img src={ismMenuOpen ? arrowClose : arrowOpen} alt="" />
                {ismMenuOpen
                    ?
                    <div className={styles.football_field_selection} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.wrapper}>
                            <div className={styles.params_lists} onClick={(e) => openParamsListHandler(e, 1)}>
                                <img src={isFirstParamMenuOpen ? altArrowOpen : arrowOpen} alt="" />
                                <span>{selectors[0].title}</span>
                            </div>
                            <div className={styles.list_items}>
                                {isFirstParamMenuOpen ?
                                    <>
                                        {selectors[0].parameters.map(it =>
                                                <FootballSelectionCheckboxParamItem 
                                                chooseActiveFieldParam={() => chooseActiveFieldParam(it.id, 1)} 
                                                key={it.id} 
                                                id={it.id} 
                                                secondActiveFieldParam={firstActiveFieldParam}
                                                handleCheckboxChange={() => handleCheckboxChange(1)}
                                                title={it.title}
                                                tooltipText={it.tooltipText}
                                            />
                                            // <div key={it.id} className={styles.checkbox_param} onClick={() => chooseActiveFieldParam(it.id, 1)}>
                                            //     <input type='checkbox' className={styles.checkbox} key={it.id} checked={firstActiveFieldParam === it.id ? true : false} onChange={() => handleCheckboxChange(1)} />
                                            //     <label style={{cursor: "pointer"}}>{it.title}</label>
                                            // </div>
                                        )}
                                    </>
                                    : null
                                }
                            </div>
                        </div>
                        {selectors[1]?.parameters.length > 0 && <div className={styles.wrapper}>
                            <div className={styles.params_lists} onClick={(e) => openParamsListHandler(e, 2)}>
                                <img src={isSecondParamMenuOpen ? altArrowOpen : arrowOpen}  alt="" />
                                <span>{selectors[1].title}</span>
                            </div>
                            <div className={styles.list_items}>
                                {isSecondParamMenuOpen ?
                                    <>
                                        {selectors[1].parameters.map(it =>
                                            <FootballSelectionCheckboxParamItem 
                                                chooseActiveFieldParam={() => chooseActiveFieldParam(it.id, 2)} 
                                                key={it.id} 
                                                id={it.id} 
                                                secondActiveFieldParam={secondActiveFieldParam}
                                                handleCheckboxChange={() => handleCheckboxChange(2)}
                                                title={it.title}
                                                tooltipText={it.tooltipText}
                                            />
                                            // <div key={it.id} className={styles.checkbox_param} onClick={() => chooseActiveFieldParam(it.id, 2)}>
                                            //     <input type='checkbox' className={styles.checkbox} key={it.id} checked={secondActiveFieldParam === it.id ? true : false} onChange={() => handleCheckboxChange(2)} />
                                            //     <label style={{cursor: "pointer"}}>{it.title}</label>
                                            // </div>
                                        )}
                                    </>
                                    : null
                                }
                            </div>
                        </div>}
                    </div>
                    :
                    null
                }
            </div>

        </>
    )
}

export default FootballFieldSelection