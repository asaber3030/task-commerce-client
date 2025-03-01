"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Category } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import * as xz from "search-params";

export default function ProductsFilter({
  categories,
  minPrice,
  maxPrice
}: {
  categories: Category[];
  minPrice: number;
  maxPrice: number;
}) {
  const sp = useSearchParams();
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState(sp.get("category") || "");
  const [searchQuery, setSearchQuery] = useState(sp.get("search") || "");

  /*   const [selectedMinPrice, setSelecteMinPrice] = useState(sp.get("min") || minPrice);
  const [selectedMaxPrice, setSelectedMaxPrice] = useState(sp.get("max") || minPrice);
 */
  const handleSearch = () => {
    const q = xz.build({
      category: selectedCategory.trim(),
      search: searchQuery.trim()
    });

    router.push(`?${q}`);
  };

  const handleReset = () => {
    router.push(`/products`);
  };

  return (
    <div className='mb-8 space-y-6 p-6 border rounded-lg bg-card'>
      <h2 className='text-xl font-semibold mb-4'>Filters</h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Search Filter */}
        <div className='space-y-2'>
          <Label htmlFor='search'>Search Products</Label>
          <div className='relative'>
            <Input
              onChange={(e) => setSearchQuery(e.target.value)}
              id='search'
              placeholder='Search by name...'
              className='w-full'
            />
          </div>
        </div>

        {/*         <div className='space-y-2'>
          <Label htmlFor='price-range'>Price Range (EGP)</Label>
          <div className='pt-4 px-2'>
            <Slider
              id='price-range'
              defaultValue={[+selectedMinPrice, +selectedMaxPrice]}
              min={+selectedMinPrice}
              max={+selectedMaxPrice}
              onValueChange={(values) => {
                setSelecteMinPrice(values[0]);
                setSelectedMaxPrice(values[1]);
              }}
              step={10}
            />
            <div className='flex justify-between mt-2 text-sm text-muted-foreground'>
              <span>{minPrice} EGP</span>
              <span>{maxPrice} EGP</span>
            </div>
          </div>
        </div> */}

        {/* Category Filter */}
        <div className='space-y-2'>
          <Label htmlFor='category'>Category</Label>
          <Select onValueChange={(value) => setSelectedCategory(value)}>
            <SelectTrigger id='category'>
              <SelectValue placeholder='Select a category' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value=' '>All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Filter Actions */}
      <div className='flex justify-end gap-2'>
        <Button onClick={handleReset} variant='outline'>
          Reset Filters
        </Button>
        <Button onClick={handleSearch}>Apply Filters</Button>
      </div>
    </div>
  );
}
