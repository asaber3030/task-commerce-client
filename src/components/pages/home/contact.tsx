"use client";

import Link from "next/link";

import { Mail, MessageSquare, Phone, MapPin } from "lucide-react";

import { useLanguage } from "@/hooks/use-language";
import { DefaultSectionProps, SectionListItem } from "@/types/app";
import { useTranslate } from "@/hooks/use-translate";
import { IconDisplay } from "@/components/common/icon-displayer";

export function HomeContactSection({ section }: DefaultSectionProps) {
  const language = useLanguage();
  const translate = useTranslate();
  const translation = section.translations.find((t) => t.locale === language);
  if (!translation) return null;

  const contactMethods = [
    {
      contact: "support@jaysystems.com",
      href: "mailto:support@jaysystems.com"
    },
    {
      contact: "Start new chat",
      href: "#chat"
    },
    {
      contact: "+1 (123) 456-7890",
      href: "tel:+11234567890"
    },
    {
      contact: "456 Security Ave, New York, NY 10001",
      href: "https://maps.google.com/?q=456+Security+Ave+New+York+NY+10001"
    }
  ];

  const list = translation.list as SectionListItem[];

  return (
    <section className='py-16 max-w-screen-2xl mx-auto'>
      <div className='max-w-6xl mx-auto'>
        <div className='text-center mb-12'>
          <p className='text-sm text-muted-foreground mb-2'>Connect</p>
          <h2 className='text-3xl font-bold'>{translation.title}</h2>
          <p className='mt-2 text-muted-foreground'>{translation.content}</p>
        </div>

        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-4'>
          {list.map((method, index) => {
            return (
              <div key={index} className='text-center space-y-4'>
                <div className='flex items-center justify-center'>
                  <IconDisplay icon={method.icon} />
                </div>
                <h3 className='font-semibold text-lg'>{method.title}</h3>
                <p className='text-xs font-medium text-gray-500'>{method.description}</p>
                <Link href={"#"} className='inline-block text-sm text-black underline'>
                  {contactMethods[index].contact}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
