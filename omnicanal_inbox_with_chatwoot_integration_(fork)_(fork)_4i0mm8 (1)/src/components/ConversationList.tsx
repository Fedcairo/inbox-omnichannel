import { useStore } from '../store'
import ConversationItem from './ConversationItem'
import { Loader2 } from 'lucide-react'

const ConversationList: React.FC = () => {
  const { conversations, loading, error, selectedChannel, searchQuery } = useStore()

  const filteredConversations = conversations.filter(conv => {
    const channelMatch = selectedChannel === 'all' || conv.inbox.channel_type.toLowerCase().includes(selectedChannel)
    const searchMatch = conv.contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (conv.messages[conv.messages.length - 1]?.content || '').toLowerCase().includes(searchQuery.toLowerCase())
    return channelMatch && searchMatch
  })

  if (loading) return <div className="flex justify-center p-4"><Loader2 className="animate-spin" /></div>
  if (error) return <div className="p-4 text-red-500">{error}</div>
  if (filteredConversations.length === 0) return <div className="p-4 text-[var(--text-secondary)] text-center">No conversations found</div>

  return (
    <div className="overflow-y-auto flex-1">
      {filteredConversations.map(conv => (
        <ConversationItem key={conv.id} conversation={conv} />
      ))}
    </div>
  )
}

export default ConversationList
