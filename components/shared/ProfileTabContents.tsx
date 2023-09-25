"use client";
import Image from "next/image";

import { profileTabs } from "@/constants";

import ThreadsTab from "@/components/shared/ThreadsTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { useState } from "react";

interface Props {
  userInfo: object;
  user: object;
}

const ProfileTabContents = ({
  threadLength,
  accountId,
  currentUserId,
}: any) => {
  //   const [tabMode, setTabMode] = useState(1);
  return (
    <div className="mt-9">
      <Tabs defaultValue="threads" className="w-full">
        <TabsList className="tab">
          {profileTabs.map((tab) => (
            <TabsTrigger key={tab.label} value={tab.value} className="tab">
              <Image
                src={tab.icon}
                alt={tab.label}
                width={24}
                height={24}
                className="object-contain"
              />
              <p className="max-sm:hidden">{tab.label}</p>

              {tab.label === "Threads" && (
                <p className="ml-1 rounded-sm bg-neutral-500 px-2 py-1 !text-tiny-medium text-light-2">
                  {threadLength}
                </p>
              )}
            </TabsTrigger>
          ))}
        </TabsList>
        {profileTabs.map((tab) => (
          <TabsContent
            key={`content-${tab.label}`}
            value={tab.value}
            className="w-full text-light-1"
          >
            {/* @ts-ignore */}
            <ThreadsTab
              currentUserId={currentUserId}
              accountId={accountId}
              accountType="User"
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ProfileTabContents;
