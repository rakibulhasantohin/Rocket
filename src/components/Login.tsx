/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Lock, MapPin, HelpCircle } from 'lucide-react';
import { StatusNotch } from './StatusNotch';
import { Keypad } from './Keypad';
import { PleaseWait } from './PleaseWait';
import { TRANSLATIONS } from '../data';
import { Language } from '../types';

interface LoginProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  onLoginSuccess: () => void;
  userPhone: string;
  setUserPhone: (phone: string) => void;
}

export function Login({ language, setLanguage, onLoginSuccess, userPhone, setUserPhone }: LoginProps) {
  const [pin, setPin] = useState('');
  const [isKeypadOpen, setIsKeypadOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const t = TRANSLATIONS[language];

  const handleToggleLanguage = () => {
    setLanguage(language === 'EN' ? 'BN' : 'EN');
  };

  const handleNumberPress = (num: string) => {
    if (pin.length < 4) {
      setPin(prev => prev + num);
    }
  };

  const handleDeletePress = () => {
    setPin(prev => prev.slice(0, -1));
  };

  const handleDonePress = () => {
    setIsKeypadOpen(false);
  };

  const handleLoginClick = () => {
    if (pin.length === 4) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        onLoginSuccess();
      }, 1500); // 1.5 seconds loading state like Screenshot 4
    } else {
      alert(language === 'EN' ? 'Please enter a 4-digit PIN first' : 'দয়া করে ৪ ডিজিটের পিন নম্বর দিন');
    }
  };

  return (
    <div 
      id="login-view-container"
      className="w-full h-full flex flex-col justify-between bg-white relative select-none overflow-hidden"
    >
      {/* Top Status Notch with clean branding representation */}
      <StatusNotch isDarkTheme={false} />

      {/* Main Core Content Area */}
      <div className="flex-1 flex flex-col justify-start px-8 pt-5">
        
        {/* Language switch button at the top-right matching screenshot exactly */}
        <div className="flex justify-end w-full mb-3">
          <button 
            id="login-lang-toggle"
            onClick={handleToggleLanguage}
            className="border border-rocket text-rocket font-sans font-semibold text-xs py-1 px-5 rounded-full select-none hover:bg-rocket-light transition-all active:scale-95 cursor-pointer"
          >
            {t.banglaToggle}
          </button>
        </div>

        {/* Small purple centered logo mark */}
        <div className="flex flex-col items-center mb-5 select-none animate-fadeIn">
          <div className="relative w-36 h-20 text-rocket">
            {/* White/Purple Airplane vector mark */}
            <svg 
              className="absolute right-0 top-0 w-16 h-16 transform translate-x-2 -translate-y-2"
              viewBox="0 0 100 100" 
              fill="currentColor"
            >
              <polygon points="10,65 92,8 55,83 45,55" fill="#8c2282" />
              <polygon points="45,55 92,8 65,48" fill="#a43ea2" />
              <polygon points="45,55 55,83 55,65" fill="#751670" />
            </svg>

            {/* Typography */}
            <span className="absolute left-1 top-4 font-black text-xs tracking-widest font-sans italic">
              ROCKET
            </span>

            {/* Bengali "রকেট" Cursive mark */}
            <div className="absolute left-0 bottom-0 flex items-baseline font-bold leading-none text-rocket">
              <span className="text-4xl tracking-tight leading-none font-bold">র</span>
              <span className="text-[34px] tracking-normal leading-none font-bold -ml-[4px]">কে</span>
              <span className="text-[34px] tracking-tight leading-none font-bold -ml-[1.5px]">ট</span>
            </div>
            
            <div className="absolute left-[25px] bottom-[9px] w-[6px] h-[6px] bg-rocket rounded-full border border-white" />
          </div>

          <span className="text-[7.5px] text-[#8c2282] font-semibold tracking-wider select-none -mt-1.5 opacity-90 border-t border-rocket/20 pt-[3px]">
            ডাচ-বাংলা ব্যাংক মোবাইল ব্যাংকিং
          </span>
        </div>

        {/* User Interactive Phone Display */}
        <div className="w-full flex flex-col items-center mb-4 select-none">
          <input 
            type="text"
            value={userPhone}
            onChange={(e) => setUserPhone(e.target.value)}
            className="text-center font-sans font-bold text-gray-800 text-lg py-1 px-2 border-b border-dashed border-gray-300 focus:outline-none focus:border-rocket tracking-wide max-w-[180px]"
            placeholder="017108854029"
            title="Click to edit or change simulating phone number"
          />
        </div>

        {/* PIN Input Dots field exactly like the screenshots */}
        <div 
          onClick={() => setIsKeypadOpen(true)}
          className="w-full h-13 bg-[#F4F1F4] rounded-full flex items-center px-4 mb-4 relative cursor-pointer active:bg-gray-200 transition-colors"
        >
          {/* Padlock icon left */}
          <Lock className="w-5 h-5 text-gray-600 mr-4" />

          {/* Centered Dots representation representing typed count */}
          <div className="flex-1 flex justify-center items-center gap-2.5 pr-8">
            {[0, 1, 2, 3].map((index) => (
              <div 
                key={index}
                className={`w-[12px] h-[12px] rounded-full transition-all duration-150 ${
                  index < pin.length 
                    ? 'bg-black scale-110' 
                    : 'bg-[#CFCACF]'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bold Purple LOGIN button */}
        <button
          onClick={handleLoginClick}
          className="w-full py-3.5 bg-rocket text-white rounded-full font-sans font-semibold text-[15px] tracking-widest shadow-md hover:bg-rocket-dark select-none cursor-pointer active:scale-98 transition-transform"
        >
          {t.login}
        </button>

        {/* Forgot PIN and custom helpful texts */}
        <div className="flex justify-end mt-4">
          <button 
            onClick={() => alert(language === 'EN' ? 'Please call 16216 from your registered number to reset Rocket PIN.' : 'রকেট পিন রিসেট করতে ১৬২১৬ নম্বরে ফোন দিন।')}
            className="text-xs font-bold text-gray-900 tracking-wide hover:underline cursor-pointer select-none"
          >
            {t.forgotPin}
          </button>
        </div>
      </div>

      {/* Footer support options matching Screenshot 2 */}
      {!isKeypadOpen && (
        <div className="w-full flex justify-around border-t border-gray-100 py-4 px-2 select-none select-none bg-white">
          <button 
            onClick={() => alert('Search nearest DBBL branch / ATM / Rocket agent.')}
            className="flex flex-col items-center gap-1.5 text-[11px] font-semibold text-gray-900 active:scale-95 transition-transform cursor-pointer"
          >
            <MapPin className="w-5 h-5 text-rocket" />
            <span>{t.storeLocator}</span>
          </button>

          <button 
            onClick={() => alert('Direct 24/7 support line at 16216.')}
            className="flex flex-col items-center gap-1.5 text-[11px] font-semibold text-gray-900 active:scale-95 transition-transform cursor-pointer"
          >
            <HelpCircle className="w-5 h-5 text-rocket" />
            <span>{t.helpSupport}</span>
          </button>
        </div>
      )}

      {/* Expandable numeric custom Keypad slide */}
      {isKeypadOpen && (
        <div className="w-full animate-slideUp">
          <Keypad
            onNumberPress={handleNumberPress}
            onDeletePress={handleDeletePress}
            onDonePress={handleDonePress}
          />
        </div>
      )}

      {/* Translucent loading dialog overlay */}
      {isLoading && (
        <PleaseWait language={language} />
      )}
    </div>
  );
}
export default Login;
