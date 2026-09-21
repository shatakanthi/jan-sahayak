import React, { useState } from 'react';
import { CreditCard, CheckCircle2, X, Download, ShieldCheck, Lock } from 'lucide-react';

export default function SimulatedPaymentModal({ bill, onClose, onCompletePay }) {
  const [step, setStep] = useState('confirm'); // 'confirm' | 'processing' | 'receipt'
  const [txnRef, setTxnRef] = useState('');

  if (!bill) return null;

  const handlePaySubmit = (e) => {
    e.preventDefault();
    setStep('processing');

    setTimeout(() => {
      const generatedTxn = 'TXN-SIM-' + Math.floor(100000 + Math.random() * 900000);
      setTxnRef(generatedTxn);
      setStep('receipt');
      if (onCompletePay) onCompletePay(bill.billId);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glass-panel w-full max-w-md rounded-3xl border border-slate-700 p-6 space-y-5 relative shadow-2xl animate-fadeIn">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'confirm' && (
          <div className="space-y-4">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Simulated Bill Payment</h3>
                <p className="text-xs text-slate-400">Zero-Risk Demo Payment Gateway</p>
              </div>
            </div>

            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Bill Description:</span>
                <span className="text-white font-semibold">{bill.title}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Provider:</span>
                <span className="text-slate-200">{bill.provider}</span>
              </div>
              <div className="flex justify-between text-slate-400 border-t border-slate-800 pt-2 font-bold text-sm">
                <span className="text-white">Total Payable:</span>
                <span className="text-emerald-400">₹{bill.amount}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300 flex items-center space-x-2">
              <Lock className="w-4 h-4 shrink-0 text-amber-400" />
              <span>Simulated Payment Gateway: No real money transferred or financial details requested.</span>
            </div>

            <button
              onClick={handlePaySubmit}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg transition"
            >
              Confirm Simulated Payment (₹{bill.amount})
            </button>
          </div>
        )}

        {step === 'processing' && (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin mx-auto" />
            <h4 className="text-sm font-bold text-white">Processing Mock Transaction...</h4>
            <p className="text-xs text-slate-400">Connecting to Simulated Interoperable Provider API</p>
          </div>
        )}

        {step === 'receipt' && (
          <div className="space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div>
              <h3 className="text-base font-bold text-white">Payment Successful!</h3>
              <p className="text-xs text-slate-400">Digital Receipt Generated</p>
            </div>

            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 text-left text-xs space-y-1.5 font-mono">
              <div className="text-slate-500 text-[10px] uppercase">Transaction Ref</div>
              <div className="text-emerald-400 font-bold">{txnRef}</div>
              <div className="text-slate-300 pt-1 border-t border-slate-800">Bill: {bill.title}</div>
              <div className="text-slate-300">Amount Paid: ₹{bill.amount}</div>
              <div className="text-slate-400 text-[10px]">Status: Verified by Discom Provider API</div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition"
            >
              Return to Dashboard
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
