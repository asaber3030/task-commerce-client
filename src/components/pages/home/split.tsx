"use client";

import { ArrowRight, BoxIcon } from "lucide-react";
import Image from "next/image";

import { useLanguage } from "@/hooks/use-language";
import { DefaultSectionProps, SectionListItem } from "@/types/app";
import { LinkBtn } from "@/components/common/link-button";

export function HomeSplitSection({ section }: DefaultSectionProps) {
  const language = useLanguage();
  const translation = section.translations.find((t) => t.locale === language);
  if (!translation) return null;
  const features = translation.list as SectionListItem[];

  return (
    <section className='py-16 max-w-screen-2xl mx-auto px-6'>
      <div className='grid md:grid-cols-2 gap-8 md:gap-12 items-start justify-center '>
        {/* Right Column - Image */}
        <div className='relative aspect-square w-full'>
          <Image
            src='/placeholder.webp'
            alt='Security Solutions'
            fill
            className='object-cover rounded-lg h-fit'
            priority
          />
        </div>

        {/* Left Column - Content */}
        <div className='space-y-8'>
          {/* Main Content */}
          <div className='space-y-4'>
            <h2 className='text-3xl font-bold leading-tight'>{translation.title}</h2>
            <p className='text-muted-foreground'>{translation.content}</p>
          </div>

          {/* Features Grid */}
          <div className='grid xl:grid-cols-2 grid-cols-1 gap-6'>
            {features.map((feature, idx) => (
              <div className='space-y-2' key={`split-key-${feature.title}-${idx}`}>
                <BoxIcon className='size-10' />
                <h3 className='font-semibold text-lg'>{feature.title}</h3>
                <p className='text-sm text-muted-foreground'>{feature.description}</p>
              </div>
            ))}
          </div>

          <LinkBtn href='/filter' icon={ArrowRight} variant='outline' linkClassName='mt-4 block'>
            Filter
          </LinkBtn>
        </div>
      </div>
    </section>
  );
}
