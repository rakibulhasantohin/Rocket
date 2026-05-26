/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Transaction, Recipient, LimitCategory } from './types';

export const RECIPIENTS: Recipient[] = [
  { name: 'ABBU', phone: '01710885402' },
  { name: 'AMMU', phone: '01712345678' },
  { name: 'Raju Bhai', phone: '01911987654' },
  { name: 'Convenience Store', phone: '01815123123' },
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: '#6533078621',
    date: '20-05-26 11:44:28',
    title: 'Top-Up (01636505640)',
    amount: 80.00,
    type: 'OUT'
  },
  {
    id: '#6532758416',
    date: '20-05-26 10:04:57',
    title: 'Top-Up (01636505640)',
    amount: 20.00,
    type: 'OUT'
  },
  {
    id: '#6531473406',
    date: '19-05-26 22:59:55',
    title: 'NexusPay- Receive Money From 2131580232938 to 017108854029 . ttt',
    amount: 93.00,
    type: 'IN'
  },
  {
    id: '#6530838123',
    date: '19-05-26 20:15:36',
    title: 'CBS-MBS (2131580232938)',
    amount: 13600.00,
    type: 'OUT'
  },
  {
    id: '#6530832504',
    date: '19-05-26 20:14:18',
    title: 'NPSB MFS To ROCKET',
    amount: 6050.00,
    type: 'IN'
  },
  {
    id: '#6530013749',
    date: '19-05-26 18:00:07',
    title: 'Cash-out (***524)',
    amount: 4500.00,
    type: 'OUT'
  },
  {
    id: '#6530013748',
    date: '19-05-26 17:10:01',
    title: 'Send Money to 01710885402',
    amount: 40.50,
    type: 'OUT'
  }
];

export const INITIAL_LIMITS: LimitCategory[] = [
  {
    title: 'Cash-in',
    daily: { label: 'Daily', countCurrent: 0, countLimit: 99999, amountCurrent: 0, amountLimit: 50000 },
    monthly: { label: 'Monthly', countCurrent: 0, countLimit: 999999, amountCurrent: 0, amountLimit: 300000 }
  },
  {
    title: 'Cash-out',
    daily: { label: 'Daily', countCurrent: 0, countLimit: 99999, amountCurrent: 0, amountLimit: 30000 },
    monthly: { label: 'Monthly', countCurrent: 6, countLimit: 999999, amountCurrent: 30450, amountLimit: 200000 }
  },
  {
    title: 'Send Money',
    daily: { label: 'Daily', countCurrent: 0, countLimit: 99999, amountCurrent: 0, amountLimit: 50000 },
    monthly: { label: 'Monthly', countCurrent: 2, countLimit: 999999, amountCurrent: 540, amountLimit: 250000 }
  }
];

