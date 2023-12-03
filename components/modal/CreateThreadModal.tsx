"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit } from "lucide-react";
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

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";
import LangContext from "@/lib/context/LangContext";
interface Props {
  userId: string;
  krRes: boolean;
  userInfo: {
    id: string;
    username: string;
    name: string;
    image: string;
    bio: string;
  };
}

const CreateThreadModal = ({ userId, krRes, userInfo }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const { organization } = useOrganization();
  const { langKr, setLangKr, translate }: any = useContext(LangContext);
  const intl = translate.PostThreadForMd;
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
    // toast({
    //   title: "Thread created",
    // });
    router.push("/");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Edit
          className={`w-[22px] h-[22px] text-neutral-300 dark:text-neutral-600`}
        />
      </DialogTrigger>
      <DialogContent className="dark:bg-neutral-900 bg-white rounded-3xl">
        <DialogHeader>
          <DialogTitle className="dark:text-light-1">New Thread</DialogTitle>
        </DialogHeader>
        {/* <PostThreadForMd userId={userId} krRes={krRes} userInfo={userInfo} /> */}
        <div className="dark:bg-neutral-900">
          <div className="space-x-2 flex font-light">
            <div className="flex flex-col items-center justify-start">
              <div className="w-8 h-8 rounded-full bg-neutral-600 overflow-hidden">
                <Image
                  src={userInfo.image}
                  height={32}
                  width={32}
                  className=""
                  alt={userInfo.name + "'s profile image"}
                />
              </div>
              <div className="w-0.5 grow mt-2 rounded-full bg-zinc-200 dark:bg-zinc-800" />
            </div>
            <div className="w-full">
              <div className="font-semibold text-left dark:text-light-1">
                {userInfo.username}
              </div>
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
                    {krRes ? "게시" : "Post Thread"}
                  </Button>
                </form>
              </Form>
              {/* <textarea
          value={thread}
          onChange={(e) => {
            if (e.target.value.length > 200) return;
            setThread(e.target.value);
          }}
          className="mt-1 mini-scrollbar text-base/relaxed resize-none h-16 bg-transparent w-full placeholder:text-neutral-600 pb-1 outline-none focus:border-b border-b-neutral-700"
          placeholder="Start a thread..."
        />
        <div className="mt-1 text-end font-medium text-xs text-neutral-600">
          {thread.length}/200
        </div> */}
            </div>
          </div>
          {/* <Button
      disabled={thread.length === 0 || isPending}
      variant="outline"
      className="w-full mt-4"
      onClick={() => {
        startTransition(() => createThread(thread, create.id, pathname));
        setClicked(true);
      }}
    >
      {isPending ? (
        <Loader2 className="h-4 w-4 animate-spin text-neutral-600" />
      ) : (
        "Post"
      )}
    </Button> */}
          {/* <div className="flex justify"></div> */}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateThreadModal;
