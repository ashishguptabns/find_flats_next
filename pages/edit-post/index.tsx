import { Stack, Chip, Slider, TextField } from "@mui/material";
import Head from "next/head";
import React, { useState } from "react";
import ActionFlatComp from "./design/action-flat";
import BudgetComp from "./design/budget";
import UserTypeComp from "./design/user-type";
import styles from "./index.module.css";
import { ActionFlat, FlatBHKTypes, FlatFurnishTypes } from "./model/flat";
import { UserDomain, UserType } from "./model/user";

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
  const [userType, setUserType] = useState<UserType>(UserType.BUYER);
  const [actionFlat, setActionFlat] = useState<ActionFlat>(ActionFlat.BUY);
  const user: UserDomain = { type: userType, actionFlat: actionFlat };
  const bhkStyle = { "text-align": "left", margin: "20px" };
  const areaStyle = {
    float: "left",
    width: "80%",
    margin: "20px",
  };
  const locStyle = { float: "left", width: "70%", margin: "10px 20px" };
  const areaLocStyle = { height: "170px" };
  const furnishStyle = { margin: "0 20px" };
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
            style={areaStyle}
            getAriaValueText={valuetext}
            defaultValue={30}
            marks={marks}
          />
          <TextField
            style={locStyle}
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
      </main>
    </div>
  );
}
