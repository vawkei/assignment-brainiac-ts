// USING REDUX HERE==============================>>

import classes from "./MainNavigation.module.css";
import { FaFigma } from "react-icons/fa6";
import { CiPlay1 } from "react-icons/ci";
import { TbHandThreeFingers } from "react-icons/tb";
import { NavLink, useNavigate } from "react-router-dom";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AddDispatch, RootState } from "../../store/store";
import { logout, RESET_AUTH } from "../../store/auth/authIndex";
import { auth } from "../../firebase/Config";
import { toast } from "react-toastify";
import { authFormActions } from "../../store";

const MainNavigation = () => {
  //A. bringing in TypedUseSelectorHook and useSelector to see if user is loggedIn:
  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
  const { isLoggedIn } = useTypedSelector((state) => state.auth);
  // console.log(isLoggedIn);

  //B. bringing in TypedUseSelectorHook to show mobile login button:
  const { showMobileLogin } = useTypedSelector((state) => state.authForm);
  console.log(showMobileLogin);

  //C. bringing in useDispatch to implement the logout function:
  const dispatch = useDispatch<AddDispatch>();

  const navigate = useNavigate();

  const navDataHandler = (navData: any) => {
    return navData.isActive ? classes.active : "";
  };

  const showMobileLoginHandler = () => {
    dispatch(authFormActions.TOGGLE_MOBILE_BTN());
  };

  // D. this function, hides the form, serts it to false in redux====>>
  const setShowAuthForm = () => {
    dispatch(authFormActions.SHOW_FORM());
  };

  // F. to logout
  const logOutHandler = async () => {
    try {
      await dispatch(logout());

      dispatch(RESET_AUTH());

      // code to sign out from Firebase
      await auth.signOut();

      //after runnin the above, then navigate to home
      navigate("/");

      dispatch(authFormActions.HIDE_MOBILE_LOGIN_BTN());

      //toast.success("User logged out successfully", { position: "top-left" });
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error(`${error}`, { position: "top-left" });
    }
  };

  return (
    <div className={classes["nav-container"]}>
      {/*============== Mobile codes START here========================= */}
      <div className={classes.harmburger} onClick={showMobileLoginHandler}>
        {showMobileLogin ? "X" : "☰"}
      </div>

      {showMobileLogin && (
        <div className={classes["mobileLogin-button"]}>
          <p onClick={isLoggedIn ? logOutHandler : setShowAuthForm}>{`${
            !isLoggedIn ? " Log in or create account" : "Logout"
          }`}</p>
        </div>
      )}
      {/*============== Mobile codes END here========================= */}

      {/*============== FROM HERE DOWNWARDS, DESKTOP========================= */}
      <div className={classes["left-container"]}>
        <NavLink to={"/"} className={navDataHandler}>
          <FaFigma size={50} style={{ borderRadius: "8px", padding: "1rem" }} />
        </NavLink>

        <span>⌄</span>

        <span>
          <TbHandThreeFingers
            style={{ borderRadius: "8px", padding: "1rem" }}
          />
        </span>
      </div>
      <div className={classes["mid-container"]}>
        <h3>Sample Sign Up Page</h3>
        <span className={classes["view-span"]}>View only</span>
        {isLoggedIn && (
          <NavLink to={"/welcome"} className={navDataHandler}>
            <span>Welcome</span>
          </NavLink>
        )}
      </div>
      <div className={classes["left-container"]}>
        {!isLoggedIn && <button onClick={setShowAuthForm}>Login</button>}
        {isLoggedIn && <button onClick={logOutHandler}>Logout</button>}
        <CiPlay1 size={50} style={{ borderRadius: "8px", padding: "1rem" }} />
      </div>
    </div>
  );
};

export default MainNavigation;
