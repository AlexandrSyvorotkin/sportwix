import React, {FC} from 'react';
import styles from './PublishpostModal.module.scss'
import PublishPostModalBtn from "../../Buttons/PublishPostModalBtn/PublishPostModalBtn";
import modal_close from '../../../assets/modal/modal-close.png'
import ModalSelect from "../../Selections/ModalSelect/ModalSelect";

interface SingleTeam {
    team: string,
    img: string,
    points: number
}

interface Teams {
    teams: SingleTeam[],
    onClick: () => void
}

const PublishPostModal:FC<Teams> = ({teams, onClick}) => {
    return (
        <div className={styles.backdrop} onClick={onClick}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modal_close}>
                    <img src={modal_close} alt="" onClick={onClick}/>
                </div>
                <div className={styles.modal_header}>
                    Выберите команды для сравнения
                </div>
                <div className={styles.modal_selection}>
                    <ModalSelect teams={teams}/>
                    <ModalSelect teams={teams}/>
                </div>
                <div className={styles.btn_footer}>
                    <PublishPostModalBtn>Подтвердить</PublishPostModalBtn>
                </div>
            </div>
        </div>
    );
};

export default PublishPostModal;