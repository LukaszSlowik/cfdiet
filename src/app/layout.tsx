import AppNavbar from "@/components/AppNavbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Provider from "@/components/Provider";
import SearchInput from "@/components/SearchInput";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CF Diet",
  description: "App for CF patients for calculating creon dose, kcal and more",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-slate-50">
      <link rel="icon" href="/donut.ico" sizes="any" />
      <Provider>
        <body
          className={`${inter.className} w-full overflow-x-hidden  bg-slate-50`}
        >
          {/* @ts-expect-error server component */}
          <AppNavbar />
          <div className="flex flex-col gap-10 items-center p-6 ">
            <div className="flex flex-col items-center ">{children}</div>
          </div>
          {/* <ReactQueryDevtools /> */}
        </body>
      </Provider>
    </html>
  );
}
