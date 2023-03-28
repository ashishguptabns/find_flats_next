import { Stack, Chip, Slider, TextField, Snackbar } from "@mui/material";
import Head from "next/head";
import React, { useState } from "react";
import ActionFlatComp from "../../common/design/edit-post/action-flat";
import BudgetComp from "../../common/design/edit-post/budget";
import UserTypeComp from "../../common/design/edit-post/user-type";
import styles from "./index.module.css";
import {
  ActionFlat,
  Areas,
  areaText,
  BHKS,
  FlatFurnishTypes,
  PostDomain,
} from "../../common/model/domain/post";
import { UserDomain, UserType } from "../../common/model/domain/user";
import Button from "../../common/design/button";

export const EditPostRoute = "/edit-post";

export default function EditPost() {
  const [userType, setUserType] = useState<UserType>(UserType.NONE);
  const [showSnackBar, setShowSnackBar] = useState<boolean>(false);
  const [snackBarMsg, setSnackBarMsg] = useState<string>("");
  const [actionFlat, setActionFlat] = useState<ActionFlat>(ActionFlat.NONE);
  const [bhks, setBhks] = useState(() => BHKS.map((item) => item));

  const user: UserDomain = { type: userType, actionFlat: actionFlat };
  const post: PostDomain = {
    actionFlat: actionFlat,
    budgets: [],
    area: 0,
    bhks: [],
    agents: false,
    owners: true,
    furnishing: undefined,
    location: undefined,
  };
  const bhkStyle = { textAlign: "left" as const, margin: "20px" };
  const areaLocStyle = {
    textAlign: "left" as const,
    margin: "20px",
  };
  const furnishStyle = { margin: "30px 20px 10px" };
  const agentOwnerStyle = { margin: "20px" };
  function validateAndSavePost() {
    var snackMsg = "";
    if (post.actionFlat == ActionFlat.NONE) {
      snackMsg = "Choose an action";
    }

    post.bhks = bhks;
    var bhkChosen = false;
    post.bhks.map((item) => {
      if (item.chosen) {
        bhkChosen = true;
      }
    });
    if (!bhkChosen) {
      console.log(post.bhks);
      snackMsg = "Please choose suitable bhk";
    }

    if (post.budgets.length == 0) {
      snackMsg = "Please choose a budget";
      console.log(post);
    }

    if (post.area < 300) {
      snackMsg = "Please choose an area > 300 sqft";
      console.log(post);
    }
    if (post.location == undefined) {
      snackMsg = "Please choose a location";
      console.log(post);
    }
    if (post.furnishing == undefined) {
      snackMsg = "Please choose a furnishing";
      console.log(post);
    }

    if (snackMsg != "") {
      setShowSnackBar(true);
      setSnackBarMsg(snackMsg);
    }
  }

  const handleSnackClose = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setShowSnackBar(false);
    setSnackBarMsg("");
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Edit your requirement</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Snackbar
          open={showSnackBar}
          onClose={handleSnackClose}
          autoHideDuration={1000}
          message={snackBarMsg}
        />
        <UserTypeComp
          onSelect={(selectedType: UserType) => {
            setUserType(selectedType);
          }}
          user={user}
        />
        <ActionFlatComp
          user={user}
          onSelect={(selectedAction: ActionFlat) => {
            setActionFlat(selectedAction);
          }}
        />
        {user.type != UserType.NONE && user.actionFlat != ActionFlat.NONE && (
          <>
            <BudgetComp
              user={user}
              onBudgetChange={(budgets: string[]) => {
                console.log(budgets);
                post.budgets = budgets;
              }}
            />

            <Stack style={bhkStyle} direction="row" spacing={1}>
              {bhks.map((item, index) => (
                <Chip
                  label={item.type}
                  key={index}
                  variant={item.chosen ? "filled" : "outlined"}
                  onClick={() => {
                    if (item.chosen) {
                      item.chosen = false;
                    } else {
                      item.chosen = true;
                    }
                    setBhks([...bhks]);
                  }}
                />
              ))}
            </Stack>

            <div style={areaLocStyle}>
              <Slider
                className={styles.areaStyle}
                getAriaValueText={areaText}
                defaultValue={10}
                marks={Areas}
              />
              <TextField
                className={styles.locStyle}
                id="standard-basic"
                label="Preferred location?"
                variant="standard"
              />
            </div>
            <Stack style={furnishStyle} direction="row" spacing={1}>
              {FlatFurnishTypes.map((item, index) => (
                <Chip
                  label={item}
                  key={index}
                  variant="outlined"
                  onClick={() => {}}
                />
              ))}
            </Stack>
            <Stack style={agentOwnerStyle} direction="row" spacing={1}>
              <Chip label="Agents" variant="outlined" onClick={() => {}} />
              <Chip label="Owners" variant="outlined" onClick={() => {}} />
            </Stack>
            <Button
              style={{
                right: "10%",
                float: "right",
              }}
              text="Post"
              variant="contained"
              onClick={() => {
                validateAndSavePost();
              }}
            />
          </>
        )}
      </main>
    </div>
  );
}
