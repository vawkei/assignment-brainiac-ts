import classes from "./Welcome.module.css";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import {  RootState } from "../../store/store";

const Welcome = () => {
  // Bringing in TypedUsedSelectorHook and my darling useSelector to work on states==>>

  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
  const { user } = useTypedSelector((state) => state.auth);
//   console.log(user);



const nameSplit:any = user?.email.split("@");
let name = nameSplit[0];
console.log(name)

  return (
    <div className={classes.welcome}>
      <h1>{`Welcome ${name}`}</h1>
      <h3>
        You are now tuned in to Something{" "}
        <span style={{ color: "red" }}>Wickedly Wicked</span>.
      </h3>
    </div>
  );
};

export default Welcome;
