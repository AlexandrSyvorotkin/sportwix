import React, {FC, useRef, useEffect, useState} from 'react'
import styles from './PersonalCabinetSelection.module.scss'
import arrowOpen from '../../../assets/select-arrows/open-arrow.svg'
import arrowClose from '../../../assets/select-arrows/close-arrow.svg'
import classNames from 'classnames'
import { IMG_PATH } from '../../../api/variables'

type selector = {
    title: string,
    img?: string,
}

interface PersonalCabinetSelectionProps {
    selectors: selector[],
    onClose: () => void, 
    defaultValue: string,
    type: string
}

const PersonalCabinetSelection:FC<PersonalCabinetSelectionProps> = ({selectors, onClose, defaultValue, type}) => {
    const ref = useRef<HTMLDivElement>(null)

    const [menuOpen, setMenuOpen] = useState<boolean>(false)
    const [selectedValue, setSelectedValue] = useState<string>(defaultValue)

    const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            onClose()
        }
    }


    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    function chooseActiveSelect (selector: string) {
        setMenuOpen(false)
        setSelectedValue(selector)
    }


    return (
        <div className={styles.selections_wrapper}>
            <span>{type}</span>
            <div className={styles.select} onClick={() => setMenuOpen(!menuOpen)}> 
                <span>{selectedValue}</span>
                <img src={menuOpen ? arrowClose : arrowOpen} alt="" />
            {menuOpen ?
                <div className={styles.selections_variants} ref={ref}>
                    {selectors.map( selector =>
                        <div key={selector.title} className={styles.variant} onClick={() => chooseActiveSelect(selector.title)}>
                            <span>{selector.title} </span> 
                        </div>
                    )}
                </div>
            :
             null    
            }
        </div>
        </div>
    );
}

export default PersonalCabinetSelection
