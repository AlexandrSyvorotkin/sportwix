import React, {FC, useContext, useState, useEffect} from 'react';
import { ThemeContext } from '../../context/ThemeContext/ThemeContext';
import styles from './NewsItem.module.scss'
import NewsModal from '../../ui/modals/NewsModal/NewsModal';
import { Link } from 'react-router-dom';

interface NewsItemProps {
    img: string,
    title: string
    time: string,
    source_link: string,
    source: string,
    text: string,
    header_text: string,
    uuid: number
    activeEl: boolean,
    tags: string[],
    slug?: string
}

const NewsItem:FC<NewsItemProps> = ({img, title, time, source_link, source, text, header_text, uuid, activeEl, tags, slug}) => {

    // const cuttedSource = source.split('').slice(12,21).join('')

    const {theme} = useContext(ThemeContext)

    const [modal, setModal] = useState<boolean>(false)

    const handleOpenModal = () => {
        setModal(true);
    };

    const handleCloseModal = () => {
        setModal(false);
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                handleOpenModal();
            } else if (event.key === 'Escape') {
                handleCloseModal();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <Link to={`${slug}`}>
            <div className={activeEl ? `${styles.news_item} ${styles.active_item}` : `${styles.news_item} ${styles[theme]}`}>
                <div className={styles.news_img}>
                    <img src={img} alt=""/>
                </div>
                <div className={styles.description_wrapper}>
                    <p className={styles.title}>{title}</p>
                    {/* <p className={styles.tags}>{tags}</p> */}
                    <div className={styles.news_description}>
                        <div className={styles.source}>
                            <span>
                                {/* <div className={`${styles.source_link} ${styles[theme]}`} href={source_link} target='_blank' onClick={(e) => e.stopPropagation()} >{''}</div> */}
                            </span>
                            •
                            <span>{time}</span>
                        </div>
                    </div>
                </div>
            </div>
        {modal ? 
            <NewsModal
                img={img}
                title={title}
                time={time}
                source_link={source_link}
                source={source}
                close={() => setModal(false)}
                text={text}
                header_text={header_text}
                uuid={uuid}
            /> 
            : 
            null
        }
        </Link>
    );
};

export default NewsItem;