import { create } from 'zustand'
import { chat } from '../llm/index.ts'

interface Message {
  role: 'user' | 'assistant'
  message: string
}

interface ChatAreaStore {
  messagesList: Message[]
  addMessage: (message: string, role: 'user' | 'assistant') => void
  clearMessages: () => void
}

const useChatAreaStore = create<ChatAreaStore>((set, get) => ({
  messagesList: [],
  addMessage: (message, role) => {
    set(state => ({
      messagesList: [...state.messagesList, { role, message }]
    }))
    if(role === 'user'){
      chat([{ role, content: message }]).then(res => { 
        if(res.data) {
          set(state => ({
            messagesList: [...state.messagesList, { role: res.data.role, message: res.data.content }]
          }))
        }
      })
    }
  },
  clearMessages: () => set({ messagesList: [] })
}))

export default useChatAreaStore
