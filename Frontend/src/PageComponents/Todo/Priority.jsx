import * as React from "react";

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

function Priority({ ...field }) {
  return (
    <Select
      onValueChange={field.onChange}
      defaultValue={field.value}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Priority" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="1">Priority 1</SelectItem>
          <SelectItem value="2">Priority 2</SelectItem>
          <SelectItem value="3">Priority 3</SelectItem>
          <SelectItem value="4">Priority 4</SelectItem>
          <SelectItem value="5">Priority 5</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default Priority;
