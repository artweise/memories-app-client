import { useState, useEffect, useContext } from "react";
import Navbar from "../../components/Navbar/Navbar";
import FamilyCard from "../../components/FamilyCard/FamilyCard";
import familiesMock from "../../utilities/familiesMock.json";
import { FamiliesContainer } from "./style";
import { AuthContext } from "../../context/auth.context";

const Families = () => {
  const { isLoggedIn, isLoading, token } = useContext(AuthContext);
  const [families, setFamilies] = useState(familiesMock);

  console.log(token);
  //   const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    // <>
    //   {isLoggedIn && (
    //     <>
    //       <Navbar />
    //       <FamiliesContainer>
    //         {families.map((family) => (
    //           <FamilyCard key={family._id} family={family} />
    //         ))}
    //       </FamiliesContainer>
    //     </>
    //   )}
    // </>

    <>
      <Navbar />
      <FamiliesContainer>
        {families.map((family) => (
          <FamilyCard key={family._id} family={family} />
        ))}
      </FamiliesContainer>
    </>
  );
};

export default Families;
