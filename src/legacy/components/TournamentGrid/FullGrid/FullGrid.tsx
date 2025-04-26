import { FC, useState, useRef } from 'react'
import styles from './FullGrid.module.scss'
import GridMatch from '../GridMatch/GridMatch'
import MatchesList from '../MatchesList/MatchesList'
import NextMatchLine from '../NextMatchLine/NextMatchLine'
import MainBtn from '../../../ui/Buttons/MainBtn/MainBtn'

interface FullGridProps {
    visible: boolean,
    stages: {
        id: number,
        title: string
    }[],
    matches: any,
    setGridPart: any,
    currentTab: any,
    setCurrentTab: any,
    gridPart: any,
    resetGridHandler: any
}

const FullGrid: FC<FullGridProps> = ({ visible, stages, matches, setGridPart, currentTab, setCurrentTab, gridPart, resetGridHandler }) => {



    const gridRef = useRef(null)


    //@ts-ignore
    const gridParams = gridRef?.current?.getBoundingClientRect()
    // console.log(gridParams)

    const [gridBackdropLeft, setGridBackdropLeft] = useState(false)
    const onGridMouseMove = (event: any) => {
        if (!gridParams) return;
        const { clientX, clientY } = event
        const x = clientX - gridParams.x

        if (x < gridParams.width / 2) {
            setGridBackdropLeft(true)
        } else {
            setGridBackdropLeft(false)
        }

        // console.log(x, y)
    }


    const [isTeamHovered, setTeamIsHovered] = useState('')


    // console.log(isTeamHovered)
   
    const [gridTeamsMarks] = useState({
        final: {
            pair_1: {
                team_1: matches.final[0].team1.mark, 
                team_2: matches.final[0].team2.mark
            }
        },
        semifinals: {
            pair_1: {
                team_1: matches.semifinals[0].team1.mark, 
                team_2: matches.semifinals[0].team2.mark
            },
            pair_2: {
                team_1: matches.semifinals[1].team1.mark,
                team_2: matches.semifinals[1].team2.mark
            }
        },
        quterfinals: {
            pair_1: {
                team_1: matches.quarterfinals[0].team1.mark,
                team_2: matches.quarterfinals[0].team2.mark 
            },
            pair_2: {
                team_1: matches.quarterfinals[1].team1.mark,
                team_2: matches.quarterfinals[1].team2.mark
            },
            pair_3: {
                team_1: matches.quarterfinals[2].team1.mark, 
                team_2: matches.quarterfinals[2].team2.mark
            },
            pair_4: {
                team_1: matches.quarterfinals[3].team1.mark,
                team_2: matches.quarterfinals[3].team2.mark
            }
        }
    })

    // console.log(gridTeamsMarks)
    // console.log(isTeamHovered)

    if (!visible) return null

    return (
        <div className={styles.grid} style={{ display: visible ? 'flex' : "none" }} ref={gridRef} onMouseMove={onGridMouseMove}>
            {!gridPart.left && !gridPart.right && 
            <>
                {
                gridBackdropLeft ?
                    <div className={styles.half_backdrop_left} onClick={() => setGridPart({ left: true, right: false })} />
                    :
                    <div className={styles.half_backdrop_right} onClick={() => setGridPart({ left: false, right: true })} />
                }
            </>
            }
            {!gridPart.left && !gridPart.right ? 
                <>
            <MatchesList matches={matches.roundOf8.slice(0, 4)} styles={{ justifyContent: 'space-between' }} tooltipPosotion="left" setIsTeamHovered={setTeamIsHovered} isRootMatches={true} />
            <div className={styles.lines}>
                <div className={styles.line_container}>
                    <NextMatchLine lineType={'1/8to1/4'} position={'top'} lineSide="left" isMatchConnected={gridTeamsMarks.quterfinals.pair_1.team_1 === (isTeamHovered)} />
                    <NextMatchLine lineType={'1/8to1/4'} position={'bottom'} lineSide="left" isMatchConnected={gridTeamsMarks.quterfinals.pair_1.team_2 === (isTeamHovered)} />
                </div>
                <div className={styles.line_container}>
                    <NextMatchLine lineType={'1/8to1/4'} position={'top'} lineSide="left" isMatchConnected={gridTeamsMarks.quterfinals.pair_2.team_1 === (isTeamHovered)} />
                    <NextMatchLine lineType={'1/8to1/4'} position={'bottom'} lineSide="left" isMatchConnected={gridTeamsMarks.quterfinals.pair_2.team_2 === (isTeamHovered)} />
                </div>
            </div>
            <MatchesList matches={matches.quarterfinals.slice(0, 2)} styles={{ justifyContent: 'center', gap: "50%" }} tooltipPosotion="left" setIsTeamHovered={setTeamIsHovered} />
            <div className={styles.lines} style={{ justifyContent: 'center', gap: '120px' }}>
                <NextMatchLine lineType={'1/4to1/2'} position={'top'} lineSide="left" isMatchConnected={gridTeamsMarks.semifinals.pair_1.team_1 === isTeamHovered} />
                <NextMatchLine lineType={'1/4to1/2'} position={'bottom'} lineSide="left" isMatchConnected={gridTeamsMarks.semifinals.pair_1.team_2 === isTeamHovered} />
            </div>
            <MatchesList matches={matches.semifinals.slice(0, 1)} styles={{ justifyContent: 'center' }} tooltipPosotion="left" setIsTeamHovered={setTeamIsHovered} />
            <div className={styles.final_line}>
                <NextMatchLine lineType={'1/2toFinal'} position={'bottom'} lineSide="right" isMatchConnected={gridTeamsMarks.final.pair_1.team_1 === isTeamHovered} />
            </div>
            <div className={styles.final} >
                {matches.final.map((it: any) => <GridMatch team1={it.team1} team2={it.team2} final={true} tooltipPosition="final" setIsTeamHovered={setTeamIsHovered} />)}
            </div>
            <div className={styles.final_line}>
                <NextMatchLine lineType={'1/2toFinal'} position={'top'} lineSide="right" isMatchConnected={gridTeamsMarks.final.pair_1.team_2 === isTeamHovered} />
            </div>
            <MatchesList matches={matches.semifinals.slice(1, 2)} styles={{ justifyContent: 'center' }} tooltipPosotion="right" setIsTeamHovered={setTeamIsHovered} />
            <div className={styles.lines} style={{ justifyContent: 'center', gap: '120px' }}>
                <NextMatchLine lineType={'1/4to1/2'} position={'bottom'} lineSide="right" isMatchConnected={gridTeamsMarks.semifinals.pair_2.team_1 === isTeamHovered} />
                <NextMatchLine lineType={'1/4to1/2'} position={'top'} lineSide="right" isMatchConnected={gridTeamsMarks.semifinals.pair_2.team_2 === isTeamHovered} />
            </div>
            <MatchesList matches={matches.quarterfinals.slice(2, 4)} styles={{ justifyContent: 'center', gap: "50%" }} tooltipPosotion="right" setIsTeamHovered={setTeamIsHovered} />
            <div className={styles.lines}>
                <div className={styles.line_container}>
                    <NextMatchLine lineType={'1/8to1/4'} position={'bottom'} lineSide="right" isMatchConnected={gridTeamsMarks.quterfinals.pair_3.team_1 === (isTeamHovered)} />
                    <NextMatchLine lineType={'1/8to1/4'} position={'top'} lineSide="right" isMatchConnected={gridTeamsMarks.quterfinals.pair_3.team_2 === (isTeamHovered)} />
                </div>
                <div className={styles.line_container}>
                    <NextMatchLine lineType={'1/8to1/4'} position={'bottom'} lineSide="right" isMatchConnected={gridTeamsMarks.quterfinals.pair_4.team_1 === (isTeamHovered)} />
                    <NextMatchLine lineType={'1/8to1/4'} position={'top'} lineSide="right" isMatchConnected={gridTeamsMarks.quterfinals.pair_4.team_2 === (isTeamHovered)} />
                </div>
            </div>
            <MatchesList matches={matches.roundOf8.slice(4, 8)} styles={{ justifyContent: 'space-between' }} tooltipPosotion="right" setIsTeamHovered={setTeamIsHovered} isRootMatches={true} right={true} />
                </>
            
            : null}
            {gridPart.left && !gridPart.right ?
                <>
                    <MatchesList matches={matches.roundOf8.slice(0, 4)} styles={{ justifyContent: 'space-between' }} tooltipPosotion="left" setIsTeamHovered={setTeamIsHovered} isRootMatches={true} isHalfTournamentGrid={true}/>
            <div className={styles.lines}>
                <NextMatchLine lineType={'1/8to1/4'} position={'top'} lineSide="left" isMatchConnected={gridTeamsMarks.quterfinals.pair_1.team_1 === (isTeamHovered)} />
                <NextMatchLine lineType={'1/8to1/4'} position={'bottom'} lineSide="left" isMatchConnected={gridTeamsMarks.quterfinals.pair_1.team_2 === (isTeamHovered)} />
                <NextMatchLine lineType={'1/8to1/4'} position={'top'} lineSide="left" isMatchConnected={gridTeamsMarks.quterfinals.pair_2.team_1 === (isTeamHovered)} />
                <NextMatchLine lineType={'1/8to1/4'} position={'bottom'} lineSide="left" isMatchConnected={gridTeamsMarks.quterfinals.pair_2.team_2 === (isTeamHovered)} />
            </div>
            <MatchesList matches={matches.quarterfinals.slice(0, 2)} styles={{ justifyContent: 'center', gap: "50%" }} tooltipPosotion="left" setIsTeamHovered={setTeamIsHovered}  isHalfTournamentGrid={true}/>
            <div className={styles.lines} style={{ justifyContent: 'center', gap: '20px' }}>
                <NextMatchLine lineType={'1/4to1/2'} position={'top'} lineSide="left" isMatchConnected={gridTeamsMarks.semifinals.pair_1.team_1 === isTeamHovered} />
                <NextMatchLine lineType={'1/4to1/2'} position={'bottom'} lineSide="left" isMatchConnected={gridTeamsMarks.semifinals.pair_1.team_2 === isTeamHovered} />
            </div>
            <MatchesList matches={matches.semifinals.slice(0, 1)} styles={{ justifyContent: 'center' }} tooltipPosotion="left" setIsTeamHovered={setTeamIsHovered}isHalfTournamentGrid={true} />
            <div className={styles.half_grid_line_to_final}>
                <NextMatchLine lineType={'1/2toFinalHalfGrid'} position={'bottom'} lineSide="left" isMatchConnected={gridTeamsMarks.final.pair_1.team_1 === isTeamHovered} />
            </div>
            
            <MatchesList matches={matches.final} styles={{ justifyContent: 'center' }} tooltipPosotion="left" setIsTeamHovered={setTeamIsHovered} isHalfTournamentGrid={true} />
            <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
				<MainBtn onClick={resetGridHandler}>Reset</MainBtn>
			</div>
                </>
            : null}
            {!gridPart.left && gridPart.right ?
                <>  
                <MatchesList matches={matches.final} styles={{ justifyContent: 'center' }} tooltipPosotion="left" setIsTeamHovered={setTeamIsHovered}isHalfTournamentGrid={true} />
                <div className={styles.half_grid_line_to_final}>
                    <NextMatchLine lineType={'1/2toFinalHalfGrid'} position={'top'} lineSide="right" isMatchConnected={gridTeamsMarks.final.pair_1.team_2 === isTeamHovered} />
                </div>
                    <MatchesList matches={matches.semifinals.slice(1, 2)} styles={{ justifyContent: 'center' }} tooltipPosotion="right" setIsTeamHovered={setTeamIsHovered} isHalfTournamentGrid={true}/>
            <div className={styles.lines} style={{ justifyContent: 'center', gap: '20px' }}>
            <NextMatchLine lineType={'1/4to1/2'} position={'bottom'} lineSide="right" isMatchConnected={gridTeamsMarks.semifinals.pair_2.team_1 === isTeamHovered} />
                <NextMatchLine lineType={'1/4to1/2'} position={'top'} lineSide="right" isMatchConnected={gridTeamsMarks.semifinals.pair_2.team_2 === isTeamHovered} />
            </div>
            <MatchesList matches={matches.quarterfinals.slice(2, 4)} styles={{ justifyContent: 'center', gap: "50%" }} tooltipPosotion="right" setIsTeamHovered={setTeamIsHovered}  isHalfTournamentGrid={true}/>
            <div className={styles.lines}>
                <NextMatchLine lineType={'1/8to1/4'} position={'bottom'} lineSide="right" isMatchConnected={gridTeamsMarks.quterfinals.pair_3.team_1 === (isTeamHovered)} />
                <NextMatchLine lineType={'1/8to1/4'} position={'top'} lineSide="right" isMatchConnected={gridTeamsMarks.quterfinals.pair_3.team_2 === (isTeamHovered)} />
                <NextMatchLine lineType={'1/8to1/4'} position={'bottom'} lineSide="right" isMatchConnected={gridTeamsMarks.quterfinals.pair_4.team_1 === (isTeamHovered)} />
                <NextMatchLine lineType={'1/8to1/4'} position={'top'} lineSide="right" isMatchConnected={gridTeamsMarks.quterfinals.pair_4.team_2 === (isTeamHovered)} />
            </div>
            <MatchesList matches={matches.roundOf8.slice(4, 8)} styles={{ justifyContent: 'space-between' }} tooltipPosotion="right" setIsTeamHovered={setTeamIsHovered} isRootMatches={true} right={true} isHalfTournamentGrid={true}/>
            <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
				<MainBtn onClick={resetGridHandler}>Reset</MainBtn>
			</div>
                </>
            : null}
        </div>
    )
}

export default FullGrid