"use client";
import React from "react";
import { BoxIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useLanguage } from "@/hooks/use-language";
import { DefaultSectionProps, SectionListItem } from "@/types/app";

const FeatureCard = ({ title, description }: { title: string; description: string }) => (
  <div className='flex flex-col items-center text-center'>
    <div className='mb-6'>
      <BoxIcon className='h-12 w-12' />
    </div>
    <h3 className='text-xl font-bold mb-4'>{title}</h3>
    <p className='text-gray-600'>{description}</p>
  </div>
);

export const HomeFeaturesSection = ({ section }: DefaultSectionProps) => {
  const language = useLanguage();
  const translation = section.translations.find((t) => t.locale === language);

  if (!translation) return null;

  const features = translation.list as SectionListItem[];

  return (
    <div className='py-16 max-w-screen-2xl mx-auto px-6'>
      {/* Section Header */}
      <div className='text-center mb-16'>
        <p className='text-sm font-medium mb-4'>Explore</p>
        <h2 className='text-3xl sm:text-4xl font-bold mb-6'>{translation.title}</h2>
        <p className='max-w-3xl mx-auto text-gray-600'>{translation.content}</p>
      </div>

      {/* Features Grid */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto mb-12 justify-center items-center'>
        {features.map((feature, index) => (
          <FeatureCard key={index} title={feature.title} description={feature.description} />
        ))}
      </div>

      {/* Learn More Button */}
      <div className='text-center'>
        <Button variant='link' className='text-gray-600 hover:text-gray-900'>
          Learn More →
        </Button>
      </div>
    </div>
  );
};
