import { FC } from "react";
import classes from './MatchesList.module.scss'
import GridMatch from "../GridMatch/GridMatch";

interface MatchesListProps {
    matches: any,
    styles: any,
    tooltipPosotion: 'left' | 'right' | 'final',
    setIsTeamHovered: any,
    isRootMatches?: boolean,
    right?: boolean,
    isHalfTournamentGrid?: boolean
}

const MatchesList: FC<MatchesListProps> = ({ matches, styles, tooltipPosotion, setIsTeamHovered, isRootMatches, right, isHalfTournamentGrid}) => {
    return (
        <div className={classes.matches_list} style={{...styles}}>
            {matches.map((it: any, id: number) => <GridMatch key={id} team1={it.team1} team2={it.team2} tooltipPosition={tooltipPosotion} setIsTeamHovered={setIsTeamHovered} isRootMatch={isRootMatches} right={right} isHalfTournamentGrid={isHalfTournamentGrid}/>)}
        </div>
    )
}

export default MatchesList