import React from 'react';
import { KeyRound, ArrowRight, AlertCircle } from 'lucide-react';
import Logo from '../common/Logo';

const AdminKeyGate = ({ keyInput, setKeyInput, keyError, setKeyError, showKey, setShowKey, handleKeySubmit }) => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-orange-50/30 px-4">
    <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl border border-gray-100 p-8">
      <div className="text-center mb-8">
        <Logo size="lg" className="mx-auto mb-4" />
        <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mt-4 mb-4">
          <KeyRound className="w-7 h-7 text-orange-500" />
        </div>
        <h1 className="text-2xl font-black text-gray-900">Admin Access</h1>
        <p className="text-sm text-gray-500 mt-1 font-medium">Enter the admin secret key to continue</p>
      </div>

      {keyError && (
        <div className="flex items-center gap-2 p-3 mb-4 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600 font-medium">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {keyError}
        </div>
      )}

      <form onSubmit={handleKeySubmit} className="space-y-4">
        <div className="relative">
          <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type={showKey ? 'text' : 'password'}
            value={keyInput}
            onChange={e => { setKeyInput(e.target.value); setKeyError(''); }}
            placeholder="Admin Secret Key"
            required
            className="w-full pl-10 pr-16 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 transition-all"
          />
          <button type="button" onClick={() => setShowKey(!showKey)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-orange-500">
            {showKey ? 'Hide' : 'Show'}
          </button>
        </div>

        <button type="submit"
          className="w-full py-3.5 bg-gray-900 hover:bg-gray-700 text-white rounded-2xl font-black flex items-center justify-center gap-2 transition-all shadow-xl group">
          Unlock Admin Panel
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </form>

      <p className="text-center text-xs text-gray-400 mt-6">
        Default key: <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-orange-600">BookMySalon@Admin2026</code>
      </p>
    </div>
  </div>
);

export default AdminKeyGate;
