import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { AuthContext } from "../../context/auth.context";
import { PageContainer } from "../style";

const Memories = () => {
  const { isLoggedIn, isLoading, token } = useContext(AuthContext);

  return (
    <>
      <Navbar />
      <PageContainer></PageContainer>
    </>
  );
};

export default Memories;
