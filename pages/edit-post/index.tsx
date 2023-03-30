import {
  Stack,
  Chip,
  Slider,
  TextField,
  Snackbar,
  CircularProgress,
} from "@mui/material";
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
} from "../../common/model/domain/post";
import { UserDomain, UserType } from "../../common/model/domain/user";
import Button from "../../common/design/button";
import { validateAndSavePost } from "../../common/service/post";
import {
  ErrorResponse,
  ServerResponse,
} from "../../common/model/domain/response";
import { SNACK_TIMEOUT } from "../../common/utils/constants";
import { useRouter } from "next/router";

export const EditPostRoute = "/edit-post";

export default function EditPost() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [userType, setUserType] = useState<UserType>(UserType.NONE);
  const [snackBarMsg, setSnackBarMsg] = useState<string>("");
  const [actionFlat, setActionFlat] = useState<ActionFlat>(ActionFlat.NONE);
  const [bhks, setBhks] = useState(() => BHKS.map((item) => item));
  const [furnishing, setFurnishing] = useState<string>("Semi furnished");
  const [flatLocation, setFlatLocation] = useState<string>();
  const [flatArea, setFlatArea] = useState<number>(10);
  const [flatBudgets, setFlatBudgets] = useState<Budget[]>([]);
  const [contactByAgents, setContactByAgents] = useState<boolean>(false);

  const user: UserDomain = { type: userType, actionFlat: actionFlat };

  const bhkStyle = { textAlign: "left" as const, margin: "20px" };
  const areaLocStyle = {
    textAlign: "left" as const,
    margin: "20px",
  };
  const areaStyle = {
    float: "left" as const,
    width: "65%" as const,
  };
  const furnishStyle = { margin: "30px 20px 10px" };
  const agentOwnerStyle = { margin: "20px" };

  const handleSnackClose = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackBarMsg("");
  };

  function savePost() {
    setLoading(true);
    validateAndSavePost(
      {
        actionFlat: actionFlat,
        bhks: bhks,
        budgets: flatBudgets,
        area: flatArea,
        owners: true,
        furnishing: furnishing,
        location: flatLocation,
        contactByAgents: contactByAgents,
      },
      (errResponse: ErrorResponse) => {
        showErrMsg(true, errResponse.msg);
      },
      (serverResponse: ServerResponse) => {
        setSnackBarMsg(serverResponse.status);
        router.back();
      }
    );
  }

  function showErrMsg(status: boolean, msg: string) {
    setSnackBarMsg(msg);
  }
  return loading ? (
    <div className={styles.progress}>
      <CircularProgress />
    </div>
  ) : (
    <div className={styles.container}>
      <Head>
        <title>Edit your requirement</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Snackbar
          open={snackBarMsg !== ""}
          onClose={handleSnackClose}
          autoHideDuration={SNACK_TIMEOUT}
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
                style={areaStyle}
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
                savePost();
              }}
            />
          </>
        )}
      </main>
    </div>
  );
}
