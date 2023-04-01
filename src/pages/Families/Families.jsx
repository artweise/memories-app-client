import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "react-query";

import { AuthContext } from "../../context/auth.context";
import Navbar from "../../components/Navbar/Navbar";
import FamilyCard from "../../components/FamilyCard/FamilyCard";
import FamilyCardEmpty from "../../components/FamilyCard/FamilyCardEmpty";
import CreateFamilyModal from "../../components/Modals/CreateFamilyModal/CreateFamilyModal";
import { FamiliesContainer } from "./style";
import familiesMock from "../../utilities/familiesMock.json";
import { getAllFamilies, createFamily } from "./services/services";

const Families = () => {
  const { isLoggedIn, isLoading, token } = useContext(AuthContext);
  const [families, setFamilies] = useState(familiesMock);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Access the client
  const queryClient = useQueryClient();

  // Queries
  const familyQuery = useQuery("families", () => getAllFamilies());
  // Mutations
  const mutation = useMutation(createFamily, {
    onSuccess: () => {
      // Invalidate and refetch
      setIsCreateModalOpen(false);
      queryClient.invalidateQueries("families");
    },
    onError: (err) => {
      setErrorMessage(err.response.data.message);
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
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </>
  );
};

export default Families;
