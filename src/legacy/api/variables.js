export const API_VARIABLES = {
    // BASE_PATH: 'https://sportwix.com',
    BASE_PATH: 'https://dev.sportwix.susi-susi.site',
    BASE_PATH: 'https://dev.sportwix.susi-susi.site',
    API: 'api',
    V1: 'v1',
    EVENTS: 'events',
    NEWS: 'news',
    REGISTER: '/api/auth/register/',
    TEAM: 'team',
    EVENT: 'event',
    REGISTER: 'auth/register',
    JWTTOKEN: 'token',
    TIPS: 'chapters',
    // ALT_DEV_PATH: 'https://dev.sportwix.susi-susi.site'
}

// BASE_PATH: 'https://dev.chart-sports.com',


const {BASE_PATH, API, V1, EVENTS} = API_VARIABLES

export const ENGLISH_PREMIER_LEAGUE = '2694d35e-c157-4497-9957-56f4e93ab7bb'
export const LA_LIGA = '94497550-7f1a-4aef-91bf-ffcd6f67fc77'
export const EURO = 'b6b0d1b3-87b0-4431-9305-7a4e377062bb'

export const GET_PREMIER_LEAGUE_DATA = `${BASE_PATH}/${API}/${V1}/${EVENTS}/${ENGLISH_PREMIER_LEAGUE}/2023-2024`
export const GET_LA_LIGA_DATA = `${BASE_PATH}/${API}/${V1}/${EVENTS}/${LA_LIGA}/2023-2024`
export const GET_EURO_2024 =  `${BASE_PATH}/${API}/${V1}/${EVENTS}/${EURO}/2024`


export const BUNDESLIGA = '63b8139a-fd50-4f56-b701-dd6ff5fe0d7d'
export const SERIA_A = '7ccf28b5-fb63-4d87-acaf-793ac7cd1f88'

export const SEASONS = {
    '2022-2023': '2022-2023'
}
export const IMG_PATH = 'https://dev.sportwix.susi-susi.site'
// export const IMG_PATH = 'https://dev.chart-sports.com'