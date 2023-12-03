"use client"; //form은 Browser event이므로 꼭 이렇게 명시해줄 것.

import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { addCommentToThread } from "@/lib/actions/thread.actions";
import { CommentValidation } from "@/lib/validations/thread";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";
import LangContext from "@/lib/context/LangContext";

interface Props {
  threadId: string;
  currentUserImg: string;
  currentUserId: string;
}

const Comment = ({ threadId, currentUserImg, currentUserId }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const { langKr, setLangKr, translate }: any = useContext(LangContext);
  const intl = translate.Comment;
  const form = useForm({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      thread: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    await addCommentToThread(
      threadId,
      values.thread,
      JSON.parse(currentUserId),
      pathname
    );
    form.reset();
    // router.push("/");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="comment-form">
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className=" flex flex-row items-center  w-full gap-3">
              <FormLabel className="relative h-11  w-11 ">
                <Image
                  src={currentUserImg}
                  alt="Profile image"
                  // width={48}
                  // height={48}
                  fill
                  sizes="(max-width: 768px) 2.75rem, (max-width: 1200px) 2.75rem"
                  className="rounded-full w-auto  h-auto"
                />
              </FormLabel>
              <FormControl className="border-none bg-transparent">
                <Input
                  type="text"
                  placeholder={intl.comment}
                  className="no-focus dark:text-light-1 text-gray-800  outline-none"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className="comment-form_btn">
          {intl.reply}
        </Button>
      </form>
    </Form>
  );
};

export default Comment;
