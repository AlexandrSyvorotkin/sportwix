import styles from './news-tab.module.scss';
import { NewsTabItem } from '../news-tab-item';
// import { singleNews } from '../../legacy/types/types';
// import TabBtn from '../../legacy/ui/Buttons/TabBtn/TabBtn';
import classNames from 'classnames';
import newsMock from '../../mocks/news-mock.json';

// type tags = string[]

const NewsTab = () => {


    // const isSingleTeamView = useAppSelector(state => state.tournamentSlice.isSingleTeamView)
    // const [activeFilterTags, setActiveFilterTags] = useState<string[]>([])
    // const [isFilterByTags, setIsFilterByTags] = useState<boolean>(false)
    // const [teamFilterName, setTeamFilterName] = useState<string>('')

    const data = newsMock


    // const firstSelectedTeam = useAppSelector(state => state.tournamentSlice.firstSelectedTeam?.team_uuid)
    // const championshipUuid = useAppSelector(state => state.tournamentSlice.championshipId)

    // const { data: newsTags } = useFetchTagsQuery('')
    // const { data, isFetching, isError } = useFetchNewsQuery({
    //     selectedTeam: isSingleTeamView ? firstSelectedTeam : '',
    //     championshipUuid: isSingleTeamView ? championshipUuid : '',
    //     tags: isSingleTeamView ? [''] : newsTags?.results
    // })

    // activeFilterTags.length > 0 ? activeFilterTags : newsTags?.results

    // console.log(newsTags)


    // const [activeId, setActiveId] = useState<number | undefined>(0)

    // const handleKeyPress = useCallback((event: KeyboardEvent) => {
    //     // console.log('Key pressed:', event.key); // Проверьте, выводится ли это сообщение в консоль при нажатии клавиш
    //     if (event.key === 'ArrowLeft' && activeId !== undefined) {
    //         setActiveId((prevId) => (prevId === undefined ? undefined : prevId === 0 ? prevId : prevId - 1));
    //     } else if (event.key === 'ArrowRight' && activeId !== undefined) {
    //         //@ts-ignore
    //         setActiveId((prevId) => (prevId === undefined ? undefined : prevId === data?.results.length - 1 ? prevId : prevId + 1));
    //     }
    // }, [activeId, data?.results.length]);
    // // Добавьте слушатель событий клавиатуры при монтировании компонента
    // useEffect(() => {
    //     window.addEventListener('keydown', handleKeyPress);
    //     // Уберите слушатель событий клавиатуры при размонтировании компонента
    //     return () => {
    //         window.removeEventListener('keydown', handleKeyPress);
    //     };
    // }, [handleKeyPress]);

    // async function fetchNewsData(path: string) {
    //     try {
    //         const { data } = await axios.get(path);
    //         // console.log(data)
    //         setNewsData(data.results);
    //     } catch {
    //         setError(true);
    //     } finally {
    //         setLoading(false);
    //     }
    // }

    //    //fetch tags
    //     useEffect(() => {
    //         async function fetchTags () {
    //             const {data} = await axios.get(`${BASE_PATH}/api/v1/news-tags`)
    //             setTags(data.results)
    //         }
    //         fetchTags()
    //     }, [])

    //fetch all tags or single team tags DONE!!!
    // useEffect(() => {
    //     setIsFilterByTags(false)
    //     const fetchNews = async () => {
    //         try {
    //             if (isSingleTeamView) {
    //                 await fetchNewsData(`${BASE_PATH}/api/v1/news/?team=${firstTeamSelected?.team_uuid}&event=${ENGLISH_PREMIER_LEAGUE}`);
    //             } else {
    //                 await fetchNewsData(ALLNEWS);
    //             }
    //         } catch {
    //             setError(true);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchNews();
    // }, [isSingleTeamView, firstTeamSelected?.team_uuid]);



    // useEffect(() => {
    //     if (isFilterByTags) {
    //         const fetchNewsByTags = async () => {
    //             try {
    //                 const { data } = await axios.get(`${BASE_PATH}/api/v1/news?tags=${activeFilterTags}`);
    //                 setNewsData(data.results);
    //                 setIsFilterByTags(true);
    //             } catch {
    //                 setError(true);
    //             } finally {
    //                 setLoading(false);
    //             }
    //         };

    //         fetchNewsByTags();
    //     }
    // }, [isFilterByTags, activeFilterTags])

    // const filterNewsBySelectedTeam = (team_uuid: string, team_name: string) => {
    //     if (teamFilterName === '') {
    //         setTeamFilterName(team_name);
    //         axios.get(`${BASE_PATH}/api/v1/news/?tags=${activeFilterTags}&team=${team_uuid}`)
    //         .then((response) => {
    //             const data = response.data;
    //             setNewsData(data.results);
    //         })
    //         .catch((error) => {
    //             console.error("Произошла ошибка при запросе данных:", error);
    //         });
    //     } else if (teamFilterName !== team_name) {
    //         setTeamFilterName(team_name);
    //         axios.get(`${BASE_PATH}/api/v1/news/?tags=${activeFilterTags}&team=${team_uuid}`)
    //         .then((response) => {
    //             const data = response.data;
    //             setNewsData(data.results);
    //         })
    //         .catch((error) => {
    //             console.error("Произошла ошибка при запросе данных:", error);
    //         });
    //     } else {
    //         setTeamFilterName('');
    //         fetchNewsData(ALLNEWS);
    //     }
    // };


    const theme = 'dark'
    // const border = theme === 'dark' ? '1px solid #5C5C5C' : '1px solid #E1E3EA'

    // if (isFetching) {
    //     return <LoaderAlt />;
    // }

    // if (isError) {
    //     return <h3 style={{ color: 'white' }}>Ошибка при получении данных</h3>;
    // }



    // const resetFilterByTag = () => {
    //     setActiveFilterTags([])
    // }

    // const tabListStyles = classNames({
    //     [styles.tags_list]: true,
    //     [styles.darkBorder]: theme === 'dark',
    //     // [styles.lightBorder]: theme === 'light'
    // })

    // filterNewsByTagsHandler(tag, id) 

    // console.log(activeFilterTags)

    // const addDeleteTagToActivaTagsPool = (tag: string) => {
    //     if (activeFilterTags.includes(tag)) {
    //         const newActiveTags = activeFilterTags.filter(it => it !== tag)
    //         setActiveFilterTags(newActiveTags)
    //     } else {
    //         setActiveFilterTags([...activeFilterTags, tag])
    //     }
    // }

    return (
        <div className={styles.news_wrapper}>
            {/* <div className={styles.news_header_tags} id='news-tags' style={{ borderBottom: border }}>
                <div className={tabListStyles}>
                    <TabBtn onClick={() => null} activeTab={false}>Reset tags</TabBtn>
                    <TabBtn onClick={allTagsHandles} activeTab={false}>All tags</TabBtn>
                    {newsTags?.results.slice(0, 3).map((tag: any, id: number) =>
                        <TabBtn key={id} activeTab={activeFilterTags.includes(tag)} onClick={() => addDeleteTagToActivaTagsPool(tag)}>{tag}</TabBtn>
                    )}
                </div>
                <div className={styles.filters}>
                    <NewsTagsSelector tags={newsTags?.results} activeFilterTags={activeFilterTags} filterNewsByTagsHandler={addDeleteTagToActivaTagsPool} />
                    <NewsTeamSelector
                        filterNewsBySelectedTeam={() => null}
                        teamFilterName={teamFilterName}
                        setTeamFilterName={setTeamFilterName}
                    />
                </div>
            </div> */}
            {data?.results && data?.results.length > 0 ?
                <div className={styles.news}>
                    {data?.results.length === 0 ? <div className={styles.nonews}>{"Нет новостей по вашим выбранным параметрам"}</div> :
                        <>
                            {data?.results.map((news: any, id: number) => (
                                <NewsTabItem
                                    key={id}
                                    img={news.header_img}
                                    title={news.header_title}
                                    time={news.header_date}
                                    source_link={news.source_link}
                                    source={news.source}
                                    text={news.body_text}
                                    header_text={news.header_text}
                                    uuid={news.uuid}
                                    activeEl={false}
                                    tags={news.tags}
                                    slug={news.slug}
                                />
                            ))}
                        </>
                    }
                </div>
                : <h3>Нету новостей по вашим критериям</h3>
            }
        </div>
    );
};

export { NewsTab };
