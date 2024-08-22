import { NavLink, useLocation } from "react-router-dom";
import classes from "./NavBar.module.css";
import React, { useEffect, useState } from "react";
import Search from "../../ui/search/Search";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AddDispatch, RootState } from "../../../store/store";
import { listActions } from "../../../store";

const NavBar: React.FC<{
  items: string[];
}> = (props) => {

  //A. bringing in useDispatch:
  const dispatch = useDispatch<AddDispatch>();

  // B. Handling the showItem with the url=========================================>>:
  //here i am trying to show the navbaritems dynamically, the items appear only when the url path is === "/".
  const [showItem, setShowItems] = useState<boolean>(true);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setShowItems(true);
    } else {
      setShowItems(false);
    }
  }, [location.pathname]);

  //C. Bringing in TypedUsedSelectorHook and my darling useSelector to work on states==>>
  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
  const { listState } = useTypedSelector((state) => state.list);
  console.log(listState);

  //D. Handling the Search=======================================================>>:
  //here i am am filtering the navbaritems. nothing serious here.
  const [search, setSearch] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const items = props.items;
  console.log(items);
  console.log(search);

  const filteredItems = items.filter((item) => {
    return item.toLocaleLowerCase().includes(search.toLocaleLowerCase());
  });

  //E. useDispatch function to update the list state and save it in redux=====>>
  const onSetListStateHandler = (itemName: string) => {
    dispatch(listActions.SET_LISTSTATE_HANDLER({ listState: itemName }));
    //when a user clicks on an item, the item is save in the aguement and passed to the parameter in the function, which sends it to redux store.
  };

  const navDataHandler = (navData: any) => {
    return navData.isActive ? classes.activeNav : "";
  };

  return (
    <div className={classes["nav-container"]}>
      <div className={classes.top}>
        <Search value={search} onChange={handleSearchChange} />
      </div>
      <hr style={{ width: "100%" }} />
      <h6>Pages</h6>
      <nav>
        <ul>
          <li>
            <NavLink to={"/"} className={navDataHandler}>
              Design
            </NavLink>
          </li>

          <li>
            <NavLink to={"/cover"} className={navDataHandler}>
              Cover
            </NavLink>
          </li>
          {showItem ? (
            <div className={classes.items}>
              {filteredItems.map((item, index) => {
                return (
                  <p
                    key={index}
                    className={`${classes.item} ${
                      listState === item ? classes.active : ""
                    }`}
                    onClick={() => onSetListStateHandler(item)}>
                    {item}
                  </p>
                );
              })}
            </div>
          ) : (
            ""
          )}
        </ul>
      </nav>
      <hr style={{ width: "100%" }} />
    </div>
  );
};

export default NavBar;
