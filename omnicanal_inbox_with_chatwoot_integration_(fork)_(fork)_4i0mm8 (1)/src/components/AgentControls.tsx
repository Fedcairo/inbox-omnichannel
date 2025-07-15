import { useStore } from '../store'
import { PauseCircle, PlayCircle } from 'lucide-react'

const AgentControls: React.FC = () => {
  const { selectedConversation, pauseAgent, resumeAgent } = useStore()
  // Assume paused state from somewhere; for now, use a placeholder. In real, track per conversation.
  const isPaused = false // Replace with actual state tracking

  if (!selectedConversation) return null

  return (
    <button
      onClick={() => isPaused ? resumeAgent(selectedConversation) : pauseAgent(selectedConversation)}
      className="ml-2 semi-neon-btn p-2 rounded-lg flex items-center gap-1"
    >
      {isPaused ? <PlayCircle size={20} /> : <PauseCircle size={20} />}
      {isPaused ? 'Resume Agent' : 'Pause Agent'}
    </button>
  )
}

export default AgentControls
