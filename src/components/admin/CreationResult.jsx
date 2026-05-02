import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const CreationResult = ({ result }) => {
    if (!result?.success || !result.data) {
        return (
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
                <h3 className="text-lg font-black text-gray-900 mb-4">How it works</h3>
                <div className="space-y-4">
                    {[
                        'Fill in owner name, email, password, and salon info.',
                        'A User is created with role: salon_owner, status: approved.',
                        'A Salon is automatically linked to this owner.',
                        'Owner can log in immediately at /owner-login.',
                        'The salon appears live on the platform right away.',
                    ].map((text, i) => (
                        <div key={i} className="flex gap-3 items-start">
                            <span className="w-7 h-7 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">{i + 1}</span>
                            <p className="text-sm text-gray-600 font-medium leading-snug">{text}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-3xl shadow-xl border border-green-100 p-8">
            <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mb-5">
                <CheckCircle2 className="w-7 h-7 text-green-500" />
            </div>
            <h3 className="text-xl font-black text-gray-900 mb-2">Owner Created!</h3>
            <p className="text-sm text-gray-500 mb-6">Share these credentials securely with the salon owner.</p>
            <div className="space-y-3">
                {[
                    { label: 'Name', value: result.data.owner.name },
                    { label: 'Email', value: result.data.owner.email },
                    { label: 'Role', value: result.data.owner.role, badge: true, color: 'orange' },
                    { label: 'Status', value: result.data.owner.status, badge: true, color: 'green' },
                    { label: 'Salon', value: `${result.data.salon.name} · ${result.data.salon.city}`, blue: true },
                ].map(item => (
                    <div key={item.label} className={`flex justify-between items-center p-3 rounded-xl border ${item.blue ? 'bg-blue-50 border-blue-100' : 'bg-gray-50 border-gray-100'}`}>
                        <span className="text-xs font-bold text-gray-400 uppercase">{item.label}</span>
                        {item.badge
                            ? <span className={`text-xs font-black px-3 py-1 bg-${item.color}-100 text-${item.color}-700 rounded-full`}>{item.value}</span>
                            : <span className="text-sm font-black text-gray-900">{item.value}</span>}
                    </div>
                ))}
            </div>
            <p className="text-xs text-gray-400 mt-5">⚠️ Ask the owner to change their password after first login at <strong>/owner-login</strong>.</p>
        </div>
    );
};

export default CreationResult;
