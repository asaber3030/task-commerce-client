"use client";

import { updateSectionTranslationAction } from "@/server/sections";
import { showResponseMessage } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Section, SectionTranslation } from "@prisma/client";
import { SectionTranslationSchema } from "@/lib/schema";
import { SectionListItem } from "@/types/app";
import { LoadingButton } from "@/components/common/loading-button";
import { Minus, Plus } from "lucide-react";
import { InputField } from "@/components/common/input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { ICONS_LIST } from "../../_helpers/lists";
import { IconDisplay } from "@/components/common/icon-displayer";

type Props = {
  section: Section;
  translations: SectionTranslation[];
};

export const UpdateSectionForm = ({ section, translations }: Props) => {
  const en = translations.find((t) => t.locale === "en");
  const ar = translations.find((t) => t.locale === "ar");

  const [listCount, setListCount] = useState((en?.list as SectionListItem[])?.length || 1);

  const [list, setList] = useState<SectionListItem[]>((en?.list || []) as SectionListItem[]);
  const [listAr, setListAr] = useState<SectionListItem[]>((ar?.list || []) as SectionListItem[]);

  const form = useForm({
    resolver: zodResolver(SectionTranslationSchema),
    defaultValues: {
      en: {
        title: en?.title || "",
        content: en?.content || ""
      },
      ar: {
        title: ar?.title || "",
        content: ar?.content || ""
      }
    }
  });

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof SectionTranslationSchema>) =>
      updateSectionTranslationAction(section.id, data, list, listAr),
    onSuccess: (data) => showResponseMessage(data)
  });

  const handleIncreaseListItems = () => {
    setListCount((prev) => (prev != 6 ? prev + 1 : 6));
    setList((prev) => [
      ...prev,
      {
        title: "",
        description: "",
        icon: ""
      }
    ]);
  };

  const handleDecreaseListItems = () => {
    setListCount((prev) => (prev - 1 != 0 ? prev - 1 : 1));
    if (listCount === 1) return;
    setList((prev) => prev.slice(0, prev.length - 1));
  };

  const handleUpdateList = (idx: number, data: SectionListItem) => {
    setList((prev) => {
      const newList = [...prev];
      newList[idx] = data;
      return newList;
    });
  };

  const handleUpdateListAr = (idx: number, data: SectionListItem) => {
    setListAr((prev) => {
      const newList = [...prev];
      newList[idx] = data;
      return newList;
    });
  };

  const handleSubmit = () => {
    mutation.mutate(form.getValues());
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Update Section - <b>Section Name: {section.name}</b>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue='home-intro-form-en'>
          <TabsList>
            <TabsTrigger value='home-intro-form-en'>English {!en && "(missing)"}</TabsTrigger>
            <TabsTrigger value='home-intro-form-ar'>Arabic {!ar && "(missing)"}</TabsTrigger>
          </TabsList>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <TabsContent value='home-intro-form-en' className='space-y-4'>
                <InputField
                  label='Title'
                  control={form.control}
                  placeholder='Section title'
                  name='en.title'
                />
                <InputField
                  label='Content'
                  control={form.control}
                  placeholder='Section content'
                  name='en.content'
                />

                <div>
                  <div className=' mb-4 border-b pb-2 flex justify-between items-center'>
                    <p className='text-xl font-bold'>List Items</p>
                    {/* Increase, Decrease Buttons */}
                    <div className='flex gap-2 items-center'>
                      <Button
                        variant='outline'
                        onClick={handleIncreaseListItems}
                        icon={Plus}
                        size='icon'
                        type='button'
                      />
                      {listCount}
                      <Button
                        variant='outline'
                        onClick={handleDecreaseListItems}
                        icon={Minus}
                        size='icon'
                        type='button'
                      />
                    </div>
                  </div>

                  {Array.from({ length: listCount }).map((_, i) => (
                    <div
                      key={`list-intro-${section.id}-${i}`}
                      className='grid grid-cols-4 gap-2 items-center mb-2'
                    >
                      <div>
                        <Label>Title</Label>
                        <Input
                          value={list?.[i]?.title || ""}
                          onChange={(event) =>
                            handleUpdateList(i, {
                              ...list?.[i],
                              title: event.target.value
                            })
                          }
                          placeholder='Title'
                        />
                      </div>

                      <div>
                        <Label>Additional Title</Label>
                        <Input
                          value={list?.[i]?.additionalTitle || ""}
                          onChange={(event) =>
                            handleUpdateList(i, {
                              ...list?.[i],
                              additionalTitle: event.target.value
                            })
                          }
                          placeholder='Additional Title'
                        />
                      </div>

                      <div>
                        <Label>Description</Label>
                        <Input
                          defaultValue={list?.[i]?.description || ""}
                          onChange={(event) =>
                            handleUpdateList(i, {
                              ...list[i],
                              description: event.target.value
                            })
                          }
                          placeholder='Description'
                        />
                      </div>

                      <div>
                        <Label>Icon</Label>
                        <Select
                          defaultValue={list?.[i]?.icon || ""}
                          onValueChange={(value) =>
                            handleUpdateList(i, {
                              ...list?.[i],
                              icon: value
                            })
                          }
                        >
                          <SelectTrigger defaultValue={list?.[i]?.icon || ""}>
                            <SelectValue placeholder='Icon' />
                          </SelectTrigger>
                          <SelectContent>
                            {ICONS_LIST.map((icon, idx) => (
                              <SelectItem value={icon} key={`icon-en-${icon}-${idx}`}>
                                <IconDisplay icon={icon} />
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value='home-intro-form-ar' className='space-y-4'>
                <InputField
                  label='Title'
                  control={form.control}
                  placeholder='Section title'
                  name='ar.title'
                />
                <InputField
                  label='Content'
                  control={form.control}
                  placeholder='Section content'
                  name='ar.content'
                />

                <div>
                  <div className=' mb-4 border-b pb-2 flex justify-between items-center'>
                    <p className='text-xl font-bold'>List Items</p>
                    <div className='flex gap-2 items-center'>
                      <Button
                        variant='outline'
                        onClick={handleIncreaseListItems}
                        icon={Plus}
                        size='icon'
                      />
                      {listCount}
                      <Button
                        variant='outline'
                        onClick={handleDecreaseListItems}
                        icon={Minus}
                        size='icon'
                      />
                    </div>
                  </div>
                  {Array.from({ length: listCount }).map((_, i) => (
                    <div
                      key={`list-intro-home-${i}`}
                      className='grid grid-cols-4 gap-2 items-center mb-2'
                    >
                      <div>
                        <Label>Title</Label>
                        <Input
                          defaultValue={listAr?.[i]?.title || ""}
                          onChange={(event) =>
                            handleUpdateListAr(i, {
                              ...listAr[i],
                              title: event.target.value
                            })
                          }
                          placeholder='Title'
                        />
                      </div>

                      <div>
                        <Label>Additional Title</Label>
                        <Input
                          defaultValue={listAr?.[i]?.additionalTitle || ""}
                          onChange={(event) =>
                            handleUpdateListAr(i, {
                              ...listAr[i],
                              additionalTitle: event.target.value
                            })
                          }
                          placeholder='AdditionalTitle'
                        />
                      </div>

                      <div>
                        <Label>Description</Label>
                        <Input
                          defaultValue={listAr?.[i]?.description || ""}
                          onChange={(event) =>
                            handleUpdateListAr(i, {
                              ...listAr[i],
                              description: event.target.value
                            })
                          }
                          placeholder='Description'
                        />
                      </div>

                      <div>
                        <Label>Icon</Label>
                        <Select
                          defaultValue={listAr?.[i]?.icon || ""}
                          onValueChange={(value) =>
                            handleUpdateListAr(i, {
                              ...listAr[i],
                              icon: value
                            })
                          }
                        >
                          <SelectTrigger defaultValue={listAr?.[i]?.icon || ""}>
                            <SelectValue placeholder='Icon' />
                          </SelectTrigger>
                          <SelectContent>
                            {ICONS_LIST.map((icon, idx) => (
                              <SelectItem value={icon} key={`icon-ar-${icon}-${idx}`}>
                                <IconDisplay icon={icon} />
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <LoadingButton loading={mutation.isPending} className='mt-4'>
                Save
              </LoadingButton>
            </form>
          </Form>
        </Tabs>
      </CardContent>
    </Card>
  );
};
