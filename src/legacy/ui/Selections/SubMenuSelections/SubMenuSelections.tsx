import { FC, useRef, useState, useEffect, Dispatch, SetStateAction } from 'react'
import styles from './SubMenuSelections.module.scss'
import arrowOpen from '../../../assets/select-arrows/open-arrow.svg'
import arrowClose from '../../../assets/select-arrows/close-arrow.svg'


type selector = {
    id: number,
    title: string,
   
}

interface SubMenuSelectionsProps {
    selectors: selector[],
    onClose?: () => void,
    activeMidFieldParam?: number,
    chooseActiveFieldParam: Dispatch<SetStateAction<number>>
}

const SubMenuSelections: FC<SubMenuSelectionsProps> = ({ selectors, onClose, activeMidFieldParam, chooseActiveFieldParam }) => {

    const ref = useRef<HTMLDivElement>(null)

    const [isParamListOpen, setIsParamListOpen] = useState<boolean>(true)




    function openParamsListHandler(e: any) {
        e.stopPropagation()
        setIsParamListOpen(!isParamListOpen)
    }


    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked); // Инвертируем текущее состояние
      };


    return (
        <>
            {isParamListOpen ?
                <>
                    {selectors?.map(it =>
                        <div key={it.id} className={styles.checkbox_param}>
                            <div key={it.id} className={styles.checkbox_param} onClick={() => chooseActiveFieldParam(it.id)}>
                                <input type='checkbox' className={styles.checkbox} key={it.id} checked={activeMidFieldParam === it.id ? true : false} onChange={handleCheckboxChange} />
                                <label>{it.title}</label>
                            </div>
                        </div>
                    )}
                </>
                : null
            }

        </>
    )
}

export default SubMenuSelections