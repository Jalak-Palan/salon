import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const StepBar = ({ steps, current }) => (
  <div className="flex items-center justify-between mb-10 px-2">
    {steps.map((step, idx) => {
      const Icon = step.icon;
      const done = current > step.id;
      const active = current === step.id;
      return (
        <React.Fragment key={step.id}>
          <div className="flex flex-col items-center gap-1.5 flex-1">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm transition-all border-2 ${done ? 'bg-green-500 border-green-500 text-white shadow-lg shadow-green-100' :
                active ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-100' :
                  'bg-gray-100 border-gray-200 text-gray-400'
              }`}>
              {done ? <CheckCircle2 size={18} /> : <Icon size={16} />}
            </div>
            <span className={`text-[10px] font-bold hidden sm:block ${active ? 'text-orange-600' : done ? 'text-green-600' : 'text-gray-400'}`}>
              {step.title}
            </span>
          </div>
          {idx < steps.length - 1 && (
            <div className={`flex-1 h-0.5 mb-5 mx-1 rounded transition-all ${done ? 'bg-green-400' : 'bg-gray-200'}`} />
          )}
        </React.Fragment>
      );
    })}
  </div>
);

export default StepBar;
