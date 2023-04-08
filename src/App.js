import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";
import Home from "./pages/Home/Home";
import FormAuth from "./pages/SignupLogin/SignupLogin";
import Families from "./pages/Families/Families";
import "react-toastify/dist/ReactToastify.css";
import Memories from "./pages/Memories/Memories";

const App = () => {
  return (
    <div className="App">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        <Route path="/" element={<Home title={"Home"} />} />
        <Route
          path="/signup"
          element={
            <IsAnon>
              <FormAuth title={"Sign Up"} />
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            // <IsAnon>
            <FormAuth title={"Log In"} />
            // </IsAnon>
          }
        />
        <Route
          path="/families"
          element={
            <IsPrivate>
              <Families />
            </IsPrivate>
          }
        />
        <Route
          path="/memories/:familyId"
          element={
            <IsPrivate>
              <Memories />
            </IsPrivate>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
