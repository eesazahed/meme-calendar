import { NextPage } from "next";
import Btn from "./Btn";
import { UserContext } from "../context";
import { useContext, useState, useEffect } from "react";
import nameOfMonthId from "../utils/nameOfMonthId";

interface Props {
  details: VoteOptionType;
  updateParent: Function;
}

const VoteOption: NextPage<Props> = ({ details, updateParent }) => {
  const user = useContext(UserContext);
  const [hasVoted, setHasVoted] = useState<boolean>(false);
  const [voteCount, setVoteCount] = useState<number>(details.numberOfVotes);

  useEffect(() => {
    const checkVoteStatus = async () => {
      const request = await fetch("/api/vote/hasvoted", {
        method: "POST",
        body: JSON.stringify({ voteOptionId: details.id }),
      });

      const data = await request.json();
      setHasVoted(data.type === "success");
    };

    if (user) {
      checkVoteStatus();
    }
  }, [user, details.id]);

  const vote = async () => {
    const request = await fetch("/api/vote/voteoption", {
      method: "POST",
      body: JSON.stringify({ voteOptionId: details.id }),
    });

    const data = await request.json();

    if (data.type === "success") {
      setHasVoted(true);
      setVoteCount((prevCount) => prevCount + 1);
    }
  };

  const removeVote = async () => {
    const request = await fetch("/api/vote/removevote", {
      method: "POST",
      body: JSON.stringify({ voteOptionId: details.id }),
    });

    const data = await request.json();

    if (data.type === "success") {
      setHasVoted(false);
      setVoteCount((prevCount) => prevCount - 1);
    }
  };

  const copyLink = () => {
    const link = `${window.location.origin}/vote/${details.id}`;
    navigator.clipboard
      .writeText(link)
      .then(() => alert("link copied to clipboard!"))
      .catch((error) => console.error("failed to copy link:", error));
  };

  return (
    <div
      className={`my-8 flex flex-col md:flex-row text-left rounded-3xl md:w-1/2 mx-auto ${
        user && user.id === details.userId
          ? "bg-[#2c0f96] text-white"
          : "bg-[#ededed] dark:bg-black"
      }`}
    >
      <div className="md:w-1/2 m-4 md:m-8 flex flex-col justify-between ">
        <div>
          <p className="text-xl font-bold mb-2">{details.title}</p>
          <p className="text-sm">{details.description}</p>
          <br />
        </div>
        <div>
          {user && (
            <div className="flex w-full">
              <div
                className={`${
                  !user.admin && user.id !== details.userId
                    ? "w-full"
                    : "w-1/2 pr-2"
                }`}
              >
                <Btn
                  color={hasVoted ? "royalblue" : "#1E90FF"}
                  text={hasVoted ? "nvm" : "vote"}
                  onClick={hasVoted ? removeVote : vote}
                />
              </div>
              {(user.admin || user.id === details.userId) && (
                <div className="w-1/2 pl-2">
                  <Btn
                    text="delete"
                    color="red"
                    onClick={() => updateParent()}
                  />
                </div>
              )}
            </div>
          )}
          <div className="w-full">
            <Btn text="copy link" color="green" onClick={copyLink} />
          </div>
        </div>
      </div>
      <div className="md:w-1/2 m-4 md:m-8">
        <div>
          <a
            rel="noreferrer"
            target="_blank"
            href={`/api/images/${details.image}`}
          >
            <img
              className="rounded-3xl cursor-pointer"
              alt={`could not load image of ${details.title}`}
              src={`/api/images/${details.image}`}
            />
          </a>
        </div>
        <div className="text-lg italic pb-2 md:pb-0 pt-4 px-1 flex md:flex-col lg:flex-row justify-between">
          <div>{nameOfMonthId(details.monthId)}</div>
          <div>
            <span className="text-cyan-500">{voteCount}</span> vote
            {voteCount !== 1 && "s"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoteOption;
