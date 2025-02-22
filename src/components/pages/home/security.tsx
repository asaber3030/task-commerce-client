"use client";
import { Box } from "lucide-react";
import Link from "next/link";

import { useLanguage } from "@/hooks/use-language";
import { DefaultSectionProps, SectionListItem } from "@/types/app";

export function HomeSecuritySection({ section }: DefaultSectionProps) {
  const language = useLanguage();
  const translation = section.translations.find((t) => t.locale === language);
  if (!translation) return null;
  const features = translation.list as SectionListItem[];

  return (
    <section className='py-16 max-w-screen-2xl mx-auto px-6'>
      <h2 className='text-3xl font-bold mb-12'>{translation.title}</h2>

      <div className='grid gap-8 md:grid-cols-3'>
        {features.map((feature, index) => (
          <div key={`sec-${feature.title}-${index}`} className='space-y-4'>
            <Box className='w-8 h-8' />
            <h3 className='font-semibold text-xl'>{feature.title}</h3>
            <p className='text-muted-foreground'>{feature.description}</p>
            <Link href={"#"} className='inline-flex items-center text-primary hover:underline'>
              Explore →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
