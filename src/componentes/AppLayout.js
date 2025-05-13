import React from "react";
import { Outlet } from "react-router-dom";
import TelaMenu from "./TelaMenu";
import TelaRodape from "./TelaRodape";

const AppLayout = () =>{

    return(
        <>
<div>
<TelaMenu />
<main className="container">
<Outlet></Outlet>
</main>
<TelaRodape />
</div>
</>
    )
}
export default AppLayout;