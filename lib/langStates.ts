import { atom } from "recoil";
export const langState = atom({
  key: "lang",
  default: { lang: "en" },
});

export const userState = atom({
  key: "userInfo",
  default: <any>{},
});
