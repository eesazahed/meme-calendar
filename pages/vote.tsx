import type { NextPage } from "next";
import PageHead from "../components/PageHead";
import Title from "../components/Title";
import Link from "../components/Link";
import getUserFromSession from "../utils/getUserFromSession";
import getTopVoteOptions from "../utils/getTopVoteOptions";
import { UserContext } from "../context";
import { useState } from "react";
import VoteOption from "../components/VoteOption";
import Btn from "../components/Btn";
import Input from "../components/Input";
import { UserType, VoteOptionType } from "../types";

interface Props {
  user: UserType;
  topVoteOptions: VoteOptionType[];
}

const Vote: NextPage<Props> = ({ user, topVoteOptions }) => {
  const [topVoteOptionsList, setTopVoteOptionsList] =
    useState<VoteOptionType[]>(topVoteOptions);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchChange = (newSearchQuery: string) => {
    setSearchQuery(newSearchQuery);
  };

  const handleSearchClick = async () => {
    let url = "/api/vote/topvoteoptions";
    if (searchQuery) {
      url += `?search=${searchQuery}`;
    }

    const request = await fetch(url);
    const data = await request.json();
    setTopVoteOptionsList(data);
  };

  const deleteVoteOption = async (optionId: string) => {
    const request = await fetch(`/api/vote/deleteoption`, {
      method: "DELETE",
      body: JSON.stringify({ optionId }),
    });

    const data = await request.json();

    if (data.type === "success") {
      setTopVoteOptionsList(
        topVoteOptionsList.filter((option) => option.id !== optionId)
      );
    }
  };

  return (
    <div>
      <PageHead title="vote" />

      <main>
        <Title text="vote" emoji="&#128202;" />

        <p>
          view the most popular memes of the month or{" "}
          <Link text="submit one" href="create" dontOpenInNewTab />
        </p>

        <div className="flex md:w-1/2 mx-auto mt-8 mb-16">
          <div className="w-full pr-3">
            <Input
              parentData={searchQuery}
              updateParent={handleSearchChange}
              placeholder="search for stuff"
              noMargin
            />
          </div>
          <div className="pl-3">
            <Btn text="go!" onClick={handleSearchClick} noMargin />
          </div>
        </div>

        <UserContext.Provider value={user}>
          {topVoteOptionsList.length > 0 ? (
            topVoteOptionsList.map((details) => (
              <VoteOption
                key={details.id}
                details={details}
                updateParent={() => deleteVoteOption(details.id)}
              />
            ))
          ) : (
            <div>
              <p>no results found</p>
              <p>
                <Link
                  text="create a submission"
                  href="create"
                  dontOpenInNewTab
                />
              </p>
            </div>
          )}
        </UserContext.Provider>

        {topVoteOptionsList.length > 10 && (
          <div>
            <p>
              these are just the top 10 most popular options. search for
              something more specific!
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Vote;

export const getServerSideProps = async (context: any) => {
  const user = await getUserFromSession(context.req);
  const topVoteOptions = await getTopVoteOptions();

  return {
    props: {
      user,
      topVoteOptions,
    },
  };
};
