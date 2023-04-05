import { useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Typography } from "@mui/material";

import Button from "../../components/Button/Button";
import Navbar from "../../components/Navbar/Navbar";
import { AuthContext } from "../../context/auth.context";

import mockMemories from "../../utilities/mockMemories.json";
import MemoryCard from "../../components/MemoryCard/MemoryCard";
import { PageContainer } from "../style";
import { MemoriesContainer, MemoriesHeaderContainer } from "./style";
import CreateMemoryModal from "../../components/Modals/CreateMemoryModal/CreateMemoryModal";

const Memories = () => {
  const { isLoggedIn, isLoading, token, currentFamily } =
    useContext(AuthContext);
  const [memories, setMemories] = useState("mockMemories");
  const [isCreateMemoryModalOpen, setIsCreateMemoryModalOpen] = useState(false);

  const params = useParams();

  return (
    <>
      <Navbar />
      <PageContainer>
        <MemoriesHeaderContainer>
          <Typography variant="h5">Test memories</Typography>
          <Button onClick={() => setIsCreateMemoryModalOpen(true)}>
            Add new memory
          </Button>
        </MemoriesHeaderContainer>

        <MemoriesContainer>
          {mockMemories.map((memory) => (
            <Link to={`/memories/${memory._id}`} key={memory._id}>
              <MemoryCard memory={memory} />
            </Link>
          ))}
        </MemoriesContainer>
      </PageContainer>
      <CreateMemoryModal
        isOpen={isCreateMemoryModalOpen}
        handleClose={() => setIsCreateMemoryModalOpen(false)}
      />
    </>
  );
};

export default Memories;
