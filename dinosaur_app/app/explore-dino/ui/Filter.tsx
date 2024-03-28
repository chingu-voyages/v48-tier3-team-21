"use client";

import React, { use, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

const Filter = ({
  filterOptions,
  placeholder,
  paramValue,
}: {
  filterOptions: (string|number)[];
  placeholder: string;
  paramValue: string;
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value && value !== "all") {
      params.set(paramValue, value);
    } else {
      params.delete(paramValue);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Select
      onValueChange={(value) => handleChange(value)}
      defaultValue={searchParams.get(paramValue)?.toString()}
    >
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{placeholder}</SelectLabel>
          <SelectItem value="all">all</SelectItem>
          {filterOptions.map((option) => (
            <SelectItem key={option} value={option.toString()}>
              {option}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default Filter;
