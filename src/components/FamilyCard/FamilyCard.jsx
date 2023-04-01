import FamilyRestroomRoundedIcon from "@mui/icons-material/FamilyRestroomRounded";
import Divider from "@mui/material/Divider";
import { StyledFamilyCard, Description, MembersContainer } from "./style";
import Typography from "@mui/material/Typography";

const FamilyCard = ({ family }) => {
  return (
    <StyledFamilyCard>
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
      <MembersContainer>
        <FamilyRestroomRoundedIcon />
        {!!family?.members?.length > 0 && (
          <Typography variant="button">
            {family.members.length} members
          </Typography>
        )}
      </MembersContainer>
    </StyledFamilyCard>
  );
};

export default FamilyCard;
