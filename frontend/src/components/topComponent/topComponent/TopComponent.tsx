import classes from "./TopComponent.module.css";
import Card from "../../ui/card/Card";
import { FaFigma } from "react-icons/fa";
import GoogleSignIn from "../../auth/SignInGoogle";
import AuthPage from "../../../page/authPage/AuthPage";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AddDispatch, RootState } from "../../../store/store";
import { authFormActions } from "../../../store";

const TopComponent = () => {

  //A. Bringing in TypedUsedSelectorHook and my darling useSelector to work on states==>>

  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
  const { showForm } = useTypedSelector((state) => state.authForm);
  // console.log(showForm);
  const { isLoggedIn,user } = useTypedSelector((state) => state.auth);
  // console.log(user);
  
  // B. the dispatch here shows the authForm, by setting it to true in redux when clicked
  const dispatch = useDispatch<AddDispatch>();

  const setShowAuthForm = () => {
    dispatch(authFormActions.SHOW_FORM());
  };

  return (
    <div className={classes["topComponent-container"]}>
      {!isLoggedIn ? (
        <>
          <Card className={classes.cardClass}>
            <div className={classes.figmaLogo}>
              <FaFigma color="#F24E1E" size={28} />
            </div>

            <div className={classes.welcome}>
              <h4>Welcome to Figma</h4>
              <p>Create an account to edit and collaborate on file.</p>
            </div>

            <div className={classes.action}>
              <button className={classes.btn}>
                <GoogleSignIn />
              </button>
              <button className={classes.btn} onClick={setShowAuthForm}>
                Signup with email
              </button>
            </div>
          </Card>
        </>
      ) : (
        // <h1>Hello World</h1>
        <h1>{`Hello ${user?.email}` }</h1>
      )}
      {showForm && <AuthPage />}
    </div>
  );
};

export default TopComponent;
