import {
  ErrorResponse,
  ResponseType,
  ServerResponse,
} from "../model/domain/response";
import { ActionFlat, PostDomain, PostDomainToDTO } from "../model/domain/post";
import { URL_SAVE_POST } from "../../pages/api/save-post";

export async function validateAndSavePost(
  postDomain: PostDomain,
  error: (errResponse: ErrorResponse) => void,
  success: (serverResponse: ServerResponse) => void
) {
  var snackMsg = "";
  if (postDomain.actionFlat == ActionFlat.NONE) {
    snackMsg = "Choose an action";
  }

  var bhkChosen = false;
  postDomain.bhks.map((item) => {
    if (item.chosen) {
      bhkChosen = true;
    }
  });
  if (!bhkChosen) {
    snackMsg = "Please choose suitable bhk";
  }

  if (postDomain.budgets.length == 0) {
    snackMsg = "Please choose a budget";
  }
  if (postDomain.area < 300) {
    snackMsg = "Please choose an area > 300 sqft";
  }
  if (postDomain.location == undefined) {
    snackMsg = "Please choose a location";
  }
  if (postDomain.furnishing == undefined) {
    snackMsg = "Please choose a furnishing";
  }
  if (snackMsg != "") {
    error({ status: ResponseType.FAIL, msg: snackMsg });
  } else {
    try {
      const response = await fetch(URL_SAVE_POST, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(PostDomainToDTO(postDomain)),
      });
      const data = await response.json();
      success({ msg: data, status: ResponseType.OK });
    } catch (err) {
      error({ status: ResponseType.FAIL, msg: JSON.stringify(err) });
    }
  }
}
