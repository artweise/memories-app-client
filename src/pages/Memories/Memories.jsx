import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { AuthContext } from "../../context/auth.context";

import mockMemories from "../../utilities/mockMemories.json";
import MemoryCard from "../../components/MemoryCard/MemoryCard";
import { PageContainer } from "../style";
import { MemoriesContainer } from "./style";

const Memories = () => {
  // const { isLoggedIn, isLoading, token } = useContext(AuthContext);
  const [memories, setMemories] = useState("mockMemories");

  return (
    <>
      <Navbar />
      <PageContainer>
        <MemoriesContainer>
          {mockMemories.map((memory) => (
            <Link to={`/memories/${memory._id}`} key={memory._id}>
              <MemoryCard memory={memory} />
            </Link>
          ))}
        </MemoriesContainer>
      </PageContainer>
    </>
  );
};

export default Memories;

// {familyQuery.status === "loading" && <div>LOADING</div>}
// {familyQuery.status === "success" &&
//   familyQuery?.data?.map((family) => (
//     <Link to={`/memories/${family._id}`} key={family._id}>
//       <FamilyCard family={family} />
//     </Link>
//   ))}
// <FamilyCardEmpty onClick={() => setIsCreateModalOpen(true)} />
