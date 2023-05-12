import { useState } from 'react';

import { Typography, Chip, Tooltip, SvgIcon, Avatar, IconButton } from '@mui/material';
import KeyboardDoubleArrowRightRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowRightRounded';
import KeyboardDoubleArrowLeftRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftRounded';

import MemoryMenu from '../MemoryMenu/MemoryMenu';
import { formatDateString } from '../../utilities/dateUtilities';
import {
  StyledMemoryCard,
  TitleAndButtons,
  Publication,
  FlexRow,
  TagsContainer,
  FilesContainer,
  StyledImg,
  boldTextStyles,
  subTextStyles,
  avatarStyles,
} from './style';

const MemoryCard = ({ memory, handleDelete, handleEdit, currentUserId, handleOpenPreview }) => {
  // a state to hold the number of characters to show initially in publication field
  const [publicationToShow, setPublicationToShow] = useState(800);
  const [showAllFiles, setShowAllFiles] = useState(false);

  // handleFilesToShow function updates the showAllFiles state to be false
  // when the number of files to show is equal to the length of the gallery array
  const handleFilesToShow = () => {
    setShowAllFiles(filesToShow === memory.gallery.length ? false : true);
  };

  const filesToShow = 6;

  const renderShowHideTextButton = () => {
    return publicationToShow < memory.publication.length ? (
      <Tooltip title='Load more'>
        <IconButton
          size='small'
          onClick={() => setPublicationToShow(memory.publication.length)}
          sx={{ p: 0.5, mb: 0.5 }}
        >
          <SvgIcon color='action' fontSize='small'>
            <KeyboardDoubleArrowRightRoundedIcon />
          </SvgIcon>
        </IconButton>
      </Tooltip>
    ) : (
      <Tooltip title='Hide'>
        <IconButton size='small' onClick={() => setPublicationToShow(800)} sx={{ p: 0.5, mb: 0.5 }}>
          <SvgIcon color='action' fontSize='small'>
            <KeyboardDoubleArrowLeftRoundedIcon />
          </SvgIcon>
        </IconButton>
      </Tooltip>
    );
  };

  return (
    <StyledMemoryCard>
      <TitleAndButtons>
        <Typography variant='h6' sx={boldTextStyles}>
          {memory?.title ? memory.title : ''}
        </Typography>

        {/* Show options menu if the current user is the owner, or owner does not exist*/}
        {((memory.owner && currentUserId === memory.owner) || !memory?.owner) && (
          <MemoryMenu handleDelete={handleDelete} handleEdit={handleEdit} memory={memory} />
        )}
      </TitleAndButtons>

      <Typography variant='body1' sx={boldTextStyles} gutterBottom>
        {formatDateString(memory.date)}
      </Typography>

      {memory?.createdBy?.email && (
        <FlexRow style={{ alignItems: 'baseline' }}>
          <Typography sx={boldTextStyles} gutterBottom>
            Created by:
          </Typography>
          <FlexRow>
            <Avatar sx={avatarStyles}>
              {memory?.createdBy?.username?.slice(0, 1).toUpperCase() || null}
            </Avatar>
            <Typography variant='body2'>{memory?.createdBy?.username || ''}</Typography>
          </FlexRow>
        </FlexRow>
      )}

      <Publication>
        {memory?.publication && (
          <Typography gutterBottom>
            {/* if memory.publication.length <= 800 */}
            {publicationToShow >= memory.publication.length
              ? memory.publication
              : memory.publication.slice(0, publicationToShow) + '...'}
            {renderShowHideTextButton()}
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
                  width='auto'
                  height='170'
                  alt='preview'
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
          <Typography sx={{ ...boldTextStyles, alignSelf: 'center' }}>Tags:</Typography>
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
                placement='top'
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
