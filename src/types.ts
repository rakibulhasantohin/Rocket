/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Screen = 
  | 'SPLASH' 
  | 'LOGIN' 
  | 'DASHBOARD' 
  | 'SEND_MONEY_INPUT' 
  | 'SEND_MONEY_FORM' 
  | 'SEND_MONEY_CONFIRM' 
  | 'CASH_OUT_INPUT'
  | 'CASH_OUT_FORM'
  | 'CASH_OUT_CONFIRM'
  | 'MORE_MENU' 
  | 'BALANCE_IN_DEPTH' 
  | 'MINI_STATEMENT' 
  | 'LIMITS' 
  | 'MY_QR'
  | 'SCAN_QR_MOCK'
  | 'STORE_LOCATOR'
  | 'HELP_SUPPORT';

export type Language = 'EN' | 'BN';

export interface Transaction {
  id: string;
  date: string;
  title: string;
  amount: number;
  type: 'IN' | 'OUT';
}

export interface Recipient {
  name: string;
  phone: string;
}

export interface LimitRow {
  label: string;
  countCurrent: number;
  countLimit: number;
  amountCurrent: number;
  amountLimit: number;
}

export interface LimitCategory {
  title: string;
  daily: LimitRow;
  monthly: LimitRow;
}
