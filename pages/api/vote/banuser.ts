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

  // FORMDATA
  const data: { banUserId: string } = JSON.parse(req.body);
  const banUserId = data.banUserId;

  // CHECK IF ADMIN
  if (!user.admin) {
    return res.status(401).json({ message: "invalid auth", type: "auth" });
  }

  // DELETE
  try {
    await prisma.user.update({
      where: { id: banUserId },
      data: { banned: true },
    });

    return res.status(200).json({
      message: "banned",
      type: "success",
    });
  } catch {
    return res.status(400).json({
      message: "there was an error in banning",
      type: "server",
    });
  }
};

export default handler;
