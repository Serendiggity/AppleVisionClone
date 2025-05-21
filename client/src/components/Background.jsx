import { useEffect, useRef } from 'react';

/**
 * @component Background
 * @description Fullscreen background with parallax effect
 * @token glass.thin - For glass transparency effect
 */
const Background = ({ url }) => {
  const bgRef = useRef(null);
  
  // Initialize background image
  useEffect(() => {
    if (!url) {
      // Set default background if none provided
      document.documentElement.style.setProperty(
        '--bg-url', 
        'url(https://images.unsplash.com/photo-1523438885200-e635ba2c371e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080)'
      );
    }
  }, []);

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
