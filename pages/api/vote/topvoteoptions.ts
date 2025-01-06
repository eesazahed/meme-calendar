import prisma from "../../../lib/prisma";

const handler = async (req: any, res: any) => {
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ message: "sorry, that method isn't allowed", type: "server" });
  }

  const { search } = req.query;
  try {
    const currentMonth = new Date().getMonth();

    let voteOptions;
    if (search) {
      voteOptions = await prisma.voteOption.findMany({
        where: {
          OR: [
            { title: { contains: search } },
            { description: { contains: search } },
          ],
        },
        orderBy: { numberOfVotes: "desc" },
        take: 10,
      });
    } else {
      voteOptions = await prisma.voteOption.findMany({
        where: {
          submissionTimestamp: {
            gte: new Date(new Date().getFullYear(), currentMonth, 1),
            lt: new Date(new Date().getFullYear(), currentMonth + 1, 1),
          },
        },
        orderBy: { numberOfVotes: "desc" },
        take: 10,
      });
    }

    res.status(200).json(voteOptions);
  } catch (error) {
    res.status(500).json({ message: "error fetching vote options" });
  }
};

export default handler;
