import { Typography, IconButton, Chip, Tooltip } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

import { formatDateString } from "../../utilities/dateUtilities";
import {
  StyledMemoryCard,
  TitleAndButtons,
  ActionButtonsContainer,
  FlexRow,
  TagsContainer,
  FilesContainer,
  StyledImg,
  iconButtonStyles,
  boldTextStyles,
  subTextStyles,
} from "./style";
import { NEUTRAL_SHADES } from "../../utilities/globalStyles";

const MemoryCard = ({
  memory,
  handleDelete,
  handleEdit,
  currentUserId,
  handleOpenPreview,
}) => {
  return (
    <StyledMemoryCard>
      <TitleAndButtons>
        <Typography variant="h6" sx={boldTextStyles}>
          {memory?.title ? memory.title : ""}
        </Typography>
        {((memory.owner && currentUserId === memory.owner) ||
          !memory?.owner) && (
          <ActionButtonsContainer>
            <IconButton
              onClick={() => handleDelete(memory._id)}
              sx={iconButtonStyles}
            >
              <DeleteRoundedIcon color={NEUTRAL_SHADES[700]} />
            </IconButton>
            <IconButton
              onClick={() => handleEdit(memory)}
              sx={iconButtonStyles}
            >
              <EditRoundedIcon color={NEUTRAL_SHADES[700]} />
            </IconButton>
          </ActionButtonsContainer>
        )}
      </TitleAndButtons>

      <Typography variant="body1" sx={boldTextStyles} gutterBottom>
        {formatDateString(memory.date)}
      </Typography>

      {memory?.publication && (
        <Typography gutterBottom>{memory.publication}</Typography>
      )}

      {memory?.place && (
        <FlexRow>
          <Typography sx={boldTextStyles} gutterBottom>
            Place:
          </Typography>
          <Typography sx={subTextStyles} gutterBottom>
            {memory.place}
          </Typography>
        </FlexRow>
      )}

      {!!memory?.gallery?.length && (
        <FilesContainer>
          {memory.gallery.slice(0, 8).map((file, index) => (
            <FlexRow key={index}>
              <StyledImg
                src={file}
                width="auto"
                height="200"
                alt="preview"
                onClick={() => handleOpenPreview(file)}
              />
            </FlexRow>
          ))}
          {/* if there are more then 8 photos/videos show tooltip with the rest of files*/}
          {memory.gallery.length > 8 && (
            <Tooltip
              disableHoverListener
              title={
                <div>
                  {memory.gallery.slice(8).map((file, index) => (
                    <Typography key={index}>{file}</Typography>
                  ))}
                </div>
              }
            >
              {/* the amount of the rest files (length - 8)*/}
              <Chip
                label={`+ ${memory.gallery.length - 8}`}
                // TODO loadMoreFunction
                // onClick={handleClickLoadMore}
                clickable
              />
            </Tooltip>
          )}
        </FilesContainer>
      )}

      {/* if value is array in order to use short syntax with && --> length should be boolean --> !! before. Otherwise it will render 0 */}
      {!!memory?.tags?.length && (
        <TagsContainer>
          <Typography sx={{ ...boldTextStyles, alignSelf: "center" }}>
            Tags:
          </Typography>
          {/* show only 4 tags */}
          <FlexRow>
            {memory.tags.slice(0, 4).map((tag, index) => (
              <Chip key={index} label={tag} />
            ))}
            {/* if there are more then 4 tags show tooltip with the rest of tags*/}
            {memory.tags.length > 4 && (
              <Tooltip
                title={
                  <div>
                    {memory.tags.slice(4).map((tag, index) => (
                      <Typography key={index}>{tag}</Typography>
                    ))}
                  </div>
                }
                placement="top"
              >
                {/* the amount of the rest tags (length - 4)*/}
                <Chip label={`+ ${memory.tags.length - 4}`} />
              </Tooltip>
            )}
          </FlexRow>
        </TagsContainer>
      )}
    </StyledMemoryCard>
  );
};

export default MemoryCard;
