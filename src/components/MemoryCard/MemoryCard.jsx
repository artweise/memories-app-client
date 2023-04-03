import { Typography } from "@mui/material";

import { formatDateString } from "../../utilities/dateUtilities";
import { StyledMemoryCard } from "./style";

const MemoryCard = ({ memory }) => {
  return (
    <StyledMemoryCard>
      <Typography>{memory.publication}</Typography>
      <Typography>Date: {formatDateString(memory.date)}</Typography>
      <Typography>Place: {memory.place}</Typography>
      <Typography>Tags: {memory.tags}</Typography>
    </StyledMemoryCard>
  );
};

export default MemoryCard;
