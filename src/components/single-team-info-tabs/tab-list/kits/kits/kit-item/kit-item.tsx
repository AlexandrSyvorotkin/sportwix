import styles from './kit-item.module.scss'

interface TeamUniformItemProps {
    uniform_img?: string,
    uniform_type?: string
}

const KitItem = ({uniform_img, uniform_type}:TeamUniformItemProps) => {


    return (
        <div className={styles.team_uniform_item}>
            <div className={styles.img_container}>
                <div className={styles.img_wrapper}>
                    <img src={uniform_img} alt=""/>
                </div>
            </div>
            <span className={styles.uniform_type}>{uniform_type}</span>
        </div>
    );
};

export {KitItem}