import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import AddProject from "./AddProject";

export function AddProjectDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-8">add</Button>
      </DialogTrigger>
      <DialogContent className="p-1">
        <AddProject />
      </DialogContent>
    </Dialog>
  );
}
