import prisma from "../lib/prisma";

const getTopVoteOptions = async () => {
  try {
    const currentMonth = new Date().getMonth();

    const voteOptions = await prisma.voteOption.findMany({
      where: {
        submissionTimestamp: {
          gte: new Date(new Date().getFullYear(), currentMonth, 1),
          lt: new Date(new Date().getFullYear(), currentMonth + 1, 1),
        },
      },
      orderBy: {
        numberOfVotes: "desc",
      },
      take: 10,
    });

    const formattedVoteOptions = voteOptions.map(
      (option: {
        id: string;
        title: string;
        description: string;
        image: string;
        userId: string;
        monthId: number;
        numberOfVotes: number;
        submissionTimestamp: Date;
      }) => ({
        ...option,
        submissionTimestamp: option.submissionTimestamp.toISOString(),
      })
    );

    return formattedVoteOptions;
  } catch {
    return null;
  }
};

export default getTopVoteOptions;
