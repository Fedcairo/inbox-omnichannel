import { useStore } from '../store'
import { FaWhatsapp, FaInstagram, FaFacebook, FaEnvelope, FaCommentAlt } from 'react-icons/fa'

const CHANNELS = {
  all: { name: 'All', color: '#667085', icon: null },
  whatsapp: { name: 'WhatsApp', color: '#25D366', icon: FaWhatsapp },
  instagram: { name: 'Instagram', color: '#E4405F', icon: FaInstagram },
  facebook: { name: 'Facebook', color: '#1877F2', icon: FaFacebook },
  email: { name: 'Email', color: '#EA4335', icon: FaEnvelope },
  web: { name: 'Web Chat', color: '#667085', icon: FaCommentAlt }
}

const ChannelTabs: React.FC = () => {
  const { selectedChannel, setSelectedChannel } = useStore()

  return (
    <div className="flex overflow-x-auto">
      {Object.entries(CHANNELS).map(([key, { name, color, icon: Icon }]) => (
        <button
          key={key}
          onClick={() => setSelectedChannel(key)}
          className={`px-4 py-2 flex items-center gap-2 whitespace-nowrap ${
            selectedChannel === key ? 'border-b-2 border-[var(--primary-light)] text-[var(--primary-light)]' : 'text-[var(--text-secondary)]'
          }`}
        >
          {Icon && <Icon color={color} />}
          {name}
        </button>
      ))}
    </div>
  )
}

export default ChannelTabs
