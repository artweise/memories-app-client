import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { EmptyCard } from "./style";

const FamilyCardEmpty = ({ onClick }) => {
  return (
    <EmptyCard onClick={onClick}>
      <AddRoundedIcon fontSize="large" />
    </EmptyCard>
  );
};

export default FamilyCardEmpty;
