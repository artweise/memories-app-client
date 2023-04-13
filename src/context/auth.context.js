import React, { useState, useEffect, useCallback } from "react";
import { QueryCache } from "react-query";
import axios from "axios";

// const urlAuth = process.env.REACT_APP_PROD_SERVER_AUTH;

const urlAuth =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PROD_SERVER_AUTH
    : process.env.REACT_APP_DEV_SERVER_AUTH;

const AuthContext = React.createContext(null);

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");

  const queryCache = new QueryCache();

  // Function storeToken expects a JWT token as the argument and then stores it in the localStorage
  const storeToken = (token) => {
    localStorage.setItem("accessToken", token);
  };

  const removeToken = () => {
    // Upon logout, remove the token from the localStorage
    localStorage.removeItem("accessToken");
  };

  const clearState = () => {
    setIsLoggedIn(false);
    setIsLoading(false);
    setToken("");
    setUser(null);
    queryCache.clear();
  };

  const logOutUser = () => {
    // To log out the user, remove the token
    removeToken();
    // and update the state variables
    clearState();
  };

  const authenticateUser = useCallback(async () => {
    // Get the stored token from the localStorage
    const storedToken = localStorage.getItem("accessToken");

    // If the token exists in the localStorage
    if (storedToken) {
      try {
        const response = await axios.get(`${urlAuth}/verify`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });
        const user = response.data;
        // Update state variables
        setIsLoggedIn(true);
        setIsLoading(false);
        setUser(user);
        setToken(storedToken);
      } catch (error) {
        removeToken();
        clearState();
      }
    } else {
      // If the token is not available (or is removed)
      clearState();
    }
  }, []);

  useEffect(() => {
    const asyncAuthenticate = async () => {
      await authenticateUser();
    };
    asyncAuthenticate();
  }, [authenticateUser]);

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
