"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ref, deleteObject } from "firebase/storage";
import { useAppStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import { db, storage } from "@/firebase";
import { deleteDoc, doc } from "firebase/firestore";

export function DeleteModal() {
  const { user } = useUser();
  const [isDeleteModalOpen, setIsDeleteModalOpen, fileId, setFileId] = useAppStore((state) => [
    state.isDeleteModalOpen,
    state.setIsDeleteModalOpen,
    state.fileId,
    state.setFileId,
  ]);

  const deleteFile = async () => {
    if (!user || !fileId) return;

    const fileRef = ref(storage, `users/${user.id}/files/${fileId}`);

    deleteObject(fileRef)
      .then(async () => {
        deleteDoc(doc(db, "users", user.id, "files", fileId));
      })
      .then(() => console.log("Deleted file"))
      .finally(() => setIsDeleteModalOpen(false))
      .catch((error) => {
        console.log("Uh! Some error occured!");
        setIsDeleteModalOpen(false);
      });
  };

  return (
    <Dialog
      open={isDeleteModalOpen}
      onOpenChange={(isOpen) => {
        setIsDeleteModalOpen(isOpen);
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete?</DialogTitle>
          <DialogDescription>This action cannot be undone. This will permanently delete your file!</DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <Button size="sm" className="px-3 flex-1" variant={"ghost"} onClick={() => setIsDeleteModalOpen(false)}>
            <span className="sr-only">Cancel</span>
            <span>Cancel</span>
          </Button>

          <Button type="submit" size="sm" className="px-3 flex-1" onClick={() => deleteFile()}>
            <span className="sr-only">Delete</span>
            <span>Delete</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
