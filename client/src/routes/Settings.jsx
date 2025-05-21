import { useState, useRef, useEffect } from 'react';
import { Upload, Sliders } from 'lucide-react';
import { motion, glass, button, defaultBackgrounds } from '../styles/tokens';

/**
 * @component Settings
 * @description Settings modal for background selection and UI customization
 * @token glass.thick - For glass transparency effect
 * @token button.outline - For outline button
 * @token button.solid - For solid button
 */
const Settings = ({ isOpen, onClose, onBackgroundChange }) => {
  const [selectedBackground, setSelectedBackground] = useState(defaultBackgrounds[0]);
  const fileInputRef = useRef(null);
  
  // UI Appearance controls
  const [blurLevel, setBlurLevel] = useState(() => {
    return parseInt(localStorage.getItem('ui-blur-level') || '8');
  });
  
  const [glassOpacity, setGlassOpacity] = useState(() => {
    return parseInt(localStorage.getItem('ui-glass-opacity') || '15');
  });
  
  const [saturation, setSaturation] = useState(() => {
    return parseInt(localStorage.getItem('ui-saturation') || '100');
  });
  
  const [contrast, setContrast] = useState(() => {
    return parseInt(localStorage.getItem('ui-contrast') || '100');
  });
  
  const [panelRoundness, setPanelRoundness] = useState(() => {
    return parseInt(localStorage.getItem('ui-panel-roundness') || '24');
  });
  
  // Apply visual settings to CSS variables
  useEffect(() => {
    if (isOpen) {
      // Just preview changes while settings are open
      document.documentElement.style.setProperty('--temp-blur-level', `${blurLevel}px`);
      document.documentElement.style.setProperty('--temp-glass-opacity', `${glassOpacity}%`);
      document.documentElement.style.setProperty('--temp-saturation', `${saturation}%`);
      document.documentElement.style.setProperty('--temp-contrast', `${contrast}%`);
      document.documentElement.style.setProperty('--temp-panel-roundness', `${panelRoundness}px`);
      
      // Apply temp class to the body
      document.body.classList.add('previewing-settings');
    }
    
    return () => {
      document.body.classList.remove('previewing-settings');
    };
  }, [isOpen, blurLevel, glassOpacity, saturation, contrast, panelRoundness]);
  
  // Handle background selection
  const selectBackground = (bg) => {
    setSelectedBackground(bg);
  };
  
  // Handle file upload with proper image sizing
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if the file is an image
      if (!file.type.match('image.*')) {
        alert('Please select an image file');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target.result;
        
        // Create an image element to check dimensions
        const img = new Image();
        img.onload = () => {
          // Create a canvas to resize the image if needed
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          // Calculate aspect ratio and ensure reasonable dimensions
          const maxDimension = 1920;
          if (width > height && width > maxDimension) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else if (height > maxDimension) {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
          
          canvas.width = width;
          canvas.height = height;
          
          // Draw the resized image on canvas
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          // Get the resized image as a data URL
          const resizedImage = canvas.toDataURL(file.type || 'image/jpeg', 0.9);
          setSelectedBackground(resizedImage);
        };
        img.src = result;
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Trigger file picker
  const triggerFileUpload = () => {
    fileInputRef.current.click();
  };
  
  // Save settings
  const saveSettings = () => {
    // Save background
    onBackgroundChange(selectedBackground);
    
    // Save UI appearance settings to localStorage
    localStorage.setItem('ui-blur-level', blurLevel.toString());
    localStorage.setItem('ui-glass-opacity', glassOpacity.toString());
    localStorage.setItem('ui-saturation', saturation.toString());
    localStorage.setItem('ui-contrast', contrast.toString());
    localStorage.setItem('ui-panel-roundness', panelRoundness.toString());
    
    // Apply the settings permanently
    document.documentElement.style.setProperty('--blur-level', `${blurLevel}px`);
    document.documentElement.style.setProperty('--glass-opacity', `${glassOpacity}%`);
    document.documentElement.style.setProperty('--saturation', `${saturation}%`);
    document.documentElement.style.setProperty('--contrast', `${contrast}%`);
    document.documentElement.style.setProperty('--panel-roundness', `${panelRoundness}px`);
    
    onClose();
  };
  
  // Reset settings
  const resetSettings = () => {
    setSelectedBackground(defaultBackgrounds[0]);
    setBlurLevel(8);
    setGlassOpacity(15);
    setSaturation(100);
    setContrast(100);
    setPanelRoundness(24);
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="glass-thick vision-radius vision-shadow w-full max-w-4xl motion-in max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-primary">Settings</h2>
            <button 
              className="text-primary text-2xl"
              onClick={onClose}
            >
              ×
            </button>
          </div>
          
          {/* UI Appearance Controls */}
          <div className="mb-8">
            <h3 className="text-xl font-medium text-primary mb-4 flex items-center">
              <Sliders className="w-5 h-5 mr-2" /> UI Appearance
            </h3>
            
            <div className="grid grid-cols-1 gap-6">
              {/* Blur Level Slider */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-primary">Blur Level</label>
                  <span className="text-secondary">{blurLevel}px</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="20" 
                  value={blurLevel} 
                  onChange={(e) => setBlurLevel(parseInt(e.target.value))}
                  className="w-full accent-accent bg-white/10 h-2 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-secondary mt-1">
                  <span>No Blur</span>
                  <span>Maximum Blur</span>
                </div>
              </div>
              
              {/* Glass Opacity Slider */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-primary">Glass Opacity</label>
                  <span className="text-secondary">{glassOpacity}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="40" 
                  value={glassOpacity} 
                  onChange={(e) => setGlassOpacity(parseInt(e.target.value))}
                  className="w-full accent-accent bg-white/10 h-2 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-secondary mt-1">
                  <span>Transparent</span>
                  <span>More Opaque</span>
                </div>
              </div>
              
              {/* Saturation Slider */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-primary">Color Saturation</label>
                  <span className="text-secondary">{saturation}%</span>
                </div>
                <input 
                  type="range" 
                  min="50" 
                  max="150" 
                  value={saturation} 
                  onChange={(e) => setSaturation(parseInt(e.target.value))}
                  className="w-full accent-accent bg-white/10 h-2 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-secondary mt-1">
                  <span>Less Vibrant</span>
                  <span>More Vibrant</span>
                </div>
              </div>
              
              {/* Contrast Slider */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-primary">Contrast</label>
                  <span className="text-secondary">{contrast}%</span>
                </div>
                <input 
                  type="range" 
                  min="80" 
                  max="120" 
                  value={contrast} 
                  onChange={(e) => setContrast(parseInt(e.target.value))}
                  className="w-full accent-accent bg-white/10 h-2 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-secondary mt-1">
                  <span>Less Contrast</span>
                  <span>More Contrast</span>
                </div>
              </div>
              
              {/* Panel Roundness Slider */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-primary">Panel Roundness</label>
                  <span className="text-secondary">{panelRoundness}px</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="48" 
                  value={panelRoundness} 
                  onChange={(e) => setPanelRoundness(parseInt(e.target.value))}
                  className="w-full accent-accent bg-white/10 h-2 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-secondary mt-1">
                  <span>Sharp Corners</span>
                  <span>Rounded Corners</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Background Settings */}
          <div className="mb-6">
            <h3 className="text-xl font-medium text-primary mb-4">Background</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {defaultBackgrounds.map((bg, index) => (
                <div 
                  key={index}
                  className={`aspect-video rounded-xl overflow-hidden glass-thin p-1 cursor-pointer motion-hover ${selectedBackground === bg ? 'ring-2 ring-accent' : ''}`}
                  onClick={() => selectBackground(bg)}
                >
                  <img 
                    src={bg} 
                    alt={`Background option ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-xl font-medium text-primary mb-4">Upload Custom Background</h3>
            <div 
              className="glass-thin rounded-xl border-2 border-dashed border-white/30 p-8 text-center cursor-pointer motion-hover"
              onClick={triggerFileUpload}
            >
              <Upload className="w-10 h-10 mx-auto mb-2" />
              <p className="text-primary">Drop your image here or click to browse</p>
              <p className="text-secondary text-sm mt-1">Recommended size: 1920×1080px</p>
              <input 
                type="file" 
                ref={fileInputRef}
                className="hidden" 
                accept="image/*"
                onChange={handleFileUpload}
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-4 mt-8">
            <button 
              className="px-6 py-2 rounded-xl border border-accent/50 text-accent motion-hover"
              onClick={resetSettings}
            >
              Reset
            </button>
            <button 
              className="px-6 py-2 rounded-xl bg-accent text-black font-medium motion-hover"
              onClick={saveSettings}
            >
              Save
            </button>
          </div>
        </div>
      </div>
      <div 
        className="fixed inset-0 bg-black/50 -z-10"
        onClick={onClose}
      ></div>
    </div>
  );
};

export default Settings;
