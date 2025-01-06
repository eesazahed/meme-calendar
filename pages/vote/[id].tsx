import { NextPage } from "next";
import VoteOption from "../../components/VoteOption";
import getVoteOptionById from "../../utils/getVoteOptionById";
import PageHead from "../../components/PageHead";
import Title from "../../components/Title";
import { UserContext } from "../../context";
import getUserFromSession from "../../utils/getUserFromSession";
import { UserType, VoteOptionType } from "../../types";

interface Props {
  user: UserType;
  details: VoteOptionType;
}

const VoteOptionPage: NextPage<Props> = ({ user, details }) => {
  return (
    <div>
      <PageHead title="Vote" />

      <main>
        <Title text="Vote" emoji="&#128202;" />

        {details ? (
          <UserContext.Provider value={user}>
            <VoteOption details={details} updateParent={() => {}} />{" "}
          </UserContext.Provider>
        ) : (
          <div>
            <p>Loading...</p>
          </div>
        )}
      </main>
    </div>
  );
};

export const getServerSideProps = async (context: any) => {
  const user = await getUserFromSession(context.req);
  const voteOptionId = context.params.id;

  const details = await getVoteOptionById(voteOptionId);

  return {
    props: { user, details },
  };
};

export default VoteOptionPage;
