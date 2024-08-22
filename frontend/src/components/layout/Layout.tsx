import React from "react";
import MainNavigation from "./MainNavigation";

const Layout : React.FC<{children:React.ReactNode}> = (props) => {
    return ( 
        <div>
            <MainNavigation />
            <main>{props.children}</main>
        </div>
     );
}
 
export default Layout;