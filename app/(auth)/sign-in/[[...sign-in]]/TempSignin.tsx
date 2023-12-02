import { SignIn } from "@clerk/nextjs";

const TempSignin = () => {
  return (
    <div className=" w-[500px] h-[500px] ">
      <SignIn />
    </div>
  );
};

export default TempSignin;
