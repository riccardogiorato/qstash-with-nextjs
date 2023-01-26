// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Client } from "@upstash/qstash";

type ResponseEmailNewsletter =
  | {
      error: string;
    }
  | {
      message: string;
    };

export default async function handler(
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

  const c = new Client({
    token: process.env.QSTASH_TOKEN || "",
  });

  const { email } = req.body;

  await c.publishJSON({
    url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/newsletter`,
    body: { email: email },
  });

  console.log(`Newsletter added to QStash queue for ${email}`);

  return res
    .status(200)
    .json({ message: `Newsletter added to QStash queue for ${email}` });
}
