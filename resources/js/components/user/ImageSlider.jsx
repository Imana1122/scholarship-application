import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ImageSlider = ({ aboutImages }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === aboutImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? aboutImages.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative">
      <button onClick={prevImage} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white px-2 py-1 rounded-full z-10">
        Previous
      </button>
      <button onClick={nextImage} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white px-2 py-1 rounded-full z-10">
        Next
      </button>
      <AnimatePresence initial={false}>
        <motion.img
          key={currentImageIndex}
          src={`/storage/images${aboutImages[currentImageIndex].image_path}`}
          alt={`Image ${currentImageIndex + 1}`}
          className="w-full max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>
    </div>
  );
};

export default ImageSlider;
