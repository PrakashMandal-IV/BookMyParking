import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom"



const Nav = () => {


    return (<div className="flex flex-col min-h-screen " id="top">
        <div className=""></div>
            <Outlet />

    </div>
    )
}
export default Nav