"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import { useState } from "react";
import PostThread from "../forms/PostThread";

interface Props {
  userId: string;
  krRes: boolean;
}

const CreateThreadModal = ({ userId, krRes }: Props) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Edit className={`w-[22px] h-[22px] text-neutral-600`} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Thread</DialogTitle>
        </DialogHeader>
        <PostThread userId={userId} krRes={krRes} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateThreadModal;
