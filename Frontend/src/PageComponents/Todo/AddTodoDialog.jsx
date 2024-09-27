import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import AddTodo from "./AddTodo";

export function AddTodoDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-8">add</Button>
      </DialogTrigger>
      <DialogContent className="p-1">
        <AddTodo />
      </DialogContent>
    </Dialog>
  );
}
