"use client";

import { Button } from "@/components/ui/button";

import { useLanguage } from "@/hooks/use-language";
import { DefaultSectionProps } from "@/types/app";

export const HomeHeroSection = ({ section }: DefaultSectionProps) => {
  const language = useLanguage();
  const translation = section.translations.find((t) => t.locale === language);

  if (!translation) return null;

  return (
    <div className='relative min-h-screen w-full flex flex-col items-center justify-center bg-gray-700'>
      <div>
        {/* Background overlay to ensure text readability */}
        <div className='absolute inset-0 bg-black/20' />

        {/* Content container */}
        <div className='relative flex flex-col items-center justify-center min-h-[600px] text-center px-4 sm:px-6 lg:px-8'>
          <h1 className='text-4xl sm:text-5xl font-bold text-white mb-6'>{translation.title}</h1>

          <p className='max-w-2xl mx-auto text-lg text-gray-100 mb-8'>{translation.content}</p>

          <Button
            variant='secondary'
            size='lg'
            className='px-8 py-6 text-lg font-medium hover:bg-white/90'
          >
            Shop Now
          </Button>
        </div>
      </div>
    </div>
  );
};
