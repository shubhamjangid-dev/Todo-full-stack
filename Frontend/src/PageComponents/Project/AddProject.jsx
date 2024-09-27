import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Priority from "../Todo/Priority";
import { DatePicker } from "../Todo/DatePicker";
import { Separator } from "@/components/ui/separator";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { apiRequest } from "@/Api/service";
import { useNavigate, useParams } from "react-router-dom";
import Color from "./Color";

const formSchema = z.object({
  projectName: z.string(),
  color: z.string(),
});

function AddProject() {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: "",
      color: "",
    },
  });

  async function onSubmit(values) {
    const res = await apiRequest("/projects/create", { ...values, groupId });
    console.log("todo = ", res);

    // if (res) {
    //   navigate(`/project/${projectId}`);
    // }
  }
  return (
    <>
      <div className="max-w-screen-sm px-3 py-2 rounded-lg flex flex-col border border-neutral-200">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2"
          >
            <FormField
              control={form.control}
              name="projectName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="h-8 text-lg my-1 font-normal text-gray-700"
                      placeholder="Project Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              className
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Color
                      className="h-7"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator className="my-2" />

            <div className="w-full my-1 flex justify-end space-x-2">
              <Button
                variant="outline"
                className="h-7"
              >
                cancel
              </Button>
              <Button
                className="h-7"
                type="submit"
              >
                add
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}

export default AddProject;
