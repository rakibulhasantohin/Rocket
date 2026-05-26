/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Users, QrCode, Lock, CheckCircle2, AlertCircle } from 'lucide-react';
import { StatusNotch } from './StatusNotch';
import { Keypad } from './Keypad';
import { RECIPIENTS, TRANSLATIONS } from '../data';
import { Language, Screen, Transaction } from '../types';

interface CashOutProps {
  language: Language;
  balance: number;
  setBalance: (bal: number) => void;
  setScreen: (scr: Screen) => void;
  addTransaction: (tx: Transaction) => void;
}

export function CashOut({ language, balance, setBalance, setScreen, addTransaction }: CashOutProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [agentPhone, setAgentPhone] = useState('');
  const [agentName, setAgentName] = useState('');
  const [amountInput, setAmountInput] = useState('500');
  const [pinInput, setPinInput] = useState('');
  const [isKeypadOpen, setIsKeypadOpen] = useState(true);
  const [activeInputField, setActiveInputField] = useState<'phone' | 'amount' | 'pin'>('phone');
  
  const [holdProgress, setHoldProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  const holdIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const t = TRANSLATIONS[language];

  // Map default agent names
  useEffect(() => {
    const match = RECIPIENTS.find(r => r.phone === agentPhone);
    if (match) {
      setAgentName(match.name);
    } else if (agentPhone.length >= 10) {
      setAgentName('Rocket Authorized Agent');
    } else {
      setAgentName('');
    }
  }, [agentPhone]);

  const handleNumberPress = (char: string) => {
    if (activeInputField === 'phone') {
      if (agentPhone.length < 11) setAgentPhone(prev => prev + char);
    } else if (activeInputField === 'amount') {
      if (amountInput === '500' && char !== '.') {
        setAmountInput(char);
      } else {
        setAmountInput(prev => prev + char);
      }
    } else if (activeInputField === 'pin') {
      if (pinInput.length < 4) setPinInput(prev => prev + char);
    }
  };

  const handleDeletePress = () => {
    if (activeInputField === 'phone') {
      setAgentPhone(prev => prev.slice(0, -1));
    } else if (activeInputField === 'amount') {
      setAmountInput(prev => prev.slice(0, -1));
    } else if (activeInputField === 'pin') {
      setPinInput(prev => prev.slice(0, -1));
    }
  };

  const handleDonePress = () => {
    setIsKeypadOpen(false);
  };

  const handleStep1Next = () => {
    if (agentPhone.length >= 10) {
      setStep(2);
      setActiveInputField('amount');
      setIsKeypadOpen(true);
    } else {
      alert(language === 'EN' ? 'Please supply a correct Agent Number' : 'দয়া করে সঠিক এজেন্ট নম্বর দিন');
    }
  };

  const handleStep2Next = () => {
    const amt = parseFloat(amountInput);
    if (!isNaN(amt) && amt > 0) {
      setStep(3);
      setActiveInputField('pin');
      setIsKeypadOpen(true);
    } else {
      alert(language === 'EN' ? 'Please supply a valid cash-out amount' : 'দয়া করে সঠিক পেমেন্ট পরিমাণ দিন');
    }
  };

  const handleSelectRecent = (name: string, phone: string) => {
    setAgentPhone(phone);
    setAgentName(name);
    setStep(2);
    setActiveInputField('amount');
    setIsKeypadOpen(true);
  };

  const startHold = () => {
    if (pinInput.length < 4) {
      alert(language === 'EN' ? 'Please supply your 4-digit PIN first' : 'দয়া করে আগে পিন নম্বর দিন');
      return;
    }
    setIsHolding(true);
    setHoldProgress(0);

    holdIntervalRef.current = setInterval(() => {
      setHoldProgress(prev => {
        if (prev >= 100) {
          clearInterval(holdIntervalRef.current!);
          setIsHolding(false);
          handleCashOutExecution();
          return 100;
        }
        return prev + 5;
      });
    }, 85);
  };

  const stopHold = () => {
    setIsHolding(false);
    setHoldProgress(0);
    if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
  };

  const handleCashOutExecution = () => {
    const amt = parseFloat(amountInput);
    // standard agent processing surcharge fee at 1.5%
    const totalDeduction = amt; 
    if (balance < totalDeduction) {
      setShowErrorModal(true);
    } else {
      const newBal = balance - totalDeduction;
      setBalance(newBal);

      addTransaction({
        id: `#tx${Math.floor(Math.random() * 899999 + 100000)}`,
        date: new Date().toLocaleDateString('eb-GB', { day: '2-digit', month: '2-digit', year: '2-digit' }) + ' ' + new Date().toLocaleTimeString(),
        title: `Cash Out to Agent (${agentPhone})`,
        amount: amt,
        type: 'OUT'
      });

      setShowSuccessModal(true);
    }
  };

  const radius = 40;
  const stroke = 6;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (holdProgress / 100) * circumference;

  return (
    <div id="cash-out-flow" className="w-full h-full flex flex-col justify-between bg-[#F8F9FA] relative select-none overflow-hidden">
      
      {/* Top Banner Header */}
      <div id="cash-out-header" className="bg-rocket text-white pb-3 select-none">
        <StatusNotch isDarkTheme={true} />
        <div className="flex items-center px-4 pt-4 gap-1">
          <button 
            onClick={() => {
              if (step === 3) { setStep(2); setActiveInputField('amount'); }
              else if (step === 2) { setStep(1); setActiveInputField('phone'); }
              else { setScreen('DASHBOARD'); }
            }}
            className="p-1.5 text-white active:scale-90 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5.5 h-5.5" />
          </button>
          
          <h1 className="text-[17px] font-bold tracking-wide font-sans pl-2">
            {step === 3 ? t.confirmCashOut : t.cashOut}
          </h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col justify-start">
        
        {step === 1 && (
          <div className="flex flex-col gap-4 animate-fadeIn select-none">
            
            <div 
              onClick={() => { setScreen('SCAN_QR_MOCK'); }}
              className="bg-white rounded-xl shadow-xs border border-gray-100 p-5 flex flex-col items-center justify-center cursor-pointer active:scale-99 transition-transform"
            >
              <QrCode className="w-11 h-11 text-rocket" strokeWidth={1.5} />
              <span className="text-sm font-bold text-gray-800 mt-2">{t.scanQr}</span>
            </div>

            <div className="flex items-center justify-center gap-3">
              <div className="flex-1 h-[1px] bg-gray-200" />
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-none">Or</span>
              <div className="flex-1 h-[1px] bg-gray-200" />
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <label className="text-[11px] font-bold text-rocket uppercase tracking-wider block mb-1">
                {t.agentMobile}
              </label>

              <div 
                onClick={() => { setActiveInputField('phone'); setIsKeypadOpen(true); }}
                className={`w-full h-12 rounded-lg bg-gray-50 border flex items-center px-3.5 transition-colors cursor-pointer ${
                  activeInputField === 'phone' ? 'border-rocket bg-white' : 'border-gray-200'
                }`}
              >
                <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center mr-3">
                  <span className="text-[10px]">🏪</span>
                </div>

                <input 
                  type="text"
                  readOnly
                  placeholder="Agent Mobile or A/C No"
                  value={agentPhone}
                  className="flex-1 bg-transparent border-none text-[15px] font-bold text-gray-800 placeholder-gray-400 focus:outline-none pointer-events-none"
                />

                <button 
                  onClick={(e) => { e.stopPropagation(); alert('Agents directory catalog.'); }}
                  className="p-1 px-1.5 border border-purple-250 text-rocket rounded-md hover:bg-rocket-light cursor-pointer active:scale-95 transition-all"
                >
                  <Users className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleStep1Next}
                className="w-full py-3 bg-rocket text-white font-bold text-[14px] rounded-full mt-5 select-none hover:bg-rocket-dark shadow-xs active:scale-98 transition-transform cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{t.next}</span>
                <span>→</span>
              </button>
            </div>

            {/* Recurrent agents options */}
            <div className="flex flex-col select-none mt-1">
              <span className="text-xs font-bold text-gray-500 mb-2.5 uppercase tracking-wide">Authorized Agents</span>
              <div className="grid grid-cols-2 gap-2.5">
                {RECIPIENTS.map((rec, rIdx) => (
                  <div 
                    key={rIdx}
                    onClick={() => handleSelectRecent(rec.name, rec.phone)}
                    className="bg-white hover:bg-violet-50 border border-gray-100 rounded-xl p-3 flex items-center gap-2 cursor-pointer shadow-3xs active:scale-97 transition-all"
                  >
                    <div className="w-8 h-8 rounded-full bg-purple-100 text-rocket flex items-center justify-center font-bold text-xs select-none">
                      🏪
                    </div>
                    <div className="flex flex-col justify-center min-w-0">
                      <span className="text-[11px] font-bold text-gray-800 truncate leading-tight">{rec.name} Agent</span>
                      <span className="text-[9.5px] text-gray-500 font-mono truncate">{rec.phone}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-4 animate-fadeIn select-none">
            
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 select-none">
              
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-3 text-xs">
                <span className="text-gray-500 font-bold uppercase">To Agent Acc.</span>
                <span className="font-mono font-bold text-gray-800">{agentPhone}</span>
              </div>

              <div className="mb-4">
                <label className="text-[11px] font-bold text-rocket uppercase tracking-wider block mb-1">
                  {t.agentName}
                </label>
                <div className="w-full h-11 bg-gray-100 text-gray-650 rounded-lg flex items-center px-3 font-semibold text-xs border border-gray-200">
                  {agentName || 'ROCKET AUTHORIZED AGENT'}
                </div>
              </div>

              <div className="mb-4">
                <label className="text-[11px] font-bold text-rocket uppercase tracking-wider block mb-1">
                   {t.amount}
                </label>
                
                <div 
                  onClick={() => { setActiveInputField('amount'); setIsKeypadOpen(true); }}
                  className={`w-full h-12 rounded-lg bg-gray-50 border flex items-center px-4 transition-colors cursor-pointer ${
                    activeInputField === 'amount' ? 'border-rocket bg-white' : 'border-gray-200'
                  }`}
                >
                  <div className="w-6.5 h-6.5 rounded-md bg-gray-200 text-black flex items-center justify-center font-bold text-sm select-none mr-3">
                    ৳
                  </div>
                  
                  <input 
                    type="text"
                    readOnly
                    placeholder="Amount"
                    value={amountInput}
                    className="flex-1 bg-transparent border-none text-base font-extrabold text-[#d91e5c] focus:outline-none pointer-events-none"
                  />
                </div>
              </div>

              {/* NEXT trigger */}
              <button
                onClick={handleStep2Next}
                className="w-full py-3 bg-rocket text-white font-bold text-[14.5px] rounded-full mt-4 select-none hover:bg-rocket-dark shadow-sm active:scale-98 transition-transform cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{t.next}</span>
                <span>→</span>
              </button>

            </div>

          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-4 animate-fadeIn select-none">
            
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5 select-none flex flex-col items-center">
              
              <div className="w-16 h-16 bg-slate-100 border-2 border-slate-200 rounded-full flex items-center justify-center mb-4 text-center">
                <span className="text-2xl">🏪</span>
              </div>

              <div className="w-full grid grid-cols-2 gap-4 border-b border-gray-150 pb-4 mb-4 text-center">
                <div className="flex flex-col items-center border-r border-gray-150 pr-2">
                  <span className="text-[10px] uppercase font-bold text-purple-700 tracking-wide">
                    Recipient Account No.
                  </span>
                  <span className="text-sm font-black text-gray-900 font-mono mt-0.5">
                    {agentPhone}
                  </span>
                </div>

                <div className="flex flex-col items-center pl-2">
                  <span className="text-[10px] uppercase font-bold text-purple-700 tracking-wide">
                    Recipient Name
                  </span>
                  <span className="text-sm font-black text-gray-900 mt-0.5">
                    {agentName || 'ABBU'}
                  </span>
                </div>
              </div>

              <div className="w-full flex flex-col items-center select-none pt-0.5 pb-2">
                <span className="text-[10px] uppercase font-bold text-purple-700 tracking-wide">
                  Amount
                </span>
                <span className="text-xl font-extrabold text-[#d91e5c] mt-0.5 select-none">
                  ৳ {amountInput}
                </span>
              </div>

              <div className="w-full mt-2 select-none">
                <div 
                  onClick={() => { setActiveInputField('pin'); setIsKeypadOpen(true); }}
                  className={`w-full h-11 bg-[#F4F1F4] rounded-full flex items-center px-4 cursor-pointer border transition-colors ${
                    activeInputField === 'pin' ? 'border-rocket bg-purple-50/20' : 'border-transparent'
                  }`}
                >
                  <Lock className="w-4 h-4 text-gray-500 mr-4" />
                  
                  <div className="flex-1 flex justify-center items-center gap-2.5 pr-8">
                    {[0, 1, 2, 3].map((index) => (
                      <div 
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-150 ${
                          index < pinInput.length ? 'bg-black' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Hold to Cash Out */}
              <div className="w-full flex flex-col items-center justify-center mt-7 mb-2 relative">
                <div 
                  onMouseDown={startHold}
                  onMouseUp={stopHold}
                  onMouseLeave={stopHold}
                  onTouchStart={(e) => { e.preventDefault(); startHold(); }}
                  onTouchEnd={stopHold}
                  className="w-24 h-24 rounded-full relative flex items-center justify-center cursor-pointer select-none transition-transform"
                >
                  <svg className="absolute inset-0 w-24 h-24 transform -rotate-90">
                    <circle stroke="#f1f3f5" fill="transparent" strokeWidth={stroke} r={normalizedRadius} cx={radius + stroke * 2} cy={radius + stroke * 2} />
                    <circle stroke="#8c2282" fill="transparent" strokeWidth={stroke} strokeDasharray={circumference + ' ' + circumference} style={{ strokeDashoffset }} r={normalizedRadius} cx={radius + stroke * 2} cy={radius + stroke * 2} className="transition-all duration-75" />
                  </svg>

                  <div className={`w-[72px] h-[72px] bg-white border border-gray-100 rounded-full shadow flex items-center justify-center relative z-10 ${
                    isHolding ? 'bg-purple-100/50 scale-95' : ''
                  }`}>
                    <svg className="w-10 h-10 text-rocket transform rotate-12" viewBox="0 0 100 100" fill="currentColor">
                      <polygon points="10,65 92,8 55,83 45,55" fill="#8c2282" />
                      <polygon points="45,55 92,8 65,48" fill="#bc4cb2" />
                      <polygon points="45,55 55,83 55,65" fill="#721a6a" />
                    </svg>
                  </div>
                </div>

                <span className="text-[10px] text-gray-900 font-bold max-w-[240px] text-center tracking-wide leading-tight mt-3">
                  {t.holdToConfirm}
                </span>
              </div>

            </div>

          </div>
        )}

      </div>

      {isKeypadOpen && (
        <div className="w-full animate-slideUp">
          <Keypad
            onNumberPress={handleNumberPress}
            onDeletePress={handleDeletePress}
            onDonePress={handleDonePress}
          />
        </div>
      )}

      {showErrorModal && (
        <div className="absolute inset-0 bg-black/45 flex items-center justify-center p-6 z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-sm border border-red-50">
            <div className="bg-rocket text-white p-4 flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-white" />
              <h3 className="font-sans text-[17px] font-bold">Error</h3>
            </div>
            <div className="p-6">
              <span className="text-gray-950 font-sans text-[14px] font-semibold tracking-wide block">
                {t.insufficientBalance}
              </span>
              <div className="mt-4 bg-slate-50 rounded-lg p-2.5 border border-dashed border-slate-200">
                <span className="text-[9.5px] leading-tight text-gray-500 block">
                  ⚙️ Simulator Sandbox Agent:
                  <br />Please click below to grant extra ৳1,000 budget sandbox!
                </span>
                <button 
                  onClick={() => { setBalance(balance + 1000); setShowErrorModal(false); }}
                  className="mt-2 text-[10px] bg-emerald-50 text-emerald-700 font-bold border border-emerald-250 py-1 px-3 rounded hover:bg-emerald-100 block transition-colors select-none"
                >
                  Add Taka +৳1,000
                </button>
              </div>
            </div>
            <div className="flex justify-end p-4 border-t border-gray-100">
              <button onClick={() => setShowErrorModal(false)} className="text-rocket font-black text-sm pr-2">
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div className="absolute inset-0 bg-black/45 flex items-center justify-center p-6 z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-sm border border-green-50">
            <div className="bg-emerald-600 text-white p-4.5 flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-white" />
              <h3 className="font-sans text-[17px] font-bold">Cashout Complete</h3>
            </div>
            <div className="p-6 text-center">
              <span className="text-gray-900 font-sans text-[14px] font-semibold leading-relaxed block">
                ৳{amountInput} successfully cashed out at Agent!
                <br />Available Balance is ৳{balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-end p-4 border-t border-gray-100">
              <button 
                onClick={() => { setShowSuccessModal(false); setScreen('DASHBOARD'); }}
                className="bg-emerald-600 text-white font-bold text-sm py-1.5 px-4 rounded-full transition-colors cursor-pointer hover:bg-emerald-700"
              >
                Back To Home
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
export default CashOut;
