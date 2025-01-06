import type { NextPage } from "next";
import Title from "../components/Title";
import PageHead from "../components/PageHead";

const Custom404: NextPage = () => {
  return (
    <div>
      <PageHead title="404" />

      <main>
        <Title text="Page not found" emoji="&#128557;" />
      </main>
    </div>
  );
};

export default Custom404;
