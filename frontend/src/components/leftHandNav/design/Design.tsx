import classes from "./Design.module.css";
import TopComponent from "../../topComponent/topComponent/TopComponent";
import DesignBody from "./designBody/DesignBody";

const Design = () => {
    return ( 
        <div className={classes["design-container"]}>
            <h2>Design</h2>
            <TopComponent />
            <DesignBody  />
        </div>
     );
}
 
export default Design;