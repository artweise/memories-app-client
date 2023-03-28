import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home/Home";
import FormAuth from "./pages/SignupLogin/SignupLogin";
import Families from "./pages/Families/Families";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      {/* <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      /> */}
      <Routes>
        <Route path="/" element={<Home title={"Home"} />} />
        <Route path="/signup" element={<FormAuth title={"Sign Up"} />} />
        <Route path="/login" element={<FormAuth title={"Log In"} />} />
        <Route path="/families" element={<Families title={"Log In"} />} />
      </Routes>
    </div>
  );
};

export default App;
