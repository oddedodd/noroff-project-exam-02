import { useState } from 'react';
import { X } from 'lucide-react';

/**
 * A gallery component that displays a grid of venue images with lightbox functionality
 * @component
 * @param {Object} props - Component props
 * @param {Array<{url: string, alt: string}>} props.images - Array of image objects containing url and alt text
 * @returns {JSX.Element} A gallery section with grid layout and lightbox modal
 */
function VenueGallery({ images }) {
    const [selectedImage, setSelectedImage] = useState(null);

    /**
     * Opens the lightbox modal with the selected image
     * @param {number} index - Index of the image to display in lightbox
     */
    const openLightbox = (index) => {
        setSelectedImage(index);
    };

    /**
     * Closes the lightbox modal
     */
    const closeLightbox = () => {
        setSelectedImage(null);
    };

    return (
      <div>
        <h3 className="text-lg font-[dm_sans] text-cocoa-dark font-semibold mb-4">Image gallery</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, i) => (
            <div 
              key={i}
              className="aspect-square relative overflow-hidden rounded shadow-sm cursor-pointer"
              onClick={() => openLightbox(i)}
            >
              <img
                src={img.url}
                alt={img.alt}
                className="absolute w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage !== null && (
          <div 
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <div className="relative max-w-4xl max-h-[90vh]">
              <img
                src={images[selectedImage].url}
                alt={images[selectedImage].alt}
                className="max-w-full max-h-[90vh] object-contain"
              />
              <X size={32} className="absolute bg-black/50 rounded-full top-4 right-4 p-2 text-sand-light hover:cursor-pointer" onClick={closeLightbox} />
            </div>
          </div>
        )}
      </div>
    );
  }

export default VenueGallery;