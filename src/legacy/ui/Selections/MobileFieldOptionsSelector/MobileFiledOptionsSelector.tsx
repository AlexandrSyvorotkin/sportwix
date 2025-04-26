import { FC, useState, useEffect, useRef, Dispatch, SetStateAction } from 'react'
import styles from './MobileFieldOptionsSelector.module.scss'
import arrowOpen from '../../../assets/select-arrows/open-arrow.svg'
import arrowClose from '../../../assets/select-arrows/close-arrow.svg'

type parameter = {
    id: number,
    title: string
}

type selector = {
    id: number,
    title: string,
    parameters: parameter[]
}

interface MobileFieldOptionsSelectorProps {
    img: string,
    selectors: selector[],
    firstActiveFieldParam?: number,
    secondActiveFieldParam?: number
    setFirstActiveFieldParam?: Dispatch<SetStateAction<number>>
    setSecondActiveFieldParam?: Dispatch<SetStateAction<number>>
}

const MobileFieldOptionsSelector: FC<MobileFieldOptionsSelectorProps> = ({ img, selectors, firstActiveFieldParam, secondActiveFieldParam, setFirstActiveFieldParam, setSecondActiveFieldParam }) => {

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
    const [isFirstSubMenuOpen, setIsFirstSubMenuOpen] = useState<boolean>(false)
    const [isSecondSubMenuOpen, setIsSecondSubMenuOpen] = useState<boolean>(false)

    const ref = useRef<HTMLDivElement>(null)
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
    const handleCheckboxChange = (type: number) => {
        setIsChecked(!isChecked); // Инвертируем текущее состояние
        if (type === 1) {
            setIsFirstSubMenuOpen(false)
        } else {
            setIsSecondSubMenuOpen(false)
        }
    };

    return (
        <div className={styles.mobile_field_options_selector} ref={ref}>
            <div className={styles.header} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <div className={styles.img_wrapper}>
                    <img src={img} alt="" />
                </div>
                <div className={styles.img_wrapper_s}>
                    <img src={isMenuOpen ? arrowClose : arrowOpen} alt="" />
                </div>
            </div>
            {isMenuOpen ?
                <div className={styles.metrics_list}>
                    <div className={styles.sub_header} onClick={() => setIsFirstSubMenuOpen(!isFirstSubMenuOpen)}>
                        <div>{selectors[0].title}</div>
                        <div className={styles.img_wrapper_s}>
                            <img src={isFirstSubMenuOpen ? arrowClose : arrowOpen} alt="" />
                        </div>
                    </div>
                    {isFirstSubMenuOpen ?
                        <div className={styles.variant_list}>
                            {selectors[0].parameters.map((selector: parameter) =>
                                <div key={selector.id} className={styles.variant} onClick={() => chooseActiveFieldParam(selector.id, 1)}>
                                    <input type='checkbox' className={styles.checkbox} checked={firstActiveFieldParam === selector.id ? true : false} onChange={() => handleCheckboxChange(1)} />
                                    <label style={{cursor: "pointer"}}>{selector.title}</label>
                                </div>
                            )}
                        </div> : null
                    }
                    {selectors[1]?.parameters.length > 0 && <div className={styles.sub_header} onClick={() => setIsSecondSubMenuOpen(!isSecondSubMenuOpen)}>
                        <div>{selectors[1]?.title}</div>
                        <div className={styles.img_wrapper_s}>
                            <img src={isSecondSubMenuOpen ? arrowClose : arrowOpen} alt="" />
                        </div>
                    </div>}
                    {isSecondSubMenuOpen ?
                        <div className={styles.variant_list}>
                            {selectors[1]?.parameters.length > 0 && selectors[1].parameters.map((selector: parameter) =>
                                <div key={selector.id} className={styles.variant} onClick={() => chooseActiveFieldParam(selector.id, 2)}>
                                    <input type='checkbox' className={styles.checkbox}  checked={secondActiveFieldParam === selector.id ? true : false} onChange={() => handleCheckboxChange(2)} />
                                    <label style={{cursor: "pointer"}}>{selector.title}</label>
                                </div>
                                // <div key={selector.id} className={styles.variant}>
                                //     <input type="checkbox" />
                                //     <label htmlFor="">{selector.title}</label>
                                // </div>
                            )}
                        </div> : null
                    }
                </div>
                : null
            }
        </div>
    )
}


export default MobileFieldOptionsSelector