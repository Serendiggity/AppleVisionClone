import { useState, useRef, useEffect } from 'react';
import { folderTab } from '../styles/tokens';
import { cn } from '@/lib/utils';

/**
 * @component FolderTabs
 * @description Folder-style navigation tabs with asymmetric left-skew and animations
 * @token folderTab - For tab styling
 */
const FolderTabs = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState('Our Wedding');
  const [prevActiveTab, setPrevActiveTab] = useState(null);
  const [animating, setAnimating] = useState(false);
  const tabContainerRef = useRef(null);
  const tabRefs = useRef({});
  
  // Store tab indicator element dimensions and position
  const [indicator, setIndicator] = useState({
    left: 0,
    width: 0,
    height: 0,
    opacity: 0
  });
  
  const tabs = ['Our Wedding', '+ New', 'History'];
  
  // Handle tab change
  const handleTabChange = (tab) => {
    if (tab === activeTab || animating) return;
    
    setPrevActiveTab(activeTab);
    setActiveTab(tab);
    setAnimating(true);
    
    // Notify parent component if callback exists
    if (onTabChange) {
      onTabChange(tab);
    }
  };
  
  // Update indicator position
  useEffect(() => {
    if (!tabRefs.current[activeTab]) return;
    
    const activeTabElement = tabRefs.current[activeTab];
    const containerRect = tabContainerRef.current.getBoundingClientRect();
    const activeTabRect = activeTabElement.getBoundingClientRect();
    
    // Calculate position relative to container
    const left = activeTabRect.left - containerRect.left;
    
    // Set new indicator position with animation
    setIndicator({
      left,
      width: activeTabRect.width,
      height: activeTabRect.height,
      opacity: 1
    });
    
    // End animation state
    const timer = setTimeout(() => {
      setAnimating(false);
    }, 300); // Match transition duration
    
    return () => clearTimeout(timer);
  }, [activeTab]);
  
  return (
    <div className="relative mb-6 mt-2">
      {/* Active tab indicator (animated) */}
      <div 
        className="absolute glass-regular folder-tab z-0 transition-all duration-300 ease-out"
        style={{
          left: `${indicator.left}px`,
          width: `${indicator.width}px`,
          height: `${indicator.height}px`,
          opacity: indicator.opacity,
          pointerEvents: 'none' // Let clicks pass through
        }}
      />
      
      {/* Tabs container */}
      <div className="flex relative z-10" ref={tabContainerRef}>
        {tabs.map((tab) => (
          <div 
            key={tab}
            ref={(el) => tabRefs.current[tab] = el}
            className={cn(
              'folder-tab px-8 py-3 h-12 flex items-center mr-1 cursor-pointer transition-all duration-300',
              activeTab === tab 
                ? 'text-white/95 font-medium z-20' 
                : 'text-white/70 hover:text-white/90 bg-transparent'
            )}
            onClick={() => handleTabChange(tab)}
          >
            <span className={activeTab === tab ? 'scale-105 transition-transform duration-300' : 'transition-transform duration-300'}>
              {tab}
            </span>
            
            {/* Subtle glow effect for active tab */}
            {activeTab === tab && (
              <div className="absolute inset-0 bg-white/5 folder-tab animate-pulse-subtle pointer-events-none" />
            )}
          </div>
        ))}
      </div>
      
      {/* Content transition container */}
      <div className="h-2 overflow-hidden">
        {/* This creates a subtle slide effect between tabs */}
        <div 
          className="transition-transform duration-300 ease-out"
          style={{ 
            transform: `translateX(${tabs.indexOf(activeTab) * -100}%)`
          }}
        >
          {tabs.map((tab) => (
            <div key={tab} className="h-1 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FolderTabs;
