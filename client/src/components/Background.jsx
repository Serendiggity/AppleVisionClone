import { useEffect, useRef } from 'react';
import { defaultBackgrounds } from '../styles/tokens';

/**
 * @component Background
 * @description Fullscreen background with parallax effect
 * @token glass.thin - For glass transparency effect
 */
const Background = ({ url }) => {
  const bgRef = useRef(null);
  
  // Update background image whenever url changes
  useEffect(() => {
    const backgroundUrl = url || defaultBackgrounds[0];
    document.documentElement.style.setProperty('--bg-url', `url(${backgroundUrl})`);
    
    // Update the body background style directly for better visual effect
    document.body.style.backgroundImage = `url(${backgroundUrl})`;
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
      className="fixed inset-0 -z-10 bg-cover bg-center will-change-transform"
      style={{ transformStyle: 'preserve-3d' }}
    />
  );
};

export default Background;
