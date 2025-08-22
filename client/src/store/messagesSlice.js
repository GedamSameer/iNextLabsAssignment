import { createSlice } from '@reduxjs/toolkit'
import { nanoid } from '../utils/uid'

const initialState = {
  items: [
    {
      id: nanoid(),
      role: 'assistant',
      text: 'Hi! I’m AssistAI. Ask me anything about the iNextLabs suite. You can also attach files.',
      createdAt: Date.now(),
      status: 'read'
    }
  ]
}

const slice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage(state, action){
      const { id, role, text, attachments } = action.payload
      state.items.push({ id, role, text, createdAt: Date.now(), status: 'sending', attachments })
    },
    setStatus(state, action){
      const { id, status } = action.payload
      const m = state.items.find(x => x.id === id)
      if (m) m.status = status
    },
    addAssistantReply(state, action){
      const { text } = action.payload
      state.items.push({ id: nanoid(), role:'assistant', text, createdAt: Date.now(), status:'read' })
    }
  }
})

export const { addMessage, setStatus, addAssistantReply } = slice.actions
export const selectMessages = s => s.messages.items
export default slice.reducer
