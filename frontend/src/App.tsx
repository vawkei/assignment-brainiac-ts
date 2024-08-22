import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import MainPage from "./page/mainPage/MainPage";
import WelcomePage from "./page/welcomePage/WelcomePage";
import axios from "axios";
import { useEffect } from "react";
import { SET_USER, getLoginStatus } from "./store/auth/authIndex";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AddDispatch, RootState } from "./store/store";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/Config";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  axios.defaults.withCredentials = true;

  //A. bringing in useDispatch:
  const dispatch = useDispatch<AddDispatch>();

  //B. bringing in TypedUseSelectorHook and useSelector:
  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
  const { isLoggedIn } = useTypedSelector((state) => state.auth);
  console.log(isLoggedIn);

  //C. authentication observer in app entry point sothe app can detect if the user is already logged in with google firebase when the app loads.
  useEffect(() => {
    // Set up Firebase authentication observer
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // if the user is signed in, i will send this firebase properties to redux
        dispatch(
          SET_USER({
            uid: user.uid,
            email: user.email || "",
            displayName: user.displayName || "",
            isAuthenticated: true,
            provider: "firebase",
          })
        );
      }
    });

    // Clean up the observer on component unmount, to avoid leaks
    return () => unsubscribe();
  }, [dispatch]);
  

  //D. to check if a user is loggedIn from our server uing jwt cookies.
  useEffect(() => {
    dispatch(getLoginStatus());
  }, [dispatch]);

  return (
    <Layout>
      <ToastContainer />
      <Routes>
        <Route path="/*" element={<MainPage />} />
        {isLoggedIn && <Route path="/welcome" element={<WelcomePage />} />}
      </Routes>
    </Layout>
  );
}

export default App;
