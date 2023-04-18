import { useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { Typography, IconButton } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

import { AuthContext } from "../../context/auth.context";
import Button from "../../components/Button/Button";
import Navbar from "../../components/Navbar/Navbar";
import MemoryCard from "../../components/MemoryCard/MemoryCard";
import MemoriesPageSkeleton from "../../components/MemoriesPageSkeleton/MemoriesPageSkeleton";
import CreateEditMemoryModal from "../../components/Modals/CreateEditMemoryModal.jsx/CreateEditMemoryModal";
import PreviewModal from "../../components/Modals/PreviewModal/PreviewModal";
import ConfirmActionModal from "../../components/Modals/ConfirmActionModal/ConfirmActionModal";
import { notifySuccess, notifyError } from "../../utilities/toastUtilities";
import {
  getAllMemories,
  createMemory,
  deleteMemory,
  updateMemory,
} from "../../sevices/memoryService";
import { PRIMARY_SHADES, NEUTRAL_SHADES } from "../../utilities/globalStyles";
import { PageContainer } from "../style";
import {
  MemoryCardsContainer,
  MemoriesHeaderContainer,
  GoBackContainer,
  TotalContainer,
  Container,
  MemoriesContainer,
  SideMenu,
} from "./style";

const Memories = () => {
  const { user } = useContext(AuthContext);
  const [isCreateEditMemoryModalOpen, setIsCreateEditMemoryModalOpen] =
    useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);
  const [isCreateUpdateLoading, setIsCreateUpdateLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [memoryToUpdateValues, setMemoryToUpdateValues] = useState(null);
  const [memoryToUpdateId, setMemoryToUpdateId] = useState(null);
  const [fileUrl, setFileUrl] = useState("");
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
      setIsCreateUpdateLoading(false);
    },
    onError: (err) => {
      notifyError(err.response.data.message);
      setIsCreateUpdateLoading(false);
    },
    onMutate: () => {
      setIsCreateUpdateLoading(true);
    },
  });

  const deleteMutation = useMutation(deleteMemory, {
    onSuccess: () => {
      // Invalidate and refetch
      notifySuccess("Memory deleted successfully", "🌚");
      queryClient.invalidateQueries("memories");
      // Close confirm modal
      setIsDeleteLoading(false);
      setIsConfirmDeleteModalOpen(false);
    },
    onError: (err) => {
      notifyError(err.response.data.message);
      setIsDeleteLoading(false);
    },
    onMutate: () => {
      setIsDeleteLoading(true);
    },
  });

  const updateMutation = useMutation(updateMemory, {
    onSuccess: () => {
      // Invalidate and refetch
      setIsCreateEditMemoryModalOpen(false);
      setIsEditMode(false);
      notifySuccess("Memory updated successfully", "🍀");
      queryClient.invalidateQueries("memories");
      setIsCreateUpdateLoading(false);
    },
    onError: (err) => {
      notifyError(err.response.data.message);
      setIsCreateUpdateLoading(false);
    },
    onMutate: () => {
      setIsCreateUpdateLoading(true);
    },
  });

  // Send request and create memory
  const handleCreateMemory = async (memoryValues) => {
    createMutation.mutate(memoryValues);
  };

  // Open "Are you sure modal"
  const handleConfirmDeleteMemory = (memoryId) => {
    setMemoryToUpdateId(memoryId);
    setIsConfirmDeleteModalOpen(true);
  };

  // Send request and delete memory
  const handleDeleteMemory = () => {
    deleteMutation.mutate(memoryToUpdateId);
  };

  // Send request and update memory
  const handleUpdateMemory = ({ memoryId, data }) => {
    updateMutation.mutate({ memoryId, data });
  };

  // When user wants to edit memory
  const handleEditMemory = (memory) => {
    // set isEditMode
    setIsEditMode(true);
    const date = new Date(memory.date);
    // format api data to form data
    setMemoryToUpdateValues({
      date,
      title: memory?.title ? memory.title : "",
      publication: memory?.publication ? memory.publication : "",
      tags: memory?.tags?.length ? memory.tags : [],
      place: memory?.place ? memory.place : "",
      isPrivate: memory?.owner ? true : false,
      gallery: memory?.gallery?.length ? memory.gallery : [],
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

  const handleOpenPreview = (fileUrl) => {
    setFileUrl(fileUrl);
    setIsPreviewModalOpen(true);
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
          <Container>
            <MemoriesContainer>
              <MemoriesHeaderContainer>
                <Typography variant="h4" color={PRIMARY_SHADES[1000]}>
                  {memoryQuery?.data?.length
                    ? `${memoryQuery.data[0].family.title} memories`
                    : "No memories yet"}
                </Typography>
                <Button
                  onClick={() => setIsCreateEditMemoryModalOpen(true)}
                  disabled={
                    !memoryQuery.status === "success" || isCreateUpdateLoading
                  }
                  loading={isCreateUpdateLoading}
                  sx={{ minWidth: "200px" }}
                >
                  Add new memory
                </Button>
              </MemoriesHeaderContainer>
              {!!memoryQuery?.data?.length && (
                <TotalContainer>
                  <Typography color={NEUTRAL_SHADES[900]}>
                    {memoryQuery.data.length} memories
                  </Typography>
                </TotalContainer>
              )}

              <MemoryCardsContainer>
                {!!memoryQuery?.data?.length &&
                  memoryQuery.data.map((memory, index) => (
                    <MemoryCard
                      key={index}
                      memory={memory}
                      handleDelete={handleConfirmDeleteMemory}
                      handleEdit={handleEditMemory}
                      currentUserId={user?._id}
                      handleOpenPreview={handleOpenPreview}
                    />
                  ))}
              </MemoryCardsContainer>
            </MemoriesContainer>
          </Container>
        )}
      </PageContainer>
      <CreateEditMemoryModal
        isOpen={isCreateEditMemoryModalOpen}
        loading={isCreateUpdateLoading}
        familyId={familyId}
        isEditMode={isEditMode}
        memoryToUpdateValues={memoryToUpdateValues}
        memoryToUpdateId={memoryToUpdateId}
        handleClose={handleCloseCreateEditModal}
        onCreate={handleCreateMemory}
        onUpdate={handleUpdateMemory}
        handleOpenPreview={handleOpenPreview}
      />
      <PreviewModal
        isOpen={isPreviewModalOpen}
        fileUrl={fileUrl}
        handleClose={() => {
          setIsPreviewModalOpen(false);
        }}
      />
      <ConfirmActionModal
        onClose={() => setIsConfirmDeleteModalOpen(false)}
        isOpen={isConfirmDeleteModalOpen}
        loading={isDeleteLoading}
        actionName="Delete"
        actionString="Are you sure you want to delete this memory? 😢"
        explanation="It will be deleted for everybody in your family"
        onConfirm={handleDeleteMemory}
      />
    </>
  );
};

export default Memories;
