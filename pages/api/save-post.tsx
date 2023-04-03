import { NextApiRequest, NextApiResponse } from "next";
import { baseUrl } from "../../utils/constants";
import { ResponseCode } from "../../model/domain/response";

export const URL_SAVE_POST = "api/save-post";
const saveFlatPostUrl = `${baseUrl}/saveFlatPost`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await fetch(saveFlatPostUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });
    const data = await response.json();
    res.status(ResponseCode.OK).json(data);
  } catch (err) {
    console.log(err);
    res.status(ResponseCode.FAIL);
  }
}
