//import classes from "./DesignBody.module.css";
import classes from "./TestDesignBody.module.css";
import { array } from "../DesignData";
import { RootState } from "../../../../store/store";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import Search from "../../../ui/search/Search";
import React, { useState } from "react";

const TestDesignBody = () => {
  //A. Bringing in TypedUsedSelectorHook and my darling useSelector to work on states==>>
  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
  const { listState } = useTypedSelector((state) => state.list);
  console.log(listState);

  //A. Handling the Search=======================================================>>:
  //here i am am filtering the array.
  const [search, setSearch] = useState<string>("");

  const items = array;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const filteredItems = items.filter((item) => {
    return item.title.toLocaleLowerCase().includes(search.toLowerCase());
  });

  // B. displaying the items===================================================>>
  // only for mobile will the search functionality work on
  const arrayItems = (
    <ul className={classes["grid-container"]}>
      {/* {array.map((item, index) => { */}
      {filteredItems.length > 0 ? (
        filteredItems.map((item, index) => {
          return (
            <div key={index} className={classes[`item-${index + 1}`]}>
              <li>{item.title}</li>

              <div className={classes["main-image"]}>
                <img
                  src={item.image}
                  alt={item.title}
                  className={
                    listState === item.title ? classes.activeItemClass : ""
                  }
                />
              </div>
            </div>
          );
        })
      ) : (
        <div className={classes.notFound}>
          <p>Item not found</p>
        </div>
      )}
    </ul>
  );

  return (
    <div className={classes["coverBody-container"]}>
      <div className={classes.search}>
        <Search value={search} onChange={handleSearchChange} />
      </div>
      <div>{arrayItems}</div>
    </div>
  );
};

export default TestDesignBody;
