import {
  ErrorResponse,
  FAIL,
  OK,
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
    console.log(postDomain);
    snackMsg = "Please choose suitable bhk";
  }

  //   post.budgets.map((item, index) => {
  //     if (!item.checked) {
  //       post.budgets.splice(index, 1);
  //     }
  //   });
  if (postDomain.budgets.length == 0) {
    snackMsg = "Please choose a budget";
    console.log(postDomain);
  }
  if (postDomain.area < 300) {
    snackMsg = "Please choose an area > 300 sqft";
    console.log(postDomain);
  }
  if (postDomain.location == undefined) {
    snackMsg = "Please choose a location";
    console.log(postDomain);
  }
  if (postDomain.furnishing == undefined) {
    snackMsg = "Please choose a furnishing";
    console.log(postDomain);
  }
  if (snackMsg != "") {
    error({ status: FAIL, msg: snackMsg });
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
      success({ msg: data, status: OK });
    } catch (err) {
      error({ status: FAIL, msg: JSON.stringify(err) });
    }
  }
}
