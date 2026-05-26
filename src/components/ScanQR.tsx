/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, RefreshCw, Sparkles, Sliders } from 'lucide-react';
import { StatusNotch } from './StatusNotch';
import { TRANSLATIONS } from '../data';
import { Language, Screen } from '../types';

interface ScanQRProps {
  language: Language;
  setScreen: (scr: Screen) => void;
}

export function ScanQR({ language, setScreen }: ScanQRProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [streamActive, setStreamActive] = useState(false);
  const [cameraError, setCameraError] = useState(false);

  const t = TRANSLATIONS[language];

  // Try initiating camera feed matching metadata permission
  useEffect(() => {
    let streamInstance: MediaStream | null = null;
    
    const startCamera = async () => {
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment' }
          });
          streamInstance = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            setStreamActive(true);
            setCameraError(false);
          }
        } else {
          setCameraError(true);
        }
      } catch (err) {
        console.warn('Camera request blocked or unavailable in container sandboxes:', err);
        setCameraError(true);
      }
    };

    startCamera();

    // Cleanup resources
    return () => {
      if (streamInstance) {
        streamInstance.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div id="qr-scanner-screen" className="w-full h-full flex flex-col justify-between bg-zinc-950 text-white select-none relative overflow-hidden">
      
      {/* Darkened top bar */}
      <div className="bg-zinc-950 text-white pb-3 select-none">
        <StatusNotch isDarkTheme={true} />
        <div className="flex items-center px-4 pt-4 gap-1 select-none">
          <button 
            onClick={() => setScreen('DASHBOARD')}
            className="p-1.5 text-white active:scale-90 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5.5 h-5.5" />
          </button>
          
          <h1 className="text-[17px] font-bold tracking-wide font-sans pl-2 select-none">
            {t.scanQr}
          </h1>
        </div>
      </div>

      {/* Main scanning laser view box */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 relative">
        
        {/* Helper title header */}
        <span className="text-center text-[13.5px] font-bold tracking-wider mb-6 text-zinc-300 max-w-xs block px-4 leading-normal select-none">
          {t.scanTitle}
        </span>

        {/* Framing box wrapper */}
        <div className="relative w-64 h-64 bg-zinc-900 border-[1.5px] border-zinc-800 rounded-3xl overflow-hidden flex items-center justify-center shadow-2xl">
          
          {/* Real hardware stream */}
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 z-10 ${
              streamActive ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Fallback elegant scanning simulation grids if camera is blocked/denied */}
          {cameraError && (
            <div className="absolute inset-0 opacity-80 z-0 bg-radial from-violet-900/30 via-transparent to-transparent flex flex-wrap items-center justify-center gap-[6px] select-none p-4">
              {Array.from({ length: 196 }).map((_, gi) => (
                <div 
                  key={gi} 
                  className={`w-[6px] h-[6px] rounded-full scale-100 ${
                    gi % 13 === 0 ? 'bg-rocket/50 animate-pulse' : 'bg-transparent'
                  }`} 
                />
              ))}
              
              {/* Overlay logo icon watermark */}
              <div className="absolute opacity-15 max-w-xs select-none">
                <Sliders className="w-24 h-24 text-white" />
              </div>

              {/* Sandbox notice */}
              <div className="absolute bottom-4 left-4 right-4 text-center z-10 pointer-events-none">
                <span className="text-[9.5px] leading-tight text-white/50 block font-semibold truncate">
                  Local Simulation Active
                </span>
              </div>
            </div>
          )}

          {/* Red Glowing Laser Scanner Line Moving */}
          <div className="absolute left-0 right-0 h-[2.5px] bg-red-500 w-full shadow-[0_0_8px_rgba(239,68,68,0.8)] z-20 animate-scanLine" />

          {/* Aesthetic Scanner Targets for corners */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t-3 border-l-3 border-[#8c2282] rounded-tl-md z-30" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t-3 border-r-3 border-[#8c2282] rounded-tr-md z-30" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b-3 border-l-3 border-[#8c2282] rounded-bl-md z-30" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-3 border-r-3 border-[#8c2282] rounded-br-md z-30" />

        </div>

        {/* Bottom user tip label */}
        <p className="text-center text-[11px] leading-snug font-medium text-zinc-400 mt-6 max-w-[240px] px-2 select-none">
          {t.scanInstruction}
        </p>

      </div>

      {/* Decorative footer elements */}
      <div className="w-full text-center py-6 text-zinc-500 text-[10.5px] font-mono tracking-widest select-none">
        Powered by Dutch-Bangla Bank
      </div>

    </div>
  );
}
export default ScanQR;
