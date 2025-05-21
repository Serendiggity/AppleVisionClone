import { useState } from 'react';
import { Home, Calendar, DollarSign, Users, UserCircle, PlayCircle, Grid2X2, Radio } from 'lucide-react';
import { motion } from '../styles/tokens';

/**
 * @component Sidebar
 * @description Vision OS styled sidebar with icon navigation
 * @token glass.regular - For glass transparency effect
 * @token radius - For border radius
 * @token shadow - For drop shadow
 * @token motion.hover - For hover animation
 */
const Sidebar = ({ openSettings }) => {
  const [activeIcon, setActiveIcon] = useState('home');
  
  const handleIconClick = (iconName) => {
    setActiveIcon(iconName);
  };
  
  const renderIcon = (name, Icon, isActive = false) => (
    <button 
      className={`w-11 h-11 flex items-center justify-center rounded-full transition-all duration-300
        ${isActive ? 'bg-white/18 shadow-sm text-white' : 'text-white/70 hover:text-white/90'}`}
      onClick={() => handleIconClick(name)}
    >
      <Icon className={`${isActive ? 'w-5 h-5' : 'w-5 h-5'}`} />
      
      {/* Active glow effect */}
      {isActive && (
        <div className="absolute w-full h-full rounded-full bg-white/5 blur-sm -z-10"></div>
      )}
    </button>
  );
  
  return (
    <aside 
      className="glass-regular fixed left-4 top-1/2 -translate-y-1/2 p-3 flex flex-col items-center gap-5 z-10 rounded-full"
      style={{ 
        backdropFilter: 'blur(20px)', 
        background: 'rgba(255, 255, 255, 0.08)',
        boxShadow: 'var(--vision-shadow)'
      }}
    >
      <div className="w-10 h-10 mb-2 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full bg-white/12 flex items-center justify-center">
          <PlayCircle className="w-5 h-5 text-white/90" />
        </div>
      </div>
      
      <div className="w-[1px] h-4 bg-white/10"></div>
      
      {renderIcon('home', Home, activeIcon === 'home')}
      {renderIcon('calendar', Calendar, activeIcon === 'calendar')}
      {renderIcon('budget', DollarSign, activeIcon === 'budget')}
      {renderIcon('guests', Users, activeIcon === 'guests')}
      
      <div className="w-[1px] h-4 bg-white/10"></div>
      
      {renderIcon('grid', Grid2X2, activeIcon === 'grid')}
      {renderIcon('radio', Radio, activeIcon === 'radio')}
      
      <div className="flex-grow"></div>
      
      <button 
        className="w-10 h-10 rounded-full bg-white/12 flex items-center justify-center motion-hover"
        onClick={openSettings}
      >
        <UserCircle className="w-6 h-6 text-white/90" />
      </button>
    </aside>
  );
};

export default Sidebar;
