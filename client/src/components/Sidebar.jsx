import { Home, Calendar, DollarSign, Users, UserCircle } from 'lucide-react';
import { motion } from '../styles/tokens';

/**
 * @component Sidebar
 * @description Fixed sidebar with icon navigation
 * @token glass.regular - For glass transparency effect
 * @token radius - For border radius
 * @token shadow - For drop shadow
 * @token motion.hover - For hover animation
 */
const Sidebar = ({ openSettings }) => {
  return (
    <aside className="glass-regular vision-radius vision-shadow fixed left-4 top-1/2 -translate-y-1/2 p-2 flex flex-col gap-4 z-10">
      <button className="w-14 h-14 flex items-center justify-center rounded-2xl hover:bg-white/10 motion-hover">
        <Home className="w-6 h-6" />
      </button>
      <button className="w-14 h-14 flex items-center justify-center rounded-2xl hover:bg-white/10 motion-hover">
        <Calendar className="w-6 h-6" />
      </button>
      <button className="w-14 h-14 flex items-center justify-center rounded-2xl hover:bg-white/10 motion-hover">
        <DollarSign className="w-6 h-6" />
      </button>
      <button className="w-14 h-14 flex items-center justify-center rounded-2xl hover:bg-white/10 motion-hover">
        <Users className="w-6 h-6" />
      </button>
      <div className="flex-grow"></div>
      <button 
        className="w-14 h-14 flex items-center justify-center rounded-2xl hover:bg-white/10 motion-hover"
        onClick={openSettings}
      >
        <div className="w-8 h-8 rounded-full bg-white/20 overflow-hidden flex items-center justify-center">
          <UserCircle className="w-6 h-6" />
        </div>
      </button>
    </aside>
  );
};

export default Sidebar;
