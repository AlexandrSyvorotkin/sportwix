import React, { FC, useContext, useEffect, useState } from 'react';
import styles from './ControlPanelBtn.module.scss'
import classNames from "classnames";
import { ThemeContext } from '../../../context/ThemeContext/ThemeContext';
import ControlButtonTooltip from '../../../components/ControlButtonTooltip/ControlButtonTooltip';
import { useOutside } from '../../../hooks/useOutsideClick';
import { LanguageContext } from '../../../context/LanguageContext/LanguageContext';

type metric = {
    param: {
        ru: string,
        eng: string
    },
    filterFunc: () => void,
    id: number
}

interface ControlPanelItemProps {
	img: string,
	imgActive?: string,
	active?: boolean | null | string,
	onClick: () => void | null | boolean | any,
	disabled?: boolean,
	visible?: boolean,
	imgLight?: string,
	imgDisabled?: string,
	position?: string,
	tooltipDescription?: {
		ru: string,
		eng: string
	},
	btnId?: string,
	left?: number,
	top?: number
    hasSelection?: boolean,
	selectItems?: metric[],
	activeParam?: any,
	currentFilter?: any
}

const ControlPanelBtn: FC<ControlPanelItemProps> = ({ 
		img, 
		imgActive, 
		onClick, 
		active, 
		disabled, 
		visible, 
		imgLight, 
		imgDisabled, 
		position, 
		tooltipDescription, 
		btnId, 
		left, 
		top,
		hasSelection,
		selectItems,
		currentFilter
	}) => {


	const { theme } = useContext(ThemeContext)

	const btnStyles = classNames({
		[styles.control_panel_item]: !active,
		[styles.active]: active && theme === 'dark',
		[styles.control_panel_item_light]: theme === 'light',
		[styles.contol_panel_item_active_light]: !active && theme === 'light',
	})

	const [descriptionVisible, setDescriptionVisible] = useState<boolean>(false)
	const {language} = useContext(LanguageContext)

	const {ref, isShow, setIsShow} = useOutside(false)

	const handleButtonClick = () => {
		// При клике на кнопку скрываем тултип
		setDescriptionVisible(false);
		setIsShow(!isShow)
		// Вызываем переданный обработчик клика (если он есть)
		if (onClick) {
		  onClick();
		}
	};

	// useEffect(() => {
	// 	if (isShow && hasSelection) {
	// 		onClick()
	// 	}
	// }, [isShow && hasSelection])
	
	
	const selectionStyles = classNames({
		[styles.selection_elements]: true,
		[styles.open]: isShow
	})

	

	if (!visible) return null

	return (
		<div style={{ position: 'relative' }} id={btnId} ref={ref}>
			<ControlButtonTooltip button_description={tooltipDescription} visible={descriptionVisible} position={position} />
			<button className={btnStyles} onClick={handleButtonClick} disabled={disabled} id={`${btnId}`} style={{ left: left, top: top}}>
				<div className={styles.item_logo}
					onMouseEnter={() => setDescriptionVisible(true)}
					onMouseLeave={() => setDescriptionVisible(false)}
				>
					{
						disabled ? <img src={imgDisabled} />
							: <>
								{theme === 'dark'
									? <img src={!active ? img : imgActive} alt="" />
									: <img src={!active ? imgLight : imgActive} alt="" />
								}
							</>
					}
				</div>
			</button>
			{hasSelection ?
				<div className={selectionStyles}>
					{selectItems?.map((it:metric) => 
						<div key={it.param.eng} className={styles.select_metric} onClick={it.filterFunc}>
							<span>{currentFilter === it.param.eng
								?
								<div className={styles.active_indicator}></div>
								:
								' '}
							</span>
                        <span>{language === 'Eng' ? it.param.eng : it.param.ru}</span>
                    </div>
					)}
				</div>
			: null}
		</div>
	);
};


export default ControlPanelBtn;
