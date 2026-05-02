import React from 'react';
import { MapPin, Building2 } from 'lucide-react';
import OnboardingField from './OnboardingField';

const AddressStep = ({ address, handleAddress }) => (
  <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
    <h2 className="text-xl font-black text-gray-900">Address Details</h2>
    <OnboardingField label="Salon Address" icon={MapPin} name="salonAddress" value={address.salonAddress} onChange={handleAddress} placeholder="Full Address" />
    <div className="grid grid-cols-2 gap-4">
      <OnboardingField label="Pincode" icon={MapPin} name="pincode" value={address.pincode} onChange={handleAddress} placeholder="6-digit" maxLength={6} />
      <OnboardingField label="City" icon={Building2} name="city" value={address.city} onChange={handleAddress} placeholder="Auto-filled" />
    </div>
    <OnboardingField label="Landmark" icon={MapPin} name="landmark" value={address.landmark} onChange={handleAddress} placeholder="Optional" required={false} />
  </div>
);

export default AddressStep;
