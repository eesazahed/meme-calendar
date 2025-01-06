import type { NextPage } from "next";
import PageHead from "../components/PageHead";
import Title from "../components/Title";
import getUserFromSession from "../utils/getUserFromSession";
import FormattedTime from "../components/FormattedTime";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { UserContext } from "../context";
import getUserVoteOptions from "../utils/getUserVoteOptions";
import VoteOption from "../components/VoteOption";

interface Props {
  user: UserType;
  userVoteOptions: VoteOptionType[];
}

const Profile: NextPage<Props> = ({ user, userVoteOptions }) => {
  const router = useRouter();

  const [userVoteOptionsList, setUserVoteOptionsList] =
    useState<VoteOptionType[]>(userVoteOptions);

  useEffect(() => {
    if (!user) {
      router.replace("/auth/signin");
    }
  }, []);

  const deleteUserVoteOption = async (optionId: string) => {
    if (userVoteOptions) {
      const request = await fetch(`/api/vote/deleteoption`, {
        method: "DELETE",
        body: JSON.stringify({ optionId }),
      });

      const data = await request.json();

      if (data.type === "success") {
        setUserVoteOptionsList(
          userVoteOptionsList.filter((option) => option.id !== optionId)
        );
      }
    }
  };

  return (
    <div>
      <PageHead title="profile" />

      <main>
        <Title text="profile" emoji="&#128100;" />

        {user && (
          <div>
            <p>logged in as {user.name}</p>
            <div className="max-w-[200px] mx-auto my-8">
              <img className="w-full rounded-3xl" src={user.image} />
            </div>
            <p>
              joined <FormattedTime timestamp={user.createdAt} />
            </p>
            <div id="user-stuff">
              <UserContext.Provider value={user}>
                {userVoteOptionsList.length > 0 &&
                  userVoteOptionsList.map((details) => (
                    <VoteOption
                      details={details}
                      updateParent={() => deleteUserVoteOption(details.id)}
                    />
                  ))}
              </UserContext.Provider>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Profile;

export const getServerSideProps = async (context: any) => {
  const user = await getUserFromSession(context.req);
  const userVoteOptions = await getUserVoteOptions(context.req);

  return {
    props: {
      user,
      userVoteOptions,
    },
  };
};
