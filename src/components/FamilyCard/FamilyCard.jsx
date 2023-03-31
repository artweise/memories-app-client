import { StyledFamilyCard } from "./style";

const FamilyCard = ({ family }) => {
  return (
    <StyledFamilyCard color={family.color}>{family.title}</StyledFamilyCard>
  );
};

export default FamilyCard;
