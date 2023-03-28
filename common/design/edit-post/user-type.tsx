import React, { FC } from "react";
import { UserDomain, UserType } from "../../model/domain/user";
import Button from "../button";

interface UserTypeProps {
  user: UserDomain;
  onSelect: any;
}
const UserTypeComp: FC<UserTypeProps> = ({ user, onSelect }) => {
  const style = {
    padding: "20px 0 0 0",
  };
  const btnStyle = {
    margin: "20px",
  };
  return (
    <div style={style}>
      <Button
        style={btnStyle}
        text="Buyer"
        variant={user.type != UserType.BUYER ? "outlined" : "contained"}
        onClick={() => {
          onSelect(UserType.BUYER);
        }}
      />
      <Button
        style={btnStyle}
        text="Agent"
        variant={user.type != UserType.AGENT ? "outlined" : "contained"}
        onClick={() => {
          onSelect(UserType.AGENT);
        }}
      />
      <Button
        style={btnStyle}
        text="Onwer"
        variant={user.type != UserType.OWNER ? "outlined" : "contained"}
        onClick={() => {
          onSelect(UserType.OWNER);
        }}
      />
    </div>
  );
};

export default UserTypeComp;
