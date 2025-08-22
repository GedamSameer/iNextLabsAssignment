import { configureStore } from '@reduxjs/toolkit'
import messagesReducer from './messagesSlice'

const PERSIST_KEY = 'assist-chat-v1'

function loadState(){
  try{
    const raw = localStorage.getItem(PERSIST_KEY)
    return raw ? JSON.parse(raw) : undefined
  }catch{ return undefined }
}

export const store = configureStore({
  reducer: {
    messages: messagesReducer
  },
  preloadedState: loadState()
})

store.subscribe(() => {
  try{
    localStorage.setItem(PERSIST_KEY, JSON.stringify(store.getState()))
  }catch{}
})