export const TRANSLATIONS = {
  EN: {
    banglaToggle: 'বাংলা',
    login: 'LOGIN',
    forgotPin: 'Forgot Rocket PIN?',
    storeLocator: 'Store Locator',
    helpSupport: 'Help & Support',
    tapForBalance: 'Tap for Balance',
    balanceText: 'Balance',
    pleaseWait: 'Please wait',
    services: 'Services',
    sendMoney: 'Rocket Send Money',
    recharge: 'Mobile Recharge',
    cashOut: 'Cash Out',
    merchantPay: 'Merchant Pay',
    addMoney: 'Add Money',
    billPay: 'Bill Pay',
    fundTransfer: 'Fund Transfer',
    linkAc: 'Link A/C Setup',
    loanEmi: 'Loan EMI',
    eToll: 'e-Toll',
    metroRail: 'Metro Rail',
    insurancePlan: 'Insurance Plan',
    billPaySec: 'Bill Pay',
    education: 'Education',
    electricity: 'Electricity',
    gas: 'Gas',
    water: 'Water',
    govtFee: 'Govt. Fee',
    internet: 'Internet',
    insurance: 'Insurance',
    bankFi: 'Bank & FI',
    suggestion: 'Suggestion',
    home: 'Home',
    scanQr: 'Scan QR',
    more: 'More',
    recipientMobile: 'Recipient Mobile or A/C No',
    agentMobile: 'Agent Mobile or A/C No',
    recipientName: 'Recipient Name',
    agentName: 'Agent Name',
    reference: 'Reference',
    notePurpose: 'Note / Purpose',
    amount: 'Amount',
    next: 'NEXT',
    confirmSend: 'Confirm Send Money',
    confirmCashOut: 'Confirm Cash Out',
    recipientAccNo: 'Recipient Account No.',
    holdToConfirm: 'Tap and Hold the above Button to Confirm Transaction',
    insufficientBalance: 'Insufficient balance',
    balanceInquiry: 'Balance Inquiry',
    miniStatement: 'Mini Statement',
    limits: 'Transaction Limits',
    serviceCharges: 'Service Charges',
    myQr: 'My QR',
    logout: 'Logout',
    others: 'Others',
    aboutUs: 'About Us',
    contactUs: 'Contact Us',
    complainFeedback: 'Complain/Feedback',
    availableBalance: 'Available Balance',
    currentBalance: 'Current Balance',
    all: 'All',
    in: 'In',
    out: 'Out',
    emptyStatements: 'No transactions found.',
    scanTitle: 'Scan Quick Response (QR) Code',
    scanInstruction: 'Align QR Code within the frame to scan'
  },
  BN: {
    banglaToggle: 'English',
    login: 'লগইন',
    forgotPin: 'রকেট পিন ভুলে গেছেন?',
    storeLocator: 'স্টোর লোকেটর',
    helpSupport: 'হেল্প ও সাপোর্ট',
    tapForBalance: 'ব্যালেন্স জানতে ট্যাপ করুন',
    balanceText: 'ব্যালেন্স',
    pleaseWait: 'দয়া করে অপেক্ষা করুন',
    services: 'সেবাসমূহ',
    sendMoney: 'রকেট সেন্ড মানি',
    recharge: 'মোবাইল রিচার্জ',
    cashOut: 'ক্যাশ আউট',
    merchantPay: 'মার্চেন্ট পে',
    addMoney: 'অ্যাড মানি',
    billPay: 'বিল পে',
    fundTransfer: 'ফান্ড ট্রান্সফার',
    linkAc: 'লিংক এ/সি সেটআপ',
    loanEmi: 'লোন ইএমআই',
    eToll: 'ই-টোল',
    metroRail: 'মেট্রো রেল',
    insurancePlan: 'ইন্সুরেন্স প্ল্যান',
    billPaySec: 'বিল পে ক্যাটাগরি',
    education: 'শিক্ষা প্রতিষ্ঠান',
    electricity: 'বিদ্যুৎ বিল',
    gas: 'গ্যাস বিল',
    water: 'পানি বিল',
    govtFee: 'সরকারি ফি',
    internet: 'ইন্টারনেট বিল',
    insurance: 'ইন্সুরেন্স বিল',
    bankFi: 'ব্যাংক ও এফআই',
    suggestion: 'পরামর্শ',
    home: 'হোম',
    scanQr: 'স্ক্যান কিউআর',
    more: 'আরো',
    recipientMobile: 'প্রাপকের মোবাইল বা এ/সি নম্বর',
    agentMobile: 'এজেন্টের মোবাইল বা এ/সি নম্বর',
    recipientName: 'প্রাপকের নাম',
    agentName: 'এজেন্টের নাম',
    reference: 'রেফারেন্স',
    notePurpose: 'নোট / উদ্দেশ্য',
    amount: 'পরিমাণ',
    next: 'পরবর্তী',
    confirmSend: 'সেন্ড মানি নিশ্চিত করুন',
    confirmCashOut: 'ক্যাশ আউট নিশ্চিত করুন',
    recipientAccNo: 'প্রাপকের অ্যাকাউন্ট নং',
    holdToConfirm: 'লেনদেন নিশ্চিত করতে উপরের বোতামটি ট্যাপ করে ধরে রাখুন',
    insufficientBalance: 'পর্যাপ্ত ব্যালেন্স নেই',
    balanceInquiry: 'ব্যালেন্স অনুসন্ধান',
    miniStatement: 'মিনি স্টেটমেন্ট',
    limits: 'লেনদেনের সীমা',
    serviceCharges: 'সার্ভিস চার্জসমূহ',
    myQr: 'আমার কিউআর',
    logout: 'লগআউট',
    others: 'অন্যান্য',
    aboutUs: 'আমাদের সম্পর্কে',
    contactUs: 'যোগাযোগ করুন',
    complainFeedback: 'অভিযোগ বা মতামত',
    availableBalance: 'ব্যবহারযোগ্য ব্যালেন্স',
    currentBalance: 'বর্তমান ব্যালেন্স',
    all: 'সব',
    in: 'আগত',
    out: 'প্রেরিত',
    emptyStatements: 'কোনো লেনদেন পাওয়া যায়নি।',
    scanTitle: 'কুইক রেসপন্স (QR) কোড স্ক্যান করুন',
    scanInstruction: 'স্ক্যান করতে ফ্রেমের ভেতরে কিউআর কোড রাখুন'
  }
};

