import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { FC } from "react";
import { ActionFlat, Budget } from "../../model/domain/post";
import { UserDomain, UserType } from "../../model/domain/user";

interface BudgetCompProps {
  onBudgetChange: any;
  user: UserDomain;
  budgets: Budget[];
}
const BudgetComp: FC<BudgetCompProps> = ({ onBudgetChange, user, budgets }) => {
  const budgetStyle = { textAlign: "left" as const, margin: "20px" };
  function shouldShowBudgetComp() {
    return user.type != UserType.NONE && user.actionFlat != ActionFlat.NONE;
  }
  function getPriceHeading() {
    switch (user.type) {
      case UserType.BUYER:
        return "What's your budget?";
      default:
        return "What's your ask?";
    }
  }

  return (
    <>
      {shouldShowBudgetComp() && (
        <div style={budgetStyle}>
          <h3>{getPriceHeading()}</h3>
          <FormGroup>
            {budgets.map((item, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={item.checked}
                    onChange={() => {
                      budgets[index].checked = !budgets[index].checked;
                      onBudgetChange([...budgets]);
                    }}
                  />
                }
                label={item.budget}
              />
            ))}
          </FormGroup>
        </div>
      )}
    </>
  );
};

export default BudgetComp;
