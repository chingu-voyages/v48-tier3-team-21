"use client";

import React, { useState,useEffect} from "react";


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
  filterOptions: () => Promise<(string | number)[]>;
  placeholder: string;
  paramValue: string;
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [filterValues, setFilterValues] = useState<(string | number)[]>([]);

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value && value !== "all") {
      params.set(paramValue, value);
    } else {
      params.delete(paramValue);
    }
    replace(`${pathname}?${params.toString()}`);
  };
  useEffect(() => {
     ( async () => {
      const values = await filterOptions();
      setFilterValues(values);
     })();
    ;
  }, []);

  return (
    <Select
      onValueChange={(value) => handleChange(value)}
      defaultValue={searchParams.get(paramValue)?.toString() || "all"}
    >
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="all">{placeholder}</SelectItem>
          {filterValues?.map((option) => (
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
