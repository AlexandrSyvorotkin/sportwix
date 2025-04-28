import { FC } from 'react'
import styles from './banner.module.scss'
import bannerLogo from '../../assets/logo.svg'

interface BannerProps {
}
 
const Banner: FC<BannerProps> = ({}) => {

    const theme = 'dark'
    
    const border = theme === 'dark' ? '1px solid #5C5C5C' : '1px solid #E1E3EA'

    return (
        <div className={styles.banner} style={theme === 'dark' ? { backgroundColor: '#181818' } : { backgroundColor: '#F3F4F7', borderBottom: border }}>
            <>
                <div className={styles.img_wrapper}>
                    <img src={bannerLogo} alt="" />
                </div>
                <span>Sport Wix</span>
            </>
        </div>
    )

}

export default Banner