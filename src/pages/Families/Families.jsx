import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import FamilyCard from "../../components/FamilyCard/FamilyCard";
import familiesMock from "../../utilities/familiesMock.json";
import { FamiliesContainer } from "./style";
import { AuthContext } from "../../context/auth.context";
import FamilyCardEmpty from "../../components/FamilyCard/FamilyCardEmpty";

const Families = () => {
  const { isLoggedIn, isLoading, token } = useContext(AuthContext);
  const [families, setFamilies] = useState(familiesMock);

  const handleAddFamily = () => {
    console.log("handleAddFamily");
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
        <FamilyCardEmpty onClick={handleAddFamily} />
      </FamiliesContainer>
    </>
  );
};

export default Families;
