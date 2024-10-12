import React, { useEffect, useState } from "react";
import classes from "./AuthForm.module.css";
import GoogleSignIn from "./SignInGoogle";
import { AddDispatch, RootState } from "../../store/store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { login, register } from "../../store/auth/authIndex";
import { useNavigate } from "react-router-dom";
import { authFormActions } from "../../store";
import { toast } from "react-toastify";

import { useMediaQuery } from "react-responsive";
import MobileAuthForm from "./mobileAuthForm/MobileAuthForm";

const AuthForm = () => {
  
  //A. bringing in useDispatch to set showForm to false in redux when X is clicked:
  const dispatch = useDispatch<AddDispatch>();

  const setShowAuthForm = () => {
    dispatch(authFormActions.HIDE_FORM());
  };

  //B. bringing in TypedUseSelectorHook and useSelector for the authentication:
  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
  const { isLoading, isLoggedIn, isSuccess, message } = useTypedSelector(
    (state) => state.auth
  );

  //C. bringing in useNavigator to navigate user to welcome page when loggedIn successfully:
  const navigate = useNavigate();

  const [haveAccount, setHaveAccount] = useState<boolean>(false);

  const switchAuthModeHandler = () => {
    setHaveAccount((prevState) => !prevState);
  };

  const [enteredEmail, setEnteredEmail] = useState<string>("");
  const [enteredPassword, setEnteredPassword] = useState<string>("");
//  const [serverMessage, setServerMessage] = useState<string>("");

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

  // D. using the useMediaQuery to code a different authForm for mobile browsers:
  const isMobile = useMediaQuery({ maxWidth: 760 });

  //E. Register and Login Function==============================================>>>
  const submitHandler = async (event: React.FormEvent) => {
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
      console.log("name:", enteredEmail, "password:", enteredPassword);
    } catch (error) {
      console.log("error:", error);
      // toast.error(message || "Something went wrong", { position: "top-left" });
      // setServerMessage(message);
    }
  };



  //if user is registered/loggedIn successfully, he gets navigated to welcome page and the authform gets hidden:
  useEffect(() => {
    if (isLoggedIn && isSuccess) {
      dispatch(authFormActions.HIDE_FORM());
      navigate("/welcome");
    }
  }, [isLoggedIn, isSuccess, message, dispatch]);

  return (
    <div>
      {!isMobile ? (
        <section className={classes.auth}>
          {isLoading && <p>Loading...</p>}
          <p style={{color:"red"}}>{message}</p>
          <h1>{haveAccount ? "Login" : "Sign Up"}</h1>

          <form action="" onSubmit={submitHandler}>
            <div className={classes["close-button"]}>
              <span onClick={setShowAuthForm}> X </span>
            </div>

            <div className={classes.heading}>
              <h1>Create an account to collaborate on "Sample Sign Up Page"</h1>
            </div>

            <div className={classes["google-div"]}>
              <button>
                <GoogleSignIn />
              </button>
            </div>

            <div className={classes.control}>
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                id="email"
                required
                value={enteredEmail}
                onChange={enteredEmailInputChangeHandler}
              />
            </div>

            <div className={classes.control}>
              <label htmlFor="password">Your Password</label>
              <input
                type="password"
                id="password"
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
                {haveAccount
                  ? "create new account"
                  : "Login with existing account"}
              </button>
            </div>
          </form>
        </section>
      ) : (
        <section>
          <MobileAuthForm/>
        </section>
      )}
    </div>
  );
};

export default AuthForm;
