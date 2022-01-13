import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const AppSlice = createSlice({
    name: 'AppSlice',
    initialState: {
        currentPage:0
    },
    reducers: {
        setCurrentPage:(state,action)=>{
                state.currentPage = action.payload
        }
    },
    extraReducers: {}
})

export default AppSlice.reducer
export const {setCurrentPage } = AppSlice.actions 