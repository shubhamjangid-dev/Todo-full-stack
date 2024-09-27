import React, { useState, useEffect } from "react";

import { Calculator, Calendar, CreditCard, Settings, Smile, User } from "lucide-react";

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "@/components/ui/command";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import GroupTile from "./GroupTile";
import { apiRequest } from "@/Api/service";
import { Button } from "@/components/ui/button";

function Menu() {
  const [groupsArray, setGroupsArray] = useState([]);

  const getGroupProjectData = async () => {
    const data = await apiRequest("/groups/get-group-project-data");
    console.log(data);

    setGroupsArray(data.data);
  };

  useEffect(() => {
    getGroupProjectData();
  }, []);
  return (
    <Command className="rounded-none border shadow-md">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <Calendar className="mr-2 h-4 w-4" />
            <span>Inbox</span>
          </CommandItem>
          <CommandItem>
            <Calendar className="mr-2 h-4 w-4" />
            <span>Today</span>
          </CommandItem>
          <CommandItem>
            <Calculator className="mr-2 h-4 w-4" />
            <span>Upcomming</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />
        <Accordion
          type="multiple"
          collapsible
          className="w-full"
        >
          {groupsArray &&
            groupsArray.map(groupObject => (
              <GroupTile
                groupObject={groupObject}
                key={groupObject._id}
              />
            ))}
        </Accordion>
      </CommandList>
      <Button className="mx-1">Add Team</Button>
    </Command>
  );
}
export default Menu;
