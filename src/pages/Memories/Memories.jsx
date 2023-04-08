import { useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Typography, IconButton } from "@mui/material";
import { useQuery, useQueryClient, useMutation } from "react-query";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

import Button from "../../components/Button/Button";
import Navbar from "../../components/Navbar/Navbar";
import { AuthContext } from "../../context/auth.context";

import MemoryCard from "../../components/MemoryCard/MemoryCard";
import MemoriesPageSkeleton from "../../components/MemoriesPageSkeleton/MemoriesPageSkeleton";
import CreateEditMemoryModal from "../../components/Modals/CreateEditMemoryModal.jsx/CreateEditMemoryModal";
import { notifySuccess, notifyError } from "../../utilities/toastUtilities";
import {
  getAllMemories,
  createMemory,
  deleteMemory,
  updateMemory,
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
  const [isEditMode, setIsEditMode] = useState(false);
  const [memoryToUpdateValues, setMemoryToUpdateValues] = useState(null);
  const [memoryToUpdateId, setMemoryToUpdateId] = useState(null);

  const queryClient = useQueryClient();

  const { familyId } = useParams();

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
      notifySuccess("Memory deleted successfully", "🌚");
      queryClient.invalidateQueries("memories");
    },
    onError: (err) => {
      notifyError(err.response.data.message);
    },
  });

  const updateMutation = useMutation(updateMemory, {
    onSuccess: () => {
      // Invalidate and refetch
      setIsCreateEditMemoryModalOpen(false);
      notifySuccess("Memory updated successfully", "🍀");
      queryClient.invalidateQueries("memories");
    },
    onError: (err) => {
      notifyError(err.response.data.message);
    },
  });

  // Send request and create memory
  const handleCreateMemory = async (memoryValues) => {
    createMutation.mutate(memoryValues);
  };

  // Send request and delete memory
  const handleDeleteMemory = (memoryId) => {
    deleteMutation.mutate(memoryId);
  };

  // Send request and update memory
  const handleUpdateMemory = ({ memoryId, data }) => {
    updateMutation.mutate({ memoryId, data });
  };

  // When user wants to edit memory
  const handleEditMemory = (memory) => {
    // set isEditMode
    setIsEditMode(true);
    const date = new Date(memory.createdAt);
    // format api data to form data
    setMemoryToUpdateValues({
      date,
      title: memory?.title ? memory.title : "",
      publication: memory?.publication ? memory.publication : "",
      tags: memory?.tags?.length ? memory.tags : [],
      place: memory?.place ? memory.place : "",
      isPrivate: memory?.owner ? true : false,
    });
    setMemoryToUpdateId(memory._id);
    // open CreateEditModal with current memory formatted data for the state
    setIsCreateEditMemoryModalOpen(true);
  };

  // close CreateEditModal, and clear memoryToUpdate if is in edit mode
  const handleCloseCreateEditModal = () => {
    if (isEditMode) {
      setIsEditMode(false);
      setMemoryToUpdateValues(null);
      setMemoryToUpdateId(null);
    }
    setIsCreateEditMemoryModalOpen(false);
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
        {memoryQuery.status === "loading" && <MemoriesPageSkeleton />}
        {memoryQuery.status === "success" && (
          <>
            <MemoriesHeaderContainer>
              <Typography variant="h3" color={PRIMARY_SHADES[1000]}>
                {memoryQuery?.data?.length
                  ? `${memoryQuery.data[0].family.title} memories`
                  : "No memories yet"}
              </Typography>
              <Button
                onClick={() => setIsCreateEditMemoryModalOpen(true)}
                disabled={
                  !memoryQuery.status === "success" || isCreationLoading
                }
                loading={isCreationLoading}
              >
                Add new memory
              </Button>
            </MemoriesHeaderContainer>

            <MemoriesContainer>
              {!!memoryQuery?.data?.length &&
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
          </>
        )}
      </PageContainer>
      <CreateEditMemoryModal
        isOpen={isCreateEditMemoryModalOpen}
        handleClose={handleCloseCreateEditModal}
        onCreate={handleCreateMemory}
        onUpdate={handleUpdateMemory}
        loading={isCreationLoading}
        familyId={familyId}
        isEditMode={isEditMode}
        memoryToUpdateValues={memoryToUpdateValues}
        memoryToUpdateId={memoryToUpdateId}
      />
    </>
  );
};

export default Memories;
