import type { NextApiRequest, NextApiResponse } from "next";
import getUserFromSession from "../../../utils/getUserFromSession";
import prisma from "../../../lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ message: "sorry, that method isn't allowed.", type: "server" });
  }

  // USER
  const user = await getUserFromSession(req);
  if (!user) {
    return res.status(401).json({ message: "invalid auth", type: "auth" });
  }
  const userId = user.id;

  // CHECK IF USER HAS ALREADY SUBMITTED THIS MONTH
  const currentMonth = new Date().getMonth();

  const existingVoteOption = await prisma.voteOption.findFirst({
    where: {
      userId,
      monthId: currentMonth,
    },
  });

  if (existingVoteOption) {
    return res.status(400).json({
      message: "you can only submit once every month",
      type: "server",
    });
  }

  // FORMDATA
  const data: FormDataType = JSON.parse(req.body);

  // TITLE
  const title = data.title;

  if (title.trim().length === 0) {
    return res.status(400).json({
      message: "please write something",
      type: "title",
    });
  }
  if (title.length < 4 || title.length > 50) {
    return res.status(400).json({
      message: "please enter a title between 4-50 characters",
      type: "title",
    });
  }

  // DESCRIPTION
  const description = data.description;

  if (description.trim().length === 0) {
    return res.status(400).json({
      message: "please write something",
      type: "description",
    });
  }
  if (description.length < 4 || description.length > 200) {
    return res.status(400).json({
      message: "please enter a description between 4-200 characters",
      type: "description",
    });
  }

  // IMAGE
  const image = data.image;
  const imageFailed = data.imageFailed;

  if (
    !image ||
    image.split(",")[0] !== "data:image/webp;base64" ||
    imageFailed
  ) {
    return res.status(400).json({
      message: "please provide a valid image",
      type: "image",
    });
  }

  // POST
  try {
    const createdImage = await prisma.image.create({
      data: {
        image,
        userId,
      },
    });

    const monthId = new Date().getMonth();
    const createdOption = await prisma.voteOption.create({
      data: {
        title,
        description,
        image: createdImage.id,
        userId,
        monthId,
      },
    });

    return res.status(200).json({
      message: "submitted",
      type: "success",
      newPostId: createdOption.id,
    });
  } catch {
    return res.status(400).json({
      message: "there was an error in submitting",
      type: "server",
    });
  }
};

export default handler;
