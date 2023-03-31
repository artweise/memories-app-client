import React, { useState, useEffect } from "react";
import axios from "axios";
import { urlAuth } from "../utilities/url";

const AuthContext = React.createContext(null);

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");

  // Function storeToken expects a JWT token as the argument and then stores it in the localStorage
  const storeToken = (token) => {
    localStorage.setItem("accessToken", token);
  };

  const authenticateUser = async () => {
    // Get the stored token from the localStorage
    const storedToken = localStorage.getItem("accessToken");

    // If the token exists in the localStorage
    if (storedToken) {
      try {
        const response = axios.get(`${urlAuth}/verify`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });
        const user = response.data;
        // Update state variables
        setIsLoggedIn(true);
        setIsLoading(false);
        setUser(user);
        setToken(storedToken);
      } catch (error) {
        setIsLoggedIn(false);
        setIsLoading(false);
        setUser(null);
      }
      // We must send the JWT token in the request's "Authorization" Headers

      // axios
      //   .get(`${urlAuth}/verify`, {
      //     headers: { Authorization: `Bearer ${storedToken}` },
      //   })
      //   .then((response) => {
      //     // If the server verifies that JWT token is valid
      //     const user = response.data;
      //     // Update state variables
      //     setIsLoggedIn(true);
      //     setIsLoading(false);
      //     setUser(user);
      //   })
      // .catch((error) => {
      //   // If the server sends an error response (invalid token)
      //   // Update state variables
      //   setIsLoggedIn(false);
      //   setIsLoading(false);
      //   setUser(null);
      // });
    } else {
      // If the token is not available (or is removed)
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
    }
  };

  const removeToken = () => {
    // Upon logout, remove the token from the localStorage
    localStorage.removeItem("accessToken");
  };

  const logOutUser = () => {
    // To log out the user, remove the token
    removeToken();
    // and update the state variables
    authenticateUser();
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        storeToken,
        authenticateUser,
        logOutUser,
        token,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };
