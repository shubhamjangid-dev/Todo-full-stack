import React from "react";
import { Folder } from "lucide-react";
import { Calculator, Calendar, CreditCard, Settings, Smile, User } from "lucide-react";

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "@/components/ui/command";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { NavLink } from "react-router-dom";
import Logo from "@/Pages/Logo";

function GroupTile({ groupObject }) {
  //   console.log(groupObject);
  const { _id, groupname, allProjects } = groupObject;

  return (
    <>
      <CommandGroup className="p-1">
        <AccordionItem value={_id}>
          <CommandItem className="flex justify-between rounded-md overflow-hidden py-0">
            <NavLink
              className="w-full flex"
              to={`/team/${_id}`}
            >
              <span className="flex flex-1 py-1.5">
                <Logo className="mr-2 h-4 w-4 p-0.5" />
                <span className="font-bold uppercase text-gray-600">{groupname}</span>
              </span>
            </NavLink>
            <AccordionTrigger></AccordionTrigger>
          </CommandItem>
          <AccordionContent>
            <CommandGroup>
              {allProjects &&
                allProjects.map(project => (
                  <NavLink
                    to={`/project/${project._id}`}
                    key={project._id}
                    // className={({ isActive }) => (isActive ? "text-orange-700" : "")}
                  >
                    {({ isActive }) => {
                      return (
                        <CommandItem
                          className={`${isActive ? "bg-green-100" : ""}`}
                          isActive={isActive}
                        >
                          <Folder
                            className={`mr-2 h-4 w-4`}
                            style={{ color: project.color }}
                          />
                          <span>{project.projectname}</span>
                        </CommandItem>
                      );
                    }}
                  </NavLink>
                ))}
            </CommandGroup>
          </AccordionContent>
        </AccordionItem>
      </CommandGroup>
    </>
  );
}

export default GroupTile;
