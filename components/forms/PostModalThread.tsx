"use client";

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
import { useOrganization } from "@clerk/nextjs";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import LangContext from "@/lib/context/LangContext";

const PostModalThread = ({
  userId,
  // krRes,
  closeModal,
}: {
  userId: string;
  // krRes: boolean;
  closeModal: () => void;
}) => {
  const { langKr, setLangKr, translate }: any = useContext(LangContext);
  const intl = translate.CustomCreateThreadModal;
  const router = useRouter();
  const pathname = usePathname();
  // console.log("userId: ", JSON.stringify(userId).replace(/\"/gi, ""));
  // const userId2 = JSON.stringify(userId).replace(/\"/gi, "");
  // console.log(userId2.replace(/\\/g, ""));

  const { organization } = useOrganization();

  const form = useForm({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: "",
      accountId: userId,
    },
  });

  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    console.log("ORG_ID: ", organization?.id);
    await createThread({
      text: values.thread,
      author: userId,
      communityId: organization ? organization.id : null,
      path: pathname,
    });
    closeModal();
    router.push("/");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        method="GET"
        className="flex flex-col justify-start gap-4 "
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="mt-2 flex flex-col  w-full gap-1">
              <FormControl className="no-focus border dark:border-dark-4 dark:bg-dark-3 dark:text-light-1">
                <Textarea
                  className="mt-1 mini-scrollbar text-base/relaxed resize-none h-16 bg-transparent w-full placeholder:text-neutral-300 dark:placeholder:text-neutral-600 pb-1 outline-none focus:border-b dark:border-b-neutral-700"
                  placeholder={intl.placeholder}
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
          Post Thread
          {/* {krRes ? "게시" : "Post Thread"} */}
        </Button>
      </form>
    </Form>
  );
};

export default PostModalThread;
