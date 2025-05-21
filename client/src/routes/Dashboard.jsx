import { useState } from 'react';
import FolderTabs from '../components/FolderTabs';
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';
import CountdownHero from '../components/CountdownHero';
import TimelinePanel from '../components/TimelinePanel';
import BudgetPanel from '../components/BudgetPanel';
import GuestPanel from '../components/GuestPanel';

/**
 * @component Dashboard
 * @description Main dashboard layout with animated tab content
 */
const Dashboard = ({ openSettings }) => {
  const [activeTab, setActiveTab] = useState('Our Wedding');
  const [contentTransition, setContentTransition] = useState('animate-fade-in');

  // Handle tab change with animation
  const handleTabChange = (tab) => {
    // Add exit animation first
    setContentTransition('animate-fade-out');
    
    // After a brief exit animation, change content and add entrance animation
    setTimeout(() => {
      setActiveTab(tab);
      
      // Choose a different animation based on the tab
      if (tab === 'Our Wedding') {
        setContentTransition('animate-fade-in');
      } else if (tab === '+ New') {
        setContentTransition('animate-slide-in-right');
      } else if (tab === 'History') {
        setContentTransition('animate-slide-in-left');
      }
    }, 150); // Half of the animation duration for a smooth transition
  };

  // Render different content based on active tab
  const renderTabContent = () => {
    switch(activeTab) {
      case 'Our Wedding':
        return (
          <div className={`grid grid-cols-12 gap-6 ${contentTransition}`}>
            <CountdownHero />
            <TimelinePanel />
            <BudgetPanel />
            <GuestPanel />
          </div>
        );
      case '+ New':
        return (
          <div className={`glass-regular vision-radius p-8 ${contentTransition}`}>
            <h2 className="text-2xl text-primary mb-4">Create New Wedding Plan</h2>
            <p className="text-secondary mb-6">Start a new wedding project with different settings.</p>
            <div className="grid grid-cols-2 gap-4">
              <button className="glass-thin p-4 vision-radius text-primary motion-hover">Beach Wedding</button>
              <button className="glass-thin p-4 vision-radius text-primary motion-hover">Garden Wedding</button>
              <button className="glass-thin p-4 vision-radius text-primary motion-hover">Mountain Resort</button>
              <button className="glass-thin p-4 vision-radius text-primary motion-hover">Custom Theme</button>
            </div>
          </div>
        );
      case 'History':
        return (
          <div className={`glass-regular vision-radius p-8 ${contentTransition}`}>
            <h2 className="text-2xl text-primary mb-4">Wedding Planning History</h2>
            <p className="text-secondary mb-6">View your planning activities and changes.</p>
            <div className="space-y-4">
              {[
                { date: 'May 20, 2023', action: 'Added new guests (4)', user: 'Sarah' },
                { date: 'May 18, 2023', action: 'Updated venue details', user: 'Michael' },
                { date: 'May 15, 2023', action: 'Created wedding project', user: 'Sarah' },
              ].map((item, index) => (
                <div key={index} className="glass-thin p-4 vision-radius flex justify-between">
                  <div>
                    <div className="text-primary">{item.action}</div>
                    <div className="text-secondary text-sm">{item.date}</div>
                  </div>
                  <div className="text-secondary">{item.user}</div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Sidebar openSettings={openSettings} />
      
      <main className="w-full pl-24 py-4 pr-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex-1">
            <h2 className="text-2xl font-medium text-white/90 ml-2 mb-2" style={{ textShadow: 'var(--vision-text-shadow)' }}>
              Wedding Planner
            </h2>
            <FolderTabs onTabChange={handleTabChange} />
          </div>
          <div className="flex items-center space-x-4">
            <SearchBar placeholder="Search in wedding plan..." onSearch={(query) => console.log('Searching for:', query)} />
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white/80 cursor-pointer"
              style={{ background: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(20px)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
            </div>
          </div>
        </div>
        
        {/* Content area with animations */}
        <div className="min-h-[600px]">
          {renderTabContent()}
        </div>
      </main>
    </>
  );
};

export default Dashboard;
