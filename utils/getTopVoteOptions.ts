import prisma from "../lib/prisma";

const getTopVoteOptions = async () => {
  try {
    const currentMonth = new Date().getMonth(); // Get the current month (0-based)

    // Fetch the top 10 most voted options for the current month
    const voteOptions = await prisma.voteOption.findMany({
      where: {
        submissionTimestamp: {
          gte: new Date(new Date().getFullYear(), currentMonth, 1), // Start of the current month
          lt: new Date(new Date().getFullYear(), currentMonth + 1, 1), // Less than the first day of next month
        },
      },
      orderBy: {
        numberOfVotes: "desc", // Order by number of votes, most to least
      },
      take: 10,
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

export default getTopVoteOptions;
