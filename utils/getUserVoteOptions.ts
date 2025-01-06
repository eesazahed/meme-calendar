import prisma from "../lib/prisma";
import getUserFromSession from "./getUserFromSession";

const getUserVoteOptions = async (req?: any) => {
  try {
    const user = await getUserFromSession(req);

    if (!user) {
      return null;
    }

    const userId = user.id;
    const voteOptions = await prisma.voteOption.findMany({
      where: {
        userId,
      },
      orderBy: {
        submissionTimestamp: "desc",
      },
    });

    const formattedVoteOptions = voteOptions.map((option) => ({
      ...option,
      submissionTimestamp: option.submissionTimestamp.toISOString(),
    }));

    return formattedVoteOptions;
  } catch {
    return null;
  }
};

export default getUserVoteOptions;
