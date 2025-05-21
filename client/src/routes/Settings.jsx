import { useState, useRef } from 'react';
import { Upload } from 'lucide-react';
import { motion, glass, button, defaultBackgrounds } from '../styles/tokens';

/**
 * @component Settings
 * @description Settings modal for background selection
 * @token glass.thick - For glass transparency effect
 * @token button.outline - For outline button
 * @token button.solid - For solid button
 */
const Settings = ({ isOpen, onClose, onBackgroundChange }) => {
  const [selectedBackground, setSelectedBackground] = useState(defaultBackgrounds[0]);
  const fileInputRef = useRef(null);
  
  // Handle background selection
  const selectBackground = (bg) => {
    setSelectedBackground(bg);
  };
  
  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target.result;
        setSelectedBackground(result);
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
    onBackgroundChange(selectedBackground);
    onClose();
  };
  
  // Reset settings
  const resetSettings = () => {
    setSelectedBackground(defaultBackgrounds[0]);
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="glass-thick vision-radius vision-shadow w-full max-w-4xl motion-in">
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
