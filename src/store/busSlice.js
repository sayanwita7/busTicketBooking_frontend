import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    status: false,
    busData: {
        busId: null,
        busCapacity: null,
        busDepart: null,
        busPrice:null, 
        start:null,
        stop:null,
        busName: null,
        busNumber:null
    }
}

const busSlice = createSlice ({
    name: "bus",
    initialState,
    reducers: {
        currentBus: (state, action) => {
            state.status = true;
            state.busData = action.payload.busData;
        }
    }
})

export const {currentBus} = busSlice.actions;
export default busSlice.reducer;