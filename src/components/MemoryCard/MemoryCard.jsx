import { Typography } from "@mui/material";

import { StyledMemoryCard } from "./style";

const MemoryCard = ({ memory }) => {
  return (
    <StyledMemoryCard>
      <Typography>{memory.publication}</Typography>
    </StyledMemoryCard>
  );
};

export default MemoryCard;
