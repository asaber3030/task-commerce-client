"use client";

import { useCookies } from "next-client-cookies";
import { useContext } from "react";

import { Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { LanguageContext } from "@/providers/language";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslate } from "@/hooks/use-translate";
import { LANGUAGE_COOKIE } from "@/lib/constants";

export const LanguageChangerDropdown = () => {
  const cookies = useCookies();
  const currentLanguage = useContext(LanguageContext);
  const translate = useTranslate();

  const changeLanguage = (language: "en" | "ar") => {
    cookies.set(LANGUAGE_COOKIE, language);
    window.location.reload();
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' className='text-sm uppercase h-10'>
            {currentLanguage}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className='w-[250px]'>
          <DropdownMenuItem
            onClick={() => changeLanguage("ar")}
            className={cn(
              "flex justify-between items-center",
              currentLanguage === "ar" && "text-right flex-row-reverse"
            )}
          >
            <div
              className={cn(
                "flex gap-4 items-center",
                currentLanguage === "ar" && "flex-row-reverse"
              )}
            >
              {translate("arabic")}
            </div>
            {currentLanguage === "ar" && <Check className='size-4' />}
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => changeLanguage("en")}
            className={cn(
              "flex justify-between items-center",
              currentLanguage === "ar" && "text-right flex-row-reverse"
            )}
          >
            <div
              className={cn(
                "flex gap-4 items-center",
                currentLanguage === "ar" && "flex-row-reverse"
              )}
            >
              {translate("english")}
            </div>
            {currentLanguage === "en" && <Check className='size-4' />}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
