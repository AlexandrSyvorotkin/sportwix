import burnley from '../../assets/teams/burney.svg'
import shefield from '../../assets/teams/shefield.svg'
import wolverhamptom from '../../assets/teams/wolverhampton.svg'
import chelsea from '../../assets/teams/chelsea.svg'
import luton from '../../assets/teams/luton.svg'
import brandford from '../../assets/teams/brandford.svg'
import mu from '../../assets/teams/mu.svg'
import nottingham from '../../assets/teams/nf.svg'
import newcastle from '../../assets/teams/newcastle.svg'
import westham from '../../assets/teams/westham.svg'
import tottenham from '../../assets/teams/tottenham.svg'
import mc from '../../assets/teams/mc.svg'
import brighton from '../../assets/teams/brighton.svg'
import boormut from '../../assets/teams/boormut.svg'
import fulham from '../../assets/teams/fulham.svg'

export const playoffData = {
    "1/16": [
        { 
            team1: { mark: "A1", name: 'Burnley' ,img: burnley, score: 2}, 
            team2: { mark: "B1", name: 'Shefield', img: shefield, score: 1} 
        }, 
        { 
            team1: { mark: "A2", name: 'Wolverhamptom', img: wolverhamptom, score: 2}, 
            team2: { mark: "B2", name: 'Chelsea', img: chelsea, score: 5} 
        },
        { 
            team1: { mark: "A3", name: 'Luton', img: luton, score: 1}, 
            team2: { mark: "B3", name: 'Brandford', img: brandford, score: 0} 
        }, 
        { 
            team1: { mark: "A4", name: 'Manchester United', img: mu, score: 3}, 
            team2: { mark: "B4", name: 'Nottingham Forest', img: nottingham, score: 2} 
        },
        { 
            team1: { mark: "A5", name: 'Newcastle', img: newcastle, score: 4}, 
            team2: { mark: "B5", name: 'Westham', img: westham, score: 2} 
        }, 
        {
            team1: { mark: "A6", name: 'Tottenham Hotspur', img: tottenham, score: 6}, 
            team2: { mark: "B6", name: 'Manchester City', img: mc, score: 4} 
        },
        { 
            team1: { mark: "A7", name: 'Brighton', img: brighton, score: 2}, 
            team2: { mark: "B7", name: 'Bormut', img: boormut, score: 1} 
        }, 
        { 
            team1: { mark: "A8", name: 'Fulham', img: fulham, score: 3}, 
            team2: { mark: "B8", name: 'Nottingham Forest', img: nottingham, score: 0} 
        }, //
        { team1: { mark: "A9", img: burnley, score: ''}, team2: { mark: "B9", img: shefield, score: ''} }, 
        { team1: { mark: "A10", img: burnley, score: ''}, team2: { mark: "B10", img: shefield, score: ''} },
        { team1: { mark: "A11", img: burnley, score: ''}, team2: { mark: "B11", img: shefield, score: ''} },
        { team1: { mark: "A12", img: burnley, score: ''}, team2: { mark: "B12", img: shefield, score: ''} },
        { team1: { mark: "A13", img: burnley, score: ''}, team2: { mark: "B13", img: shefield, score: ''} },
        { team1: { mark: "A14", img: burnley, score: ''}, team2: { mark: "B14", img: shefield, score: ''} },
        { team1: { mark: "A15", img: burnley, score: ''}, team2: { mark: "B15", img: shefield, score: ''} },
        { team1: { mark: "A16", img: burnley, score: ''}, team2: { mark: "B16", img: shefield, score: ''} },
    ],
    "1/8": [
        { 
            team1: { mark: "A1", name: 'Burnley' ,img: burnley, score: 1}, 
            team2: { mark: "B2", name: 'Chelsea', img: chelsea, score: 0} 
        }, 
        { 
            team1: { mark: "A3", name: 'Luton', img: luton, score: 1}, 
            team2: { mark: "A4", name: 'Manchester United', img: mu, score: 3}
        },
        { 
            team1: { mark: "A5", name: 'Newcastle', img: newcastle, score: 4}, 
            team2: { mark: "B6", name: 'Manchester City', img: mc, score: 3}
        }, 
        { 
            team1: { mark: "A7", name: 'Brighton', img: brighton, score: 3}, 
            team2: { mark: "A8", name: 'Fulham', img: fulham, score: 1}
        }, //
        { team1: { mark: "A1", img: newcastle, score: ''}, team2: { mark: "B2", img: westham, score: ''} }, 
        { team1: { mark: "A1", img: tottenham, score: ''}, team2: { mark: "B2", img: mc, score: ''} },
        { team1: { mark: "A1", img: brighton, score: ''}, team2: { mark: "B2", img: boormut, score: ''} }, 
        { team1: { mark: "A1", img: fulham, score: ''}, team2: { mark: "B2", img: brighton, score: ''} },
    ],
    "1/4": [
        { 
            team1: { mark: "A1", name: 'Burnley' ,img: burnley, score: 1}, 
            team2: { mark: "A4", name: 'Manchester United', img: mu, score: 0}
        }, 
        { 
            team1: { mark: "A5", name: 'Newcastle', img: newcastle, score: 2}, 
            team2: { mark: "A7", name: 'Brighton', img: brighton, score: 1}
        },
        { team1: { mark: "A1", img: luton, score: ''}, team2: { mark: "B2", img: brandford, score: ''} }, 
        { team1: { mark: "A1", img: mu, score: ''}, team2: { mark: "B2", img: nottingham, score: ''} }, 
    ],
    "1/2": [
        { 
            team1: { mark: "A1", name: 'Burnley' ,img: burnley, score: 3}, 
            team2: { mark: "A5", name: 'Newcastle', img: newcastle, score: 1},
        }, 
        { team1: { mark: "A1", img: wolverhamptom, score: ''}, team2: { mark: "B2", img: chelsea, score: ''} },
    ],
    "final": [
        { 
            team1: { mark: "A1", name: 'Burnley', img: burnley, score: 3}, 
            team2: { mark: "B2", name: 'Shefield', img: shefield, score: 1} 
        }
    ],
    
};