import { Building2, CreditCard, Shield } from "lucide-react";

export const NODE_TYPES = {
  ACCOUNT: "Account",
  LOAN: "Loan",
  COLLATERAL: "Collateral",
};

export const NODE_COLORS = {
  [NODE_TYPES.ACCOUNT]: "bg-blue-500",
  [NODE_TYPES.LOAN]: "bg-green-500",
  [NODE_TYPES.COLLATERAL]: "bg-orange-500",
};

export const NODE_ICONS = {
  [NODE_TYPES.ACCOUNT]: Building2,
  [NODE_TYPES.LOAN]: CreditCard,
  [NODE_TYPES.COLLATERAL]: Shield,
};
