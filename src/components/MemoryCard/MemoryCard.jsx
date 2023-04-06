import { Typography, IconButton } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

import { formatDateString } from "../../utilities/dateUtilities";
import {
  StyledMemoryCard,
  TitleAndButtons,
  ActionButtonsContainer,
  FlexRow,
} from "./style";
import { NEUTRAL_SHADES } from "../../utilities/globalStyles";

const MemoryCard = ({ memory, handleDelete, handleEdit }) => {
  return (
    <StyledMemoryCard>
      <TitleAndButtons>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {memory?.title ? memory.title : ""}
        </Typography>
        <ActionButtonsContainer>
          <IconButton
            onClick={() => handleDelete(memory._id)}
            sx={{ svg: { path: { fill: NEUTRAL_SHADES[700] } } }}
          >
            <DeleteRoundedIcon color={NEUTRAL_SHADES[700]} />
          </IconButton>
          <IconButton
            onClick={() => handleEdit(memory._id)}
            sx={{ svg: { path: { fill: NEUTRAL_SHADES[700] } } }}
          >
            <EditRoundedIcon color={NEUTRAL_SHADES[700]} />
          </IconButton>
        </ActionButtonsContainer>
      </TitleAndButtons>

      <Typography variant="body1" sx={{ fontWeight: 600 }} gutterBottom>
        {formatDateString(memory.date)}
      </Typography>

      {memory?.publication && (
        <Typography gutterBottom>{memory.publication}</Typography>
      )}

      {memory?.place && (
        <FlexRow>
          <Typography
            sx={{
              fontStyle: "italic",
              fontWeight: 600,
              color: `${NEUTRAL_SHADES[1000]}`,
            }}
            gutterBottom
          >
            Place:
          </Typography>
          <Typography
            sx={{ fontStyle: "italic", color: `${NEUTRAL_SHADES[1000]}` }}
            gutterBottom
          >
            {memory.place}
          </Typography>
        </FlexRow>
      )}

      {/* if value is array in order to use short syntax with && --> length should be boolean --> !! before. Otherwise it will render 0 */}
      {!!memory?.tags?.length && <Typography>Tags: {memory.tags}</Typography>}
    </StyledMemoryCard>
  );
};

export default MemoryCard;
