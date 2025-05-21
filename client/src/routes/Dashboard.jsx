import FolderTabs from '../components/FolderTabs';
import Sidebar from '../components/Sidebar';
import CountdownHero from '../components/CountdownHero';
import TimelinePanel from '../components/TimelinePanel';
import BudgetPanel from '../components/BudgetPanel';
import GuestPanel from '../components/GuestPanel';

/**
 * @component Dashboard
 * @description Main dashboard layout with all panels
 */
const Dashboard = ({ openSettings }) => {
  return (
    <>
      <Sidebar openSettings={openSettings} />
      
      <main className="w-full pl-24 py-4 pr-4">
        <FolderTabs />
        
        <div className="grid grid-cols-12 gap-6">
          <CountdownHero />
          <TimelinePanel />
          <BudgetPanel />
          <GuestPanel />
        </div>
      </main>
    </>
  );
};

export default Dashboard;
