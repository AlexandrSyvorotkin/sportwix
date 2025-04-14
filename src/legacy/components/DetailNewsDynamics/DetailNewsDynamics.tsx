import { FC, useEffect, useState } from 'react'
import styles from './DetailNewsDynamics.module.scss'
import { useAppSelector } from '../../types/hooks'
import { RootState } from '../../redux/store'
import { ITeam } from '../../models/ITeam'
import { API_VARIABLES, IMG_PATH } from '../../api/variables'
import { News } from '../../types/types'
import NewsItem from '../NewsItem/NewsItem'

import news1 from '../../assets/newsShort/News1.png'
import news2 from '../../assets/newsShort/News2.png'
import news3 from '../../assets/newsShort/News3.png'
import Graph from './Grapth'
import NewsTagsSelector from '../../ui/Selections/NewsSelectors/NewsTagsSelector/NewsTagsSelector'
import NewsTeamSelector from '../../ui/Selections/NewsSelectors/NewsTeamSelecor/NewsTeamSelector'
import axios from 'axios'
import { Link } from 'react-router-dom'

const DetailNewsDynamics: FC = () => {

    const MOCK_NEWS = [
        { id: 1, header_img: news1, header_date: '', header_title: 'News header title', source_link: 'The Guardian', source: 'The Guardian', body_text: 'Body text', header_text: 'Body text', uuid: 1, tags: [''] },
        { id: 1, header_img: news2, header_date: '', header_title: 'News header title', source_link: 'The Guardian', source: 'The Guardian', body_text: 'Body text', header_text: 'Body text', uuid: 1, tags: [''] },
        { id: 1, header_img: news3, header_date: '', header_title: 'News header title', source_link: 'The Guardian', source: 'The Guardian', body_text: 'Body text', header_text: 'Body text', uuid: 1, tags: [''] }
    ]
    const [tags, setTags] = useState<string[] | []>([])
    const [activeFilterTags, setActiveFilterTags] = useState<string[]>([])
    const [teamFilterName, setTeamFilterName] = useState<string>('')

    const [news, setNews] = useState([])

    async function fetchNewsData(path: string) {
        try {
            const { data } = await axios.get(path);
            // console.log(data)
            setNews(data.results);
        } catch {
            // setError(true);
        } finally {
            // setLoading(false);
        }
    }

    const { BASE_PATH, API, V1, NEWS } = API_VARIABLES;
    const ALLNEWS = `${BASE_PATH}/${API}/${V1}/${NEWS}`;
    useEffect(() => {
        fetchNewsData(ALLNEWS)
    }, [])

    // console.log(news)

    return (
        <div className={styles.detail_news_dynamics}>
            <div className={styles.header}>
                <div className={styles.news_header}>
                    <div>Все новости</div>
                    <div>Популярное</div>
                    <NewsTagsSelector tags={tags.slice(3)} activeFilterTags={activeFilterTags} filterNewsByTagsHandler={() => null} />
                </div>
                <div>
                    <NewsTeamSelector
                        filterNewsBySelectedTeam={''}
                        teamFilterName={teamFilterName}
                        setTeamFilterName={setTeamFilterName}
                    />
                </div>
            </div>
            <div className={styles.news_list}>
                {news.map((item:any) =>
                                <NewsItem
                                    key={item.uuid}
                                    img={item.header_img}
                                    title={item.header_title}
                                    time={item.header_date}
                                    source_link={item.source_link}
                                    source={item.source}
                                    text={item.body_text}
                                    header_text={item.header_text}
                                    uuid={item.uuid}
                                    activeEl={false}
                                    tags={item.tags}
                                    slug={item.slug}
                                />
                    )}
                {/* {teams.map((team: ITeam) =>
                    <div className={styles.team_detail_news}>
                        <div className={styles.team_detail_news_info}>
                            <div className={styles.coach_info}>
                                <div className={styles.img_wrapper}>
                                    <img src={`${IMG_PATH}${team.team_coach?.img}`} alt="" />
                                </div>
                                <div className={styles.coach_info_detail}>
                                    <span>02.03.2001</span>
                                    <span>Имя тренера</span>
                                </div>
                            </div>
                            <Graph />
                            <div className={styles.rating}>
                                <span>Рейтинг</span>
                                <span>{team.score}</span>
                            </div>
                        </div>
                        <div className={styles.news_list_detail}>
                            {MOCK_NEWS.map((news, id) =>
                                <NewsItem
                                    key={id}
                                    img={news.header_img}
                                    title={news.header_title}
                                    time={news.header_date}
                                    source_link={news.source_link}
                                    source={news.source}
                                    text={news.body_text}
                                    header_text={news.header_text}
                                    uuid={news.uuid}
                                    activeEl={1 === id}
                                    tags={news.tags}
                                />
                            )}
                        </div>
                    </div>
                )} */}
            </div>
        </div>
    )
}

export default DetailNewsDynamics