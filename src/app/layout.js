import "./globals.css";

export const metadata = {
  title: "TaskInMind",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" className="w-full h-full overflow-hidden">
      <body className="w-full h-full">
        {children}
      </body>
    </html>
  );
}


