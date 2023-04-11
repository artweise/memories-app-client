import { useState } from "react";

import {
  Typography,
  IconButton,
  Chip,
  Tooltip,
  SvgIcon,
  MenuItem,
  Menu,
  ListItemIcon,
} from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import KeyboardDoubleArrowRightRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowRightRounded";

import { formatDateString } from "../../utilities/dateUtilities";
import {
  StyledMemoryCard,
  TitleAndButtons,
  ActionButtonsContainer,
  Publication,
  FlexRow,
  TagsContainer,
  FilesContainer,
  StyledImg,
  iconButtonStyles,
  boldTextStyles,
  subTextStyles,
} from "./style";

const MemoryCard = ({
  memory,
  handleDelete,
  handleEdit,
  currentUserId,
  handleOpenPreview,
}) => {
  // a state to hold the number of characters to show initially in publication field
  const [publicationToShow, setPublicationToShow] = useState(800);
  const [showAllFiles, setShowAllFiles] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  // handleFilesToShow function updates the showAllFiles state to be false
  // when the number of files to show is equal to the length of the gallery array
  const handleFilesToShow = () => {
    setShowAllFiles(filesToShow === memory.gallery.length ? false : true);
  };

  const filesToShow = 4;

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
              onClick={(event) => setAnchorEl(event.currentTarget)}
              sx={iconButtonStyles}
            >
              <MoreVertRoundedIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
              PaperProps={{
                style: {
                  width: "128px",
                },
              }}
            >
              {/* Handle Edit */}
              <MenuItem
                onClick={() => {
                  setAnchorEl(null);
                  handleEdit(memory);
                }}
              >
                <ListItemIcon sx={iconButtonStyles}>
                  <EditRoundedIcon fontSize="small" />
                </ListItemIcon>
                <Typography variant="inherit">Edit</Typography>
              </MenuItem>
              {/* Handle Delete */}
              <MenuItem
                onClick={() => {
                  setAnchorEl(null);
                  handleDelete(memory._id);
                }}
              >
                <ListItemIcon sx={iconButtonStyles}>
                  <DeleteRoundedIcon fontSize="small" />
                </ListItemIcon>
                <Typography variant="inherit">Delete</Typography>
              </MenuItem>
            </Menu>
          </ActionButtonsContainer>
        )}
      </TitleAndButtons>

      <Typography variant="body1" sx={boldTextStyles} gutterBottom>
        {formatDateString(memory.date)}
      </Typography>

      <Publication>
        {memory?.publication && (
          <Typography gutterBottom>
            {/* if memory.publication.length <= 800 */}
            {publicationToShow >= memory.publication.length
              ? memory.publication
              : memory.publication.slice(0, publicationToShow) + "..."}
            {publicationToShow < memory.publication.length && (
              <Tooltip title="Load more">
                <SvgIcon color="action" fontSize="small">
                  <KeyboardDoubleArrowRightRoundedIcon
                    onClick={() =>
                      setPublicationToShow(memory.publication.length)
                    }
                  />
                </SvgIcon>
              </Tooltip>
            )}
          </Typography>
        )}
      </Publication>

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
          {/* 'if showAllFiles is true' ? memory.gallery.length 'if showAllFiles is false': filesToShow */}
          {memory.gallery
            .slice(0, showAllFiles ? memory.gallery.length : filesToShow)
            .map((file, index) => (
              <FlexRow key={index}>
                <StyledImg
                  src={file}
                  width="auto"
                  height="170"
                  alt="preview"
                  onClick={() => handleOpenPreview(file)}
                />
              </FlexRow>
            ))}

          {/* the condition in the FilesContainer div checks if there are more than 
          filesToShow files AND showAllFiles is false. If both conditions are true, 
          show the Chip with the number of remaining files */}
          {memory?.gallery?.length > filesToShow && !showAllFiles && (
            <Chip
              label={`+ ${memory.gallery.length - filesToShow}`}
              clickable
              onClick={handleFilesToShow}
            />
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
