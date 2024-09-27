import React, { useState, useEffect } from "react";
import { Calculator, Calendar, CreditCard, Folder, SeparatorHorizontal, Settings, Smile, User } from "lucide-react";

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "@/components/ui/command";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useParams } from "react-router-dom";
import { apiRequest } from "@/Api/service";
import Todo from "./Todo/Todo";
import { AddTodoDialog } from "./Todo/AddTodoDialog";

function ProjectBoard() {
  const [projectData, setProjectData] = useState(null);
  const { projectId } = useParams();

  const getPeojectInfo = async () => {
    const data = await apiRequest("/projects/get-project-info", { projectId });
    console.log(data);

    setProjectData(data.data);
  };
  useEffect(() => {
    getPeojectInfo();
  }, [projectId]);

  if (projectData == null) return <>waiting...</>;
  return (
    <div className="w-full h-full flex flex-col p-4 mx-auto">
      <div className="max-w-screen-md h-full flex flex-col">
        <h1 className="text-3xl text-left text-gray-600 py-2">{projectData.projectname}</h1>
        <Separator />
        <div className="w-full py-2">
          <div className="w-full flex justify-between p-1">
            <h1 className=" font-semibold text-black/70">{projectData.allTodos.length} todos</h1>
            <AddTodoDialog />
          </div>
          <div className="w-full">
            <Command className="w-full ">
              <CommandList>
                {projectData.allTodos &&
                  projectData.allTodos.map(todo => (
                    <div key={todo._id}>
                      <CommandGroup className="p-1">
                        <CommandItem className="flex justify-between">
                          <Todo todo={todo} />
                        </CommandItem>
                      </CommandGroup>
                      <Separator />
                    </div>
                  ))}
              </CommandList>
            </Command>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectBoard;
