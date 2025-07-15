import { useStore, type Conversation } from '../store'

type Props = { conversation: Conversation }

const ConversationItem: React.FC<Props> = ({ conversation }) => {
  const { selectedConversation, setSelectedConversation } = useStore()
  const isSelected = selectedConversation === conversation.id

  return (
    <div
      onClick={() => setSelectedConversation(conversation.id)}
      className={`p-4 border-b border-[var(--border)] cursor-pointer hover:bg-[var(--surface)] ${isSelected ? 'bg-[var(--surface)]' : ''}`}
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <img src={conversation.contact.avatar_url} alt="" className="w-10 h-10 rounded-full" />
          <span className="green-dot" />
        </div>
        <div className="flex-1">
          <div className="font-medium">{conversation.contact.name}</div>
          <div className="text-sm text-[var(--text-secondary)] truncate">
            {conversation.messages[conversation.messages.length - 1]?.content || 'No messages'}
          </div>
        </div>
        {conversation.unread_count > 0 && (
          <span className="bg-[var(--primary-light)] text-white text-xs px-2 py-1 rounded-full">
            {conversation.unread_count}
          </span>
        )}
      </div>
    </div>
  )
}

export default ConversationItem
