import { Skeleton } from "@mui/material";

import { MemoriesHeaderSkeleton } from "./style";
import { MemoriesContainer } from "../../pages/Memories/style";

const MemoriesPageSkeleton = () => {
  return (
    <div>
      <MemoriesHeaderSkeleton>
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          style={{ borderRadius: "8px" }}
        />
      </MemoriesHeaderSkeleton>
      <MemoriesContainer>
        {[...Array(3).keys()].map((el, index) => (
          <Skeleton
            variant="rectangular"
            width="60vw"
            height="216px"
            style={{ borderRadius: "8px" }}
            key={index}
          />
        ))}
      </MemoriesContainer>
    </div>
  );
};

export default MemoriesPageSkeleton;
