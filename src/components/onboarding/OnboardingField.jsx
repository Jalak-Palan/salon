import React from 'react';

const OnboardingField = ({ label, icon: Icon, type = 'text', name, value, onChange, placeholder, required = true, maxLength, min }) => (
  <div>
    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">{label}</label>
    <div className="relative">
      {Icon && <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />}
      <input 
        type={type} 
        name={name} 
        value={value} 
        onChange={onChange} 
        placeholder={placeholder} 
        required={required}
        maxLength={maxLength}
        min={min}
        className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 transition-all`} 
      />
    </div>
  </div>
);

export default OnboardingField;
