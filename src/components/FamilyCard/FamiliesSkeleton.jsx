import Skeleton from "@mui/material/Skeleton";

import { FamilyCardSkeleton } from "./style";

const FamiliesSkeleton = () => {
  return (
    <FamilyCardSkeleton>
      <Skeleton
        variant="rectangular"
        width="100%"
        height="100%"
        style={{ borderRadius: "16px" }}
      />
    </FamilyCardSkeleton>
  );
};

export default FamiliesSkeleton;