export const PROMO_SLIDES = [
  {
    type: 'GP',
    textMain: 'গ্রামীণফোন রিচার্জে',
    textHighlight: 'আকর্ষণীয় ক্যাশব্যাক',
    terms: 'অফারটি শুধুমাত্র ২৬ মে ২০২৬ থেকে ২৮ মে ২০২৬ এর জন্য প্রযোজ্য',
    bg: 'from-fuchsia-800 to-purple-900',
    badges: [
      { main: '৳৫১৯ রিচার্জ', sub1: '৪২০ মিনিট', sub2: 'ইন্সট্যান্ট', cash: '৳২৫' },
      { main: '৳৬৯৮ রিচার্জ', sub1: '৬০ জিবি', sub2: 'ইন্সট্যান্ট', cash: '৳৪০' },
      { main: '৳৯৯৯ রিচার্জ', sub1: '১৫০০মি.+৫০ জিবি', sub2: 'ইন্সট্যান্ট', cash: '৳৫৫' },
    ]
  },
  {
    type: 'BL',
    textMain: 'বাংলালিংক রিচার্জ',
    textHighlight: 'ক্যাশব্যাক অফার',
    terms: 'অফারটি চলবে ২৬ মে ২০২৬ - ৩০ মে ২০২৬ পর্যন্ত',
    bg: 'from-orange-700 to-red-800',
    badges: [
      { main: '৳৪৮৪ রিচার্জ', sub1: '৭৮ জিবি', sub2: 'ইন্সট্যান্ট', cash: '৳৭০' },
      { main: '৳৭২৯ রিচার্জ', sub1: '১১৯ জিবি', sub2: 'ইন্সট্যান্ট', cash: '৳৯০' },
    ]
  },
  {
    type: 'ROCKET',
    textMain: 'রকেট-এ সহজ পেমেন্ট',
    textHighlight: 'বিল পে করা যায় সহজে',
    terms: 'বিদ্যুৎ, পানি, গ্যাস, ইন্টারনেট ও সরকারি ফি দিন ঘরে বসেই',
    bg: 'from-purple-950 to-indigo-900',
    isBanner: true
  }
];

export const SUGGESTIONS = [
  { name: 'BPDB Prepaid', iconUrl: '🔌' },
  { name: 'Loan EMI', iconUrl: '💰' },
  { name: 'Palli Bidyut Pre', iconUrl: '🏡' },
  { name: 'Walton Plaza', iconUrl: '❄️' },
];
