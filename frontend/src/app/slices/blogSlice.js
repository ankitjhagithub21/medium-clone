import { createSlice } from '@reduxjs/toolkit'


export const blogSlice = createSlice({
  name: 'blogs',
  initialState:{
    value:[],
    
  },
  reducers: {
    setBlogs:(state,action)=>{
        state.value = action.payload
    },
   
  },
})


export const { setBlogs } = blogSlice.actions

export default blogSlice.reducer