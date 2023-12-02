"use client";
import { SignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import { useEffect, useState } from "react";
import style from "./signin.module.css";
export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  console.log("sign-in");
  console.log("locale", locale);
  return (
    <div className={style.loginmain}>
      <div className={style.loginThreadlogo}>
        <picture className={style.pic}>
          <source
            src="/images/barcelona/ribbons/nonenglish-dark.webp"
            type="image/webp"
          />
          <Image
            priority={false}
            alt=""
            height="510"
            src="/assets/nonenglish-dark.png"
            width="1785"
          />
        </picture>
        <div className={style.loginclerk}>
          <SignedIn>
            <div>You are signed in</div>
          </SignedIn>

          <h1 className="head-text pl-8 text-light-1">New to Thread?</h1>
          <SignedOut>
            <div className="text-light-1">You are signed Out</div>
            <SignIn />
          </SignedOut>
        </div>
      </div>
    </div>
  );
}
