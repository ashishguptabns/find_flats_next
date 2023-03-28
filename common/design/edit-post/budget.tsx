import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { FC } from "react";
import {
  ActionFlat,
  Budget,
  BuyFlatBudgets as BuySellFlatBudgets,
  RentFlatBudgets,
} from "../../model/domain/post";
import { UserDomain, UserType } from "../../model/domain/user";

interface BudgetCompProps {
  onBudgetChange: any;
  user: UserDomain;
}
const BudgetComp: FC<BudgetCompProps> = ({ onBudgetChange, user }) => {
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

  function getPrices() {
    switch (user.actionFlat) {
      case ActionFlat.BUY:
        return BuySellFlatBudgets;
      case ActionFlat.SELL:
        return BuySellFlatBudgets;
      default:
        return RentFlatBudgets;
    }
  }
  var budgets: Budget[] = [];
  return (
    <>
      {shouldShowBudgetComp() && (
        <div style={budgetStyle}>
          <h3>{getPriceHeading()}</h3>
          <FormGroup>
            {getPrices().map((item, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    onChange={() => {
                      if (budgets.includes(item)) {
                        budgets.splice(index, 1);
                      } else {
                        budgets.push(item);
                      }
                      onBudgetChange(budgets);
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
