// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseEmailNewsletter =
  | {
      error: string;
    }
  | {
      message: string;
    };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseEmailNewsletter>
) {
  // reject if not POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // reject if no email
  if (!req.body.email) {
    return res.status(400).json({ error: "Email is required" });
  }

  // record email in database from req.body.email
  const { email } = req.body;

  // send email to database
  // prisma.newsletter.create({
  //   data: {
  //     email,
  //   },
  // });

  res.status(200).json({ message: `Newsletter active for ${email}` });
}
