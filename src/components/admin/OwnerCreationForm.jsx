import React from 'react';
import { User, Mail, Lock, Building2, MapPin, Loader2, ArrowRight } from 'lucide-react';

const InputField = ({ label, icon: Icon, type = 'text', name, value, onChange, placeholder, required = true, showToggle, onToggle, toggleText }) => (
    <div>
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">{label}</label>
        <div className="relative">
            <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className={`w-full pl-10 pr-${showToggle ? '20' : '4'} py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 transition-all`}
            />
            {showToggle && (
                <button type="button" onClick={onToggle}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-orange-500">
                    {toggleText}
                </button>
            )}
        </div>
    </div>
);

const OwnerCreationForm = ({ form, handleChange, handleSubmit, loading, showPassword, setShowPassword, CITY_OPTIONS, CATEGORY_OPTIONS, setForm }) => (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
        <h2 className="text-xl font-black text-gray-900 mb-6">Owner & Salon Details</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
            <InputField label="Owner Name" icon={User} name="name" value={form.name} onChange={handleChange} placeholder="e.g. Ravi Kumar" />
            <InputField label="Email Address" icon={Mail} type="email" name="email" value={form.email} onChange={handleChange} placeholder="owner@salon.com" />
            <InputField 
                label="Password" icon={Lock} 
                type={showPassword ? 'text' : 'password'} 
                name="password" value={form.password} onChange={handleChange} 
                placeholder="Min 6 characters" 
                showToggle={true} 
                onToggle={() => setShowPassword(!showPassword)} 
                toggleText={showPassword ? 'Hide' : 'Show'} 
            />

            <div className="border-t border-gray-100 pt-5">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Salon Info</p>
                <div className="space-y-4">
                    <InputField label="Salon Name" icon={Building2} name="salonName" value={form.salonName} onChange={handleChange} placeholder="e.g. Ravi's Cuts & Spa" />
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">City</label>
                        <div className="relative">
                            <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                            <select name="city" value={form.city} onChange={handleChange} required
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 transition-all appearance-none">
                                <option value="" disabled>Select a city...</option>
                                {CITY_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Category</label>
                        <div className="grid grid-cols-2 gap-2">
                            {CATEGORY_OPTIONS.map(cat => (
                                <button key={cat.value} type="button"
                                    onClick={() => setForm({ ...form, category: cat.value })}
                                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${form.category === cat.value
                                        ? 'bg-orange-500 text-white border-orange-500 shadow-md'
                                        : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-orange-300'}`}>
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <button type="submit" disabled={loading}
                className="w-full py-4 bg-gray-900 hover:bg-gray-700 text-white rounded-2xl font-black text-base flex items-center justify-center gap-2 transition-all shadow-xl active:scale-95 disabled:opacity-60 group mt-2">
                {loading
                    ? <><Loader2 className="w-5 h-5 animate-spin" /> Creating Owner...</>
                    : <><span>Create Owner</span><ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>}
            </button>
        </form>
    </div>
);

export default OwnerCreationForm;
