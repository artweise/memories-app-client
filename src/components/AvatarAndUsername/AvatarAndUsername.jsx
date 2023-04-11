import { Avatar } from "@mui/material";

import { Container, avatarStyles } from "./style";

const AvatarAndUsername = (user) => {
  return (
    <Container>
      <Avatar sx={avatarStyles}>
        {user.username.slice(0, 1).toUpperCase()}
      </Avatar>
      <div>{user.email}</div>
    </Container>
  );
};

export default AvatarAndUsername;
