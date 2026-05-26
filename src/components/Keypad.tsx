/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface KeypadProps {
  onNumberPress: (num: string) => void;
  onDeletePress: () => void;
  onDonePress: () => void;
}

export function Keypad({ onNumberPress, onDeletePress, onDonePress }: KeypadProps) {
  const row1 = ['1', '2', '3'];
  const row2 = ['4', '5', '6'];
  const row3 = ['7', '8', '9'];

  const handleKeyClick = (key: string) => {
    onNumberPress(key);
  };

  return (
    <div id="custom-app-keypad" className="w-full bg-[#EAECEE] border-t border-gray-300 select-none pb-6 pt-3 px-3 transition-transform duration-300">
      
      {/* Dynamic Key Grid Area */}
      <div className="grid grid-cols-3 gap-y-5 gap-x-8 max-w-sm mx-auto">
        {/* Row 1 */}
        {row1.map((char) => (
          <button
            key={char}
            onClick={() => handleKeyClick(char)}
            className="h-12 flex items-center justify-center font-sans text-2xl font-normal text-gray-900 active:bg-gray-300 rounded-lg cursor-pointer select-none transition-colors"
          >
            {char}
          </button>
        ))}

        {/* Row 2 */}
        {row2.map((char) => (
          <button
            key={char}
            onClick={() => handleKeyClick(char)}
            className="h-12 flex items-center justify-center font-sans text-2xl font-normal text-gray-900 active:bg-gray-300 rounded-lg cursor-pointer select-none transition-colors"
          >
            {char}
          </button>
        ))}

        {/* Row 3 */}
        {row3.map((char) => (
          <button
            key={char}
            onClick={() => handleKeyClick(char)}
            className="h-12 flex items-center justify-center font-sans text-2xl font-normal text-gray-900 active:bg-gray-300 rounded-lg cursor-pointer select-none transition-colors"
          >
            {char}
          </button>
        ))}

        {/* Bottom Specialized Controls Row */}
        {/* DELETE key */}
        <button
          onClick={onDeletePress}
          className="h-12 flex items-center justify-center font-sans text-xs font-bold text-gray-700 active:bg-gray-300 rounded-lg tracking-wider cursor-pointer select-none transition-colors"
        >
          DELETE
        </button>

        {/* 0 Key */}
        <button
          onClick={() => handleKeyClick('0')}
          className="h-12 flex items-center justify-center font-sans text-2xl font-normal text-gray-900 active:bg-gray-300 rounded-lg cursor-pointer select-none transition-colors"
        >
          0
        </button>

        {/* DONE key */}
        <button
          onClick={onDonePress}
          className="h-12 flex items-center justify-center font-sans text-xs font-bold text-gray-700 active:bg-gray-300 rounded-lg tracking-wider cursor-pointer select-none transition-colors"
        >
          DONE
        </button>
      </div>
    </div>
  );
}
export default Keypad;
