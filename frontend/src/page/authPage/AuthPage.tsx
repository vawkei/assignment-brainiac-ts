import classes from "./AuthPage.module.css";
import AuthForm from "../../components/auth/AuthForm";
import ReactDom from "react-dom";

const AuthPage = () => {
  return ReactDom.createPortal(
    <div className={classes.wrapper}>
      <div className={classes["auth-container"]}>
        <AuthForm />
      </div>
    </div>,
    document.getElementById("auth")!
  );
};

export default AuthPage;
