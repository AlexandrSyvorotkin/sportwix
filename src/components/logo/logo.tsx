import styles from './Logo.module.scss'
import logo from '../../assets/logo.svg'

const Logo = ({ onClick }: { onClick?: () => void }) => {
  return (
    <div className={styles.logo} onClick={onClick} style={{ cursor: 'pointer' }}>
      <div className={styles.logo_img}>
        <img src={logo} alt="" />
      </div>
      <div className={`${styles.logo_name}`}>Sport Wix</div>
    </div>
  )
}

export { Logo }
