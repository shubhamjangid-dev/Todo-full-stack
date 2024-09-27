import * as React from "react";

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

function Color({ ...field }) {
  const colors = [
    { colorCode: "#33FF57", colorName: "Lime Green" },
    { colorCode: "#3357FF", colorName: "Bright Blue" },
    { colorCode: "#FFC300", colorName: "Bright Yellow" },
    { colorCode: "#FF33A8", colorName: "Hot Pink" },
    { colorCode: "#33FFF6", colorName: "Aqua" },
    { colorCode: "#C70039", colorName: "Crimson Red" },
    { colorCode: "#900C3F", colorName: "Deep Purple" },
    { colorCode: "#581845", colorName: "Dark Violet" },
    { colorCode: "#FF5733", colorName: "Coral" },
    { colorCode: "#DAF7A6", colorName: "Light Green" },
    { colorCode: "#FF8D33", colorName: "Tangerine" },
    { colorCode: "#33FFB5", colorName: "Mint Green" },
    { colorCode: "#FF33D6", colorName: "Magenta" },
    { colorCode: "#33D6FF", colorName: "Sky Blue" },
    { colorCode: "#A6FF33", colorName: "Neon Green" },
    { colorCode: "#33FF83", colorName: "Pastel Green" },
    { colorCode: "#FF338B", colorName: "Deep Pink" },
    { colorCode: "#338BFF", colorName: "Royal Blue" },
    { colorCode: "#FFD633", colorName: "Golden Yellow" },
  ];

  return (
    <Select
      onValueChange={field.onChange}
      defaultValue={field.value}
    >
      <SelectTrigger className="w-[250px]">
        <SelectValue placeholder="Color" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {colors.map(ele => (
            <SelectItem value={ele.colorCode}>
              <div className="flex items-center">
                <div
                  className={`w-4 h-4 rounded-full mr-1`}
                  style={{ backgroundColor: ele.colorCode }}
                ></div>
                {ele.colorName}
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default Color;
