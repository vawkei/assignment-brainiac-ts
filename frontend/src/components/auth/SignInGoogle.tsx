// import { auth } from "../../firebase/Config";
// import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// export const signInGoogle = async () => {
//   const provider = new GoogleAuthProvider();
//   provider.setCustomParameters({ prompt: "select_account" });
//   try {
//     const resultsFromGoogle = await signInWithPopup(auth, provider);
//     console.log(resultsFromGoogle);
//     const user = resultsFromGoogle.user;
//     console.log(user)
//     if (!user.emailVerified) {
//       return console.log("Please log in with a verified email");
//     };
//     const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/google`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         name: user.displayName,
//         email: user.email,
//       }),
//     });
//     console.log("Response here:",response)

//     if (!response.ok) {
//       const errorText = await response.text();
//       console.log("Response error:", errorText);
//       return console.log("Something went wrong");
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// trying to convert it into a component instead of a function

import { auth } from "../../firebase/Config";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import classes from "./SignInGoogle.module.css";


import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AddDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import { authFormActions } from "../../store";

const GoogleSignIn = () => {


  //A. bringing in useNavigator to push the user to welcome page when loggedIn:
  const navigate = useNavigate();

    //B. bringing in useDispatch to help hide the form when logged in successfully:
    const dispatch = useDispatch<AddDispatch>();

  //C. function to run log in with google=========================================>>:
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      console.log(resultsFromGoogle);
      const user = resultsFromGoogle.user;
      console.log(user);

      if (!user.emailVerified && !user.uid) {
        return console.log("Please log in with a verified email");
      }

      //i coded it to send some user data we get from firebase to my nodejs server
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/google`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: user.displayName,
            email: user.email,
          }),
        }
      );
      console.log("Response here:", response);

      if (!response.ok) {
        const errorText = await response.text();
        console.log("Response error:", errorText);
        return console.log("Something went wrong");
      }

      navigate("/welcome");
      dispatch(authFormActions.HIDE_FORM())
      dispatch(authFormActions.HIDE_MOBILE_LOGIN_BTN())

      toast.success("LoggedIn successfully with Google", { position: "top-left" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes["google-comp"]}>
      <span onClick={handleGoogleSignIn}>
        <FcGoogle size={18} />
        <span>Continue with Google</span>
      </span>
    </div>
  );
};

export default GoogleSignIn;
