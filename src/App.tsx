/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
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
  const [language, setLanguage] = useState<Language>('BN');
  const [balance, setBalance] = useState<number>(17494.00); // Starting standard DBBL Rocket balance
  const [userPhone, setUserPhone] = useState<string>('017108854029'); // Preset phone matching screens
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [limits, setLimits] = useState<LimitCategory[]>(INITIAL_LIMITS);

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
