import { useEffect, useRef, useState } from 'react';
import { defaultBackgrounds } from '../styles/tokens';

/**
 * @component Background
 * @description Fullscreen background with parallax effect
 * @token glass.thin - For glass transparency effect
 */
const Background = ({ url }) => {
  const bgRef = useRef(null);
  const [isCustomUpload, setIsCustomUpload] = useState(false);
  
  // Update background image whenever url changes
  useEffect(() => {
    const backgroundUrl = url || defaultBackgrounds[0];
    
    // Check if this is a custom uploaded image (data URL) or a remote URL
    const isCustomImage = backgroundUrl.startsWith('data:');
    setIsCustomUpload(isCustomImage);
    
    document.documentElement.style.setProperty('--bg-url', `url(${backgroundUrl})`);
    
    // Apply different styling based on image type
    if (isCustomImage) {
      // For uploaded images, apply contain or scale-down to prevent zooming
      document.body.style.backgroundImage = `url(${backgroundUrl})`;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center center';
      document.body.style.backgroundRepeat = 'no-repeat';
    } else {
      // For default images from URLs, use cover for fullscreen
      document.body.style.backgroundImage = `url(${backgroundUrl})`;
      document.body.style.backgroundSize = 'cover'; 
      document.body.style.backgroundPosition = 'center center';
      document.body.style.backgroundRepeat = 'no-repeat';
    }
  }, [url]);

  // Parallax effect on mouse move
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!bgRef.current) return;
      
      const maxOffset = 4; // Maximum movement in pixels
      
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      const moveX = maxOffset * (0.5 - x);
      const moveY = maxOffset * (0.5 - y);
      
      bgRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div 
      ref={bgRef}
      className={`fixed inset-0 -z-10 will-change-transform ${isCustomUpload ? 'bg-contain' : 'bg-cover'} bg-center bg-no-repeat`}
      style={{ 
        transformStyle: 'preserve-3d',
      }}
    />
  );
};

export default Background;
