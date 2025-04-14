import React, {FC, useState} from 'react';
import styles from './ControlPanel.module.scss'
import ControlPanelBtn from "../../ui/Buttons/ControlPanelBtn/ControlPanelBtn";

interface panelTool {
	id: number,
	img: string,
	imgActive: string
}

interface ControlPanelProps {
	panel_tools: panelTool[],
}

const ControlPanel:FC<ControlPanelProps> = ({panel_tools,}) => {

	const [activeIndex, setActiveIndex] = useState<number | null>(null);

	const onItemClick = (index: number) => {

		if (index === activeIndex) {
			setActiveIndex(null);
		} else {
			setActiveIndex(index);
		}
	};

	return (
		<ul className={styles.control_panel}>
			{panel_tools.map((tool, index) =>
				<ControlPanelBtn
					img={tool.img}
					key={tool.id}
					imgActive={tool.imgActive}
					active={index === activeIndex}
					onClick={() => onItemClick(index)}
				/>
			)}
		</ul>
	);
};

export default ControlPanel;
