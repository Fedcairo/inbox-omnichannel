import { useEffect } from 'react'
import { useStore } from './store'
import ChannelTabs from './components/ChannelTabs'
import ConversationList from './components/ConversationList'
import ChatHeader from './components/ChatHeader'
import MessageArea from './components/MessageArea'
import MessageInput from './components/MessageInput'
import ThemeToggle from './components/ThemeToggle'
import AgentControls from './components/AgentControls'
import SearchBar from './components/SearchBar'

const App: React.FC = () => {
  const { selectedConversation, fetchConversations, fetchMessages, theme, setTheme } = useStore()

  useEffect(() => {
    fetchConversations()
    const interval = setInterval(fetchConversations, 10000)
    return () => clearInterval(interval)
  }, [fetchConversations])

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation)
      const msgInterval = setInterval(() => fetchMessages(selectedConversation), 10000)
      return () => clearInterval(msgInterval)
    }
  }, [selectedConversation, fetchMessages])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-1/4 border-r border-[var(--border)] flex flex-col">
        <div className="p-4 flex justify-between items-center border-b border-[var(--border)]">
          <ChannelTabs />
          <ThemeToggle />
        </div>
        <SearchBar />
        <ConversationList />
      </div>
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            <ChatHeader />
            <MessageArea />
            <div className="p-4 border-t border-[var(--border)] flex items-center">
              <MessageInput />
              <AgentControls />
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-[var(--text-secondary)]">
            Select a conversation to start chatting
          </div>
        )}
      </div>
    </div>
  )
}

export default App
