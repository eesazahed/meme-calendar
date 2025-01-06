import type { NextApiRequest, NextApiResponse } from "next";
import getUserFromSession from "../../../utils/getUserFromSession";
import prisma from "../../../lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "DELETE") {
    return res
      .status(405)
      .json({ message: "sorry, that method isn't allowed", type: "server" });
  }

  // USER
  const user = await getUserFromSession(req);
  if (!user) {
    return res.status(401).json({ message: "invalid auth", type: "auth" });
  }

  // FORMDATA
  const data: { optionId: string } = JSON.parse(req.body);
  const optionId = data.optionId;

  // CHECK IF OPTION EXISTS
  const voteOption = await prisma.voteOption.findUnique({
    where: { id: optionId },
  });

  if (!voteOption) {
    return res.status(400).json({
      message: "vote option does not exist",
      type: "server",
    });
  }

  // CHECK IF ADMIN OR VOTEOPTION OWNER
  if (!user.admin && user.id !== voteOption.userId) {
    return res.status(401).json({ message: "invalid auth", type: "auth" });
  }

  // DELETE
  try {
    await prisma.vote.deleteMany({ where: { voteOptionId: voteOption.id } });
    await prisma.voteOption.delete({ where: { id: voteOption.id } });

    return res.status(200).json({
      message: "deleted",
      type: "success",
    });
  } catch {
    return res.status(400).json({
      message: "there was an error in deleting",
      type: "server",
    });
  }
};

export default handler;
