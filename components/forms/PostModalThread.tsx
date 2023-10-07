"use client";

import { Edit } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { Textarea } from "../ui/textarea";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { createThread } from "@/lib/actions/thread.actions";
import { ThreadValidation } from "@/lib/validations/thread";
import { useAuth, useOrganization } from "@clerk/nextjs";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
const PostModalThread = ({ userId }: { userId: string }) => {
  // console.log(`유저아이디: ${userId}`);
  const router = useRouter();
  //   const {userId} = useAuth();
  const pathname = usePathname();
  const { organization } = useOrganization();
  const intl = useTranslations("CustomCreateThreadModal");

  const form = useForm({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: "",
      accountId: userId,
    },
  });

  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    console.log("ORG_ID: ", organization?.id);
    console.log("userId: ", JSON.stringify(userId).replace(/\"/gi, ""));
    // const newUserId = JSON.stringify(userId).replace(/\"/gi, "");
    await createThread({
      text: values.thread,
      author: userId,
      communityId: organization ? organization.id : null,
      path: pathname,
    });
    router.push("/");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-4 "
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="mt-2 flex flex-col  w-full gap-1">
              {/* <FormLabel className="text-base-semibold dark:text-light-2">
      Content
    </FormLabel> */}
              <FormControl className="no-focus border dark:border-dark-4 dark:bg-dark-3 dark:text-light-1">
                <Textarea
                  className="mt-1 mini-scrollbar text-base/relaxed resize-none h-16 bg-transparent w-full placeholder:text-neutral-300 dark:placeholder:text-neutral-600 pb-1 outline-none focus:border-b dark:border-b-neutral-700"
                  placeholder={intl("placeholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className=" bg-neutral-400   dark:bg-neutral-800 dark:text-neutral-300"
        >
          {/* {krRes ? "게시" : "Post Thread"} */}
          "게시"
        </Button>
      </form>
    </Form>
  );
};

export default PostModalThread;
