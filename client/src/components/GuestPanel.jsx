import { useState } from 'react';
import { Users, Search, CheckCircle, Circle } from 'lucide-react';
import { panel, button, text } from '../styles/tokens';

/**
 * @component GuestPanel
 * @description Guest management panel
 * @token panel - For panel styling
 * @token button.primary - For button styling
 * @token text.primary - For primary text
 * @token text.secondary - For secondary text
 */
const GuestPanel = () => {
  const [guestSearch, setGuestSearch] = useState('');
  const [guests, setGuests] = useState([
    { id: 1, name: 'John & Sarah Smith', count: 4, status: 'confirmed' },
    { id: 2, name: 'Michael Johnson', count: 1, status: 'confirmed' },
    { id: 3, name: 'Alexis & David Wong', count: 3, status: 'pending' },
    { id: 4, name: 'Emma Rodriguez', count: 2, status: 'confirmed' },
  ]);
  
  // Count confirmed guests
  const confirmedCount = guests.reduce((acc, guest) => 
    guest.status === 'confirmed' ? acc + guest.count : acc, 0);
  
  // Count total guests
  const totalCount = guests.reduce((acc, guest) => acc + guest.count, 0);
  
  // Filter guests based on search
  const filteredGuests = guests.filter(guest => 
    guest.name.toLowerCase().includes(guestSearch.toLowerCase())
  );
  
  return (
    <div className="glass-thin vision-radius vision-shadow p-6 col-span-12 md:col-span-6 lg:col-span-8 motion-hover">
      <h2 className="text-xl font-semibold text-primary flex items-center">
        <Users className="w-5 h-5 mr-2" /> Guest List
      </h2>
      
      <div className="mt-4">
        <div className="glass-regular rounded-xl flex items-center p-2 mb-4">
          <Search className="w-5 h-5 ml-2" />
          <input 
            type="text" 
            placeholder="Search guests..." 
            className="bg-transparent border-none w-full pl-2 focus:ring-0 text-primary placeholder:text-white/50"
            value={guestSearch}
            onChange={(e) => setGuestSearch(e.target.value)}
          />
        </div>
        
        <div className="flex justify-between mb-3">
          <span className="text-primary">{confirmedCount} confirmed</span>
          <span className="text-secondary">{totalCount} total</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[220px] overflow-y-auto pr-2">
          {filteredGuests.map((guest) => (
            <div 
              key={guest.id}
              className="glass-regular rounded-xl p-3 flex justify-between items-center"
            >
              <div>
                <div className="text-primary font-medium">{guest.name}</div>
                <div className="text-secondary text-sm">
                  {guest.count} guest{guest.count !== 1 ? 's' : ''} • {guest.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                </div>
              </div>
              <div>
                {guest.status === 'confirmed' ? 
                  <CheckCircle className="w-5 h-5" /> : 
                  <Circle className="w-5 h-5" />
                }
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <button className="mt-4 w-full glass-regular py-2 rounded-xl text-primary motion-hover">
        Add Guest
      </button>
    </div>
  );
};

export default GuestPanel;
