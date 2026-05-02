import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const LightboxModal = ({ gallery, currentIdx, onClose, onPrev, onNext, onSetIdx }) => {
    // Keyboard navigation
    useEffect(() => {
        const handler = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') onPrev();
            if (e.key === 'ArrowRight') onNext();
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [onClose, onPrev, onNext]);

    if (currentIdx === null || !gallery?.length) return null;

    return (
        <div
            className="fixed inset-0 z-50 bg-black/92 backdrop-blur-sm flex items-center justify-center"
            onClick={onClose}
        >
            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 bg-white/15 hover:bg-white/30 rounded-full flex items-center justify-center transition z-10"
            >
                <X className="w-5 h-5 text-white" />
            </button>

            {/* Image counter */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/70 text-sm font-medium">
                {currentIdx + 1} / {gallery.length}
            </div>

            {/* Prev button */}
            <button
                onClick={(e) => { e.stopPropagation(); onPrev(); }}
                className="absolute left-4 w-12 h-12 bg-white/15 hover:bg-white/30 rounded-full flex items-center justify-center transition"
            >
                <ChevronLeft className="w-7 h-7 text-white" />
            </button>

            {/* Main image */}
            <img
                src={gallery[currentIdx]}
                alt={`Gallery image ${currentIdx + 1}`}
                onClick={(e) => e.stopPropagation()}
                className="max-h-[85vh] max-w-[90vw] rounded-2xl shadow-2xl object-contain"
            />

            {/* Next button */}
            <button
                onClick={(e) => { e.stopPropagation(); onNext(); }}
                className="absolute right-4 w-12 h-12 bg-white/15 hover:bg-white/30 rounded-full flex items-center justify-center transition"
            >
                <ChevronRight className="w-7 h-7 text-white" />
            </button>

            {/* Thumbnail strip */}
            <div className="absolute bottom-6 flex gap-2">
                {gallery.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={(e) => { e.stopPropagation(); onSetIdx(idx); }}
                        className={`w-14 h-10 rounded-lg overflow-hidden border-2 transition ${
                            idx === currentIdx ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                    >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default LightboxModal;
