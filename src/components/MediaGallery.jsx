import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const MediaGallery = ({ media }) => {
  return (
    <section className="mb-16">
      <h2 className="text-4xl font-bold mb-8 text-white">Media Gallery</h2>
      <Carousel className="w-full max-w-4xl mx-auto">
        <CarouselContent>
          {media.images.map((image, index) => (
            <CarouselItem key={index}>
              <img src={image} alt={`Gallery image ${index + 1}`} className="w-full h-96 object-cover rounded-lg" />
            </CarouselItem>
          ))}
          {media.videos.map((video, index) => (
            <CarouselItem key={`video-${index}`}>
              <iframe
                width="100%"
                height="400"
                src={video}
                title={`Partner video ${index + 1}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};

export default MediaGallery;