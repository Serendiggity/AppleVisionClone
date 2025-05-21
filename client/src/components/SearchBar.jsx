import { useState } from 'react';
import { Search } from 'lucide-react';

/**
 * @component SearchBar
 * @description Vision OS inspired search input with glass effect
 */
const SearchBar = ({ placeholder = "Search...", onSearch }) => {
  const [query, setQuery] = useState('');
  
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    if (onSearch) {
      onSearch(value);
    }
  };
  
  return (
    <div className="relative glass-thin rounded-full w-full max-w-md overflow-hidden backdrop-blur-sm" style={{ background: 'rgba(255, 255, 255, 0.08)' }}>
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-white/70" />
      </div>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="bg-transparent border-none w-full h-10 pl-10 pr-4 text-white/90 placeholder:text-white/50 focus:outline-none focus:ring-0"
        style={{ caretColor: 'rgba(255, 255, 255, 0.9)' }}
      />
      {query && (
        <button 
          onClick={() => {
            setQuery('');
            if (onSearch) onSearch('');
          }}
          className="absolute inset-y-0 right-3 flex items-center text-white/60 hover:text-white/90"
        >
          <span className="text-sm">Clear</span>
        </button>
      )}
    </div>
  );
};

export default SearchBar;