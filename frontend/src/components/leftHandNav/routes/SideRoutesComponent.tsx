import { Route, Routes } from "react-router-dom";
import NavBar from "../navbar/NavBar";
import classes from "./SideRoutesComponent.module.css";
import Design from "../design/Design";
import Cover from "../cover/Cover";
import { array } from "../design/DesignData";


const SideRoutesComponent = () => {


  //A. Handling the Array items===================================>>:
  
  // here i want 2 create a new Set object containing unique title extracted from the array imported from cover/CoverData, and this Set is then assigned as the only element in the array.it's used for multies though, but used it here.

  let allItems: string[];
  allItems = [
    "RESET",
    ...new Set(
      array.map((item) => {
        return item.title;
      })
    ),
  ];
  // console.log(allItems);



  return (
    <div className={classes.routes}>
      <div className={classes["nav-bar"]}>
        <NavBar
          items={allItems}
        />
      </div>

      <div className={classes.content}>
        <Routes>
          <Route path="/" element={<Design />} />
          <Route path="/cover" element={<Cover />} />
        </Routes>
      </div>
    </div>
  );
};

export default SideRoutesComponent;
