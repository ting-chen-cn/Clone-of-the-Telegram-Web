import { createSlice } from '@reduxjs/toolkit'

export const threadSlice = createSlice({
  name: 'thread',
  initialState: {
    thread: null
  },
  reducers: {
    setThread: (state,action) => {
      state.thread = action.payload.data
    },
  },
})

export const { setThread } = threadSlice.actions
export const selectThread =state => state.thread.thread

export default threadSlice.reducer
