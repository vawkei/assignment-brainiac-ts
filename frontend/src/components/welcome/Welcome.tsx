import classes from "./Welcome.module.css";

const Welcome = () => {
  
  return (
    <div className={classes.welcome}>
      <h1>{`Welcome`}</h1>
      <h3>
        You are now tuned in to Something{" "}
        <span style={{ color: "red" }}>Wickedly Wicked</span>.
      </h3>
    </div>
  );
};

export default Welcome;
