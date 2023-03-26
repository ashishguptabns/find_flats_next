import React, { FC, MouseEventHandler } from "react";
import { User, UserType } from "../model/user";
import Button from "../../../common/design/button";

interface UserTypeProps {
  user: User;
  onSelect: any;
}
const UserTypeComp: FC<UserTypeProps> = ({ user, onSelect }) => {
  const style = {
    padding: "80px 0 0 0",
  };
  const btnStyle = {
    margin: "20px",
  };
  return user.type == UserType.NONE ? (
    <div style={style}>
      <Button
        style={btnStyle}
        text="I am looking for a flat"
        variant="outlined"
        onClick={() => {
          onSelect(UserType.OWNER);
        }}
      />
      <br />
      <Button
        style={btnStyle}
        text="I am a broker"
        variant="outlined"
        onClick={() => {
          onSelect(UserType.OWNER);
        }}
      />
      <br />
      <Button
        style={btnStyle}
        text="I am an onwer"
        variant="outlined"
        onClick={() => {
          onSelect(UserType.OWNER);
        }}
      />
    </div>
  ) : (
    <></>
  );
};

export default UserTypeComp;
