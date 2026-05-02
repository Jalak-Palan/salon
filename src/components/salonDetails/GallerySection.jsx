import React from 'react';
import { ZoomIn } from 'lucide-react';

const GallerySection = ({ salon, displayData, onOpenLightbox }) => {
    return (
        <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Salon Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {displayData.gallery.map((img, idx) => (
                    <div
                        key={idx}
                        onClick={() => onOpenLightbox(idx)}
                        className="relative aspect-[4/3] rounded-xl overflow-hidden group cursor-zoom-in"
                    >
                        <img
                            src={img}
                            alt={`${salon.name} gallery ${idx + 1}`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                            <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default GallerySection;
