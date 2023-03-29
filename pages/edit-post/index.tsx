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
  Budget,
  FlatFurnishTypes,
  getPrices,
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
  const [furnishing, setFurnishing] = useState<string>("Semi furnished");
  const [flatLocation, setFlatLocation] = useState<string>();
  const [flatArea, setFlatArea] = useState<number>(10);
  const [flatBudgets, setFlatBudgets] = useState<Budget[]>([]);
  const [contactByAgents, setContactByAgents] = useState<boolean>(false);

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
    contactByAgents: false,
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
      console.log(post);
      snackMsg = "Please choose suitable bhk";
    }

    flatBudgets.map((item) => {
      if (item.checked) {
        post.budgets.push(item.budget);
      }
    });
    if (post.budgets.length == 0) {
      snackMsg = "Please choose a budget";
      console.log(post);
    }
    post.area = flatArea;
    if (post.area < 300) {
      snackMsg = "Please choose an area > 300 sqft";
      console.log(post);
    }
    post.location = flatLocation;
    if (post.location == undefined) {
      snackMsg = "Please choose a location";
      console.log(post);
    }
    post.furnishing = furnishing;
    if (post.furnishing == undefined) {
      snackMsg = "Please choose a furnishing";
      console.log(post);
    }
    post.contactByAgents = contactByAgents;
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
            setFlatBudgets(getPrices(actionFlat));
            setUserType(selectedType);
          }}
          user={user}
        />
        <ActionFlatComp
          user={user}
          onSelect={(selectedAction: ActionFlat) => {
            setFlatBudgets(getPrices(selectedAction));
            setActionFlat(selectedAction);
          }}
        />
        {user.type != UserType.NONE && user.actionFlat != ActionFlat.NONE && (
          <>
            <BudgetComp
              user={user}
              budgets={flatBudgets}
              onBudgetChange={(budgets: Budget[]) => {
                setFlatBudgets(budgets);
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
                onChange={(event: Event, newValue: number | number[]) => {
                  setFlatArea((newValue as number) * 20);
                }}
                marks={Areas}
              />
              <TextField
                className={styles.locStyle}
                id="standard-basic"
                label="Preferred location?"
                variant="standard"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setFlatLocation(event.target.value);
                }}
              />
            </div>
            <Stack style={furnishStyle} direction="row" spacing={1}>
              <Chip
                label={FlatFurnishTypes.Semi_Furnished}
                variant={
                  furnishing == FlatFurnishTypes.Semi_Furnished
                    ? "filled"
                    : "outlined"
                }
                onClick={() => {
                  setFurnishing(FlatFurnishTypes.Semi_Furnished);
                }}
              />
              <Chip
                label={FlatFurnishTypes.Furnished}
                variant={
                  furnishing == FlatFurnishTypes.Furnished
                    ? "filled"
                    : "outlined"
                }
                onClick={() => {
                  setFurnishing(FlatFurnishTypes.Furnished);
                }}
              />
            </Stack>
            {user.type == UserType.BUYER && (
              <Stack style={agentOwnerStyle} direction="row" spacing={1}>
                <Chip
                  label="Agents"
                  variant={contactByAgents ? "filled" : "outlined"}
                  onClick={() => {
                    setContactByAgents(!contactByAgents);
                  }}
                />
                <Chip label="Owners" variant="filled" />
              </Stack>
            )}

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
