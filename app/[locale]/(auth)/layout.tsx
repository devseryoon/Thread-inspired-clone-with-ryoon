import "../../globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        {/* <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        > */}
        <div className="w-full flex justify-center items-center min-h-screen">
          {children}
        </div>
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
