import { useEffect, useRef } from 'react'
import { useStore } from '../store'
import MessageBubble from './MessageBubble'

const MessageArea: React.FC = () => {
  const { messages } = useStore()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[var(--background)]">
      {messages.length === 0 ? (
        <div className="text-center text-[var(--text-secondary)]">No messages yet</div>
      ) : (
        messages.map(msg => <MessageBubble key={msg.id} message={msg} />)
      )}
      <div ref={messagesEndRef} />
    </div>
  )
}

export default MessageArea
