import prisma from "../lib/prisma";

const getCalendar = async () => {
  try {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const calendarData: VoteOptionType[] = [];

    for (let month = 0; month <= currentMonth; month++) {
      const startOfMonth = new Date(currentYear, month, 1);
      const endOfMonth = new Date(currentYear, month + 1, 0);

      const mostPopularOption = await prisma.voteOption.findFirst({
        where: {
          submissionTimestamp: {
            gte: startOfMonth,
            lte: endOfMonth,
          },
        },
        orderBy: [
          {
            numberOfVotes: "desc",
          },
          {
            submissionTimestamp: "asc",
          },
        ],
      });

      if (!mostPopularOption) continue;

      calendarData.push({
        id: mostPopularOption.id,
        title: mostPopularOption.title,
        description: mostPopularOption.description,
        image: mostPopularOption.image,
        userId: mostPopularOption.userId,
        monthId: month,
        numberOfVotes: mostPopularOption.numberOfVotes,
        submissionTimestamp: mostPopularOption.submissionTimestamp.toString(),
      });
    }

    return calendarData;
  } catch (error) {
    console.error("Error fetching calendar data: ", error);
    return null;
  }
};

export default getCalendar;
