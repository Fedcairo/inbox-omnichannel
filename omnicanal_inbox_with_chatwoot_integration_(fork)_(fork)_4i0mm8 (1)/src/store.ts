import { create } from 'zustand'
import axios from 'axios'

const CHATWOOT_CONFIG = {
  baseURL: 'https://devchatwoot.aivence.com/api/v1',
  apiKey: 'nZhTYqBV3E5TUnmRcddoEnSU',
  accountId: '1',
  headers: {
    'api_access_token': 'nZhTYqBV3E5TUnmRcddoEnSU',
    'Content-Type': 'application/json'
  }
}

export type Conversation = {
  id: number
  account_id: number
  inbox_id: number
  status: string
  unread_count: number
  contact: {
    id: number
    name: string
    email: string
    phone_number: string
    avatar_url: string
  }
  inbox: {
    id: number
    name: string
    channel_type: string
  }
  messages: Message[]
}

export type Message = {
  id: number
  content: string
  message_type: 'incoming' | 'outgoing'
  created_at: string
  sender: {
    name: string
    avatar_url: string
  }
  attachments: { file_type: string; data_url: string }[]
}

type State = {
  conversations: Conversation[]
  selectedConversation: number | null
  messages: Message[]
  loading: boolean
  error: string | null
  theme: 'light' | 'dark'
  selectedChannel: string
  searchQuery: string
  setSelectedConversation: (id: number | null) => void
  fetchConversations: () => Promise<void>
  fetchMessages: (conversationId: number) => Promise<void>
  sendMessage: (conversationId: number, content: string) => Promise<void>
  setTheme: (theme: 'light' | 'dark') => void
  setSelectedChannel: (channel: string) => void
  setSearchQuery: (query: string) => void
  pauseAgent: (conversationId: number) => Promise<void>
  resumeAgent: (conversationId: number) => Promise<void>
}

export const useStore = create<State>((set, get) => ({
  conversations: [],
  selectedConversation: null,
  messages: [],
  loading: false,
  error: null,
  theme: 'light',
  selectedChannel: 'all',
  searchQuery: '',
  setSelectedConversation: (id) => set({ selectedConversation: id }),
  setTheme: (theme) => set({ theme }),
  setSelectedChannel: (channel) => set({ selectedChannel: channel }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  fetchConversations: async () => {
    set({ loading: true, error: null })
    try {
      const response = await axios.get(
        `${CHATWOOT_CONFIG.baseURL}/accounts/${CHATWOOT_CONFIG.accountId}/conversations`,
        { headers: CHATWOOT_CONFIG.headers }
      )
      set({ conversations: response.data.data || [] })
    } catch (err) {
      set({ error: 'Failed to fetch conversations' })
    } finally {
      set({ loading: false })
    }
  },
  fetchMessages: async (conversationId) => {
    set({ loading: true, error: null })
    try {
      const response = await axios.get(
        `${CHATWOOT_CONFIG.baseURL}/accounts/${CHATWOOT_CONFIG.accountId}/conversations/${conversationId}/messages`,
        { headers: CHATWOOT_CONFIG.headers }
      )
      set({ messages: response.data.data || [] })
    } catch (err) {
      set({ error: 'Failed to fetch messages' })
    } finally {
      set({ loading: false })
    }
  },
  sendMessage: async (conversationId, content) => {
    try {
      await axios.post(
        `${CHATWOOT_CONFIG.baseURL}/accounts/${CHATWOOT_CONFIG.accountId}/conversations/${conversationId}/messages`,
        { content },
        { headers: CHATWOOT_CONFIG.headers }
      )
      const { fetchMessages } = get()
      fetchMessages(conversationId)
    } catch (err) {
      set({ error: 'Failed to send message' })
    }
  },
  pauseAgent: async (conversationId) => {
    try {
      await fetch('/api/webhook/pause', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversation_id: conversationId })
      })
    } catch (err) {
      set({ error: 'Failed to pause agent' })
    }
  },
  resumeAgent: async (conversationId) => {
    try {
      await fetch('/api/webhook/resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversation_id: conversationId })
      })
    } catch (err) {
      set({ error: 'Failed to resume agent' })
    }
  }
}))
