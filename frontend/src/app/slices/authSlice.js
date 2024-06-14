import { createSlice } from '@reduxjs/toolkit'


export const authSlice = createSlice({
  name: 'auth',
  initialState:{
    user:null,
    profileUser:null
  },
  reducers: {
    setUser:(state,action)=>{
        state.user = action.payload
    },
    setProfileUser:(state,action)=>{
      state.profileUser = action.payload
    }
  },
})


export const { setUser,setProfileUser } = authSlice.actions

export default authSlice.reducer