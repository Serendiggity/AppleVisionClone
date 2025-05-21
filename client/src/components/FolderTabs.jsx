import { useState } from 'react';
import { folderTab } from '../styles/tokens';
import { cn } from '@/lib/utils';

/**
 * @component FolderTabs
 * @description Folder-style navigation tabs with asymmetric left-skew
 * @token folderTab - For tab styling
 */
const FolderTabs = () => {
  const [activeTab, setActiveTab] = useState('Our Wedding');
  
  const tabs = ['Our Wedding', '+ New', 'History'];
  
  return (
    <div className="flex mb-6 mt-2">
      {tabs.map((tab) => (
        <div 
          key={tab}
          className={cn(
            'folder-tab px-8 py-3 h-12 flex items-center mr-1 cursor-pointer',
            activeTab === tab ? folderTab.active : folderTab.inactive
          )}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </div>
      ))}
    </div>
  );
};

export default FolderTabs;
