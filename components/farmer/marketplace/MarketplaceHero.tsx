'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function MarketplaceHero() {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const slides = [
    {
      title: 'प्रधानमंत्री किसान',
      image: '👨‍🌾',
      description: 'Government support for farmers',
    },
    {
      title: 'Organic Farming',
      image: '🌿',
      description: 'Sustainable agriculture solutions',
    },
    {
      title: 'Modern Equipment',
      image: '🚜',
      description: 'Latest farming technology',
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-48 md:h-64 bg-gradient-to-r from-blue-600 via-teal-600 to-green-600 overflow-hidden rounded-lg mx-3 sm:mx-4 md:mx-6 mt-4 md:mt-6">
      {/* Slider Content */}
      <div className="relative w-full h-full flex items-center justify-between px-4">
        {/* Left Arrow */}
        <Button
          variant="ghost"
          size="icon"
          onClick={prevSlide}
          className="absolute left-2 z-10 bg-white/30 hover:bg-white/50 text-white"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        {/* Slide Content */}
        <div className="absolute inset-0 flex items-center justify-between px-12">
          <div className="text-white space-y-2">
            <h2 className="text-2xl md:text-4xl font-bold">{slides[currentSlide].title}</h2>
            <p className="text-sm md:text-base opacity-90">{slides[currentSlide].description}</p>
          </div>
          <div className="text-6xl md:text-8xl">{slides[currentSlide].image}</div>
        </div>

        {/* Right Arrow */}
        <Button
          variant="ghost"
          size="icon"
          onClick={nextSlide}
          className="absolute right-2 z-10 bg-white/30 hover:bg-white/50 text-white"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide ? 'bg-white w-6' : 'bg-white/50 w-2'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
