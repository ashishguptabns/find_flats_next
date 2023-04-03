import { FC } from "react";
import Button from "../button";
import { ActionFlat } from "../../model/domain/post";
import { UserDomain, UserType } from "../../model/domain/user";
interface ActionFlatProps {
  user: UserDomain;
  onSelect: any;
}
const ActionFlatComp: FC<ActionFlatProps> = ({ user, onSelect }) => {
  const btnStyle = {
    margin: "20px",
    width: "30%",
  };

  return (
    <>
      {user.type == UserType.OWNER && (
        <>
          <Button
            style={btnStyle}
            text={"Rent"}
            variant={
              user.actionFlat == ActionFlat.RENT ? "contained" : "outlined"
            }
            onClick={() => {
              onSelect(ActionFlat.RENT);
            }}
          />
          <Button
            style={btnStyle}
            text={"Sell"}
            variant={
              user.actionFlat == ActionFlat.SELL ? "contained" : "outlined"
            }
            onClick={() => {
              onSelect(ActionFlat.SELL);
            }}
          />
        </>
      )}
      {user.type == UserType.AGENT && (
        <>
          <Button
            style={btnStyle}
            text={"Rent"}
            variant={
              user.actionFlat == ActionFlat.RENT ? "contained" : "outlined"
            }
            onClick={() => {
              onSelect(ActionFlat.RENT);
            }}
          />
          <Button
            style={btnStyle}
            text={"Sell"}
            variant={
              user.actionFlat == ActionFlat.SELL ? "contained" : "outlined"
            }
            onClick={() => {
              onSelect(ActionFlat.SELL);
            }}
          />
        </>
      )}
      {user.type == UserType.BUYER && (
        <>
          <Button
            style={btnStyle}
            text={"Rent"}
            variant={
              user.actionFlat == ActionFlat.RENT ? "contained" : "outlined"
            }
            onClick={() => {
              onSelect(ActionFlat.RENT);
            }}
          />
          <Button
            style={btnStyle}
            text={"Buy"}
            variant={
              user.actionFlat == ActionFlat.BUY ? "contained" : "outlined"
            }
            onClick={() => {
              onSelect(ActionFlat.BUY);
            }}
          />
        </>
      )}
    </>
  );
};

export default ActionFlatComp;
