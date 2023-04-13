import Skeleton from "@mui/material/Skeleton";

import { StyledSkeletonCard } from "./style";

const FamilyCardSkeleton = () => {
  return (
    <StyledSkeletonCard>
      <Skeleton
        variant="rectangular"
        width="100%"
        height="100%"
        style={{ borderRadius: "16px" }}
      />
    </StyledSkeletonCard>
  );
};

export default FamilyCardSkeleton;
