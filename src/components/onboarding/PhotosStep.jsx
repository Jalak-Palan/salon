import React from 'react';
import { Camera, X } from 'lucide-react';

const PhotosStep = ({ imagePreviews, handleImages, removeImage }) => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
    <h2 className="text-xl font-black text-gray-900">Salon Photos</h2>
    <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-3xl p-10 hover:border-orange-300 hover:bg-orange-50 transition-all cursor-pointer group">
      <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        <Camera className="text-orange-600" />
      </div>
      <p className="text-gray-700 font-bold">Click to upload salon photos</p>
      <p className="text-gray-400 text-sm mt-1">Minimum 2 photos are required</p>
      <input type="file" multiple accept="image/*" onChange={handleImages} className="hidden" />
    </label>
    <div className="grid grid-cols-3 gap-3">
      {imagePreviews.map((src, idx) => (
        <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-gray-100 shadow-sm group">
          <img src={src} alt="salon" className="w-full h-full object-cover" />
          <button onClick={() => removeImage(idx)} className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><X size={12} /></button>
        </div>
      ))}
    </div>
  </div>
);

export default PhotosStep;
