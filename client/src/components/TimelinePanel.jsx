import { useState } from 'react';
import { Calendar, CheckSquare, Square } from 'lucide-react';
import { panel, button, text } from '../styles/tokens';

/**
 * @component TimelinePanel
 * @description Timeline task management panel
 * @token panel - For panel styling
 * @token button.primary - For button styling
 * @token text.primary - For primary text
 * @token text.secondary - For secondary text
 */
const TimelinePanel = () => {
  const [timelineItems, setTimelineItems] = useState([
    { id: 1, task: 'Book venue', status: 'completed', date: 'March 15' },
    { id: 2, task: 'Choose caterer', status: 'completed', date: 'April 2' },
    { id: 3, task: 'Send invitations', status: 'pending', dueIn: 14 },
    { id: 4, task: 'Finalize menu', status: 'pending', dueIn: 30 },
  ]);
  
  return (
    <div className="glass-thin vision-radius vision-shadow p-6 col-span-12 lg:col-span-4 motion-hover">
      <h2 className="text-xl font-semibold text-primary flex items-center">
        <Calendar className="w-5 h-5 mr-2" /> Timeline
      </h2>
      
      <div className="mt-4 space-y-4">
        {timelineItems.map((item) => (
          <div className="flex" key={item.id}>
            <div className="mr-3 mt-1">
              {item.status === 'completed' ? 
                <CheckSquare className="w-5 h-5" /> : 
                <Square className="w-5 h-5" />
              }
            </div>
            <div>
              <h3 className="text-primary font-medium">{item.task}</h3>
              <p className="text-secondary text-sm">
                {item.status === 'completed' 
                  ? `Completed on ${item.date}` 
                  : `Due in ${item.dueIn} days`}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <button className="mt-4 w-full glass-regular py-2 rounded-xl text-primary motion-hover">
        Add Task
      </button>
    </div>
  );
};

export default TimelinePanel;
