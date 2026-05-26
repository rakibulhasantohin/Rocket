/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Bell, ChevronDown, ChevronRight, Home, Menu, RefreshCw, Smartphone, 
  Send, QrCode, ClipboardList, Wallet, FileText, ArrowRightLeft, UserCheck, 
  Coins, Milestone, Landmark, ShieldCheck, GraduationCap, Lightbulb, Flame, 
  Droplet, Award, Network, BookOpen, CircleDot, Info, PhoneCall
} from 'lucide-react';
import { StatusNotch } from './StatusNotch';
import { TRANSLATIONS, PROMO_SLIDES, SUGGESTIONS } from '../data';
import { Language, Screen } from '../types';

interface DashboardProps {
  language: Language;
  balance: number;
  setScreen: (scr: Screen) => void;
  userPhone: string;
}

export function Dashboard({ language, balance, setScreen, userPhone }: DashboardProps) {
  const [showBalance, setShowBalance] = useState(false);
  const [activePromoIndex, setActivePromoIndex] = useState(0);
  const [isServicesExpanded, setIsServicesExpanded] = useState(true);
  const [isBillPayExpanded, setIsBillPayExpanded] = useState(true);

  const t = TRANSLATIONS[language];

  // Rotate promo sliders automatically every 5 seconds
  useEffect(() => {
    const promoTimer = setInterval(() => {
      setActivePromoIndex((prev) => (prev + 1) % PROMO_SLIDES.length);
    }, 5000);
    return () => clearInterval(promoTimer);
  }, []);

  // Set up temporary display duration for the interactive "Tap for Balance" button
  const handleBalanceTap = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowBalance(true);
    // Hide balance again after 4 seconds matching DBBL Rocket functionality
    setTimeout(() => {
      setShowBalance(false);
    }, 4000);
  };

  const currentPromo = PROMO_SLIDES[activePromoIndex];

  return (
    <div id="dashboard-view-container" className="w-full h-full flex flex-col bg-[#F3F4F6] select-none relative pb-20 overflow-y-auto">
      
      {/* Curved Deep Purple Header Area */}
      <div id="home-header-block" className="bg-rocket text-white pb-6 rounded-b-[32px] shadow-lg relative z-20">
        
        {/* Status Notch inside purple header */}
        <StatusNotch isDarkTheme={true} />

        {/* User Context & Actions Row */}
        <div className="px-5 pt-5 flex justify-between items-center bg-transparent">
          {/* Avatar & Profile Information */}
          <div className="flex items-center gap-3">
            {/* Click avatar to trigger profile settings more menu */}
            <div 
              onClick={() => setScreen('MORE_MENU')}
              className="w-12 h-12 rounded-full bg-white/10 border border-white/40 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors relative"
            >
              {/* Profile head silhouette without any pen badge matching the screenshot */}
              <svg className="w-8 h-8 text-white/95" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12c0 2.651 1.057 5.055 2.766 6.829a.75.75 0 001.066.015 11.536 11.536 0 0111.533 0 .75.75 0 001.066-.015zM12 6.75a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5z" clipRule="evenodd" />
              </svg>
            </div>

            {/* Title text hierarchy */}
            <div className="flex flex-col select-none">
              <span className="font-extrabold text-[13.5px] uppercase tracking-wide leading-tight font-sans">
                MD MILON MIA
              </span>
              <span className="text-[10px] text-white/80 tracking-wide font-mono">
                {userPhone}, CORPORATE_SALARY
              </span>
            </div>
          </div>

          {/* Right Area brand mark - Exact script "রকেট" with paper airplane rocket */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex flex-col items-end justify-center select-none">
              <div className="flex items-center justify-end relative h-6 w-12 mr-1">
                {/* stylized flying rocket */}
                <svg className="text-white transform rotate-[15deg] w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </div>
              <span className="text-[14px] font-bold tracking-normal text-white leading-none font-bengali filter drop-shadow">
                রকেট
              </span>
            </div>
          </div>
        </div>

        {/* Balance Row with Centered Pill & Bell on the Right matching the exact screenshot layout */}
        <div className="w-full flex justify-center items-center px-5 mt-4 relative">
          <div className="w-full flex justify-center">
            <div 
              onClick={handleBalanceTap}
              className="h-9 min-w-[210px] bg-white rounded-full flex items-center justify-between shadow-inner px-1 cursor-pointer select-none overflow-hidden transition-all duration-300 transform active:scale-98"
            >
              {/* Taka magenta/violet circular badge */}
              <div className="w-7 h-7 rounded-full bg-rocket text-white flex items-center justify-center font-bold text-sm ml-1 select-none">
                ৳
              </div>

              {/* Tap for Balance toggle info */}
              <div className="flex-1 flex justify-center text-center px-1">
                <span className={`font-sans font-extrabold transition-all duration-300 ${
                  showBalance ? 'text-[#3E0C54] text-[15.5px] tracking-wide' : 'text-[#3E0C54] text-[12.5px] tracking-tight'
                }`}>
                  {showBalance ? `${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : t.tapForBalance}
                </span>
              </div>

              {/* Balanced width spacer instead of layout shift */}
              <div className="w-7 h-7 rounded-full opacity-0" />
            </div>
          </div>

          {/* Alert Bell on the far right aligned exactly on the same row with Balance Tap */}
          <button 
            onClick={() => alert(language === 'EN' ? 'No new system announcements.' : 'নতুন কোনো নোটিস নেই।')}
            className="absolute right-5 p-1 text-white hover:text-purple-100 cursor-pointer active:scale-90 transition-transform"
          >
            <Bell className="w-[20px] h-[20px]" strokeWidth={2.4} />
          </button>
        </div>
      </div>

      {/* Services Section with custom isometric icon mimics */}
      <div id="home-services" className="px-4 -mt-3 relative z-30 select-none">
        <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col">
          
          <div className="flex justify-between items-center mb-3">
            <span className="text-[13px] font-bold text-gray-800 tracking-wide uppercase border-l-3 border-rocket pl-1.5">
              {t.services}
            </span>
          </div>

          {/* Core Services grid items mapped precisely */}
          {isServicesExpanded && (
            <div className="grid grid-cols-4 gap-y-5 gap-x-1 my-2 animate-fadeIn">
              
              {/* 1. Rocket Send Money */}
              <div 
                onClick={() => setScreen('SEND_MONEY_INPUT')}
                className="flex flex-col items-center text-center group cursor-pointer active:scale-95 transition-transform"
              >
                <div className="w-[52px] h-[52px] flex items-center justify-center relative">
                  {/* Custom SVG: Dual orange phones with green check badge */}
                  <svg className="w-[50px] h-[50px] select-none" viewBox="0 0 64 64" fill="none">
                    {/* Left Phone */}
                    <rect x="6" y="12" width="16" height="30" rx="3.5" fill="#F97316" stroke="#EA580C" strokeWidth="1.5" />
                    <rect x="9" y="16" width="10" height="20" rx="1" fill="#FFFFFF" />
                    <path d="M12 38h4" stroke="#EA580C" strokeWidth="1.5" strokeLinecap="round" />
                    {/* Right Phone */}
                    <rect x="42" y="12" width="16" height="30" rx="3.5" fill="#F97316" stroke="#EA580C" strokeWidth="1.5" />
                    <rect x="45" y="16" width="10" height="20" rx="1" fill="#FFFFFF" />
                    <path d="M48 38h4" stroke="#EA580C" strokeWidth="1.5" strokeLinecap="round" />
                    {/* Connection indicators */}
                    <path d="M24 23c4-4 10-4 16 0" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="1.5 1.5" />
                    <path d="M40 23l-3-3M40 23l-4 3" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    {/* Blue Taka sign on left screen */}
                    <text x="11" y="29.5" fill="#F97316" fontSize="12" fontWeight="900" fontFamily="sans-serif">৳</text>
                    {/* Green check mark inside white circle on right screen */}
                    <circle cx="50" cy="24" r="6" fill="#22C55E" stroke="#FFFFFF" strokeWidth="1" />
                    <path d="M47.5 24l1.5 1.5 2.5-2.5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-[10px] leading-tight font-sans font-semibold text-gray-950 mt-1.5 max-w-[85px] tracking-tight">
                  {t.sendMoney}
                </span>
              </div>

              {/* 2. Mobile Recharge */}
              <div 
                onClick={() => alert('Mobile Recharge configuration simulating in real networks.')}
                className="flex flex-col items-center text-center group cursor-pointer active:scale-95 transition-transform"
              >
                <div className="w-[52px] h-[52px] flex items-center justify-center">
                  {/* Custom SVG: Blue phone with white display + rotating circle arrows */}
                  <svg className="w-[45px] h-[45px] select-none" viewBox="0 0 64 64" fill="none">
                    <rect x="22" y="10" width="20" height="38" rx="4" fill="#0EA5E9" stroke="#0284C7" strokeWidth="2" />
                    <rect x="25" y="14" width="14" height="25" rx="1" fill="#FFFFFF" />
                    <circle cx="32" cy="43" r="2" fill="#FFFFFF" />
                    {/* Arrow path */}
                    <path d="M12 28A18 18 0 0128 10M12 28a18 18 0 0016 18m24-18A18 18 0 0136 10M52 28a18 18 0 00-16 18" stroke="#075985" strokeWidth="1.5" strokeLinecap="round" />
                    {/* Dual arrows */}
                    <path d="M15 15l13-5v13" stroke="#075985" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M49 41l-13 5v-13" stroke="#075985" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    {/* Internal arrows flow display */}
                    <path d="M29 21l3 3 3-3" stroke="#0EA5E9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M35 29l-3-3-3 3" stroke="#0EA5E9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-[10px] leading-tight font-sans font-semibold text-gray-950 mt-1.5 max-w-[85px] tracking-tight">
                  {t.recharge}
                </span>
              </div>

              {/* 3. Cash Out */}
              <div 
                onClick={() => setScreen('CASH_OUT_INPUT')}
                className="flex flex-col items-center text-center group cursor-pointer active:scale-95 transition-transform"
              >
                <div className="w-[52px] h-[52px] flex items-center justify-center">
                  {/* Custom SVG: Hand holding Blue Taka ball and radiant rays */}
                  <svg className="w-[48px] h-[48px] select-none" viewBox="0 0 64 64" fill="none">
                    {/* Supportive radiant lines */}
                    <path d="M32 5v4M16 12l3 3M48 12l-3 3" stroke="#3B82F6" strokeWidth="1.8" strokeLinecap="round" />
                    {/* Hand supportive base */}
                    <path d="M12 44c10-2 14-8 26-8s16 4 16 4v6H12v-6z" fill="#DBEAFE" />
                    <path d="M12 44c10-2 14-8 26-8" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" />
                    {/* Fingers holding */}
                    <path d="M28 36a4 4 0 018 0v2m-14-2a4 4 0 018 0v2" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" />
                    {/* Blue Taka Coin */}
                    <circle cx="32" cy="22" r="11" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="2" />
                    <text x="27.5" y="27" fill="#1D4ED8" fontSize="14" fontWeight="900" fontFamily="sans-serif">৳</text>
                  </svg>
                </div>
                <span className="text-[10px] leading-tight font-sans font-semibold text-gray-950 mt-1.5 max-w-[85px] tracking-tight">
                  {t.cashOut}
                </span>
              </div>

              {/* 4. Merchant Pay */}
              <div 
                onClick={() => alert('Merchant payment sandbox activation.')}
                className="flex flex-col items-center text-center group cursor-pointer active:scale-95 transition-transform"
              >
                <div className="w-[52px] h-[52px] flex items-center justify-center">
                  {/* Custom SVG: Green shopping cart with double white concentric grids */}
                  <svg className="w-[44px] h-[44px] select-none" viewBox="0 0 64 64" fill="none">
                    <path d="M6 10h10l10 26h22l6-16H22" stroke="#22C55E" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                    {/* Wheels */}
                    <circle cx="26" cy="46" r="5" fill="#22C55E" />
                    <circle cx="44" cy="46" r="5" fill="#22C55E" />
                    <circle cx="26" cy="46" r="2.2" fill="#FFFFFF" />
                    <circle cx="44" cy="46" r="2.2" fill="#FFFFFF" />
                    {/* Internal loads */}
                    <path d="M25 20h22M27 26h16" stroke="#86EFAC" strokeWidth="2.2" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="text-[10px] leading-tight font-sans font-semibold text-gray-950 mt-1.5 max-w-[85px] tracking-tight">
                  {t.merchantPay}
                </span>
              </div>

              {/* 5. Add Money */}
              <div 
                onClick={() => alert('Add Money simulation using linked DBBL cards.')}
                className="flex flex-col items-center text-center group cursor-pointer active:scale-95 transition-transform"
              >
                <div className="w-[52px] h-[52px] flex items-center justify-center relative">
                  {/* Custom SVG: Purple wallet containing cards + custom pink '+' circlet badge */}
                  <svg className="w-[45px] h-[45px] select-none" viewBox="0 0 64 64" fill="none">
                    <rect x="20" y="8" width="24" height="15" rx="2" fill="#D8B4FE" stroke="#A855F7" strokeWidth="1.5" />
                    <rect x="24" y="11" width="16" height="4" fill="#FFFFFF" opacity="0.8" />
                    <rect x="12" y="20" width="40" height="28" rx="4" fill="#A855F7" stroke="#7E22CE" strokeWidth="2.2" />
                    <path d="M42 29h10v10H42z" fill="#7E22CE" />
                    <circle cx="47" cy="34" r="1.5" fill="#FBBF24" />
                    <circle cx="17" cy="40" r="7" fill="#EC4899" />
                    <path d="M14 40h6M17 37v6" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="text-[10px] leading-tight font-sans font-semibold text-gray-950 mt-1.5 max-w-[85px] tracking-tight">
                  {t.addMoney}
                </span>
              </div>

              {/* 6. Bill Pay */}
              <div 
                onClick={() => alert('Bill pay simulation list below is interactive.')}
                className="flex flex-col items-center text-center group cursor-pointer active:scale-95 transition-transform"
              >
                <div className="w-[52px] h-[52px] flex items-center justify-center">
                  {/* Custom SVG: File folder with "PAY BILL" in dark label, overlapping indigo phone */}
                  <svg className="w-[46px] h-[46px] select-none" viewBox="0 0 64 64" fill="none">
                    <rect x="12" y="10" width="32" height="40" rx="3.5" fill="#FFE082" stroke="#FFB300" strokeWidth="2" />
                    <rect x="16" y="15" width="24" height="7" fill="#FF8F00" rx="1.5" />
                    <text x="18" y="20.5" fill="#FFFFFF" fontSize="5.5" fontWeight="900" fontFamily="sans-serif" letterSpacing="0.2">PAY BILL</text>
                    <line x1="17" y1="28" x2="33" y2="28" stroke="#FFB300" strokeWidth="2.2" strokeLinecap="round" />
                    <line x1="17" y1="35" x2="29" y2="35" stroke="#FFB300" strokeWidth="2.2" strokeLinecap="round" />
                    <line x1="17" y1="42" x2="33" y2="42" stroke="#FFB300" strokeWidth="2.2" strokeLinecap="round" />
                    <rect x="42" y="25" width="12" height="22" rx="2" fill="#1E3A8A" stroke="#3B82F6" strokeWidth="1.2" />
                    <rect x="44" y="28" width="8" height="12" fill="#FFFFFF" />
                    <circle cx="48" cy="43" r="1" fill="#FFFFFF" />
                  </svg>
                </div>
                <span className="text-[10px] leading-tight font-sans font-semibold text-gray-950 mt-1.5 max-w-[85px] tracking-tight">
                  {t.billPay}
                </span>
              </div>

              {/* 7. Fund Transfer */}
              <div 
                onClick={() => alert('DBBL Core Account Banking Transfers.')}
                className="flex flex-col items-center text-center group cursor-pointer active:scale-95 transition-transform"
              >
                <div className="w-[52px] h-[52px] flex items-center justify-center">
                  {/* Custom SVG: Greek Columns Bank temple top right, mobile bottom left, blue arrows transfer */}
                  <svg className="w-[46px] h-[46px] select-none" viewBox="0 0 64 64" fill="none">
                    <path d="M34 18h22v2.5H34z" fill="#475569" />
                    <path d="M36 12l9-6 9 6zm2 8.5h2v8h-2zm6 0h2v8h-2zm6 0h2v8h-2zm-14 10.5h18v2.5H30z" fill="#475569" />
                    <rect x="7" y="27" width="16" height="28" rx="3.5" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5" />
                    <rect x="10" y="31" width="10" height="16" rx="1" fill="#FFFFFF" />
                    <circle cx="15" cy="50" r="1.5" fill="#FFFFFF" />
                    <path d="M26 33h13l-4-4" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M39 41H26l4 4" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-[10px] leading-tight font-sans font-semibold text-gray-950 mt-1.5 max-w-[85px] tracking-tight">
                  {t.fundTransfer}
                </span>
              </div>

              {/* 8. Link A/C Setup */}
              <div 
                onClick={() => alert('Account authentication mapping.')}
                className="flex flex-col items-center text-center group cursor-pointer active:scale-95 transition-transform"
              >
                <div className="w-[52px] h-[52px] flex items-center justify-center">
                  {/* Custom SVG: User sheet template form with blue overlay check/link gears */}
                  <svg className="w-[45px] h-[45px] select-none" viewBox="0 0 64 64" fill="none">
                    <rect x="16" y="10" width="32" height="38" rx="3" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="1.8" />
                    <line x1="30" y1="18" x2="42" y2="18" stroke="#93C5FD" strokeWidth="3.2" strokeLinecap="round" />
                    <line x1="30" y1="25" x2="42" y2="25" stroke="#93C5FD" strokeWidth="3.2" strokeLinecap="round" />
                    <circle cx="23" cy="18" r="4" fill="#F97316" />
                    <path d="M19 26.5a4 4 0 018 0v1.5h-8v-1.5z" fill="#F97316" />
                    <circle cx="44" cy="38" r="8" fill="#1E3A8A" />
                    <path d="M40 38h8M44 34v8" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="text-[10px] leading-tight font-sans font-semibold text-gray-950 mt-1.5 max-w-[85px] tracking-tight">
                  {t.linkAc}
                </span>
              </div>

              {/* 9. Loan EMI */}
              <div 
                onClick={() => alert('Interactive loan payment structures.')}
                className="flex flex-col items-center text-center group cursor-pointer active:scale-95 transition-transform"
              >
                <div className="w-[52px] h-[52px] flex items-center justify-center">
                  {/* Custom SVG: Hand holding money cash bundles */}
                  <svg className="w-[46px] h-[46px] select-none" viewBox="0 0 64 64" fill="none">
                    <path d="M12 42c8-1 12-5 22-5s14 3 14 3v5H12v-3z" fill="#DCFCE7" />
                    <path d="M12 42c8-1 12-5 22-5" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
                    <rect x="22" y="14" width="26" height="15" rx="1.2" fill="#10B981" stroke="#047857" strokeWidth="2" transform="rotate(-15 22 14)" />
                    <rect x="25" y="17" width="20" height="9" fill="#A7F3D0" transform="rotate(-15 22 14)" />
                    <text x="32" y="24.5" fill="#047857" fontSize="8" fontWeight="bold" fontFamily="sans-serif" transform="rotate(-15 22 14)">৳</text>
                    <rect x="33" y="12" width="5" height="19" fill="#FBBF24" transform="rotate(-15 22 14)" />
                  </svg>
                </div>
                <span className="text-[10px] leading-tight font-sans font-semibold text-gray-950 mt-1.5 max-w-[85px] tracking-tight">
                  {t.loanEmi}
                </span>
              </div>

              {/* 10. e-Toll */}
              <div 
                onClick={() => alert('Toll gate automatic payment pairing.')}
                className="flex flex-col items-center text-center group cursor-pointer active:scale-95 transition-transform"
              >
                <div className="w-[52px] h-[52px] flex items-center justify-center">
                  {/* Custom SVG: e-Toll smart card flying on dark road with red circular background */}
                  <svg className="w-[46px] h-[46px] select-none" viewBox="0 0 64 64" fill="none">
                    <circle cx="32" cy="32" r="22" fill="#FEE2E2" />
                    <path d="M18 44l10-24h8l10 24H18z" fill="#4B5563" />
                    <path d="M32 20v24" stroke="#FBBF24" strokeWidth="2.5" strokeDasharray="3 3" />
                    <rect x="14" y="14" width="22" height="14" rx="2" fill="#EF4444" stroke="#DC2626" strokeWidth="1" transform="rotate(10 14 14)" />
                    <text x="17" y="23" fill="#FFFFFF" fontSize="6.5" fontWeight="950" fontFamily="sans-serif" transform="rotate(10 14 14)">e-Toll</text>
                  </svg>
                </div>
                <span className="text-[10px] leading-tight font-sans font-semibold text-gray-950 mt-1.5 max-w-[85px] tracking-tight">
                  {t.eToll}
                </span>
              </div>

              {/* 11. Metro Rail */}
              <div 
                onClick={() => alert('MRT pass instant recharges.')}
                className="flex flex-col items-center text-center group cursor-pointer active:scale-95 transition-transform"
              >
                <div className="w-[52px] h-[52px] flex items-center justify-center">
                  {/* Custom SVG: Green Metro Rail speed model inside red-outlined circle */}
                  <svg className="w-[46px] h-[46px] select-none" viewBox="0 0 64 64" fill="none">
                    <circle cx="32" cy="32" r="22" fill="#FFFFFF" stroke="#DC2626" strokeWidth="2" />
                    <path d="M14 41h36" stroke="#9CA3AF" strokeWidth="2" />
                    <path d="M18 41l-2 4M24 41l-1.5 4M30 41v4M36 41l1.5 4M42 41l2 4" stroke="#9CA3AF" strokeWidth="1.5" />
                    <path d="M16 26h22c4 0 8 2 10 5l2.2 4c.4.6 0 1.2-.6 1.2H16V26z" fill="#059669" />
                    <path d="M16 32h30c2 0 4 .5 5 1.5l1.5 1.5H16v-3z" fill="#DC2626" />
                    <rect x="20" y="28.5" width="5" height="2" fill="#FFFFFF" />
                    <rect x="28" y="28.5" width="5" height="2" fill="#FFFFFF" />
                    <rect x="36" y="28.5" width="4" height="2" fill="#FFFFFF" />
                    <path d="M43 30H47l1 1.5H43V30z" fill="#FFFFFF" />
                  </svg>
                </div>
                <span className="text-[10px] leading-tight font-sans font-semibold text-gray-950 mt-1.5 max-w-[85px] tracking-tight">
                  {t.metroRail}
                </span>
              </div>

              {/* 12. Insurance Plan */}
              <div 
                onClick={() => alert('Premium policy payments.')}
                className="flex flex-col items-center text-center group cursor-pointer active:scale-95 transition-transform"
              >
                <div className="w-[52px] h-[52px] flex items-center justify-center">
                  {/* Custom SVG: Hand carrying blue circular protection shield and house symbol */}
                  <svg className="w-[46px] h-[46px] select-none" viewBox="0 0 64 64" fill="none">
                    <path d="M12 40c10 0 14-4 20-4s10 4 20 4" stroke="#0E82A7" strokeWidth="2" strokeLinecap="round" />
                    <path d="M12 42v4c10 0 14-4 20-4s10 4 20 4v-4" fill="#E0F2FE" />
                    <circle cx="32" cy="24" r="11.5" fill="#0EA5E9" />
                    <path d="M26 23l6-5 6 5v5c0 3.5-2.5 6-6 7-3.5-1-6-3.5-6-7v-5z" fill="#FFFFFF" />
                    <path d="M29 25l2 2 4-4" stroke="#0EA5E9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-[10px] leading-tight font-sans font-semibold text-gray-950 mt-1.5 max-w-[85px] tracking-tight">
                  {t.insurancePlan}
                </span>
              </div>

            </div>
          )}

          {/* Toggle buttons matching aesthetic list bar */}
          <div className="border-t border-gray-100 pt-2 flex justify-center mt-2">
            <button 
              onClick={() => setIsServicesExpanded(!isServicesExpanded)}
              className="w-7 h-7 bg-gray-50 text-gray-600 rounded-full border border-gray-200/60 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-all active:scale-90"
            >
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isServicesExpanded ? 'transform rotate-180' : ''}`} />
            </button>
          </div>

        </div>
      </div>

      {/* Promotional Banners slider matching Screenshot 5 & 6 */}
      <div id="home-banner-slideshow" className="px-4 mt-4 select-none">
        
        {currentPromo.isBanner ? (
          /* Static style banner */
          <div 
            onClick={() => alert('Easily pay bills with zero additional transaction costs.')}
            className={`w-full bg-gradient-to-r ${currentPromo.bg} text-white rounded-2xl shadow p-4 relative min-h-[110px] flex items-center overflow-hidden cursor-pointer active:scale-99 transition-transform`}
          >
            <div className="flex-1 pr-14 select-none">
              <span className="text-pink-400 font-bold tracking-wider text-[11px] block uppercase">Rocket Pay</span>
              <span className="text-[17px] font-extrabold tracking-tight leading-snug font-sans block mt-0.5">
                {currentPromo.textMain}
              </span>
              <span className="text-yellow-400 text-sm font-bold block mt-1">
                {currentPromo.textHighlight}
              </span>
            </div>

            {/* Simulated mini logo watermark inside card right */}
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 opacity-20">
              <QrCode className="w-16 h-16 text-white" />
            </div>
            
            {/* Sliding dot overlays */}
            <div className="absolute bottom-2.5 right-4 flex items-center gap-1.5">
              {PROMO_SLIDES.map((_, dotIdx) => (
                <div 
                  key={dotIdx}
                  onClick={(e) => { e.stopPropagation(); setActivePromoIndex(dotIdx); }}
                  className={`w-1.5 h-1.5 rounded-full transition-color ${dotIdx === activePromoIndex ? 'bg-white scale-125' : 'bg-white/40'}`}
                />
              ))}
            </div>
          </div>
        ) : (
          /* Micro-Offer Card Slider GP & Banglalink template */
          <div 
            onClick={() => alert(`Cashback deals starting simulated for ${currentPromo.type}`)}
            className={`w-full bg-gradient-to-r ${currentPromo.bg} rounded-2xl shadow p-3.5 text-white flex flex-col min-h-[110px] cursor-pointer active:scale-99 transition-transform`}
          >
            <div className="flex justify-between items-start select-none">
              <div className="flex flex-col">
                <span className="text-[14px] font-extrabold font-sans tracking-wide">
                  {currentPromo.textMain}
                </span>
                <span className="text-yellow-300 font-black text-xs uppercase tracking-super-wide italic">
                  {currentPromo.textHighlight}
                </span>
              </div>

              {/* Tag / Validity */}
              <span className="text-[7.5px] bg-black/20 backdrop-blur-xs py-0.5 px-2 rounded-full border border-white/10">
                {currentPromo.type} Special
              </span>
            </div>

            {/* Badges / Circles representation in a horizontal row */}
            <div className="flex items-center gap-2 mt-2 select-none">
              {currentPromo.badges?.map((badge, bIdx) => (
                <div 
                  key={bIdx}
                  className="flex-1 bg-white/10 border border-white/20 rounded-xl p-1.5 flex flex-col items-center justify-between text-center backdrop-blur-xs hover:bg-white/20 transition-all"
                >
                  <span className="text-[9px] font-bold text-yellow-300 tracking-tight leading-none">
                    {badge.main}
                  </span>
                  <span className="text-[7.5px] text-white opacity-90 truncate leading-none mt-0.5">
                    {badge.sub1}
                  </span>
                  <span className="text-[8.5px] font-extrabold text-[#7ee7ff] uppercase leading-none mt-1">
                    ক্যাশব্যাক ৳{badge.cash}
                  </span>
                </div>
              ))}
            </div>

            {/* bottom pagination dots */}
            <div className="flex justify-between items-center mt-3 select-none">
              <span className="text-[7.5px] text-white/70 italic max-w-[200px] truncate">
                {currentPromo.terms}
              </span>

              <div className="flex items-center gap-1.5">
                {PROMO_SLIDES.map((_, dotIdx) => (
                  <div 
                    key={dotIdx}
                    onClick={(e) => { e.stopPropagation(); setActivePromoIndex(dotIdx); }}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${dotIdx === activePromoIndex ? 'bg-white scale-125' : 'bg-white/40'}`}
                  />
                ))}
              </div>
            </div>

          </div>
        )}
      </div>

      {/* Bill Pay (Company Categories List) */}
      <div id="home-bill-pay-categories" className="px-4 mt-4 select-none">
        <div className="bg-white rounded-2xl shadow-sm p-4 flex flex-col">
          
          <div className="flex justify-between items-center mb-3">
            <span className="text-[13px] font-bold text-gray-800 tracking-wide uppercase border-l-3 border-rocket pl-1.5">
              {t.billPaySec}
            </span>
          </div>

          {isBillPayExpanded && (
            <div className="grid grid-cols-4 gap-y-4 gap-x-2 my-1 animate-fadeIn">
              
              {/* Education */}
              <div onClick={() => alert('Education bills search list.')} className="flex flex-col items-center text-center cursor-pointer active:scale-95 transition-transform">
                <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center border border-red-100 text-red-600">
                  <GraduationCap className="w-5.5 h-5.5" />
                </div>
                <span className="text-[9px] font-medium text-gray-950 mt-1 max-w-[80px]">
                  {t.education}
                </span>
              </div>

              {/* Electricity */}
              <div onClick={() => alert('Electricity bills catalog.')} className="flex flex-col items-center text-center cursor-pointer active:scale-95 transition-transform">
                <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center border border-amber-100 text-amber-500">
                  <Lightbulb className="w-5.5 h-5.5" />
                </div>
                <span className="text-[9px] font-medium text-gray-950 mt-1 max-w-[80px]">
                  {t.electricity}
                </span>
              </div>

              {/* Gas */}
              <div onClick={() => alert('Gas supply bills.')} className="flex flex-col items-center text-center cursor-pointer active:scale-95 transition-transform">
                <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center border border-orange-100 text-orange-500">
                  <Flame className="w-5.5 h-5.5" />
                </div>
                <span className="text-[9px] font-medium text-gray-950 mt-1 max-w-[80px]">
                  {t.gas}
                </span>
              </div>

              {/* Water */}
              <div onClick={() => alert('Dhaka WASA & other water bills.')} className="flex flex-col items-center text-center cursor-pointer active:scale-95 transition-transform">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100 text-blue-500">
                  <Droplet className="w-5.5 h-5.5" />
                </div>
                <span className="text-[9px] font-medium text-gray-950 mt-1 max-w-[80px]">
                  {t.water}
                </span>
              </div>

              {/* Govt. Fee */}
              <div onClick={() => alert('Government utilities and passport recharges.')} className="flex flex-col items-center text-center cursor-pointer active:scale-95 transition-transform">
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-100 text-emerald-600">
                  <Award className="w-5.5 h-5.5" />
                </div>
                <span className="text-[9px] font-medium text-gray-950 mt-1 max-w-[80px]">
                  {t.govtFee}
                </span>
              </div>

              {/* Internet */}
              <div onClick={() => alert('Local ISP payments.')} className="flex flex-col items-center text-center cursor-pointer active:scale-95 transition-transform">
                <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center border border-pink-100 text-pink-500">
                  <Network className="w-5.5 h-5.5" />
                </div>
                <span className="text-[9px] font-medium text-gray-950 mt-1 max-w-[80px]">
                  {t.internet}
                </span>
              </div>

              {/* Insurance */}
              <div onClick={() => alert('MetLife & standard premium checks.')} className="flex flex-col items-center text-center cursor-pointer active:scale-95 transition-transform">
                <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center border border-purple-100 text-purple-500">
                  <ShieldCheck className="w-5.5 h-5.5" />
                </div>
                <span className="text-[9px] font-medium text-gray-950 mt-1 max-w-[80px]">
                  {t.insurance}
                </span>
              </div>

              {/* Bank & FI */}
              <div onClick={() => alert('Other bank deposits & installments.')} className="flex flex-col items-center text-center cursor-pointer active:scale-95 transition-transform">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 text-slate-600">
                  <Landmark className="w-5.5 h-5.5" />
                </div>
                <span className="text-[9px] font-medium text-gray-950 mt-1 max-w-[80px]">
                  {t.bankFi}
                </span>
              </div>

            </div>
          )}

          {/* Toggle buttons */}
          <div className="border-t border-gray-100 pt-2 flex justify-center mt-2">
            <button 
              onClick={() => setIsBillPayExpanded(!isBillPayExpanded)}
              className="w-7 h-7 bg-gray-50 text-gray-600 rounded-full border border-gray-200/60 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-all active:scale-90"
            >
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isBillPayExpanded ? 'transform rotate-180' : ''}`} />
            </button>
          </div>

        </div>
      </div>

      {/* Suggestion / সাম্প্রতিক Section */}
      <div id="home-suggestions" className="px-4 mt-4 select-none mb-6">
        <div className="bg-white rounded-2xl shadow-sm p-4 flex flex-col">
          <span className="text-[13px] font-bold text-gray-800 tracking-wide uppercase border-l-3 border-rocket pl-1.5 mb-3">
            {t.suggestion}
          </span>

          <div className="grid grid-cols-4 gap-3">
            {SUGGESTIONS.map((item, idx) => (
              <div 
                key={idx} 
                onClick={() => alert(`Launching utility payment for ${item.name}`)}
                className="flex flex-col items-center text-center group cursor-pointer active:scale-95 transition-transform"
              >
                <div className="w-11 h-11 bg-slate-50 border border-slate-100/80 rounded-full flex items-center justify-center text-xl shadow-2xs group-hover:bg-violet-55 transition-colors">
                  {item.iconUrl}
                </div>
                <span className="text-[9px] leading-tight font-semibold text-gray-700 mt-1 truncate w-full max-w-[80px]">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Constant Bottom Interactive Toolbar with raised Center QR Scanner */}
      <div 
        id="home-sticky-dock"
        className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[420px] h-[72px] bg-white border-t border-gray-200 flex justify-around items-center px-4 rounded-t-xl z-40 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] select-none pt-1"
      >
        {/* Home option (Active) */}
        <button 
          onClick={() => setScreen('DASHBOARD')}
          className="flex-1 flex flex-col items-center justify-center gap-1 cursor-pointer select-none active:scale-95 transition-transform text-rocket"
        >
          <Home className="w-[21px] h-[21px]" strokeWidth={2.5} />
          <span className="text-[10px] font-bold">{t.home}</span>
        </button>

        {/* Elevated Floating Scan QR component */}
        <div className="flex-1 flex justify-center -mt-6 select-none relative">
          <button 
            onClick={() => setScreen('SCAN_QR_MOCK')}
            className="w-15 h-15 bg-rocket border-4 border-white text-white rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-rocket-dark active:scale-90 transition-transform relative z-50"
          >
            <QrCode className="w-7 h-7 text-white" strokeWidth={2.5} />
          </button>
          <span className="text-[10px] absolute bottom-[-22px] font-bold text-gray-800">
            {t.scanQr}
          </span>
        </div>

        {/* More Options list trigger */}
        <button 
          onClick={() => setScreen('MORE_MENU')}
          className="flex-1 flex flex-col items-center justify-center gap-1 cursor-pointer select-none active:scale-95 transition-transform text-gray-500 hover:text-rocket"
        >
          <Menu className="w-[21px] h-[21px]" strokeWidth={2.5} />
          <span className="text-[10px] font-bold text-gray-700">{t.more}</span>
        </button>
      </div>

    </div>
  );
}
export default Dashboard;
