import { SignIn, SignedIn } from "@clerk/nextjs";
import { currentUser, SignedOut } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import style from "./signin.module.css";
import Image from "next/image";
export default function Page() {
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
          {/* <SignedIn>
            <div>You are signed in</div>
          </SignedIn> */}

          <h1 className="head-text pl-8 text-light-1">New to Thread?</h1>
          <SignedOut>
            {/* <div className="text-light-1">You are signed Out</div> ddd*/}
            <SignIn
              appearance={{
                elements: {
                  baseTheme: dark,
                },
              }}
            />
          </SignedOut>
        </div>
      </div>
    </div>
  );
}
