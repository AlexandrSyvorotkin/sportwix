import styles from './NewsTagsSelector.module.scss'
import { FC, useState, useRef, useEffect, useContext } from 'react'
import arrowOpen from '../../../../assets/select-arrows/open-arrow.svg'
import arrowClose from '../../../../assets/select-arrows/close-arrow.svg'
import { LanguageContext } from '../../../../context/LanguageContext/LanguageContext'
import { ThemeContext } from '../../../../context/ThemeContext/ThemeContext'
import { colors } from 'react-select/dist/declarations/src/theme'

interface NewsTagsSelectorProps {
    tags: any,
    filterNewsByTagsHandler: any,
    activeFilterTags?: string[] 
}

const NewsTagsSelector: FC<NewsTagsSelectorProps> = ({ tags, filterNewsByTagsHandler, activeFilterTags }) => {

    const ref = useRef<HTMLDivElement>(null)
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

    const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            setIsMenuOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])


    function filterByTagFunc(tag: string) {
        // setIsMenuOpen(false)
        filterNewsByTagsHandler(tag)
    }

    const {language} = useContext(LanguageContext)
    

    // const sortedTags = activeFilterTags
    // ? [...activeFilterTags, ...tags.filter((tag: any) => !activeFilterTags.includes(tag))]
    // : tags;
    const {theme} = useContext(ThemeContext)
    const textColor = theme === 'dark' ? '#333333' : 'white'

    return (
        <div className={styles.tag_selector} ref={ref}>
            <div className={styles.tags_header} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <div>{language === "Eng" ? "Tags" : "Теги"}</div>
                <img src={isMenuOpen ? arrowClose : arrowOpen} alt="" />
            </div>
            {isMenuOpen ?
                <div className={styles.available_tags}>
                    {tags.map((tag: string) =>
                        <div className={styles.tag} key={tag}  onClick={() => filterByTagFunc(tag)}>
                            <div className={styles.indicator_wrapper}>{activeFilterTags?.includes(tag) ? <div className={styles.active_indicator}></div> : null}</div>
                            <span style={{color: textColor}}>{tag}</span>
                        </div>
                    )}
                </div>
                : null
            }
        </div>
    )
}

export default NewsTagsSelector