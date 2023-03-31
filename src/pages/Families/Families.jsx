import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/auth.context";
import Navbar from "../../components/Navbar/Navbar";
import FamilyCard from "../../components/FamilyCard/FamilyCard";
import FamilyCardEmpty from "../../components/FamilyCard/FamilyCardEmpty";
import CreateFamilyModal from "../../components/Modals/CreateFamilyModal/CreateFamilyModal";
import { FamiliesContainer } from "./style";
import familiesMock from "../../utilities/familiesMock.json";

const Families = () => {
  const { isLoggedIn, isLoading, token } = useContext(AuthContext);
  const [families, setFamilies] = useState(familiesMock);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCloseCreateFamily = () => setIsCreateModalOpen(false);

  const handleCreateFamily = (familyValues) => {
    console.log(familyValues);
  };

  return (
    <>
      <Navbar />
      <FamiliesContainer>
        {families.map((family) => (
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
