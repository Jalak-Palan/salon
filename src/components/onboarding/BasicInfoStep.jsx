import React from 'react';
import { User, Building2, Mail, Phone, Star } from 'lucide-react';
import OnboardingField from './OnboardingField';

const BasicInfoStep = ({ basic, handleBasic }) => (
  <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
    <h2 className="text-xl font-black text-gray-900">Basic Details</h2>
    <OnboardingField label="Owner Name" icon={User} name="ownerName" value={basic.ownerName} onChange={handleBasic} placeholder="Full Name" />
    <OnboardingField label="Salon Name" icon={Building2} name="salonName" value={basic.salonName} onChange={handleBasic} placeholder="Salon Name" />
    <OnboardingField label="Email" icon={Mail} type="email" name="email" value={basic.email} onChange={handleBasic} placeholder="email@example.com" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <OnboardingField label="Mobile 1" icon={Phone} type="tel" name="mobile1" value={basic.mobile1} onChange={handleBasic} placeholder="10-digit number" maxLength={10} />
      <OnboardingField label="Mobile 2" icon={Phone} type="tel" name="mobile2" value={basic.mobile2} onChange={handleBasic} placeholder="Optional (10-digit)" required={false} maxLength={10} />
    </div>
    <OnboardingField label="Available Seats per Slot" icon={Star} type="number" name="seats" value={basic.seats} onChange={handleBasic} placeholder="Minimum 1 seat" min="1" />
  </div>
);

export default BasicInfoStep;
