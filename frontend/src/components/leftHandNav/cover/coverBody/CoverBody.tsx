import classes from "./CoverBody.module.css";
import image from "../../../../assets/tlos1.jpeg";

const CoverBody = () => {
  return (
    <div className={classes["coverBody-container"]}>
      <div className={classes["main-image"]}>
        <img src={image} alt={"The last of us image"} />
      </div>
    </div>
  );
};

export default CoverBody;
