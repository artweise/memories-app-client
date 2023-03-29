import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import FamilyCard from "../../components/Navbar/FamilyCard/FamilyCard";
import familiesMock from "../../utilities/familiesMock.json";
import { FamiliesContainer } from "./style";

const Families = () => {
  console.log("lalala");
  const [families, setFamilies] = useState(familiesMock);
  return (
    <>
      <Navbar />
      <FamiliesContainer>
        {families.map((family) => (
          <FamilyCard family={family} />
        ))}
      </FamiliesContainer>
    </>
  );
};

export default Families;
