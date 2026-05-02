import React from 'react';
import { Scissors, Trash2, Plus } from 'lucide-react';

const ServicesStep = ({ services, handleServiceChange, addService, removeService, defaultServicesLength }) => (
  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
    <h2 className="text-xl font-black text-gray-900">Services & Pricing</h2>
    {services.map((svc, idx) => (
      <div key={idx} className="flex gap-2 items-center p-3 bg-gray-50 rounded-xl border border-gray-100 shadow-sm">
        <Scissors size={14} className="text-orange-400 ml-1" />
        <input type="text" value={svc.name} onChange={e => handleServiceChange(idx, 'name', e.target.value)} placeholder="Service" className="flex-1 bg-transparent text-sm font-bold text-gray-800 outline-none" />
        <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg px-2 py-1.5 shadow-inner">
          <span className="text-[10px] font-black text-gray-400">₹</span>
          <input type="number" value={svc.price} onChange={e => handleServiceChange(idx, 'price', e.target.value)} placeholder="0" className="w-16 text-sm font-black text-gray-900 outline-none" />
        </div>
        {idx >= defaultServicesLength && <button onClick={() => removeService(idx)} className="text-red-400 p-1 hover:bg-red-50 rounded-lg"><Trash2 size={14} /></button>}
      </div>
    ))}
    <button onClick={addService} className="mt-2 flex items-center gap-1.5 text-xs font-black text-orange-500 uppercase tracking-widest"><Plus size={14} /> Add Service</button>
  </div>
);

export default ServicesStep;
