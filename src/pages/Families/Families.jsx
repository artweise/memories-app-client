import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "react-query";

import { AuthContext } from "../../context/auth.context";
import Navbar from "../../components/Navbar/Navbar";
import FamilyCard from "../../components/FamilyCard/FamilyCard";
import FamilyCardEmpty from "../../components/FamilyCard/FamilyCardEmpty";
import CreateFamilyModal from "../../components/Modals/CreateFamilyModal/CreateFamilyModal";
import { getAllFamilies, createFamily } from "./services/familyServices";
import { notifySuccess, notifyError } from "../../utilities/toastUtilities";
import { FamiliesContainer } from "./style";

const Families = () => {
  const { isLoggedIn, isLoading, token } = useContext(AuthContext);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

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
    },
    onError: (err) => {
      notifyError(err.response.data.message);
    },
  });

  const handleCloseCreateFamily = () => setIsCreateModalOpen(false);

  const handleCreateFamily = async (familyValues) => {
    mutation.mutate(familyValues);
  };

  return (
    <>
      <Navbar />
      <FamiliesContainer>
        {familyQuery.status === "loading" && <div>LOADING</div>}
        {familyQuery.status === "success" &&
          familyQuery?.data?.map((family) => (
            <Link to={`/memories/${family._id}`} key={family._id}>
              <FamilyCard family={family} />
            </Link>
          ))}
        <FamilyCardEmpty onClick={() => setIsCreateModalOpen(true)} />
      </FamiliesContainer>
      <CreateFamilyModal
        isOpen={isCreateModalOpen}
        handleClose={handleCloseCreateFamily}
        onCreate={handleCreateFamily}
      />
    </>
  );
};

export default Families;
