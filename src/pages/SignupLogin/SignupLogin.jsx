import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
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

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ToastContainer, toast } from "react-toastify";

import Navbar from "../../components/Navbar/Navbar";
import { url } from "../../utilities/url";

import "./style.css";

const FormAuth = ({ title }) => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    showPassword: false,
    msg: "",
  });

  const navigate = useNavigate();
  const { storeToken } = useContext(AuthContext);

  //   const notify = () => toast("Wow so easy !");

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
        let response = await axios.post(
          `${url}/signup`,
          {
            username: values.username,
            email: values.email,
            password: values.password,
          }
          //   {
          //     withCredentials: true,
          //     headers: {
          //       "Access-Control-Allow-Origin": "*",
          //       "Content-Type": "application/json",
          //     },
          //   }
        );
        setValues({
          ...values,
          username: "",
          email: "",
          password: "",
          msg: response.data.msg,
        });
        // notify();
        // toast.success(response.data.msg, {
        //   icon: "🧸",
        // });

        navigate("/login");
      } catch (e) {
        setValues({
          ...values,
          msg: e.response.data.msg,
          username: "",
          email: "",
          password: "",
        });
        toast.error(e.response.data.msg, {
          icon: "😳",
        });
      }
    } else if (action === "Log In") {
      try {
        const response = await axios.post(
          `${url}/login`,
          {
            email: values.email,
            password: values.password,
          }
          //   {
          //     // The headers property specifies the HTTP headers
          //     //  to include in the request. In this case,
          //     // the headers include "Access-Control-Allow-Origin": "*",
          //     // which sets the allowed origin domain to any domain,
          //     // and "Content-Type": "application/json",
          //     // which specifies that the request payload is in JSON format.
          //     withCredentials: true,
          //     headers: {
          //       "Access-Control-Allow-Origin": "*",
          //       "Content-Type": "application/json",
          //     },
          //   }
        );
        setValues({
          ...values,
          email: "",
          password: "",
        });
        // localStorage.setItem("accessToken", response.data.accessToken);
        storeToken(response.data.accessToken);
        console.log("JWT token", response);
        navigate("/families");
      } catch (e) {
        setValues({
          ...values,
          email: "",
          password: "",
          msg: e.response.data.msg,
        });
        toast.error(e.response.data.msg, {
          icon: "🥺",
        });
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
