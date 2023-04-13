import { useState } from "react";

import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Canvas from "../../components/Canvas/Canvas";
import Button from "../../components/Button/Button";
import { FlexRow } from "../SignupLogin/style";

import { PageContainer } from "../style";

const Home = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    showPassword: false,
    msg: "",
  });

  const handleNavigation = () => {
    setValues({
      ...values,
      email: "",
      password: "",
      username: "",
      msg: "",
    });
  };
  return (
    <>
      <Navbar />
      <Canvas />
      <PageContainer>
        <Typography
          variant="h2"
          align="left"
          width="48vw"
          sx={{ ml: 16, mt: 16, fontWeight: "bold", fontSize: 72 }}
          gutterBottom
        >
          Save and share the brightest moments of your life.
        </Typography>
        <Typography
          variant="h6"
          align="left"
          width="44vw"
          sx={{ ml: 16, mt: 6, fontWeight: 500 }}
          gutterBottom
        >
          Revolutionary app that will help you to save and share every moment
          with your family. Make sure you never miss and never forget.
        </Typography>

        <div style={{ marginTop: "0.5rem" }} onClick={handleNavigation}>
          <FlexRow>
            <Link to="/signup">
              <Button sx={{ ml: 16, mt: 6, fontWeight: 500 }}>Try now</Button>
            </Link>
          </FlexRow>
        </div>
      </PageContainer>
    </>
  );
};

export default Home;
