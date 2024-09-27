import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Calculator, Calendar, CreditCard, Folder, SeparatorHorizontal, Settings, Smile, User } from "lucide-react";

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "@/components/ui/command";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useParams } from "react-router-dom";
import { apiRequest } from "@/Api/service";
import { AddProjectDialog } from "./Project/AddProjectDialog";

function GroupBoard() {
  const [groupsData, setGroupsData] = useState(null);
  const [email, setEmail] = useState("");
  const { groupId } = useParams();

  const addMembers = async () => {
    const data = await apiRequest("/groups/add-members", { emails: [email], groupId });
    setEmail("");
  };

  const getGroupInfo = async () => {
    const data = await apiRequest("/groups/get-group-info", { groupId });
    console.log(data);

    setGroupsData(data.data);
  };
  useEffect(() => {
    getGroupInfo();
  }, [groupId]);

  if (groupsData == null) return <>waiting...</>;
  return (
    <div className="w-full h-full flex flex-col p-4 ">
      <div className="max-w-screen-md h-full flex flex-col">
        <h1 className="text-4xl text-left text-gray-600 uppercase py-2">{groupsData.groupname}</h1>
        <Separator />
        <div className="w-full py-2">
          <div className="w-full flex justify-between p-1">
            <h1 className=" font-semibold text-black/70">{groupsData.allProjects.length} projects</h1>

            <AddProjectDialog />
          </div>
          <div className="w-full">
            <Command className="w-full ">
              <CommandList>
                {groupsData.allProjects &&
                  groupsData.allProjects.map(project => (
                    <NavLink
                      to={`/project/${project._id}`}
                      key={project._id}
                    >
                      <CommandGroup className="p-1">
                        <CommandItem className="flex justify-between">
                          <span className="flex items-center">
                            <Folder
                              className="mr-2 h-4 w-4"
                              style={{ color: project.color }}
                            />
                            <span className="font-semibold text-gray-600">{project.projectname}</span>
                          </span>
                        </CommandItem>
                      </CommandGroup>
                    </NavLink>
                  ))}
              </CommandList>
            </Command>
          </div>
        </div>
        <Separator />
        <div className="w-full py-2 ">
          <h1 className="p-1 font-semibold text-black/70">{groupsData?.members.length} members</h1>
          <div className="w-full">
            <div className="w-full p-1 flex">
              <Input
                className="h-8"
                placeholder="Enter email of members"
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                }}
              />
              <Button
                className="ml-1 h-8"
                onClick={() => {
                  addMembers();
                }}
              >
                add
              </Button>
            </div>
            <Command className="w-full ">
              <CommandList>
                <CommandGroup className="p-1">
                  <CommandItem
                    className="flex justify-between"
                    key={groupsData.admin._id}
                  >
                    <span className="flex justify-between w-full">
                      <div className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        <span className="font-semibold text-gray-600">{groupsData.admin.fullname}</span>
                      </div>
                      <span className="font-light text-gray-600">admin</span>
                    </span>
                  </CommandItem>
                  {groupsData.members &&
                    groupsData.members.map(member => (
                      <CommandItem
                        className="flex justify-between"
                        key={member._id}
                      >
                        <span className="flex">
                          <User className="mr-2 h-4 w-4" />
                          <span className="font-semibold text-gray-600">{member.fullname}</span>
                        </span>
                      </CommandItem>
                    ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupBoard;
