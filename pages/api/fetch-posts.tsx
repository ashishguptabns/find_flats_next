import { NextApiRequest, NextApiResponse } from "next";
import { ResponseCode } from "../../common/model/domain/response";
import { baseUrl } from "../../common/utils/constants";

export const URL_FETCH_POSTS = "api/fetch-posts";
const fetchFlatPostsUrl = `${baseUrl}/fetchFlatPosts`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await fetch(fetchFlatPostsUrl);
    const data = await response.json();
    res.status(ResponseCode.OK).json(data);
  } catch (err) {
    console.log(err);
    res.status(ResponseCode.FAIL);
  }
}
