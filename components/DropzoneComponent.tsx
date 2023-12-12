"use client";

import { db, storage } from "@/firebase";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { addDoc, collection, serverTimestamp, updateDoc, doc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { useToast } from "@/components/ui/use-toast";

const DropzoneComponent = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { isLoaded, isSignedIn, user } = useUser();
  const { toast } = useToast();

  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("File reading was aborted");
      reader.onerror = () => console.log("File reading has failed");
      reader.onload = async () => {
        await uploadPost(file);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const uploadPost = async (selectedFile: File) => {
    if (loading) return;
    if (!user) return;
    setLoading(true);

    //do what needs to be done than...
    //EXAMPLE
    //addNewDocument => users/user1234/files
    const docRef = await addDoc(collection(db, "users", user.id, "files"), {
      userId: user.id,
      filename: selectedFile.name,
      fullName: user.fullName,
      profileImg: user.imageUrl,
      timestamp: serverTimestamp(),
      type: selectedFile.type,
      size: selectedFile.size,
    });

    const imageRef = ref(storage, `users/${user.id}/files/${docRef.id}`);

    uploadBytes(imageRef, selectedFile).then(async (snapshot) => {
      const downloadURL = await getDownloadURL(imageRef);
      await updateDoc(doc(db, "users", user.id, "files", docRef.id), {
        downloadURL: downloadURL,
      });
    });

    setLoading(false);
    toast({
      title: "File upload",
      description: "File upload is succesful!",
    });
  };

  // max file size 20mb
  const maxSize = 20971520;
  return (
    <div>
      <Dropzone minSize={0} maxSize={maxSize} onDrop={onDrop}>
        {({ getRootProps, getInputProps, isDragActive, isDragReject, fileRejections }) => {
          const isFileTooLarge = fileRejections.length > 0 && fileRejections[0].file.size > maxSize;

          return (
            <section className="m-4 cursor-pointer">
              <div
                {...getRootProps()}
                className={cn(
                  "w-full h-52 flex justify-center items-center p-5 border border-dashed rounded-lg text-center",
                  isDragActive
                    ? "bg-[#0160FE] dark:bg-[#147758] text-whit animate-pulse"
                    : "bg-slate-100/50 dark:bg-[#4a6661] text-slate-500 dark:text-slate-300"
                )}
              >
                <input {...getInputProps()} />
                {!isDragActive && "Click here or drop a file to upload!"}
                {isDragActive && !isDragReject && "Drop to upload this file!"}
                {isDragReject && "File type not accepted, sorry!"}
                {isFileTooLarge && <div className="text-danger mt-2">File is too large.</div>}
              </div>
            </section>
          );
        }}
      </Dropzone>
    </div>
  );
};

export default DropzoneComponent;
