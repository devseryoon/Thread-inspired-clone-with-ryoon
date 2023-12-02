import "../../globals.css";

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  console.log("~~~~~~~~~~~~~~~~~3333");
  console.log("locale", locale);
  return (
    <html lang={locale}>
      <body>
        <div className="w-full flex justify-center items-center min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
