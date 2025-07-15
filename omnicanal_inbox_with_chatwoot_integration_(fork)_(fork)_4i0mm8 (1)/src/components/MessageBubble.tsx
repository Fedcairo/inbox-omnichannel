import { useStore, type Message } from '../store'
import { Bot, User } from 'lucide-react'

type Props = { message: Message }

const MessageBubble: React.FC<Props> = ({ message }) => {
  const isIncoming = message.message_type === 'incoming'
  const { conversations, selectedConversation } = useStore()
  const conv = conversations.find(c => c.id === selectedConversation)
  const avatar = isIncoming ? conv?.contact.avatar_url : message.sender.avatar_url
  const isWebhookResponse = false // Logic to determine if it's AI response; adjust based on actual detection

  return (
    <div className={`flex ${isIncoming ? 'justify-start' : 'justify-end'}`}>
      <div className={`max-w-[70%] ${isIncoming ? 'items-start' : 'items-end'}`}>
        {isIncoming && (
          <div className="relative mb-1">
            <img src={avatar} alt="" className="w-8 h-8 rounded-full" />
            <span className="green-dot" />
          </div>
        )}
        <div
          className={`p-3 rounded-lg ${
            isIncoming ? 'bg-[var(--surface)]' : 'bg-[var(--primary-light)] text-white'
          }`}
        >
          {message.content}
          {message.attachments.map((att, idx) => (
            <div key={idx} className="mt-2">
              {att.file_type.startsWith('image/') && <img src={att.data_url} alt="attachment" className="max-w-full rounded" />}
              {att.file_type.startsWith('audio/') && <audio controls src={att.data_url} />}
              {att.file_type.startsWith('video/') && <video controls src={att.data_url} className="max-w-full" />}
              {!att.file_type.startsWith('image/') && !att.file_type.startsWith('audio/') && !att.file_type.startsWith('video/') && (
                <a href={att.data_url} download className="text-blue-500">Download file</a>
              )}
            </div>
          ))}
        </div>
        {!isIncoming && (
          <div className="relative mt-1">
            <img src={avatar} alt="" className="w-8 h-8 rounded-full" />
            <span className={`${isWebhookResponse ? 'robot-indicator' : 'human-indicator'}`}>
              {isWebhookResponse ? <Bot size={12} /> : <User size={12} />}
            </span>
          </div>
        )}
        <div className="text-xs text-[var(--text-secondary)] mt-1">
          {new Date(message.created_at).toLocaleTimeString()}
        </div>
      </div>
    </div>
  )
}

export default MessageBubble
