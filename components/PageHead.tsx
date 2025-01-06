import type { NextPage } from "next";
import Head from "next/head";

interface Props {
  title: string;
}

const PageHead: NextPage<Props> = ({ title }) => {
  return (
    <Head>
      <title>{`meme calendar | ${String(title)}`}</title>
      <meta name="description" content="meme calendar. made by eesa zahed" />
      <link rel="icon" href="/assets/images/favicon.ico" />
    </Head>
  );
};

export default PageHead;
