import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import blogSlice from './slices/blogSlice'

export const store = configureStore({
  reducer: {
    auth:authSlice,
    blogs:blogSlice
  },
})