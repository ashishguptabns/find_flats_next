import {
  ErrorResponse,
  ResponseType,
  ServerResponse,
} from "../model/domain/response";
import {
  ActionFlat,
  PostDomain,
  PostDomainToDTO,
  PostDTO,
} from "../model/domain/post";
import { URL_SAVE_POST } from "../pages/api/save-post";
import { URL_FETCH_POSTS } from "../pages/api/fetch-posts";

export async function validateAndSavePostUseCase(
  postDomain: PostDomain,
  error: (errResponse: ErrorResponse) => void,
  success: (serverResponse: ServerResponse) => void
) {
  const postDTO = PostDomainToDTO(postDomain);
  var snackMsg = "";
  if (postDTO.actionFlat == ActionFlat.NONE) {
    snackMsg = "Choose an action";
  }

  if (postDTO.bhks.length == 0) {
    snackMsg = "Please choose suitable bhk";
  }

  if (postDTO.budgets.length == 0) {
    snackMsg = "Please choose a budget";
  }
  if (postDTO.area < 300) {
    snackMsg = "Please choose an area > 300 sqft";
  }
  if (postDTO.location == undefined) {
    snackMsg = "Please choose a location";
  }
  if (postDTO.furnishing == undefined) {
    snackMsg = "Please choose a furnishing";
  }
  if (snackMsg != "") {
    console.log(snackMsg);
    error({ status: ResponseType.FAIL, msg: snackMsg });
  } else {
    try {
      const response = await fetch(URL_SAVE_POST, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postDTO),
      });
      const data = await response.json();
      success({ msg: data, status: ResponseType.OK });
    } catch (err) {
      error({ status: ResponseType.FAIL, msg: JSON.stringify(err) });
    }
  }
}

export async function fetchPostsUseCase(
  success: (data: PostDTO[]) => void,
  error: (msg: string) => void
) {
  try {
    const response = await fetch(URL_FETCH_POSTS);
    var postsData: PostDTO[] = (await response.json()) as PostDTO[];
    success(postsData);
  } catch (err) {
    error(JSON.stringify(err));
  }
}
