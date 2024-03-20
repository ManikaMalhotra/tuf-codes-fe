import Head from "next/head";
import { Inter } from "next/font/google";
import LandingPage from "@/views/LandingPage";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>tufCodes</title>
        <meta name="description" content="Code tuf problems with ease" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LandingPage />
    </>
  );
}
