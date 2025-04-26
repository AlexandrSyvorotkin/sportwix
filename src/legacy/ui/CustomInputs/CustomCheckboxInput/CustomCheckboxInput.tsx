import { FC } from 'react'
import styles from './CustomCheckboxInput.module.scss'

interface CustomCheckboxInputProps {
    type?: string,
    onChange: () => void,
    isActive: boolean
}

const CustomCheckboxInput:FC<CustomCheckboxInputProps> = ({type, onChange, isActive}) => {
    return (
        <div className={styles.item_wrapper}>
            <label className={styles.additional_settings_item}>
                <input type="checkbox" id="toggle" onChange={onChange} checked={isActive}/>
                <span className={styles.slider}></span>
            </label>
            <span className={styles.item_name}>{type}</span>
        </div>  
    )
}

export default CustomCheckboxInput