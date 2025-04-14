import styles from './News.module.scss'
import WorkInProgress from '../../legacy/components/WorkInProgress/WorkInProgress';


const News = () => {

    return (
        <section className={styles.news}>
            <WorkInProgress/>
            {/* <NewsDimanics/> */}
        </section>
    );
};

export default News;










