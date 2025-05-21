import { useState, useEffect } from 'react';
import { panel, text } from '../styles/tokens';

/**
 * @component CountdownHero
 * @description Countdown display for wedding date
 * @token panel - For panel styling
 * @token text.primary - For primary text
 * @token text.secondary - For secondary text
 */
const CountdownHero = () => {
  // Set wedding date - e.g., August 12, 2023
  const weddingDate = new Date(2023, 7, 12); // Month is 0-indexed
  const weddingLocation = "Mountain View Garden, Colorado Springs, CO";
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = weddingDate - new Date();
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };
    
    // Initial calculation
    calculateTimeLeft();
    
    // Update countdown every second
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Format with leading zeros
  const formatNumber = (num) => String(num).padStart(2, '0');
  
  return (
    <div className={`glass-thin vision-radius vision-shadow p-6 col-span-12 lg:col-span-8 motion-hover flex flex-col justify-between min-h-[250px]`}>
      <div>
        <h2 className="text-2xl font-semibold text-primary">Your Big Day</h2>
        <p className="text-secondary mt-1">
          {weddingDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>
      
      <div className="flex gap-6 justify-center mt-6">
        <div className="text-center">
          <div className="text-6xl font-semibold text-primary">{formatNumber(timeLeft.days)}</div>
          <div className="text-secondary mt-1">Days</div>
        </div>
        <div className="text-center">
          <div className="text-6xl font-semibold text-primary">{formatNumber(timeLeft.hours)}</div>
          <div className="text-secondary mt-1">Hours</div>
        </div>
        <div className="text-center">
          <div className="text-6xl font-semibold text-primary">{formatNumber(timeLeft.minutes)}</div>
          <div className="text-secondary mt-1">Minutes</div>
        </div>
        <div className="text-center">
          <div className="text-6xl font-semibold text-primary">{formatNumber(timeLeft.seconds)}</div>
          <div className="text-secondary mt-1">Seconds</div>
        </div>
      </div>
      
      <div className="text-center mt-6 text-secondary">
        {weddingLocation}
      </div>
    </div>
  );
};

export default CountdownHero;
