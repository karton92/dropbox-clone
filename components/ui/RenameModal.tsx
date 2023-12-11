"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAppStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import React, { useState } from "react";
import { Input } from "./input";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "@/firebase";
import { useToast } from "@/components/ui/use-toast";

const RenameModal = () => {
  const { user } = useUser();
  const [input, setInput] = useState("");
  const { toast } = useToast();
  const [isRenameModalOpen, setIsRenameModalOpen, fileId, filename] = useAppStore((state) => [
    state.isRenameModalOpen,
    state.setIsRenameModalOpen,
    state.fileId,
    state.filename,
  ]);

  const renameFile = async () => {
    if (!user || !fileId) return;

    await updateDoc(doc(db, "users", user.id, "files", fileId), {
      filename: input,
    });
    setInput("");
    setIsRenameModalOpen(false);
    toast({
      title: "Rename file",
      description: "Rename file succesful!",
    });
  };
  return (
    <Dialog
      open={isRenameModalOpen}
      onOpenChange={(isOpen) => {
        setIsRenameModalOpen(isOpen);
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Rename the file</DialogTitle>

          <Input
            id="link"
            defaultValue={filename}
            onChange={(e) => setInput(e.target.value)}
            onKeyDownCapture={(e) => {
              if (e.key === "Enter") {
                renameFile();
              }
            }}
          />

          <div className="flex justify-end space-x-2 py-3">
            <Button size="sm" className="px-3 flex-1" variant={"ghost"} onClick={() => setIsRenameModalOpen(false)}>
              <span className="sr-only">Cancel</span>
              <span>Cancel</span>
            </Button>

            <Button type="submit" size="sm" className="px-3" onClick={() => renameFile()}>
              <span className="sr-only">Rename</span>
              <span>Rename</span>
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default RenameModal;
