import React from 'react';
import { Timer } from 'lucide-react';

const TimingsStep = ({ timings, handleTimingChange, slotConfig, setSlotConfig }) => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
    <h2 className="text-xl font-black text-gray-900">Timings & Slot Configuration</h2>

    {/* Day-wise Timings */}
    <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
      {timings.map((t, idx) => (
        <div key={t.day} className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${t.isClosed ? 'bg-gray-50 border-gray-100 opacity-60' : 'bg-white border-orange-100 shadow-sm'}`}>
          <div className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full ${t.isClosed ? 'bg-gray-300' : 'bg-green-500 animate-pulse'}`} />
            <span className="text-sm font-black text-gray-700 min-w-[80px]">{t.day}</span>
          </div>

          {!t.isClosed ? (
            <div className="flex items-center gap-2">
              <input type="time" value={t.open} onChange={e => handleTimingChange(idx, 'open', e.target.value)} className="text-xs font-bold border-none bg-gray-100 rounded-lg px-2 py-1.5 focus:ring-2 focus:ring-orange-400 outline-none w-[80px]" />
              <span className="text-gray-400 font-bold text-xs">to</span>
              <input type="time" value={t.close} onChange={e => handleTimingChange(idx, 'close', e.target.value)} className="text-xs font-bold border-none bg-gray-100 rounded-lg px-2 py-1.5 focus:ring-2 focus:ring-orange-400 outline-none w-[80px]" />
            </div>
          ) : (
            <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Closed</span>
          )}

          <button
            onClick={() => handleTimingChange(idx, 'isClosed', !t.isClosed)}
            className={`text-[10px] font-black px-3 py-1.5 rounded-full border transition-all ${t.isClosed ? 'bg-green-50 text-green-600 border-green-100' : 'bg-red-50 text-red-500 border-red-100'}`}
          >
            {t.isClosed ? 'OPEN' : 'CLOSE'}
          </button>
        </div>
      ))}
    </div>

    {/* Slot Config */}
    <div className="bg-orange-50/50 rounded-3xl p-6 border border-orange-100 space-y-5">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-orange-100 rounded-xl text-orange-600"><Timer size={20} /></div>
        <div>
          <h3 className="text-sm font-black text-gray-900">Slot Configuration</h3>
          <p className="text-[10px] font-bold text-orange-600 uppercase tracking-widest">Manage Booking Frequency</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Slot Duration</label>
          <select
            value={slotConfig.duration}
            onChange={e => setSlotConfig({ ...slotConfig, duration: e.target.value })}
            className="w-full bg-white border border-orange-200 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-orange-400 shadow-sm"
          >
            {[15, 30, 45, 60, 90, 120].map(m => <option key={m} value={m}>{m} Mins</option>)}
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Break Gap</label>
          <select
            value={slotConfig.gap}
            onChange={e => setSlotConfig({ ...slotConfig, gap: e.target.value })}
            className="w-full bg-white border border-orange-200 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-orange-400 shadow-sm"
          >
            {[0, 5, 10, 15, 20, 30].map(m => <option key={m} value={m}>{m} Mins</option>)}
          </select>
        </div>
      </div>
    </div>
  </div>
);

export default TimingsStep;
