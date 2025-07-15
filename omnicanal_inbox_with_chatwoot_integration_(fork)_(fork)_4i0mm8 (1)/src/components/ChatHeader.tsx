import { useStore } from '../store'
import { Phone, Mail } from 'lucide-react'

const ChatHeader: React.FC = () => {
  const { conversations, selectedConversation } = useStore()
  const conv = conversations.find(c => c.id === selectedConversation)
  if (!conv) return null

  return (
    <div className="p-4 border-b border-[var(--border)] flex items-center gap-3">
      <img src={conv.contact.avatar_url} alt="" className="w-10 h-10 rounded-full relative">
        <span className="green-dot" />
      </img>
      <div className="flex-1">
        <div className="font-medium">{conv.contact.name}</div>
        <div className="text-sm text-[var(--text-secondary)] flex gap-2">
          {conv.contact.phone_number && <span className="flex items-center gap-1"><Phone size={14} /> {conv.contact.phone_number}</span>}
          {conv.contact.email && <span className="flex items-center gap-1"><Mail size={14} /> {conv.contact.email}</span>}
        </div>
      </div>
    </div>
  )
}

export default ChatHeader
