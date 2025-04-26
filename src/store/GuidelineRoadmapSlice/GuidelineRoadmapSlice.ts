import {PayloadAction, createSlice} from '@reduxjs/toolkit'


interface GuidelineRoadmapState {
    isActive: boolean,
    currentDesktopStep: number,
    currentMobileStep: number
    stepText: string,
    isStartRoadmap: boolean,
    educationOffer: boolean,
    mobileStepText: string,
    interactiveRoadpap: {
        currentInteractivePathStep: number,
        sparkline: {
            isActive: boolean,
            step: number
        },
        championship: {
            isActive: boolean,
            step: number
        },
        informationTabs: {
            isActive: boolean,
            step: number
        },
        recentGames: {
            isActive: boolean,
            step: number
        }
    }
}

type interactivePaths = 'sparkline' | 'championshipTable' | 'informationTabs' | 'recentGames'

const initialState: GuidelineRoadmapState = {
    isActive: false,
    isStartRoadmap: false,
    currentDesktopStep: 0,
    currentMobileStep: 0,
    educationOffer: true,
    stepText: '',
    mobileStepText: '',
    interactiveRoadpap: {
        currentInteractivePathStep: 0,
        sparkline: {
            isActive: false,
            step: 0
        },
        championship: {
            isActive: false,
            step: 0
        },
        informationTabs: {
            isActive: false,
            step: 0
        },
        recentGames: {
            isActive: false,
            step: 0
        }
    }
}

export type stepType = 'mobile' | 'desktop'

const guidelineRoadmapSlice = createSlice({
    name: 'guidelineRoadmap',
    initialState,
    reducers: {
        activateGuidelineMode: (state) => {
            state.isActive = true
        },
        disableGuidelineMode: (state) => {
            state.isActive = false
        },
        startRoadmap: (state) => {
            state.isStartRoadmap = true
        },
        disableRoadmap: (state) => {
            state.isStartRoadmap = false
        },
        nextStep: (state, action: PayloadAction<stepType>) => {
            if (action.payload === 'desktop') {
                state.currentDesktopStep +=1
            } else {
                state.currentMobileStep +=1
            }
        },
        prevStep: (state, action: PayloadAction<stepType>) => {
            if (action.payload === 'desktop') {
                state.currentDesktopStep -=1
            } else {
                state.currentMobileStep -=1
            }
        },
        skipAll: (state, action: PayloadAction<stepType>) => {
            if (action.payload === 'desktop') {
                state.currentDesktopStep = 0
            } else state.currentMobileStep = 0
        },
        setCurrentStepText: (state, action: PayloadAction<string>) => {
            state.stepText = action.payload
        },
        setMobileCurrentStepText: (state, action: PayloadAction<string>) => {
            state.mobileStepText = action.payload
        },
        disableEducationOffer:(state) => {
            state.educationOffer = false
        },
        enableEducationOffer:(state) => {
            state.educationOffer = true
        },
        setCurrentInteractivePath: (state, action: PayloadAction<interactivePaths>) => {
            switch (action.payload) {
                case 'sparkline': state.interactiveRoadpap.currentInteractivePathStep = state.interactiveRoadpap.sparkline.step
                                    state.interactiveRoadpap.sparkline.isActive = true
                    break;
                case 'championshipTable': state.interactiveRoadpap.currentInteractivePathStep = state.interactiveRoadpap.championship.step
                                state.interactiveRoadpap.championship.isActive = true
                    break;
                case 'informationTabs': state.interactiveRoadpap.currentInteractivePathStep = state.interactiveRoadpap.informationTabs.step
                            state.interactiveRoadpap.informationTabs.isActive = true

            }
        },
        setNextIneractiveStep: (state, action: PayloadAction<interactivePaths>) => {
            switch (action.payload) {
                case 'sparkline': state.interactiveRoadpap.sparkline.step += 1
                                    state.interactiveRoadpap.currentInteractivePathStep +=1 
                    break;
                case 'championshipTable': state.interactiveRoadpap.championship.step += 1
                                    state.interactiveRoadpap.currentInteractivePathStep +=1 
                    break;
                case 'informationTabs': state.interactiveRoadpap.informationTabs.step += 1
                state.interactiveRoadpap.currentInteractivePathStep +=1 

            }
        },
        disableInteractiveRoadmap: (state) => {
            state.interactiveRoadpap.sparkline.isActive = false
            state.interactiveRoadpap.championship.isActive = false
            state.interactiveRoadpap.informationTabs.isActive = false
            state.interactiveRoadpap.recentGames.isActive = false
            state.interactiveRoadpap.sparkline.step = 0
            state.interactiveRoadpap.championship.step = 0
            state.interactiveRoadpap.informationTabs.step = 0
            state.interactiveRoadpap.recentGames.step = 0
            state.interactiveRoadpap.currentInteractivePathStep = 0
            
        }
    }
})

export const {skipAll, nextStep, prevStep, activateGuidelineMode, startRoadmap, disableRoadmap, setCurrentStepText, setMobileCurrentStepText, disableGuidelineMode, disableEducationOffer, enableEducationOffer, setCurrentInteractivePath, setNextIneractiveStep, disableInteractiveRoadmap} = guidelineRoadmapSlice.actions
export default guidelineRoadmapSlice.reducer