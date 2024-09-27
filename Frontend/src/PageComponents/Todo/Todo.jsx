import React from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
function Todo({ todo }) {
  if (todo.duedate) todo.duedate = new Date(todo.duedate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

  const priorityColor = {
    1: "border-red-500 bg-red-200 data-[state=checked]:bg-red-500 ",
    2: "border-orange-500 bg-orange-200 data-[state=checked]:bg-orange-500 ",
    3: "border-yellow-500 bg-yellow-100 data-[state=checked]:bg-yellow-500 ",
    4: "border-blue-500 bg-blue-100 data-[state=checked]:bg-blue-500 ",
    5: "",
  };
  return (
    <div className="w-full flex flex-col">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="terms"
          className={`${priorityColor[todo.priority]}`}
        />
        <h1
          htmlFor="terms"
          className="text-lg font-normal text-gray-700"
        >
          {todo.title}
        </h1>
      </div>
      <div>
        {todo.discription && <h1 className="text-md pl-6 font-thin text-gray-500">{todo.discription}</h1>}
        {todo.duedate && <h1 className="text-md pl-6 font-thin text-gray-500">{todo.duedate}</h1>}
      </div>
    </div>
  );
}

export default Todo;
