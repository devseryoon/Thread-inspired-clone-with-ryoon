import { type ClassValue, clsx } from "clsx";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import { twMerge } from "tailwind-merge";

// created by chatgpt
//아래의 스택오버플로우를 참고하여 적용함
//credit: https://stackoverflow.com/questions/75362636/how-can-i-get-the-url-pathname-on-a-server-component-next-js-13

export function containsKr(headersList: ReadonlyHeaders): boolean {
  const domain = headersList.get("host") || "";
  const fullUrl = headersList.get("referer") || "";
  const [, pathname] =
    fullUrl.match(new RegExp(`https?:\/\/${domain}(.*)`)) || [];
  const res = pathname === undefined ? false : pathname.includes("/kr");
  return res;
}

export function containsKrForClient(pathname: string): boolean {
  // const domain = headersList.get("host") || "";
  // const fullUrl = headersList.get("referer") || "";
  // const [, pathname] =
  //   fullUrl.match(new RegExp(`https?:\/\/${domain}(.*)`)) || [];
  return pathname.includes("/kr");
}
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// created by chatgpt
export function isBase64Image(imageData: string) {
  const base64Regex = /^data:image\/(png|jpe?g|gif|webp);base64,/;
  return base64Regex.test(imageData);
}

// created by chatgpt
export function formatDateString(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString(undefined, options);

  const time = date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  return `${time} - ${formattedDate}`;
}

// created by chatgpt
export function formatThreadCount(count: number): string {
  if (count === 0) {
    return "No Threads";
  } else {
    const threadCount = count.toString().padStart(2, "0");
    const threadWord = count === 1 ? "Thread" : "Threads";
    return `${threadCount} ${threadWord}`;
  }
}
