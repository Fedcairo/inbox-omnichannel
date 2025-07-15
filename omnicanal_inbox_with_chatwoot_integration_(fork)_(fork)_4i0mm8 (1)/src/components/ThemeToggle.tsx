import { Moon, Sun } from 'lucide-react'
import { useStore } from '../store'

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useStore()
  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="p-2 rounded-full hover:bg-[var(--surface)]"
    >
      {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  )
}

export default ThemeToggle
