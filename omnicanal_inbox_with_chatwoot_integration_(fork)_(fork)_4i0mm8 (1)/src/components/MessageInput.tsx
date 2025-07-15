import { useState } from 'react'
import { useStore } from '../store'
import { Send } from 'lucide-react'

const MessageInput: React.FC = () => {
  const { selectedConversation, sendMessage } = useStore()
  const [content, setContent] = useState('')

  const handleSend = () => {
    if (selectedConversation && content.trim()) {
      sendMessage(selectedConversation, content)
      setContent('')
    }
  }

  return (
    <div className="flex flex-1 items-center gap-2">
      <input
        type="text"
        value={content}
        onChange={e => setContent(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleSend()}
        placeholder="Type your message..."
        className="flex-1 p-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--text-primary)]"
      />
      <button onClick={handleSend} className="semi-neon-btn p-2 rounded-lg">
        <Send size={20} />
      </button>
    </div>
  )
}

export default MessageInput
