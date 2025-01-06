import type { NextApiRequest, NextApiResponse } from "next";
import getUserFromSession from "../../../utils/getUserFromSession";
import prisma from "../../../lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ message: "sorry, that method isn't allowed", type: "server" });
  }

  // USER
  const user = await getUserFromSession(req);
  if (!user) {
    return res.status(401).json({ message: "invalid auth", type: "auth" });
  }
  const userId = user.id;

  // FORMDATA
  const data: { voteOptionId: string } = JSON.parse(req.body);

  // CHECK IF OPTION EXISTS
  const voteOptionId = data.voteOptionId;
  const voteOption = await prisma.voteOption.findUnique({
    where: { id: voteOptionId },
  });

  if (!voteOption) {
    return res.status(400).json({
      message: "vote option does not exist",
      type: "server",
    });
  }

  // CHECK IF USER ALREADY VOTED
  const hasVoted = await prisma.vote.findFirst({
    where: {
      userId,
      voteOptionId,
    },
    select: { id: true },
  });

  if (hasVoted) {
    return res.status(400).json({
      message: "already voted for this option",
      type: "server",
    });
  }

  // VOTE
  try {
    await prisma.voteOption.update({
      where: {
        id: voteOptionId,
      },
      data: {
        numberOfVotes: {
          increment: 1,
        },
      },
    });

    await prisma.vote.create({
      data: {
        userId,
        voteOptionId,
      },
    });

    return res.status(200).json({
      message: "voted",
      type: "success",
    });
  } catch {
    return res.status(400).json({
      message: "there was an error in voting",
      type: "server",
    });
  }
};

export default handler;
