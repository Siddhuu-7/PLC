import { ChevronRight } from 'lucide-react';
import React from 'react'
import { useState,useEffect } from 'react';
export default function ImageGalleryCard() {
      const galleryImages = [
        { id: 1, src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400", alt: "Campus Event 1" },
        { id: 2, src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400", alt: "Study Session" },
        { id: 3, src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400", alt: "Laboratory" },
      ];
        const [currentImageIndex, setCurrentImageIndex] = useState(0);
      // --- IMAGE SLIDER ---
      useEffect(() => {
        const interval = setInterval(() => {
          setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
        }, 3000);
    
        return () => clearInterval(interval);
      }, [galleryImages.length]);
      const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);

  return (
     <div className="bg-white rounded-xl shadow-lg p-6 relative">
                <h3 className="text-xl font-bold mb-4 font-serif italic">Gallery</h3>
                <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={galleryImages[currentImageIndex].src}
                    alt={galleryImages[currentImageIndex].alt}
                    className="w-full h-full object-cover transition-all duration-500"
                  />
                </div>
                <button onClick={prevImage} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70">
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button onClick={nextImage} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
  )
}
