import { NextApiRequest, NextApiResponse } from "next";

export const URL_SAVE_POST = "api/save-post";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(req.body);
}
