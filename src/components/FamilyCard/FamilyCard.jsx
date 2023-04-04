import { useState } from "react";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { Divider, Typography, Avatar, Popover } from "@mui/material";

import { SUCCESS_SHADES } from "../../utilities/globalStyles";
import {
  StyledFamilyCard,
  Description,
  MembersContainer,
  AvatarAndUsername,
  paperPopoverStyles,
  avatarStyles,
} from "./style";

const FamilyCard = ({ family }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <StyledFamilyCard color={family.color}>
      <Typography variant="h5" sx={{ mb: 2 }} noWrap={true}>
        {family.title}
      </Typography>
      <Description>
        {family?.description && (
          <Typography variant="body1" gutterBottom>
            {family.description.length > 100
              ? family.description.slice(0, 100) + "..."
              : family.description}
          </Typography>
        )}
      </Description>

      <Divider light />
      <MembersContainer
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        <AccountCircleRoundedIcon sx={{ color: SUCCESS_SHADES[700] }} />
        {!!family?.members?.length > 0 && (
          <Typography variant="button">
            {family.members.length} members
          </Typography>
        )}
      </MembersContainer>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
          padding: "16px",
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
        PaperProps={{
          sx: paperPopoverStyles,
        }}
      >
        {!!family?.members?.length &&
          family.members.map((member, index) => (
            <AvatarAndUsername key={index}>
              <Avatar sx={avatarStyles}>
                {member.username.slice(0, 2).toUpperCase()}
              </Avatar>
              <div>{member.email}</div>
            </AvatarAndUsername>
          ))}
      </Popover>
    </StyledFamilyCard>
  );
};

export default FamilyCard;
