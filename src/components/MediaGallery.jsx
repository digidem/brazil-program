import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const MediaGallery = ({ media }) => {
  const [selectedMedia, setSelectedMedia] = useState(null);

  const openLightbox = (media) => {
    setSelectedMedia(media);
  };

  const closeLightbox = () => {
    setSelectedMedia(null);
  };

  return (
    <section className="mb-16">
      <h2 className="text-4xl font-bold mb-8 text-white text-center">Media Gallery</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {media.images.map((image, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
            onClick={() => openLightbox(image)}
          >
            <img src={image} alt={`Gallery image ${index + 1}`} className="w-full h-64 object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-opacity duration-300"></div>
          </motion.div>
        ))}
        {media.videos.map((video, index) => (
          <motion.div
            key={`video-${index}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
            onClick={() => openLightbox(video)}
          >
            <div className="w-full h-64 bg-gray-800 flex items-center justify-center">
              <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-opacity duration-300"></div>
          </motion.div>
        ))}
      </div>

      {selectedMedia && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          onClick={closeLightbox}
        >
          <div className="relative max-w-4xl w-full">
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            >
              <X size={24} />
            </button>
            {selectedMedia.includes('youtube.com') ? (
              <iframe
                width="100%"
                height="480"
                src={selectedMedia}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            ) : (
              <img src={selectedMedia} alt="Selected media" className="w-full h-auto rounded-lg" />
            )}
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default MediaGallery;