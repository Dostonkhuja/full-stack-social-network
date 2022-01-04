import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const guestsSlice = createSlice({
    name: 'GuestsSlice',
    initialState: {
        guests:[],
        allNotSeenCount:0,
        allGuestCount:null
    },
    reducers: {
        setGuestsDefoult:(state,action)=>{
                state.guests =[]
                state.allNotSeenCount=0
        },
        setAllNotSeenCount:(state,action)=>{
            state.allNotSeenCount=0
        }
    },
    extraReducers: {
        ['guest/guestNotification']: (state, action) => {
            state.allNotSeenCount = action.payload.allNotSeenCount
            state.allGuestCount = action.payload.allGuestCount
        },
        ['guests/guests']: (state, action) => {
            state.guests = [...state.guests,...action.payload.guests]
            state.allNotSeenCount = state.allNotSeenCount - action.payload.wasSeenCount
        },
        ['guests/NewGuest']: (state, action) => {
                    state.allNotSeenCount = action.payload.allNotSeenCount
        }
    }
})

export default guestsSlice.reducer
export const {setGuestsDefoult,setAllNotSeenCount} = guestsSlice.actions