import React, {FC, useState} from 'react';
import styles from './FaqQuestion.module.scss'
import plus from '../../assets/faq/plus.svg'
import close from '../../assets/faq/close.svg'

interface FaqQuestionProps {
    title: string,
    text: string
}

const FaqQuestion:FC<FaqQuestionProps> = ({title, text}) => {

    const [active, setActive] = useState(false)

    function handleClick(e: any) {
        const container = e.target.closest("#container");
        const collapsible = container?.querySelector("#collapsible");
        const hidden =
            collapsible.style.visibility === "hidden" ||
            collapsible.style.visibility === "";

        if (hidden) {
            collapsible.style.maxHeight = `${collapsible.scrollHeight}px`;
            collapsible.style.visibility = "visible";
            collapsible.setAttribute("aria-expanded", "true");
            setActive(!active)
        } else {
            collapsible.style.maxHeight = "0";
            collapsible.style.visibility = "hidden";
            collapsible.setAttribute("aria-expanded", "false");
            setActive(false)
        }
    }


    return (
        <div className={styles.blockradius}>
            <div id='container' className={styles.container}>
                <div className={styles.title} onClick={handleClick}>
                    {title}
                    <div>{active ? <img src={close} alt="" /> : <img src={plus} alt="" /> }</div>
                </div>
                <div id='collapsible' className={styles.collapsible}>
                    <p>{text}</p>
                </div>
            </div>
        </div>
    )
}

export default FaqQuestion