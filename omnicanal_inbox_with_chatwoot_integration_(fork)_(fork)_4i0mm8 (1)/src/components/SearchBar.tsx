import { Search } from 'lucide-react'
import { useStore } from '../store'

const SearchBar: React.FC = () => {
  const { searchQuery, setSearchQuery } = useStore()

  return (
    <div className="p-4 border-b border-[var(--border)]">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--text-secondary)]" size={20} />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search conversations..."
          className="w-full pl-10 p-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--text-primary)]"
        />
      </div>
    </div>
  )
}

export default SearchBar
