import React from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TopNav from "../components/TopNav";

const App = ({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) => (
  <SessionProvider session={pageProps.session}>
    <div className="relative h-screen flex flex-col md:flex-col-reverse">
      {/* Sticky top navbar */}
      <div className="sticky top-0 z-10">
        <TopNav />
      </div>

      {/* Main content that hides under the navbars */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="text-center p-16 leading-8 text-xl min-h-screen bg-white dark:bg-[#222222]">
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>

      {/* Sticky bottom navbar */}
      <div className="sticky bottom-0 z-10">
        <Navbar />
      </div>
    </div>
  </SessionProvider>
);

export default App;
