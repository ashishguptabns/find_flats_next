import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { FC } from "react";
import { ActionFlat, Budget } from "../../model/flat";
import { UserDomain, UserType } from "../../model/user";

interface BudgetCompProps {
  onBudgetChange: any;
  user: UserDomain;
}
const BudgetComp: FC<BudgetCompProps> = ({ onBudgetChange, user }) => {
  const budgetStyle = { textAlign: "left" as const, margin: "20px" };
  function shouldShowBudgetComp() {
    return user.type == UserType.BUYER && user.actionFlat == ActionFlat.BUY;
  }

  return (
    <>
      {shouldShowBudgetComp() && (
        <div style={budgetStyle}>
          <h3>What's your budget?</h3>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={() => {
                    onBudgetChange(Budget.TILL_30L);
                  }}
                />
              }
              label="Below 30 Lakhs"
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={() => {
                    onBudgetChange(Budget.TILL_50L);
                  }}
                />
              }
              label="30 - 50 Lakhs"
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={() => {
                    onBudgetChange(Budget.TILL_80L);
                  }}
                />
              }
              label="50 - 80 Lakhs"
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={() => {
                    onBudgetChange(Budget.ABOVE_80L);
                  }}
                />
              }
              label="Above 80 Lakhs"
            />
          </FormGroup>
        </div>
      )}
    </>
  );
};

export default BudgetComp;
