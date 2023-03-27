import { Stack, Chip, Slider, TextField } from "@mui/material";
import Head from "next/head";
import React, { useState } from "react";
import ActionFlatComp from "../../common/design/edit-post/action-flat";
import BudgetComp from "../../common/design/edit-post/budget";
import UserTypeComp from "../../common/design/edit-post/user-type";
import styles from "./index.module.css";
import {
  ActionFlat,
  FlatBHKTypes,
  FlatFurnishTypes,
} from "../../common/model/flat";
import { UserDomain, UserType } from "../../common/model/user";

export const EditPostRoute = "/edit-post";
function valuetext(value: number) {
  return `${value * 20} sqft`;
}
const marks = [
  {
    value: 15,
    label: "300 sqft",
  },

  {
    value: 40,
    label: "800 sqft",
  },
  {
    value: 60,
    label: "1200 sqft",
  },
  {
    value: 100,
    label: "2000 sqft",
  },
];
export default function EditPost() {
  const [userType, setUserType] = useState<UserType>(UserType.NONE);
  const [actionFlat, setActionFlat] = useState<ActionFlat>(ActionFlat.NONE);
  const user: UserDomain = { type: userType, actionFlat: actionFlat };
  const bhkStyle = { "text-align": "left" as const, margin: "20px" };
  const areaLocStyle = {
    textAlign: "left" as const,
    margin: "20px",
  };
  const furnishStyle = { margin: "30px 20px 10px" };
  const agentOwnerStyle = { margin: "20px" };
  return (
    <div className={styles.container}>
      <Head>
        <title>Edit your requirement</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
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
            <BudgetComp user={user} onBudgetChange={() => {}} />

            <Stack style={bhkStyle} direction="row" spacing={1}>
              {FlatBHKTypes.map((item, index) => (
                <Chip
                  label={item}
                  key={index}
                  variant="outlined"
                  onClick={() => {}}
                />
              ))}
            </Stack>

            <div style={areaLocStyle}>
              <Slider
                className={styles.areaStyle}
                getAriaValueText={valuetext}
                defaultValue={30}
                marks={marks}
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
          </>
        )}
      </main>
    </div>
  );
}
