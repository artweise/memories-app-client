import Tooltip from "@mui/material/Tooltip";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { EmptyCard } from "./style";

const FamilyCardEmpty = ({ onClick }) => {
  return (
    <EmptyCard onClick={onClick}>
      <Tooltip title="Add new family" placement="top">
        <AddRoundedIcon fontSize="large" />
      </Tooltip>
    </EmptyCard>
  );
};

export default FamilyCardEmpty;
