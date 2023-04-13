import { Skeleton } from "@mui/material";

import { MemoriesHeaderSkeleton } from "./style";
import {
  MemoryCardsContainer,
  Container,
  MemoriesContainer,
} from "../../pages/Memories/style";

const MemoriesPageSkeleton = () => {
  return (
    <Container>
      <MemoriesContainer>
        <MemoriesHeaderSkeleton>
          <Skeleton
            variant="rectangular"
            width="100%"
            height="100%"
            style={{ borderRadius: "8px" }}
          />
        </MemoriesHeaderSkeleton>

        <MemoryCardsContainer>
          {[...Array(3).keys()].map((el, index) => (
            <Skeleton
              variant="rectangular"
              width="60vw"
              height="216px"
              style={{ borderRadius: "8px" }}
              key={index}
            />
          ))}
        </MemoryCardsContainer>
      </MemoriesContainer>
    </Container>
  );
};

export default MemoriesPageSkeleton;
