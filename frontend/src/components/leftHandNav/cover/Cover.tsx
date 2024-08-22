import classes from "./Cover.module.css"
import TopComponent from "../../topComponent/topComponent/TopComponent";
import CoverBody from "./coverBody/CoverBody";

const Cover = () => {
    return ( 
        <div  className={classes["cover-container"]}>
            <h2>Cover</h2>
            <TopComponent />
            <CoverBody />
        </div>
     );
}
 
export default Cover;