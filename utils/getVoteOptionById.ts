import prisma from "../lib/prisma";

const getVoteOptionById = async (id: string) => {
  try {
    const voteOption = await prisma.voteOption.findUnique({
      where: {
        id,
      },
    });

    if (!voteOption) {
      return null;
    }

    const formattedVoteOption = {
      ...voteOption,
      submissionTimestamp: voteOption.submissionTimestamp.toString(),
    };

    return formattedVoteOption;
  } catch (error) {
    return null;
  }
};

export default getVoteOptionById;
