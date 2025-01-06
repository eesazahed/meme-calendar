import type { NextPage } from "next";
import PageHead from "../components/PageHead";
import Title from "../components/Title";
import getCalendar from "../utils/getCalendar";
import CalendarGrid from "../components/CalendarGrid";
import { VoteOptionType } from "../types";

interface Props {
  calendar: VoteOptionType[];
}

const Home: NextPage<Props> = ({ calendar }) => {
  return (
    <div>
      <PageHead title="Home" />

      <main>
        <Title text="meme calendar" emoji="&#128197;" gradient />

        <p>2025</p>
        <br />

        {calendar && <CalendarGrid calendar={calendar} />}
      </main>
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const calendar = await getCalendar();

  return {
    props: {
      calendar,
    },
  };
};
