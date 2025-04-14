import { ChangeEvent, FC, useEffect, useState } from 'react'
import { Tip } from '../../types/types'
import styles from './Tips.module.scss'
import { API_VARIABLES, IMG_PATH } from '../../api/variables'
import arrow from '../../assets/Arrow.png'
import axios from 'axios'
import YouTube from 'react-youtube'

interface TipsProps {

}

const TipsComponent: FC<TipsProps> = () => {

    const {BASE_PATH, API, V1, TIPS} = API_VARIABLES

    const [tipsList, setTipsList] = useState<any>([]);
    const [selectedKey, setSelectedKey] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');


    useEffect(() => {
        async function fetchTipData () {
            const {data} = await axios.get(`${BASE_PATH}/${API}/${V1}/${TIPS}`)
            setTipsList(data.chapters)
        }
        fetchTipData()
    }, [])

    console.log(tipsList)

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value); // Обновляем поисковый запрос при изменении значения инпута
    };
    const handleKeyClick = (key: string) => {
        setSelectedKey(prevKey => (prevKey === key ? null : key));
    };

    return (
        <div className={styles.tips_container}>
            <div className={styles.filter}>
                <span>Find</span>
                <input type="text" className={styles.input} value={searchTerm} onChange={handleSearch}/>
            </div>
            <div className={styles.tips_list}>
                {Object.keys(tipsList).map((key: string, index) => (
                    <div key={index} style={{width: '100%'}}>
                        <div onClick={() => handleKeyClick(key)} className={styles.chapter}>
                            <div className={styles.id}></div>
                            <span>{key}</span>
                        </div>
                        <>
                            {selectedKey === key && (
                                <div className={styles.tips_list_items}>
                                    {tipsList[key].map((item: Tip, itemIndex: number) => (
                                        <div key={itemIndex} className={styles.tip_item}>
                                            <div className={styles.tip_header}>
                                                <div className={styles.img_wrapper}>
                                                    <img src={`${IMG_PATH}${item.eng.img}`} alt="" />
                                                </div>
                                                <span>{item.eng.title}</span>
                                            </div>
                                            <div className={styles.tip_description}>
                                                <p>{item.eng.text}</p>
                                                <YouTube videoId='SSQG9SSegr4' />
                                            </div>
                                    </div>
                                ))}
                                </div>
                            )}
                        </>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TipsComponent
