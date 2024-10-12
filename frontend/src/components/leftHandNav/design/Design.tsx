import classes from "./Design.module.css";
import TopComponent from "../../topComponent/topComponent/TopComponent";
//import DesignBody from "./designBody/DesignBody";
import TestDesignBody from "./designBody/TestDesignBody";

const Design = () => {
    return ( 
        <div className={classes["design-container"]}>
            <h2>Design</h2>
            <TopComponent />
           
            {/* <DesignBody  /> This was the original,switched to TestDesignBody on 12-Oct-24, 5:00*/}
             
            <TestDesignBody />
        </div>
     );
}
 
export default Design;