import React from "react";
import classes from "./Search.module.css";
import { RxMagnifyingGlass } from "react-icons/rx";

const Search: React.FC<{
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = (props) => {
  return (
    
    <div className={`${classes.search}`}>
      <RxMagnifyingGlass size={18} className={classes.icon} />
    
      <input
        type="text"
        placeholder="Find..."
        value={props.value}
        onChange={props.onChange}
      />
      
    </div>
  );
};

export default Search;
