import { FC, useState } from 'react';
import styles from './FieldMobileSelector.module.scss'
import arrowOpen from '../../../assets/select-arrows/open-arrow.svg'
import arrowClose from '../../../assets/select-arrows/close-arrow.svg'

type selector = {
    id: number,
    title: string,
    timeFrame: number
}

interface FieldMobileSelectorProps {
    selectors: selector[],
    setActiveGameTime?: any,
    activeSelector: string
}

const FieldMobileSelector: FC<FieldMobileSelectorProps> = ({selectors, setActiveGameTime, activeSelector}) => {


    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
    const [selectedSelector, setSelectedSelector] = useState<string>(activeSelector)


    const selectHandler = (title: string, selectedMetric: number) => {
        setSelectedSelector(title)
        setActiveGameTime(selectedMetric)
    }

    return (
        <div className={styles.field_mobile_selector} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <div className={styles.selector_header}>
                <div>{selectedSelector}</div>
                <div className={styles.img_wrapper}>
                    <img src={isMenuOpen ? arrowClose : arrowOpen} alt="" />
                </div>
            </div>
            {isMenuOpen ? 
                <div className={styles.selectors_list}>
                    {selectors?.map( selector => 
                            <div key={selector.id} className={styles.selector_item} onClick={() => selectHandler(selector.title, selector.timeFrame)}>{selector.title}</div>
                        )}
                </div> 
                : 
                null
            }
        </div>
    )
}

export default FieldMobileSelector