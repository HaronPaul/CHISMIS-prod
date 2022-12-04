import { createSlice } from "@reduxjs/toolkit";
// import { controlRoom_values, hcl_values, evap_values, prBrine_values, electro_values, naclo_values, qcbrine_values, usages_values, eval_values} from "./tabStates";
import { controlRoom_values, hcl_values, evap_values, prBrine_values, electro_values, naclo_values,
    qcbrine_values, usages_values, eval_values} from "./randomTabStates";

const originalState = {
    currentSupervisor: 'Angielle Schnaider',
    manager: '',
    incomingSupervisor: '',
    date: '',
    shift: 1,
    signCount: 0,
    isComplete: false,
    controlRoomSection: controlRoom_values,
    hclSection: hcl_values,
    evapSection: evap_values,
    prBrineSection: prBrine_values,
    electroSection: electro_values,
    nacloSection: naclo_values,
    qcBrineSection: qcbrine_values,
    usagesSection: usages_values,
    evalSection: eval_values,
}


const sectionSlice = createSlice({
    name: "section",
    initialState: {
        currentSupervisor: '',
        manager: '',
        incomingSupervisor: '',
        date: null,
        shift: 1,
        signCount: 0,
        isComplete: false,
        controlRoomSection: controlRoom_values,
        hclSection: hcl_values,
        evapSection: evap_values,
        prBrineSection: prBrine_values,
        electroSection: electro_values,
        nacloSection: naclo_values,
        qcBrineSection: qcbrine_values,
        usagesSection: usages_values,
        evalSection: eval_values,
    },
    reducers: { 
        addControlRoom: (state, action) => { state.controlRoomSection[`${action.payload.name}`] = action.payload.value;},
        addHcl: (state, action) => { state.hclSection[`${action.payload.name}`] = action.payload.value;},
        addEvap: (state, action) => {state.evapSection[`${action.payload.name}`] = action.payload.value},
        addPrBrine: (state, action) => {state.prBrineSection[`${action.payload.name}`] = action.payload.value},
        addElectro: (state, action) => {state.electroSection[`${action.payload.name}`] = action.payload.value},
        addNaocl: (state,action) => {state.nacloSection[`${action.payload.name}`] = action.payload.value},
        addQcbrine: (state, action) => {state.qcBrineSection[`${action.payload.name}`] = action.payload.value},
        addUsages: (state,action) => {state.usagesSection[`${action.payload.name}`] = action.payload.value},
        addEval: (state,action) => {state.evalSection[`${action.payload.name}`] = action.payload.value},
        changeShift: (state, action) => {state.shift = action.payload },
        changeDate: (state, action) => {state.date = action.payload },
        changeSupervisor: (state, action) => {state.currentSupervisor = action.payload},
        changeNextSupervisor: (state, action) => {state.incomingSupervisor = action.payload},
        resetState: () => originalState,
        retrieveState: (state, action) => action.payload
    }
})

export const {
    addControlRoom, 
    addHcl, 
    addEvap, 
    addPrBrine, 
    addElectro, 
    addNaocl, 
    addQcbrine, 
    addUsages, 
    addEval, 
    changeShift, 
    changeDate,
    changeSupervisor,
    changeNextSupervisor,
    resetState,
    retrieveState } = sectionSlice.actions
export default sectionSlice.reducer