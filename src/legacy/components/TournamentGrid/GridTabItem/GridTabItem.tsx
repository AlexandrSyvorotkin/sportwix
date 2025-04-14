import { FC } from "react";
import styles from './GrdiTabItem.module.scss'

interface GridTabItemProps {
    visible: boolean
    matches: any
}

const GridTabItem:FC<GridTabItemProps> = ({visible, matches}) => {

    if (!visible) return null
    
    return (
        <div style={{ display: visible ? 'flex' : "" }} className={styles.tab_matches_list}>
				{matches.map((it: any, index: number) =>
					<div key={index} className={styles.tab_match}>
						<div className={styles.tab_match_details}>
							<div className={styles.tab_match_img}>
								<img src={it.team1.img} alt={it.team1.name} />
							</div>
							<div className={styles.team_name}>{it.team1.name}</div>
							<div>{it.team1.goals} {it.team1.penalties ? <> ({it.team1.penalties})</> : null}</div>
						</div>
						<div className={styles.tab_match_details}>
							<div className={styles.tab_match_img}>
								<img src={it.team2.img} alt={it.team2.name} />
							</div>
							<div className={styles.team_name}>{it.team2.name}</div>
							<div>{it.team2.goals} {it.team2.penalties ? <> ({it.team2.penalties})</> : null}</div>
						</div>
					</div>
				)}
			</div>
    )
}

export default GridTabItem
