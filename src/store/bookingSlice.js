import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    status: false,
    bookingData: {
        journeyDate:null
    }
}

const bookingSlice = createSlice ({
    name: "booking",
    initialState,
    reducers: {
        booking: (state, action) => {
            state.status = true;
            state.bookingData = action.payload;
        },
        cancelletion : (state) => {
            state.status = false;
            state.bookingData = null;
        }
    }
})

export const {booking, cancelletion} = bookingSlice.actions;
export default bookingSlice.reducer;