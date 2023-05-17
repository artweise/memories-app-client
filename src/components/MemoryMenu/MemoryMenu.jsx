import { useState } from 'react';
import { Typography, IconButton, MenuItem, Menu, ListItemIcon, Tooltip } from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';

import { ActionButtonsContainer, iconButtonStyles, paperStyles } from './style';

const MemoryMenu = ({ handleEdit, handleDelete, memory }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  return (
    <Tooltip title={anchorEl ? '' : 'Options'}>
      <ActionButtonsContainer>
        <IconButton onClick={(event) => setAnchorEl(event.currentTarget)} sx={iconButtonStyles}>
          <MoreVertRoundedIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          PaperProps={{
            style: paperStyles,
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
              <EditRoundedIcon fontSize='small' />
            </ListItemIcon>
            <Typography variant='inherit'>Edit</Typography>
          </MenuItem>
          {/* Handle Delete */}
          <MenuItem
            onClick={() => {
              setAnchorEl(null);
              handleDelete(memory._id);
            }}
          >
            <ListItemIcon sx={iconButtonStyles}>
              <DeleteRoundedIcon fontSize='small' />
            </ListItemIcon>
            <Typography variant='inherit'>Delete</Typography>
          </MenuItem>
        </Menu>
      </ActionButtonsContainer>
    </Tooltip>
  );
};

export default MemoryMenu;
