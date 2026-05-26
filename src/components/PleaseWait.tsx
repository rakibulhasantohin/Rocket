/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { TRANSLATIONS } from '../data';
import { Language } from '../types';

interface PleaseWaitProps {
  language: Language;
}

export function PleaseWait({ language }: PleaseWaitProps) {
  const t = TRANSLATIONS[language];

  return (
    <div 
      id="please-wait-backdrop"
      className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center z-50 select-none animate-fadeIn"
    >
      <div 
        id="please-wait-dialog"
        className="bg-white rounded-xl shadow-2xl p-8 flex flex-col items-center justify-center w-[200px] h-[200px] border border-gray-100 relative overflow-hidden"
      >
        {/* Animated Flying Paper Airplane */}
        <div className="relative w-20 h-20 flex items-center justify-center">
          
          {/* Main Paper Airplane Path Vector */}
          <svg 
            className="w-12 h-12 text-rocket animate-fly" 
            viewBox="0 0 100 100" 
            fill="currentColor"
          >
            <polygon points="10,65 92,8 55,83 45,55" fill="#8c2282" />
            <polygon points="45,55 92,8 65,48" fill="#bc4cb2" />
            <polygon points="45,55 55,83 55,65" fill="#721a6a" />
          </svg>
          
          {/* Trailing particles / circles */}
          <div className="absolute top-1/2 left-3 w-1.5 h-1.5 bg-rocket/40 rounded-full animate-ping" />
          <div className="absolute bottom-5 left-5 w-1 h-1 bg-rocket/30 rounded-full animate-ping delay-500" />
        </div>

        {/* Translation matched Text label */}
        <span className="mt-4 font-sans text-[15px] font-semibold text-gray-800 tracking-wide text-center">
          {t.pleaseWait}
        </span>
      </div>
    </div>
  );
}
export default PleaseWait;
