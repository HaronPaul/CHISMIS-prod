import { createSlice } from "@reduxjs/toolkit";

const errorSlice = createSlice({
    name: "error",
    initialState: {
        controlRoomErrors: [],
        hclErrors: [],
        evapErrors: [],
        prBrineErrors: [],
        electroErrors: [],
        nacloErrors: [],
        qcBrineErrors: [],
        usagesErrors: [],
        evalErrors: [],
        shiftReportErrors: []
    },
    reducers: {
        addErrors: (state, action) => {
            state.controlRoomErrors = [...action.payload.controlRoomErrors]
            state.hclErrors = [...action.payload.hclErrors]
            state.evapErrors = [...action.payload.evapErrors]
            state.prBrineErrors = [...action.payload.prBrineErrors]
            state.electroErrors = [...action.payload.electroErrors]
            state.nacloErrors = [...action.payload.nacloErrors]
            state.qcBrineErrors = [...action.payload.qcBrineErrors]
            state.usagesErrors = [...action.payload.usagesErrors]
            state.evalErrors = [...action.payload.evalErrors]
            state.shiftReportErrors = [...action.payload.shiftReportErrors]
        },
    }
})

export const {addErrors} = errorSlice.actions;
export default errorSlice.reducer;