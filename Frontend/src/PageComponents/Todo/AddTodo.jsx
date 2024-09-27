import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Priority from "./Priority";
import { DatePicker } from "./DatePicker";
import { Separator } from "@/components/ui/separator";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { apiRequest } from "@/Api/service";
import { useNavigate, useParams } from "react-router-dom";

const formSchema = z.object({
  title: z.string(),
  discription: z.string(),
  duedate: z.date().nullable(),
  priority: z.string(),
});

function AddTodo() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      discription: "",
      duedate: null,
      priority: "",
    },
  });

  async function onSubmit(values) {
    const res = await apiRequest("/todos/create", { ...values, projectId });
    console.log("todo = ", res);

    if (res) {
      navigate(`/project/${projectId}`);
    }
  }
  return (
    <div className="max-w-screen-sm px-3 py-2 rounded-lg flex flex-col border border-neutral-200">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="h-8 text-lg my-1 font-normal text-gray-700"
                    placeholder="Title"
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
            name="discription"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="h-7 text-md my-1 font-thin text-gray-500 outline-none"
                    placeholder="Discription"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full my-1 flex justify-between space-x-2">
            <FormField
              className
              control={form.control}
              name="duedate"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <DatePicker
                      className="h-7"
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
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Priority
                      className="h-7"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
  );
}

export default AddTodo;
