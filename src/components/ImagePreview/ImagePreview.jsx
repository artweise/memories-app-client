import { IconButton } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { CloseRoundedIconStyles, FilesContainer } from "./style";

const ImagePreview = ({ file, onDelete }) => {
  return (
    <FilesContainer mr={1} mb={1}>
      <img src={file} alt="preview" width="auto" height="100" />
      <IconButton
        size="small"
        sx={CloseRoundedIconStyles}
        onClick={() => onDelete(file)}
      >
        <CloseRoundedIcon />
      </IconButton>
    </FilesContainer>
  );
};

export default ImagePreview;
