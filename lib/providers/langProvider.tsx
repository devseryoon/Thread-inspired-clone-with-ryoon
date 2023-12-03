"use client";
import React, { useEffect, useState } from "react";
import LangContext from "../context/LangContext";
import enMessage from "./../../messages/en.json";
import krMessage from "./../../messages/kr.json";
type Props = {};

const LangProvider = ({ children }: { children: React.ReactNode }) => {
  const [langKr, setLangKr] = useState<any>(false);
  const translate = langKr ? krMessage : enMessage;
  useEffect(() => {
    console.log("mod-lang:", langKr);
  }, [langKr]);
  return (
    <LangContext.Provider value={{ langKr, setLangKr, translate }}>
      {children}
    </LangContext.Provider>
  );
};

export default LangProvider;
