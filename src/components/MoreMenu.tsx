/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ArrowLeft, Landmark, FileText, BarChart2, DollarSign, QrCode, MapPin, 
  Info, PhoneCall, PenTool, MessageSquare, LogOut, ChevronRight, UserCircle 
} from 'lucide-react';
import { StatusNotch } from './StatusNotch';
import { TRANSLATIONS } from '../data';
import { Language, Screen, Transaction, LimitCategory } from '../types';

interface MoreMenuProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  balance: number;
  setScreen: (scr: Screen) => void;
  userPhone: string;
  transactions: Transaction[];
  limits: LimitCategory[];
  onLogout: () => void;
}

export function MoreMenu({ 
  language, setLanguage, balance, setScreen, userPhone, transactions, limits, onLogout 
}: MoreMenuProps) {
  const [submenu, setSubmenu] = useState<'NONE' | 'BALANCE' | 'STATEMENT' | 'LIMITS' | 'QR'>('NONE');
  const [statementFilter, setStatementFilter] = useState<'ALL' | 'IN' | 'OUT'>('ALL');
  
  const t = TRANSLATIONS[language];

  const handleToggleLanguage = () => {
    setLanguage(language === 'EN' ? 'BN' : 'EN');
  };

  const filteredTransactions = transactions.filter(tx => {
    if (statementFilter === 'ALL') return true;
    return tx.type === statementFilter;
  });

  return (
    <div id="more-menu-container" className="w-full h-full flex flex-col bg-[#F3F4F6] select-none relative pb-16 overflow-y-auto">
      
      {/* Dynamic Submenu display routing overlays */}
      {submenu === 'NONE' ? (
        /* CORE LIST DIRECTORY VIEW (Screenshot 17) */
        <div className="flex-1 flex flex-col animate-fadeIn select-none">
          
          {/* Curved Purple Profile Header */}
          <div className="bg-rocket text-white pb-6 rounded-b-[36px] relative shadow-md select-none">
            <StatusNotch isDarkTheme={true} />

            {/* Language toggle top right */}
            <div className="flex justify-between items-center px-5 pt-5 mb-1.5">
              <button 
                onClick={() => setScreen('DASHBOARD')}
                className="p-1 px-2 hover:bg-white/10 rounded-full flex items-center gap-1 font-sans text-[11px] font-bold cursor-pointer"
              >
                <ArrowLeft className="w-4.5 h-4.5" />
                <span>Home</span>
              </button>

              <button 
                onClick={handleToggleLanguage}
                className="border border-white/45 bg-white/15 text-white font-sans font-semibold text-xs py-1 px-5 rounded-full select-none hover:bg-white/20 transition-all cursor-pointer"
              >
                {t.banglaToggle}
              </button>
            </div>

            {/* Column Profile details */}
            <div className="flex flex-col items-center select-none text-center px-4">
              <div className="w-20 h-20 rounded-full bg-white/20 border-2 border-white/45 flex items-center justify-center relative shadow-md">
                <svg className="w-12 h-12 text-white/95" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12c0 2.651 1.057 5.055 2.766 6.829a.75.75 0 001.066.015 11.536 11.536 0 0111.533 0 .75.75 0 001.066-.015zM12 6.75a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5z" clipRule="evenodd" />
                </svg>

                {/* Edit Pencil icon exactly as screenshot 17 */}
                <div className="absolute bottom-0 right-0 w-6 h-6 bg-white border border-rocket rounded-full flex items-center justify-center shadow">
                  <span className="text-[11px]">✏️</span>
                </div>
              </div>

              <h2 className="font-extrabold text-[15px] uppercase tracking-wide mt-2">
                MD MILON MIA
              </h2>
              <span className="text-[11px] text-white/80 font-mono tracking-wide mt-0.5">
                {userPhone}, CORPORATE_SALARY
              </span>
            </div>
          </div>

          {/* Menus List Grid options */}
          <div className="px-4 mt-4 select-none">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 divide-y divide-gray-100">
              
              {/* Balance Inquiry */}
              <div 
                onClick={() => setSubmenu('BALANCE')}
                className="flex items-center justify-between p-4 bg-white hover:bg-violet-50/20 active:bg-gray-100 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
                    <Landmark className="w-[18px] h-[18px]" strokeWidth={2.5} />
                  </div>
                  <span className="text-[14px] font-bold text-gray-800">{t.balanceInquiry}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>

              {/* Mini Statement */}
              <div 
                onClick={() => setSubmenu('STATEMENT')}
                className="flex items-center justify-between p-4 bg-white hover:bg-violet-50/20 active:bg-gray-100 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                    <FileText className="w-[18px] h-[18px]" strokeWidth={2.5} />
                  </div>
                  <span className="text-[14px] font-bold text-gray-800">{t.miniStatement}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>

              {/* Transaction Limits */}
              <div 
                onClick={() => setSubmenu('LIMITS')}
                className="flex items-center justify-between p-4 bg-white hover:bg-violet-50/20 active:bg-gray-100 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center text-pink-500">
                    <BarChart2 className="w-[18px] h-[18px]" strokeWidth={2.5} />
                  </div>
                  <span className="text-[14px] font-bold text-gray-800">{t.limits}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>

              {/* Service Charges */}
              <div 
                onClick={() => alert(language === 'EN' ? 'Send Money: Free. Cash Out: 1.5%. add money: Free.' : 'সেন্ড মানি: ফ্রি। ক্যাশ আউট: ১.৫%। অ্যাড মানি: ফ্রি।')}
                className="flex items-center justify-between p-4 bg-white hover:bg-violet-50/20 active:bg-gray-100 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center text-teal-600">
                    <DollarSign className="w-[18px] h-[18px]" strokeWidth={2.5} />
                  </div>
                  <span className="text-[14px] font-bold text-gray-800">{t.serviceCharges}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>

              {/* My QR */}
              <div 
                onClick={() => setSubmenu('QR')}
                className="flex items-center justify-between p-4 bg-white hover:bg-violet-50/20 active:bg-gray-100 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                    <QrCode className="w-[18px] h-[18px]" strokeWidth={2.5} />
                  </div>
                  <span className="text-[14px] font-bold text-gray-800">{t.myQr}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>

              {/* Store Locator */}
              <div 
                onClick={() => alert('Launching Store Locator maps.')}
                className="flex items-center justify-between p-4 bg-white hover:bg-violet-50/20 active:bg-gray-100 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-cyan-50 flex items-center justify-center text-cyan-600">
                    <MapPin className="w-[18px] h-[18px]" strokeWidth={2.5} />
                  </div>
                  <span className="text-[14px] font-bold text-gray-800">{t.storeLocator}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>

            </div>
          </div>

          {/* Others Subhead */}
          <div className="px-5 mt-4 select-none">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{t.others}</span>
          </div>

          <div className="px-4 mt-2 mb-8 select-none">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 divide-y divide-gray-100">
              
              {/* About Us */}
              <div 
                onClick={() => alert('Rocket Mobile banking is an elite, safe service of Dutch-Bangla Bank PLC, Bangladesh.')}
                className="flex items-center justify-between p-4 bg-white hover:bg-violet-50/20 active:bg-gray-100 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <Info className="w-5 h-5 text-[#8c2282]" />
                  <span className="text-[14px] font-bold text-gray-800">{t.aboutUs}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>

              {/* Contact Us */}
              <div 
                onClick={() => alert('Need help? Dial 24/7 helpline at 16216.')}
                className="flex items-center justify-between p-4 bg-white hover:bg-violet-50/20 active:bg-gray-100 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <PhoneCall className="w-5 h-5 text-[#8c2282]" />
                  <span className="text-[14px] font-bold text-gray-800">{t.contactUs}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>

              {/* Complain / Feedback */}
              <div 
                onClick={() => alert('Thank you for feedback! Direct email at complain@dutchbanglabank.com')}
                className="flex items-center justify-between p-4 bg-white hover:bg-violet-50/20 active:bg-gray-100 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <MessageSquare className="w-5 h-5 text-[#8c2282]" />
                  <span className="text-[14px] font-bold text-gray-800">{t.complainFeedback}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>

              {/* Logout button */}
              <div 
                onClick={onLogout}
                className="flex items-center justify-between p-4 bg-white hover:bg-red-50 active:bg-red-100 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3.5 text-rose-600">
                  <LogOut className="w-5 h-5 text-rose-600" />
                  <span className="text-[14px] font-bold">{t.logout}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300" />
              </div>

            </div>
          </div>

          {/* System version code */}
          <div className="w-full text-center py-4 text-[12px] font-bold tracking-widest font-sans text-gray-900 mb-6">
            Rocket-3.1.1
          </div>

        </div>
      ) : (
        /* OTHER DETAILED SUBPAGES OPTIONS ROUTER SCREEN RENDERING (Balance Inquiry, Mini Statement, Limits, QR Code) */
        <div className="flex-1 flex flex-col animate-fadeIn">
          
          {/* Detailed Purple Screen Sub Header */}
          <div className="bg-rocket text-white pb-3 select-none">
            <StatusNotch isDarkTheme={true} />
            <div className="flex items-center px-4 pt-4 gap-1">
              <button 
                onClick={() => { setSubmenu('NONE'); }}
                className="p-1.5 text-white active:scale-90 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-5.5 h-5.5" />
              </button>
              
              <h1 className="text-[17px] font-bold tracking-wide font-sans pl-2">
                {submenu === 'BALANCE' && t.balanceInquiry}
                {submenu === 'STATEMENT' && t.miniStatement}
                {submenu === 'LIMITS' && t.limits}
                {submenu === 'QR' && t.myQr}
              </h1>
            </div>
          </div>

          {/* Balance detailed view (Screenshot 18) */}
          {submenu === 'BALANCE' && (
            <div className="p-4 flex-1 flex flex-col gap-4 select-none animate-fadeIn">
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5 grid grid-cols-2 divide-x divide-gray-150 select-none">
                
                {/* Available reserves card */}
                <div className="flex flex-col pr-4 select-none">
                  <span className="text-[11px] font-extrabold text-[#8c2282] uppercase tracking-wide">
                    {t.availableBalance}
                  </span>
                  <span className="text-[17px] font-extrabold text-gray-900 font-sans mt-1.5">
                    ৳ {balance.toFixed(2)}
                  </span>
                </div>

                {/* Current balances */}
                <div className="flex flex-col pl-4 select-none">
                  <span className="text-[11px] font-extrabold text-[#8c2282] uppercase tracking-wide">
                     {t.currentBalance}
                  </span>
                  <span className="text-[17px] font-extrabold text-gray-900 font-sans mt-1.5">
                    ৳ {balance.toFixed(2)}
                  </span>
                </div>

              </div>
            </div>
          )}

          {/* Mini Statement list view (Screenshot 19) */}
          {submenu === 'STATEMENT' && (
            <div className="flex-1 p-4 flex flex-col bg-[#F3F4F6] select-none animate-fadeIn">
              
              {/* Filter tabs: "All", "In", "Out" centered closely */}
              <div className="flex justify-center items-center gap-3 mb-4 select-none">
                <button 
                  onClick={() => setStatementFilter('ALL')}
                  className={`py-1.5 px-6 rounded-full font-sans text-xs font-bold transition-colors cursor-pointer select-none ${
                    statementFilter === 'ALL' 
                      ? 'bg-rocket text-white hover:bg-rocket-dark shadow-sm' 
                      : 'bg-white text-gray-600 hover:bg-gray-150'
                  }`}
                >
                  {t.all}
                </button>

                <button 
                  onClick={() => setStatementFilter('IN')}
                  className={`py-1.5 px-6 rounded-full font-sans text-xs font-bold transition-colors cursor-pointer select-none ${
                    statementFilter === 'IN' 
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm' 
                      : 'bg-white text-gray-600 hover:bg-gray-150'
                  }`}
                >
                  {t.in}
                </button>

                <button 
                  onClick={() => setStatementFilter('OUT')}
                  className={`py-1.5 px-6 rounded-full font-sans text-xs font-bold transition-colors cursor-pointer select-none ${
                    statementFilter === 'OUT' 
                      ? 'bg-rocket-accent text-white hover:bg-red-650 shadow-sm' 
                      : 'bg-white text-gray-600 hover:bg-gray-150'
                  }`}
                >
                  {t.out}
                </button>
              </div>

              {/* Transactions list layout cards */}
              <div className="flex-1 flex flex-col gap-3 overflow-y-auto pr-1">
                {filteredTransactions.length === 0 ? (
                  <div className="bg-white rounded-xl p-8 text-center border border-gray-150 select-none">
                    <span className="text-gray-500 font-semibold">{t.emptyStatements}</span>
                  </div>
                ) : (
                  filteredTransactions.map((tx, txIdx) => (
                    <div 
                      key={txIdx}
                      className="bg-white border border-gray-100 rounded-xl p-4 shadow-3xs hover:shadow-2xs transition-shadow flex flex-col relative select-none"
                    >
                      {/* Top metadata row with ID & color-coded amount */}
                      <div className="flex justify-between items-baseline select-none">
                        <span className="font-mono text-[12px] font-black leading-none text-gray-900 tracking-tight">
                          ID: {tx.id}
                        </span>

                        <span className={`text-[13.5px] font-bold leading-none ${
                          tx.type === 'IN' ? 'text-emerald-600' : 'text-rocket-accent'
                        }`}>
                          {tx.type === 'IN' ? '+' : '−'} ৳{tx.amount.toFixed(2)}
                        </span>
                      </div>

                      {/* Date Row */}
                      <span className="text-[10px] text-gray-400 font-semibold font-mono mt-1.5">
                        Date: {tx.date}
                      </span>

                      {/* Details context string (e.g., Top-up details) */}
                      <p className="text-[11px] leading-relaxed text-gray-700 font-bold font-sans mt-2 tracking-wide pr-4">
                        {tx.title}
                      </p>
                    </div>
                  ))
                )}
              </div>

            </div>
          )}

          {/* Transaction Limits table view (Screenshot 20) */}
          {submenu === 'LIMITS' && (
            <div className="flex-1 p-4 bg-[#F3F4F6] overflow-y-auto select-none animate-fadeIn">
              <div className="flex flex-col gap-4 pb-8 select-none">
                
                {limits.map((cat, catIdx) => (
                  <div 
                    key={catIdx}
                    className="bg-white rounded-xl shadow-sm border border-gray-50 overflow-hidden select-none"
                  >
                    {/* Header bar */}
                    <div className="bg-[#EBEBEB] text-gray-900 font-sans font-bold text-[13.5px] px-4 py-2 text-center border-b border-gray-150 select-none">
                      {cat.title}
                    </div>

                    {/* Limit structured columns tables */}
                    <table className="w-full text-center border-collapse select-none">
                      <thead>
                        <tr className="border-b border-gray-150 text-[10px] uppercase font-bold text-gray-500 bg-gray-50/50">
                          <th className="py-2.5 w-1/4"></th>
                          <th className="py-2.5 border-r border-gray-150">Count</th>
                          <th className="py-2.5">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Daily row */}
                        <tr className="border-b border-gray-150 select-none text-center">
                          <td className="py-3 font-sans font-bold text-[12px] text-gray-950">Daily</td>
                          
                          {/* Count Daily */}
                          <td className="py-3 border-r border-gray-150 align-middle">
                            <div className="flex flex-col items-center">
                              <span className="text-[11.5px] font-extrabold text-[#8c2282]">{cat.daily.countCurrent}</span>
                              <div className="w-14 h-[1.5px] bg-[#8c2282] my-0.5" />
                              <span className="text-[11px] text-gray-950 font-bold">{cat.daily.countLimit}</span>
                            </div>
                          </td>

                          {/* Amount Daily */}
                          <td className="py-3 align-middle">
                            <div className="flex flex-col items-center select-none">
                              <span className="text-[11.5px] font-extrabold text-[#8c2282]">৳ {cat.daily.amountCurrent}</span>
                              <div className="w-20 h-[1.5px] bg-[#8c2282] my-0.5" />
                              <span className="text-[11px] text-gray-950 font-bold">৳ {cat.daily.amountLimit}</span>
                            </div>
                          </td>
                        </tr>

                        {/* Monthly row */}
                        <tr className="select-none text-center">
                          <td className="py-3 font-sans font-bold text-[12px] text-gray-950">Monthly</td>
                          
                          {/* Count Monthly */}
                          <td className="py-3 border-r border-gray-150 align-middle">
                            <div className="flex flex-col items-center">
                              <span className="text-[11.5px] font-extrabold text-[#8c2282]">{cat.monthly.countCurrent}</span>
                              <div className="w-14 h-[1.5px] bg-[#8c2282] my-0.5" />
                              <span className="text-[11px] text-gray-950 font-bold">{cat.monthly.countLimit}</span>
                            </div>
                          </td>

                          {/* Amount Monthly */}
                          <td className="py-3 align-middle">
                            <div className="flex flex-col items-center select-none">
                              <span className="text-[11.5px] font-extrabold text-[#8c2282]">৳ {cat.monthly.amountCurrent}</span>
                              <div className="w-20 h-[1.5px] bg-[#8c2282] my-0.5" />
                              <span className="text-[11px] text-gray-950 font-bold">৳ {cat.monthly.amountLimit}</span>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                  </div>
                ))}

              </div>
            </div>
          )}

          {/* Client's Personalized My QR code screen */}
          {submenu === 'QR' && (
            <div className="flex-1 p-6 flex flex-col bg-[#F3F4F6] select-none items-center justify-center animate-fadeIn">
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 flex flex-col items-center w-full max-w-sm">
                
                {/* Client properties and context */}
                <h4 className="font-extrabold font-sans text-[15px] uppercase tracking-wide text-[#8c2282] leading-none">
                  MD MILON MIA
                </h4>
                <p className="font-mono text-xs text-gray-500 font-bold mt-1 mb-6">
                  {userPhone}
                </p>

                {/* Simulated high resolution QR matrix block with centered airplane overlay */}
                <div className="w-48 h-48 border border-dashed border-gray-200 p-4 rounded-xl flex items-center justify-center bg-gray-50 relative select-none">
                  
                  {/* Outer vector frame */}
                  <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-rocket" />
                  <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-rocket" />
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-rocket" />
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-rocket" />

                  {/* Combined static elegant QR grid vectors */}
                  <div className="w-full h-full flex flex-wrap items-center justify-center gap-[5px] opacity-75 select-none">
                    {Array.from({ length: 144 }).map((_, qi) => (
                      <div 
                        key={qi} 
                        className={`w-[10px] h-[10px] rounded-[1px] ${
                          // Structured squares mock QR geometry patterns
                          (qi % 3 === 0 || qi % 7 === 0 || qi < 24 || qi % 11 === 0 || [33, 44, 55, 66, 77, 88].includes(qi)) 
                            ? 'bg-rocket' 
                            : 'bg-transparent'
                        }`} 
                      />
                    ))}
                  </div>

                  {/* Inner small white circular rocket badge */}
                  <div className="absolute w-9 h-9 bg-white rounded-full shadow border-2 border-[#8c2282] flex items-center justify-center z-10">
                    <svg className="w-5 h-5 text-[#8c2282]" viewBox="0 0 100 100" fill="currentColor">
                      <polygon points="10,65 92,8 55,83 45,55" fill="currentColor" />
                    </svg>
                  </div>

                </div>

                <span className="text-[10px] text-gray-500 font-semibold tracking-wide mt-6 uppercase">
                  Scan to Pay directly
                </span>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
export default MoreMenu;
