import { Typography } from "@mui/material";

import { formatDateString } from "../../utilities/dateUtilities";
import { StyledMemoryCard } from "./style";

const MemoryCard = ({ memory }) => {
  return (
    <StyledMemoryCard>
      {memory?.title && <Typography>{memory.title}</Typography>}
      {memory?.publication && <Typography>{memory.publication}</Typography>}
      <Typography>Date: {formatDateString(memory.date)}</Typography>
      {memory?.place && <Typography>Place: {memory.place}</Typography>}
      {/* if value is array in order to use short syntax with && --> length should be boolean --> !! before. Otherwise it will render 0 */}
      {!!memory?.tags?.length && <Typography>Tags: {memory.tags}</Typography>}
    </StyledMemoryCard>
  );
};

export default MemoryCard;
