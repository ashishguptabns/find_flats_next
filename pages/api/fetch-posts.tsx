import { NextApiRequest, NextApiResponse } from "next";
import { baseUrl } from "../../utils/constants";
import { ResponseCode } from "../../model/domain/response";

export const URL_FETCH_POSTS = "api/fetch-posts";
const fetchFlatPostsUrl = `${baseUrl}/fetchFlatPosts`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await fetch(fetchFlatPostsUrl, {
      next: { revalidate: 60 * 60 },
    });
    const data = await response.json();
    res.status(ResponseCode.OK).json(data);
  } catch (err) {
    console.log(err);
    res.status(ResponseCode.FAIL);
  }
}
