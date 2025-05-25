import {configureStore} from '@reduxjs/toolkit';
import authSlice from '../store/authSlice.js';
import busSlice from '../store/busSlice.js'
import bookingSlice from '../store/bookingSlice.js'
const store = configureStore({
    reducer: {
        auth: authSlice,
        bus: busSlice,
        booking: bookingSlice
    }
});

export default store;