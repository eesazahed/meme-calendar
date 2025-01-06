import { NextPage } from "next";
import PageHead from "../../components/PageHead";
import Title from "../../components/Title";

const Welcome: NextPage = () => {
  return (
    <div>
      <PageHead title="welcome" />

      <main>
        <Title text="thanks for signing up!" />

        <a
          href="/"
          className="block select-none bg-[#1E90FF] p-4 md:w-1/3 mx-auto mt-32 rounded-3xl cursor-pointer hover:brightness-[1.2] duration-500"
        >
          <span className="text-white text-4xl font-bold">let&apos;s go!</span>
        </a>
      </main>
    </div>
  );
};

export default Welcome;
