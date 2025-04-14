import {FC, useState} from 'react';
import styles from './PlayerRecodItem.module.scss'
import { IMG_PATH } from '../../api/variables';
import { PlayerRecord } from '../../types/InformationTabs/SingleTeamInfo/Records/PlayerRecords/PlayerRecord';


const PlayerRecordItem:FC<PlayerRecord> = ({period, record_image, value, description, matches}) => {

    //TODO: доделать рекорды

    const [isRecordImageVisible, setIsRecordImageVisible] = useState<boolean>(false)


    return (
        <div className={styles.record_item_wrapper}>
            <div className={styles.img_mobile_wrapper}>
                <img src={`${IMG_PATH}${record_image}`} alt="" />
            </div>
            <div className={styles.player_record_item}>
            <div className={styles.record_detail_player_name}
                onMouseEnter={() => setIsRecordImageVisible(true)}
                onMouseLeave={() => setIsRecordImageVisible(false)}
                style={{cursor: 'pointer'}}
            >{description}</div>
            <div className={styles.record_details}>
                <div className={styles.record_detail_info_item}>
                    <span>Goals</span>
                    <span>{value}</span>
                </div>
                <div className={styles.record_detail_info_item}>
                    <span>Matches</span>
                    <span>{matches}</span>
                </div>
                <div className={styles.record_detail_info_item}>
                    <span>G/M</span>
                    <span>{(value/matches).toFixed(1)}</span>
                </div>
                <div className={styles.record_detail_info_item}>
                    <span>Period</span>
                    <span>{period}</span>
                </div>
            </div>
            {
                isRecordImageVisible 
                ? 
                <div className={styles.img_wrapper}>
                    {record_image === null ? null : <img src={`${IMG_PATH}${record_image}`} alt="" /> }  
                </div>
                
                : null
            }
        </div> 
        </div>
         
    )
}

export default PlayerRecordItem
