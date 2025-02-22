"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

import { useLanguage } from "@/hooks/use-language";
import { DefaultSectionProps, SectionListItem } from "@/types/app";
import { useTranslate } from "@/hooks/use-translate";

type Props = {
  year: string;
  title: string;
  description: string;
  actionText: string;
};

const TimelineEvent = ({ year, title, description, actionText }: Props) => (
  <div className='flex gap-8 mb-8 last:mb-0'>
    {/* Timeline dot and line */}
    <div className='relative flex flex-col items-center'>
      <div className='w-4 h-4 bg-black rounded-full' />
      <div className='w-0.5 bg-gray-200 h-full absolute top-6' />
    </div>

    {/* Content */}
    <div className='flex-1'>
      <div className='text-3xl font-bold mb-2'>{year}</div>
      <h3 className='text-xl font-bold mb-3'>{title}</h3>
      <p className='text-gray-600 mb-4'>{description}</p>
      <div className='flex gap-4'>
        <Button variant='outline' size='sm'>
          Learn More
        </Button>
        <Button variant='ghost' size='sm' className='flex items-center gap-1'>
          {actionText} <ChevronRight className='h-4 w-4' />
        </Button>
      </div>
    </div>
  </div>
);

export const HomeTimelineSection = ({ section }: DefaultSectionProps) => {
  const language = useLanguage();
  const translate = useTranslate();
  const translation = section.translations.find((t) => t.locale === language);
  if (!translation) return null;

  const events = translation.list as SectionListItem[];

  return (
    <div className='py-16 max-w-screen-2xl mx-auto px-6'>
      <div className='flex flex-col lg:flex-row gap-12 lg:gap-24'>
        {/* Section Header - Now takes up fixed width on desktop */}
        <div className='lg:w-[400px] flex-shrink-0'>
          <p className='text-sm font-medium mb-4'>Milestones</p>
          <h2 className='text-4xl font-bold mb-4'>{translation.title}</h2>
          <p className='text-gray-600 mb-6'>{translation.content}</p>
          <div className='flex gap-4'>
            <Button variant='outline'>{translate("learnMore")}</Button>
            <Button variant='ghost' className='flex items-center gap-1'>
              {translate("explore")} <ChevronRight className='h-4 w-4' />
            </Button>
          </div>
        </div>

        {/* Timeline - Now takes remaining space */}
        <div className='flex-1'>
          {events.map((event, index) => (
            <TimelineEvent
              key={index}
              year={event.additionalTitle ?? "2020"}
              title={event.title}
              description={event.description}
              actionText={"Read More"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
