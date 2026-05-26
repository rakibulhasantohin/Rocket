/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Users, QrCode, Lock, CheckCircle2, AlertCircle } from 'lucide-react';
import { StatusNotch } from './StatusNotch';
import { Keypad } from './Keypad';
import { PleaseWait } from './PleaseWait';
import { RECIPIENTS, TRANSLATIONS } from '../data';
import { Language, Screen, Transaction } from '../types';

interface SendMoneyProps {
  language: Language;
  balance: number;
  setBalance: (bal: number) => void;
  setScreen: (scr: Screen) => void;
  addTransaction: (tx: Transaction) => void;
}

export function SendMoney({ language, balance, setBalance, setScreen, addTransaction }: SendMoneyProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [phoneInput, setPhoneInput] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [reference, setReference] = useState('');
  const [amountInput, setAmountInput] = useState('500'); // Default matching screenshots 13
  const [pinInput, setPinInput] = useState('');
  const [isKeypadOpen, setIsKeypadOpen] = useState(true);
  const [activeInputField, setActiveInputField] = useState<'phone' | 'amount' | 'pin'>('phone');
  
  // Custom hold-to-confirm states
  const [holdProgress, setHoldProgress] = useState(0); // 0 to 100
  const [isHolding, setIsHolding] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  const holdIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const t = TRANSLATIONS[language];

  // Auto set recipient name if phone matches a template recipient
  useEffect(() => {
    const match = RECIPIENTS.find(r => r.phone === phoneInput);
    if (match) {
      setRecipientName(match.name);
    } else if (phoneInput.length >= 10) {
      setRecipientName('Unknown Account');
    } else {
      setRecipientName('');
    }
  }, [phoneInput]);

  // Handle virtual keypad typing
  const handleNumberPress = (char: string) => {
    if (activeInputField === 'phone') {
      if (phoneInput.length < 11) {
        setPhoneInput(prev => prev + char);
      }
    } else if (activeInputField === 'amount') {
      // Allow numerals and single decimal
      if (amountInput === '500' && char !== '.') {
        setAmountInput(char); // Clear default
      } else {
        setAmountInput(prev => prev + char);
      }
    } else if (activeInputField === 'pin') {
      if (pinInput.length < 4) {
        setPinInput(prev => prev + char);
      }
    }
  };

  const handleDeletePress = () => {
    if (activeInputField === 'phone') {
      setPhoneInput(prev => prev.slice(0, -1));
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
    if (phoneInput.length >= 10) {
      setStep(2);
      setActiveInputField('amount');
      setIsKeypadOpen(true);
    } else {
      alert(language === 'EN' ? 'Please enter a valid Account/Mobile Number' : 'দয়া করে সঠিক মোবাইল বা অ্যাকাউন্ট নম্বর দিন');
    }
  };

  const handleStep2Next = () => {
    const amt = parseFloat(amountInput);
    if (!isNaN(amt) && amt > 0) {
      setStep(3);
      setActiveInputField('pin');
      setIsKeypadOpen(true);
    } else {
      alert(language === 'EN' ? 'Please enter a valid amount' : 'দয়া করে সঠিক টাকা পরিমাণ দিন');
    }
  };

  // Recipient selection lists trigger
  const handleSelectRecent = (name: string, phone: string) => {
    setPhoneInput(phone);
    setRecipientName(name);
    setStep(2);
    setActiveInputField('amount');
    setIsKeypadOpen(true);
  };

  // Hold progress mechanics
  const startHold = () => {
    if (pinInput.length < 4) {
      alert(language === 'EN' ? 'Please supply your 4-digit PIN first' : 'দয়া করে আপনার ৪ ডিজিটের পিন নম্বর দিন');
      return;
    }
    setIsHolding(true);
    setHoldProgress(0);

    holdIntervalRef.current = setInterval(() => {
      setHoldProgress(prev => {
        if (prev >= 100) {
          clearInterval(holdIntervalRef.current!);
          setIsHolding(false);
          handleTransferExecution();
          return 100;
        }
        return prev + 5; // Takes 20 frames (approx 1.5 - 2s)
      });
    }, 80);
  };

  const stopHold = () => {
    setIsHolding(false);
    setHoldProgress(0);
    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
    }
  };

  const handleTransferExecution = () => {
    const sendAmount = parseFloat(amountInput);
    if (balance < sendAmount) {
      // Screenshot 15 Insufficient Balance Popup Error!
      setShowErrorModal(true);
    } else {
      // Sufficient balance transaction
      const newBal = balance - sendAmount;
      setBalance(newBal);

      // Save complete dynamic transaction log to history database
      addTransaction({
        id: `#tx${Math.floor(Math.random() * 899999 + 100000)}`,
        date: new Date().toLocaleDateString('eb-GB', { day: '2-digit', month: '2-digit', year: '2-digit' }) + ' ' + new Date().toLocaleTimeString(),
        title: `Rocket Send to ${recipientName} (${phoneInput})`,
        amount: sendAmount,
        type: 'OUT'
      });

      setShowSuccessModal(true);
    }
  };

  // SVG parameters for standard concentric circular progress loader
  const radius = 40;
  const stroke = 6;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (holdProgress / 100) * circumference;

  return (
    <div id="send-money-flow" className="w-full h-full flex flex-col justify-between bg-[#F8F9FA] relative select-none overflow-hidden">
      
      {/* Top Banner Screen Header */}
      <div id="send-money-header" className="bg-rocket text-white pb-3 select-none">
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
            {step === 3 ? t.confirmSend : t.sendMoney}
          </h1>
        </div>
      </div>

      {/* Primary body screen section */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col justify-start">
        
        {/* STEP 1: Number entry phase */}
        {step === 1 && (
          <div className="flex flex-col gap-4 animate-fadeIn select-none">
            
            {/* Scan QR Trigger Card */}
            <div 
              onClick={() => { setScreen('SCAN_QR_MOCK'); }}
              className="bg-white rounded-xl shadow-xs border border-gray-100 p-5 flex flex-col items-center justify-center cursor-pointer active:scale-99 transition-transform"
            >
              <QrCode className="w-11 h-11 text-rocket" strokeWidth={1.5} />
              <span className="text-sm font-bold text-gray-800 mt-2">{t.scanQr}</span>
            </div>

            {/* "Or" text divider matching system */}
            <div className="flex items-center justify-center gap-3">
              <div className="flex-1 h-[1px] bg-gray-200" />
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest leading-none">Or</span>
              <div className="flex-1 h-[1px] bg-gray-200" />
            </div>

            {/* Recipient inputs form */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <label className="text-[11px] font-bold text-rocket uppercase tracking-wider block mb-1">
                {t.recipientMobile}
              </label>

              <div 
                onClick={() => { setActiveInputField('phone'); setIsKeypadOpen(true); }}
                className={`w-full h-12 rounded-lg bg-gray-50 border flex items-center px-3.5 transition-colors cursor-pointer ${
                  activeInputField === 'phone' ? 'border-rocket bg-white' : 'border-gray-200'
                }`}
              >
                {/* User head icon */}
                <div className="w-5 h-5 rounded-full bg-slate-300 flex items-center justify-center mr-3">
                  <span className="text-[10px] text-white">👤</span>
                </div>

                <input 
                  type="text"
                  readOnly
                  placeholder="Mobile or A/C No"
                  value={phoneInput}
                  className="flex-1 bg-transparent border-none text-[15px] font-bold text-gray-800 placeholder-gray-400 focus:outline-none pointer-events-none"
                />

                {/* Contacts directory list icon right */}
                <button 
                  onClick={(e) => { e.stopPropagation(); alert('Phone contact directory integration.'); }}
                  className="p-1 px-1.5 border border-purple-200 text-rocket rounded-md hover:bg-rocket-light cursor-pointer active:scale-95 transition-all"
                >
                  <Users className="w-4 h-4" />
                </button>
              </div>

              {/* NEXT trigger */}
              <button
                onClick={handleStep1Next}
                className="w-full py-3 bg-rocket text-white font-bold text-[14px] rounded-full mt-5 select-none hover:bg-rocket-dark shadow-sm active:scale-98 transition-transform cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{t.next}</span>
                <span>→</span>
              </button>
            </div>

            {/* Quick Template Contact Book list helpful simulation */}
            <div className="flex flex-col select-none mt-1">
              <span className="text-xs font-bold text-gray-500 mb-2.5 uppercase tracking-wide">Recent Recipients</span>
              <div className="grid grid-cols-2 gap-2.5">
                {RECIPIENTS.map((rec, rIdx) => (
                  <div 
                    key={rIdx}
                    onClick={() => handleSelectRecent(rec.name, rec.phone)}
                    className="bg-white hover:bg-violet-50/50 hover:border-violet-200 border border-gray-100 rounded-xl p-3 flex items-center gap-2 cursor-pointer shadow-3xs active:scale-97 transition-all"
                  >
                    <div className="w-8 h-8 rounded-full bg-rocket-light text-rocket flex items-center justify-center font-bold text-xs select-none">
                      {rec.name[0]}
                    </div>
                    <div className="flex flex-col justify-center min-w-0">
                      <span className="text-[11px] font-bold text-gray-800 truncate leading-tight">{rec.name}</span>
                      <span className="text-[9.5px] text-gray-500 font-mono truncate">{rec.phone}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* STEP 2: Input monetary and reference content */}
        {step === 2 && (
          <div className="flex flex-col gap-4 animate-fadeIn select-none">
            
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 select-none">
              
              {/* Recipient Account Details row */}
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-3 text-xs">
                <span className="text-gray-500 font-bold uppercase">To Recipient</span>
                <span className="font-mono font-bold text-gray-800">{phoneInput}</span>
              </div>

              {/* Locked Recipient Name (Saves time/friction) */}
              <div className="mb-4">
                <label className="text-[11px] font-bold text-rocket uppercase tracking-wider block mb-1">
                  {t.recipientName}
                </label>
                <div className="w-full h-11 bg-gray-100 text-gray-600 rounded-lg flex items-center px-3 font-semibold text-xs border border-gray-200">
                  {recipientName || 'ABBU'}
                </div>
              </div>

              {/* Reference purpose Input Field */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[11px] font-bold text-rocket uppercase tracking-wider">
                    {t.reference}
                  </label>
                  <span className="text-[10px] text-gray-400 font-mono">{reference.length}/30</span>
                </div>
                <input 
                  type="text"
                  maxLength={30}
                  placeholder="Note / Purpose"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  className="w-full h-11 bg-gray-50 border border-gray-250 rounded-lg px-3 text-[13px] font-semibold text-gray-800 focus:outline-none focus:border-rocket focus:bg-white"
                />
              </div>

              {/* Amount input block with standard Taka badge */}
              <div className="mb-2">
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

              {/* Available balance safety note */}
              <span className="text-[10px] text-gray-500 font-semibold block px-1 my-1">
                Available balance Taka: ৳ {balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>

              {/* NEXT Phase */}
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

        {/* STEP 3: Pin logging confirmation & Holding validation */}
        {step === 3 && (
          <div className="flex flex-col gap-4 animate-fadeIn select-none">
            
            {/* The white verification information card card as shown in Screenshot 13 */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5 select-none relative overflow-hidden flex flex-col items-center">
              
              {/* Profile placeholder avatar badge centered */}
              <div className="w-16 h-16 bg-[#DCDCDC] border-2 border-[#DCDCDC] rounded-full flex items-center justify-center mb-4 select-none mr-1 shadow-inner relative">
                <span className="text-[28px]">👤</span>
              </div>

              {/* Target items double grid matching Screenshot 13 */}
              <div className="w-full grid grid-cols-2 gap-4 border-b border-gray-150 pb-4 mb-4 select-none text-center">
                
                <div className="flex flex-col items-center border-r border-gray-150 pr-2">
                  <span className="text-[10px] uppercase font-bold text-purple-700 tracking-wide">
                    Recipient Account No.
                  </span>
                  <span className="text-sm font-black text-gray-900 font-mono mt-0.5">
                    {phoneInput || '01710885402'}
                  </span>
                </div>

                <div className="flex flex-col items-center pl-2">
                  <span className="text-[10px] uppercase font-bold text-purple-700 tracking-wide">
                    Recipient Name
                  </span>
                  <span className="text-sm font-black text-gray-900 mt-0.5">
                    {recipientName || 'ABBU'}
                  </span>
                </div>

              </div>

              {/* Transferred Amount labeled below in crimson bold exactly as in Screenshot 13 */}
              <div className="w-full flex flex-col items-center select-none pt-0.5 pb-2">
                <span className="text-[10px] uppercase font-bold text-purple-700 tracking-wide">
                  Amount
                </span>
                <span className="text-xl font-extrabold text-[#d91e5c] mt-0.5 select-none animate-pulse">
                  ৳ {amountInput}
                </span>
              </div>

              {/* Lock Pin bullets input wrapper card */}
              <div className="w-full mt-2 select-none">
                <div 
                  onClick={() => { setActiveInputField('pin'); setIsKeypadOpen(true); }}
                  className={`w-full h-11 bg-[#F4F1F4] rounded-full flex items-center px-4 cursor-pointer border transition-colors ${
                    activeInputField === 'pin' ? 'border-rocket bg-purple-50/20' : 'border-transparent'
                  }`}
                >
                  <Lock className="w-4 h-4 text-gray-500 mr-4" />
                  
                  {/* Bullet points entry accumulator */}
                  <div className="flex-1 flex justify-center items-center gap-2.5 pr-8">
                    {[0, 1, 2, 3].map((index) => (
                      <div 
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-150 ${
                          index < pinInput.length 
                            ? 'bg-black scale-110' 
                            : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Interactive Hold-to-Confirm visual vector ring */}
              <div className="w-full flex flex-col items-center justify-center mt-7 mb-2 select-none relative">
                
                {/* Hold circle trigger container */}
                <div 
                  onMouseDown={startHold}
                  onMouseUp={stopHold}
                  onMouseLeave={stopHold}
                  onTouchStart={(e) => { e.preventDefault(); startHold(); }}
                  onTouchEnd={stopHold}
                  className="w-24 h-24 rounded-full relative flex items-center justify-center cursor-pointer select-none transition-transform active:scale-95"
                  title="Press and Hold down to authenticate"
                >
                  {/* SVG progress outline circle */}
                  <svg className="absolute inset-0 w-24 h-24 transform -rotate-90 select-none">
                    {/* Background subtle loop */}
                    <circle 
                      stroke="#f1f3f5" 
                      fill="transparent" 
                      strokeWidth={stroke} 
                      r={normalizedRadius} 
                      cx={radius + stroke * 2} 
                      cy={radius + stroke * 2} 
                    />
                    {/* Active filling progress loop */}
                    <circle 
                      stroke="#8c2282" 
                      fill="transparent" 
                      strokeWidth={stroke} 
                      strokeDasharray={circumference + ' ' + circumference} 
                      style={{ strokeDashoffset }} 
                      r={normalizedRadius} 
                      cx={radius + stroke * 2} 
                      cy={radius + stroke * 2} 
                      className="transition-all duration-75"
                    />
                  </svg>

                  {/* Inner White Button with Purple Airplane */}
                  <div className={`w-[72px] h-[72px] bg-white border border-gray-100/50 rounded-full shadow flex items-center justify-center relative z-10 transition-colors ${
                    isHolding ? 'bg-purple-100/50 scale-95' : ''
                  }`}>
                    <svg className="w-10 h-10 text-rocket transform rotate-12" viewBox="0 0 100 100" fill="currentColor">
                      <polygon points="10,65 92,8 55,83 45,55" fill="#8c2282" />
                      <polygon points="45,55 92,8 65,48" fill="#bc4cb2" />
                      <polygon points="45,55 55,83 55,65" fill="#721a6a" />
                    </svg>
                  </div>

                </div>

                {/* Confirm text instruction below circle matching system */}
                <span className="text-[10px] text-gray-900 font-bold max-w-[240px] text-center tracking-wide leading-tight mt-3">
                  {t.holdToConfirm}
                </span>

              </div>

            </div>

          </div>
        )}

      </div>

      {/* Dynamic numpad slides overlay (Height adjusts automatically based on open state) */}
      {isKeypadOpen && (
        <div id="wrapper-send-money-keypad" className="w-full animate-slideUp">
          <Keypad
            onNumberPress={handleNumberPress}
            onDeletePress={handleDeletePress}
            onDonePress={handleDonePress}
          />
        </div>
      )}

      {/* RED POPUP DIALOG: INSUFFICIENT BALANCE (A copy of screenshot 15) */}
      {showErrorModal && (
        <div className="absolute inset-0 bg-black/45 flex items-center justify-center p-6 z-50 select-none animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-sm animate-zoomIn transform scale-100 border border-red-50">
            
            {/* Red dialog header */}
            <div className="bg-rocket text-white p-4.5 flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-white" />
              <h3 className="font-sans text-[17px] font-bold">Error</h3>
            </div>

            {/* Error context text body */}
            <div className="p-6 relative select-none">
              <span className="text-gray-900 font-sans text-[14px] font-semibold tracking-wide">
                {t.insufficientBalance}
              </span>

              {/* Balance diagnostic debug assistant inline to help developers bypass or test successful flow */}
              <div className="mt-4 bg-slate-50 rounded-lg p-2.5 border border-dashed border-slate-200">
                <span className="text-[9.5px] leading-tight text-gray-500 block">
                  ⚙️ Simulator Sandbox Assistant:
                  <br />Your starting budget is ৳17,419.00. To test a successful transfer, click the button below to cheat extra ৳1,000 budget!
                </span>
                <button 
                  onClick={() => { setBalance(balance + 1000); setShowErrorModal(false); }}
                  className="mt-2 text-[10px] bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 py-1 px-3 rounded hover:bg-emerald-100 transition-colors cursor-pointer block select-none"
                >
                  Cheat +৳1,000 Balance
                </button>
              </div>
            </div>

            {/* Red dialog footer action */}
            <div className="flex justify-end p-4 border-t border-gray-100">
              <button 
                onClick={() => setShowErrorModal(false)}
                className="text-rocket font-black text-sm pr-2 hover:bg-orange-50 py-1.5 px-3 rounded-md transition-colors cursor-pointer select-none"
              >
                OK
              </button>
            </div>

          </div>
        </div>
      )}

      {/* SUCCESS POPUP DIALOG */}
      {showSuccessModal && (
        <div className="absolute inset-0 bg-black/45 flex items-center justify-center p-6 z-50 select-none animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-sm animate-zoomIn border border-green-50 select-none">
            
            <div className="bg-emerald-600 text-white p-4.5 flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-white animate-bounce" />
              <h3 className="font-sans text-[17px] font-bold">Transaction Successful</h3>
            </div>

            <div className="p-6">
              <span className="text-gray-950 font-sans text-[14px] font-semibold leading-relaxed block text-center">
                ৳{amountInput} successfully sent to {recipientName || 'ABBU'}!
                <br />New balance is ৳{balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            <div className="flex justify-end p-4 border-t border-gray-100">
              <button 
                onClick={() => { setShowSuccessModal(false); setScreen('DASHBOARD'); }}
                className="bg-emerald-600 text-white font-bold text-sm py-1.5 px-4 rounded-full transition-colors cursor-pointer hover:bg-emerald-700 select-none"
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
export default SendMoney;
