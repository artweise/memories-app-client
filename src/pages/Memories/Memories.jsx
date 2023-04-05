import { useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { useQuery, useQueryClient, useMutation } from "react-query";

import Button from "../../components/Button/Button";
import Navbar from "../../components/Navbar/Navbar";
import { AuthContext } from "../../context/auth.context";

import mockMemories from "../../utilities/mockMemories.json";
import MemoryCard from "../../components/MemoryCard/MemoryCard";
import CreateMemoryModal from "../../components/Modals/CreateMemoryModal/CreateMemoryModal";
import { notifySuccess, notifyError } from "../../utilities/toastUtilities";
import { getAllMemories } from "./services/memoryServices";
import { PageContainer } from "../style";
import { MemoriesContainer, MemoriesHeaderContainer } from "./style";

const Memories = () => {
  const { isLoggedIn, isLoading, token, currentFamily } =
    useContext(AuthContext);
  const [memories, setMemories] = useState("mockMemories");
  const [isCreateMemoryModalOpen, setIsCreateMemoryModalOpen] = useState(false);
  const [isCreationLoading, setIsCreationLoading] = useState(false);

  const queryClient = useQueryClient();

  const { familyId } = useParams();

  // Access the client

  // Queries
  const memoryQuery = useQuery(["memories", familyId], () =>
    getAllMemories(familyId)
  );
  // Mutations
  // const mutation = useMutation(createFamily, {
  //   onSuccess: () => {
  //     // Invalidate and refetch
  //     setIsCreateMemoryModalOpen(false);
  //     notifySuccess("Memory created successfully", "🏡");
  //     queryClient.invalidateQueries("memories");
  //     setIsCreationLoading(false);
  //   },
  //   onError: (err) => {
  //     notifyError(err.response.data.message);
  //     setIsCreationLoading(false);
  //   },
  //   onMutate: () => {
  //     setIsCreationLoading(true);
  //   },
  // });

  // const hanldeCreateMemory = async (memoryValues) => {
  //   mutation.mutate(memoryValues);
  // };
  const hanldeCreateMemory = async (memoryValues) => {
    // mutation.mutate(memoryValues);
  };

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
          {/* {mockMemories.map((memory) => (
            <Link to={`/memories/${memory._id}`} key={memory._id}>
              <MemoryCard memory={memory} />
            </Link>
          ))} */}
          {memoryQuery.status === "loading" && <div>LOADING</div>}
          {memoryQuery.status === "success" &&
            memoryQuery.data.map((memory) => (
              <Link to={`/memories/${memory._id}`} key={memory._id}>
                <MemoryCard memory={memory} />
              </Link>
            ))}
        </MemoriesContainer>
      </PageContainer>
      <CreateMemoryModal
        isOpen={isCreateMemoryModalOpen}
        handleClose={() => setIsCreateMemoryModalOpen(false)}
        onCreate={hanldeCreateMemory}
      />
    </>
  );
};

export default Memories;
