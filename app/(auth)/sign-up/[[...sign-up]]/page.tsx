import { SignUp } from "@clerk/nextjs";
import style from "./signup.module.css";
export default function Page() {
  return (
    <div className={style.signUp}>
      <div className={style.loginclerk}>
        <h1 className="head-text text-left pl-8 pb-2 text-light-1">Sign Up.</h1>
        <SignUp />
      </div>
    </div>
  );
}
