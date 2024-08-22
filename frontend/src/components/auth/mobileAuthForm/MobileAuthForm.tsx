import classes from "../AuthForm.module.css";
import figmaSvg from "../../../assets/figma-1-logo-svgrepo-com.svg";
import GoogleSignIn from "../SignInGoogle";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AddDispatch, RootState } from "../../../store/store";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { login, register } from "../../../store/auth/authIndex";
import { authFormActions } from "../../../store";

const MobileAuthForm = () => {
  
  //A. bringing in useDispatch to run the regiter and login function===>>
  const dispatch = useDispatch<AddDispatch>();

  //B. bringing in TypedUseSelectorHook and useSelector for the authentication:
  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
  const { isLoading, isLoggedIn, isSuccess } = useTypedSelector(
    (state) => state.auth
  );
  console.log(isLoggedIn)

  //C. bringing in useNavigator to navigate user to welcome page when loggedIn successfully:
  const navigate = useNavigate();

  //D.   checking if the user already got ann account or not:
  const [haveAccount, setHaveAccount] = useState<boolean>(false);

  const switchAuthModeHandler = () => {
    setHaveAccount((prevState) => !prevState);
  };

  // E. states creation:
  const [enteredEmail, setEnteredEmail] = useState<string>("");
  const [enteredPassword, setEnteredPassword] = useState<string>("");

  // F. updating the stateetsz we createdfor enteredemail and enteredPassword===>>
  const enteredEmailInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEnteredEmail(event.target.value);
  };
  const enteredPasswordInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEnteredPassword(event.target.value);
  };

  const setShowAuthForm = () => {
    dispatch(authFormActions.HIDE_FORM());
  };

  //G. Register and Login Function==============================================>>>
  const submitHandlerMobile = async (event: React.FormEvent) => {
    event.preventDefault();

    if (enteredEmail.trim().length === 0 || enteredPassword.trim().length < 6) {
      console.log("Invalid input");
      toast.error("Please fill out the inputs", { position: "top-left" });
      return;
    }

    try {
      const userData = {
        email: enteredEmail,
        password: enteredPassword,
      };
      console.log(userData);

      //checking to see if the user already has an account or not===>:
      if (!haveAccount) {
        await dispatch(register(userData));
      } else {
        await dispatch(login(userData));
      }
    } catch (error) {
      console.log("error:", error);
      toast.error("Something went wrong", { position: "top-left" });
    }
  };

  //  if user is registered/loggedIn successfully,
  useEffect(() => {
    if (isLoggedIn &&isSuccess) {
      dispatch(authFormActions.HIDE_MOBILE_LOGIN_BTN())
      navigate("/welcome");
    }
  }, [isLoggedIn, isSuccess, navigate,dispatch]);

  return (
    <section className={classes.auth}>
      <form onSubmit={submitHandlerMobile}>

        <div className={classes["close-button"]}>
          <span onClick={setShowAuthForm}> X </span>
        </div>

        {isLoading && <p>Loading...</p>}
        <h1>{haveAccount ? "Login in to Figma" : "Sign in to Figma"}</h1>

        <div className={classes["main-svg"]}>
          <img src={figmaSvg} alt="" style={{ width: 50 }} />
        </div>

        <div className={classes["google-div"]}>
          <button>
            <GoogleSignIn />
          </button>
        </div>

        <div className={classes.or}>
          <p>or</p>
        </div>

        <div className={classes.control}>
          <label>Your Email</label>
          <input
            type="email"
            required
            value={enteredEmail}
            onChange={enteredEmailInputChangeHandler}
          />
        </div>

        <div className={classes.control}>
          <label>Your Password</label>
          <input
            type="password"
            required
            value={enteredPassword}
            onChange={enteredPasswordInputChangeHandler}
          />
        </div>

        <div className={classes.actions}>
          {!isLoading && (
            <button>{haveAccount ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Loading...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}>
            {haveAccount ? "create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default MobileAuthForm;
