import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "react-query";

import { AuthContext } from "../../context/auth.context";
import Navbar from "../../components/Navbar/Navbar";
import FamilyCard from "../../components/FamilyCard/FamilyCard";
import FamilyCardEmpty from "../../components/FamilyCard/FamilyCardEmpty";
import CreateFamilyModal from "../../components/Modals/CreateFamilyModal/CreateFamilyModal";
import { getAllFamilies, createFamily } from "../../sevices/familyService";
import { notifySuccess, notifyError } from "../../utilities/toastUtilities";
import { PageContainer } from "../style";
import { FamiliesContainer } from "./style";
import FamilyCardSkeleton from "../../components/FamilyCard/FamilyCardSkeleton";

const Families = () => {
  const { setCurrentFamily } = useContext(AuthContext);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCreationLoading, setIsCreationLoading] = useState(false);

  // Access the client
  const queryClient = useQueryClient();

  // Queries
  const familyQuery = useQuery("families", () => getAllFamilies());
  // Mutations
  const mutation = useMutation(createFamily, {
    onSuccess: () => {
      // Invalidate and refetch
      setIsCreateModalOpen(false);
      notifySuccess("Family created successfully", "🏡");
      queryClient.invalidateQueries("families");
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

  const handleCreateFamily = async (familyValues) => {
    mutation.mutate(familyValues);
  };

  // Skeleton
  const renderFamiliesSkeleton = () => {
    return [...Array(2).keys()].map((el, index) => (
      <FamilyCardSkeleton key={index} />
    ));
  };

  return (
    <>
      <Navbar />
      <PageContainer>
        <FamiliesContainer>
          {familyQuery.status === "loading" && renderFamiliesSkeleton()}

          {familyQuery.status === "success" && (
            <>
              {familyQuery?.data?.map((family) => (
                <Link
                  onClick={() => setCurrentFamily(family)}
                  to={`/memories/${family._id}`}
                  key={family._id}
                >
                  <FamilyCard family={family} />
                </Link>
              ))}
              <FamilyCardEmpty onClick={() => setIsCreateModalOpen(true)} />
            </>
          )}
        </FamiliesContainer>
      </PageContainer>
      <CreateFamilyModal
        isOpen={isCreateModalOpen}
        handleClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateFamily}
        loading={isCreationLoading}
      />
    </>
  );
};

export default Families;
