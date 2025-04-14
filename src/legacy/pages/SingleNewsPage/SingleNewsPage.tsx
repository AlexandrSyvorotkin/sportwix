import axios from 'axios'
import { FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { API_VARIABLES, IMG_PATH } from '../../api/variables'
import styles from './SingleNewsPage.module.scss'
//@ts-ignore
import { Helmet } from "react-helmet-async";
import { INEWS } from '../../models/INews'
import MainBtn from '../../ui/Buttons/MainBtn/MainBtn'

type NewsItem = {
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
    slug?: string,
    header_title: string,
    body_text: string,
    header_img: string
} | null

const SingleNewsPage: FC = () => {

    const { slug } = useParams()
    const { V1, API, NEWS, BASE_PATH } = API_VARIABLES

    const [newsData, setNewsData] = useState<INEWS | null>(null)
    const [commentsList, setCommentsList] = useState([])

    useEffect(() => {
        axios.get<INEWS>(`${BASE_PATH}/${API}/${V1}/${NEWS}/${slug}`).then(response => setNewsData(response.data))
    }, [])

    // useEffect(() => {
    //     axios.get(`${BASE_PATH}/api/v1/news/${slug}/comments/`).then(response => console.log(response))
    // }, [])

    console.log(newsData)

    const navigate = useNavigate()


    console.log(newsData)
    const text = newsData ? newsData.body_text : ''


    return (
        <div className={styles.single_news}>
            <Helmet key={JSON.stringify(newsData?.meta_tags.meta)}>
                <meta charSet="utf-8" />
                <title>{newsData?.meta_tags.title}</title>
                {newsData?.meta_tags.meta.map((tag, index) => (
                    <meta
                        key={index}
                        name={tag.name || undefined}
                        property={tag.property || undefined}
                        content={tag.content}
                  />
                ))}
            </Helmet>
            <div>
                <MainBtn onClick={() => navigate('/chart/epl')}> Назад </MainBtn>
            </div>
            {newsData ?
                <div className={styles.news_content}>
                    <div className={styles.header}>{newsData.header_text}</div>
                    <div className={styles.subheader}>
                        <div>{newsData.header_title}</div>
                        <div>{newsData.source}</div>
                    </div>
                    {newsData.header_img && <div className={styles.img_wrapper}>
                        <img src={newsData.header_img} alt="" />
                    </div>}
                    <div className={styles.text} dangerouslySetInnerHTML={{ __html: text }}/>
                </div>
                :
                null
            }
        </div>
    )
}

export default SingleNewsPage