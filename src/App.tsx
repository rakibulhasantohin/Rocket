/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PhoneFrame } from './components/PhoneFrame';
import { Splash } from './components/Splash';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { SendMoney } from './components/SendMoney';
import { CashOut } from './components/CashOut';
import { MoreMenu } from './components/MoreMenu';
import { ScanQR } from './components/ScanQR';
import { INITIAL_TRANSACTIONS, INITIAL_LIMITS } from './data';
import { Language, Screen, Transaction, LimitCategory } from './types';

export default function App() {
  const [screen, setScreen] = useState<Screen>('LOGIN');
  
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('rocket_lang');
    return (saved as Language) || 'BN';
  });
  
  const [balance, setBalance] = useState<number>(() => {
    const saved = localStorage.getItem('rocket_balance');
    return saved ? parseFloat(saved) : 17494.00;
  });
  
  const [userPhone, setUserPhone] = useState<string>(() => {
    const saved = localStorage.getItem('rocket_phone');
    if (!saved || saved === '017108854029') return '01710885402';
    return saved;
  });
  
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('rocket_transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });
  
  const [limits, setLimits] = useState<LimitCategory[]>(() => {
    const saved = localStorage.getItem('rocket_limits');
    return saved ? JSON.parse(saved) : INITIAL_LIMITS;
  });

  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('rocket_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('rocket_balance', balance.toString());
  }, [balance]);

  useEffect(() => {
    localStorage.setItem('rocket_phone', userPhone);
  }, [userPhone]);

  useEffect(() => {
    localStorage.setItem('rocket_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('rocket_limits', JSON.stringify(limits));
  }, [limits]);

  // Prepends completed transaction log and modifies limit limits counters dynamically
  const addTransaction = (newTx: Transaction) => {
    setTransactions(prev => [newTx, ...prev]);

    // Recalculate transaction limits counter based on transaction types
    setLimits(prevLimits => {
      return prevLimits.map(cat => {
        if (newTx.title.toLowerCase().includes('send') && cat.title.toLowerCase().includes('send')) {
          return {
            ...cat,
            daily: {
              ...cat.daily,
              countCurrent: cat.daily.countCurrent + 1,
              amountCurrent: cat.daily.amountCurrent + newTx.amount
            },
            monthly: {
              ...cat.monthly,
              countCurrent: cat.monthly.countCurrent + 1,
              amountCurrent: cat.monthly.amountCurrent + newTx.amount
            }
          };
        }
        if (newTx.title.toLowerCase().includes('cash out') && cat.title.toLowerCase().includes('cash-out')) {
          return {
            ...cat,
            daily: {
              ...cat.daily,
              countCurrent: cat.daily.countCurrent + 1,
              amountCurrent: cat.daily.amountCurrent + newTx.amount
            },
            monthly: {
              ...cat.monthly,
              countCurrent: cat.monthly.countCurrent + 1,
              amountCurrent: cat.monthly.amountCurrent + newTx.amount
            }
          };
        }
        return cat;
      });
    });
  };

  const logoutUser = () => {
    setScreen('LOGIN');
  };

  return (
    <PhoneFrame>
      {/* Offline Status Badge Indicator */}
      {isOffline && (
        <div id="offline-network-badge" className="bg-amber-600 text-white text-[12px] font-semibold py-1.5 px-3 text-center flex items-center justify-center gap-1.5 select-none animate-pulse shrink-0 w-full z-40 sticky top-0 border-b border-amber-700 font-bengali shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-ping"></span>
          {language === 'BN' 
            ? 'আপনি অফলাইনে আছেন (ইন্টারনেট ছাড়াও রকেট ব্যবহার করতে পারবেন)' 
            : 'You are offline (Rocket works completely offline)'}
        </div>
      )}

      {/* 1. Splash Screen Router */}
      {screen === 'SPLASH' && (
        <Splash onDismiss={() => setScreen('LOGIN')} />
      )}

      {/* 2. PIN Password Login Screener */}
      {screen === 'LOGIN' && (
        <Login 
          language={language}
          setLanguage={setLanguage}
          onLoginSuccess={() => setScreen('DASHBOARD')}
          userPhone={userPhone}
          setUserPhone={setUserPhone}
        />
      )}

      {/* 3. Main Services Dashboard Feed Screener */}
      {screen === 'DASHBOARD' && (
        <Dashboard 
          language={language}
          balance={balance}
          setScreen={setScreen}
          userPhone={userPhone}
        />
      )}

      {/* 4. Rocket Send Money interactive wizard flow */}
      {screen === 'SEND_MONEY_INPUT' && (
        <SendMoney
          language={language}
          balance={balance}
          setBalance={setBalance}
          setScreen={setScreen}
          addTransaction={addTransaction}
        />
      )}

      {/* 5. Cash Out interactive wizard flow */}
      {screen === 'CASH_OUT_INPUT' && (
        <CashOut
          language={language}
          balance={balance}
          setBalance={setBalance}
          setScreen={setScreen}
          addTransaction={addTransaction}
        />
      )}

      {/* 6. Scan QR Interactive Cam Screener */}
      {screen === 'SCAN_QR_MOCK' && (
        <ScanQR
          language={language}
          setScreen={setScreen}
        />
      )}

      {/* 7. Comprehensive Options Directory Router */}
      {screen === 'MORE_MENU' && (
        <MoreMenu
          language={language}
          setLanguage={setLanguage}
          balance={balance}
          setScreen={setScreen}
          userPhone={userPhone}
          transactions={transactions}
          limits={limits}
          onLogout={logoutUser}
        />
      )}
    </PhoneFrame>
  );
}
