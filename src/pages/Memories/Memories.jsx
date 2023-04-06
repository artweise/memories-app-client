import { useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Typography, IconButton } from "@mui/material";
import { useQuery, useQueryClient, useMutation } from "react-query";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

import Button from "../../components/Button/Button";
import Navbar from "../../components/Navbar/Navbar";
import { AuthContext } from "../../context/auth.context";

import MemoryCard from "../../components/MemoryCard/MemoryCard";
import CreateEditMemoryModal from "../../components/Modals/CreateEditMemoryModal.jsx/CreateEditMemoryModal";
import { notifySuccess, notifyError } from "../../utilities/toastUtilities";
import {
  getAllMemories,
  createMemory,
  deleteMemory,
} from "./services/memoryServices";
import { PRIMARY_SHADES } from "../../utilities/globalStyles";
import { PageContainer } from "../style";
import {
  MemoriesContainer,
  MemoriesHeaderContainer,
  GoBackContainer,
} from "./style";

const Memories = () => {
  const { isLoggedIn, isLoading, token, currentFamily, user } =
    useContext(AuthContext);
  const [isCreateEditMemoryModalOpen, setIsCreateEditMemoryModalOpen] =
    useState(false);
  const [isCreationLoading, setIsCreationLoading] = useState(false);
  const [isDeletionLoading, setDeleletionLoading] = useState(false);
  const [isUpdatingLoading, setIsUpdatingLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const queryClient = useQueryClient();

  const { familyId } = useParams();

  // Access the client

  // Queries
  const memoryQuery = useQuery(["memories", familyId], () =>
    getAllMemories(familyId)
  );
  // Mutations
  const createMutation = useMutation(createMemory, {
    onSuccess: () => {
      // Invalidate and refetch
      setIsCreateEditMemoryModalOpen(false);
      notifySuccess("Memory created successfully", "🏡");
      queryClient.invalidateQueries("memories");
      setIsCreationLoading(false);
    },
    onError: (err) => {
      notifyError(err.response.data.message);
      setIsCreationLoading(false);
    },
    onMutate: () => {
      setIsCreationLoading(true);
    },
  });

  const deleteMutation = useMutation(deleteMemory, {
    onSuccess: () => {
      // Invalidate and refetch
      notifySuccess("Memory deleted successfully", "🏡");
      queryClient.invalidateQueries("memories");
      setDeleletionLoading(false);
    },
    onError: (err) => {
      notifyError(err.response.data.message);
      setDeleletionLoading(false);
    },
    onMutate: () => {
      setDeleletionLoading(true);
    },
  });

  const handleCreateMemory = async (memoryValues) => {
    createMutation.mutate(memoryValues);
  };

  const handleDeleteMemory = (memoryId) => {
    deleteMutation.mutate(memoryId);
  };

  const handleEditMemory = (memory) => {
    console.log(memory);
  };

  return (
    <>
      <Navbar />
      <PageContainer>
        <GoBackContainer>
          <Link to="/families">
            <IconButton>
              <ArrowBackRoundedIcon />
            </IconButton>
            <Typography>Go back to families</Typography>
          </Link>
        </GoBackContainer>
        <MemoriesHeaderContainer>
          <Typography variant="h3" color={PRIMARY_SHADES[1000]}>
            {memoryQuery?.data?.length
              ? `${memoryQuery.data[0].family.title} memories`
              : "No memories yet"}
          </Typography>
          <Button
            onClick={() => setIsCreateEditMemoryModalOpen(true)}
            disabled={!memoryQuery.status === "success" || isCreationLoading}
            loading={isCreationLoading}
          >
            Add new memory
          </Button>
        </MemoriesHeaderContainer>

        <MemoriesContainer>
          {memoryQuery.status === "loading" && <div>LOADING</div>}
          {memoryQuery.status === "success" &&
            memoryQuery.data.map((memory, index) => (
              <MemoryCard
                key={index}
                memory={memory}
                handleDelete={handleDeleteMemory}
                handleEdit={handleEditMemory}
                currentUserId={user?._id}
              />
            ))}
        </MemoriesContainer>
      </PageContainer>
      <CreateEditMemoryModal
        isOpen={isCreateEditMemoryModalOpen}
        handleClose={() => setIsCreateEditMemoryModalOpen(false)}
        onCreate={handleCreateMemory}
        loading={isCreationLoading}
        familyId={familyId}
        isEditMode={isEditMode}
      />
    </>
  );
};

export default Memories;
