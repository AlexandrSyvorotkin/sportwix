import React, {ChangeEvent, FC, useState} from 'react';
import styles from './Dropdown.module.scss'

interface DropdownProps {
    options: string[];
    selectedOption: string;
}

const Dropdown:FC<DropdownProps> = ({options, selectedOption}) => {

    const [selected, setSelected] = useState(selectedOption);

    const handleOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelected(event.target.value);
    };

    return (
        <div className={styles.select_wrapper}>
            <select value={selected} onChange={handleOptionChange} className={styles.select_bar}>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Dropdown;

