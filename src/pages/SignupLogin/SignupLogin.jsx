import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Button,
  Box,
  TextField,
  IconButton,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  FormControl,
} from "@mui/material";
import { AuthContext } from "../../context/auth.context";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Navbar from "../../components/Navbar/Navbar";
import { notifySuccess, notifyError } from "../../utilities/toastUtilities";
import "./style.css";

const urlAuth =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PROD_SERVER_AUTH
    : process.env.REACT_APP_DEV_SERVER_AUTH;

// const urlAuth = process.env.REACT_APP_PROD_SERVER_AUTH;

const FormAuth = ({ title }) => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    showPassword: false,
    msg: "",
  });

  const navigate = useNavigate();
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const handleNavigation = () => {
    setValues({
      ...values,
      email: "",
      password: "",
      username: "",
      msg: "",
    });
  };
  const handleAction = async (action) => {
    if (action === "Sign Up") {
      try {
        let response = await axios.post(`${urlAuth}/signup`, {
          username: values.username,
          email: values.email,
          password: values.password,
        });
        setValues({
          ...values,
          username: "",
          email: "",
          password: "",
          msg: response.data.message,
        });
        notifySuccess("Signed up successfully. Please log in");

        navigate("/login");
      } catch (e) {
        setValues({
          ...values,
          msg: e.response.data.message,
          username: "",
          email: "",
          password: "",
        });
        notifyError(e.response.data.message);
      }
    } else if (action === "Log In") {
      try {
        const response = await axios.post(`${urlAuth}/login`, {
          email: values.email,
          password: values.password,
        });
        setValues({
          ...values,
          email: "",
          password: "",
        });
        // Save the token in the localStorage.
        storeToken(response.data.accessToken);
        // Verify the token by sending a request
        // to the server's JWT validation endpoint.
        await authenticateUser();
        notifySuccess("Logged in successfully.");
        navigate("/families");
      } catch (e) {
        setValues({
          ...values,
          email: "",
          password: "",
          msg: e.response.data.message,
        });
        notifyError(e.response.data.message);
      }
    }
  };

  return (
    <>
      <Navbar />
      <main className="page">
        <div className="container">
          <h2>{title}</h2>
          <Box className="form" component="form" autoComplete="off">
            {title === "Sign Up" && (
              <TextField
                required
                id="username"
                label="Username"
                type="text"
                value={values.username}
                sx={{ m: 1, width: "100%" }}
                onChange={handleChange("username")}
              />
            )}
            <TextField
              id="email"
              label="Email"
              type="email"
              value={values.email}
              sx={{ m: 1, width: "100%" }}
              required
              onChange={handleChange("email")}
            />

            <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                id="password"
                required
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                // showPassword icon at the end of the input field
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onSubmit={handleSubmit}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <Button
              className="form-button"
              onClick={() => handleAction(title)}
              variant="contained"
              sx={{ m: 1 }}
            >
              {title === "Sign Up" ? <>Sign Up</> : <>Log In</>}
            </Button>
            <div style={{ marginTop: "0.5rem" }} onClick={handleNavigation}>
              {title === "Sign Up" ? (
                <Link to="/login">Log In</Link>
              ) : (
                <>
                  <span>No account? </span>
                  <Link to="/signup">Sign Up</Link>
                </>
              )}
            </div>
          </Box>
        </div>
      </main>
    </>
  );
};

export default FormAuth;