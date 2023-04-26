import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom"
import { Api } from "./Api";



const Nav = (props) => {
    const nav = useNavigate()
    


    function NavigationClick(type) {
        if (type === 'dashboard') {
            if (props.UserData?.IsAdmin) {
                nav('admin')
            }else  if (props.UserData?.IsAgent) {
                nav('agent')
            }
        } else if (type === 'home') {
            if(props.UserData){
                nav('home')
            }
        }
    }
   
    return (<div className="flex flex-col overflow-hidden   " id="top">
        <div className="w-full h-14 flex bg-slate-700 px-2 sm:px-10  z-50">
            <div className="my-auto cursor-pointer" onClick={() => NavigationClick('home')}>
                <p className="text-lg sm:text-3xl font-medium text-white ">Book<span className="text-red-600 font-semibold">My</span>Parking</p>
            </div>
            <div className="my-auto ml-auto mr-10">
                {(props.UserData?.IsAdmin || props.UserData?.IsAgent) && (<p className="text-lg font-medium cursor-pointer text-white" onClick={() => NavigationClick('dashboard')}>Dashboard</p>)}
            </div>
            <div className=" my-auto flex gap-2 cursor-pointer" onClick={() => nav('/account')}>
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden">
                    <img src={Api + "profilepic?UserID=" + props?.UserData?.UserID + "&FileName=" + props?.UserData?.ProfilePic} alt="" />
                </div>
                <p className="my-auto text-xs sm:text-sm font-medium text-white  ">{props.UserData?.FullName}</p>

            </div>
        </div>
        <div className="w-full h-[calc(100vh-3.5rem)] max-h-[calc(100vh-3.5rem)]">
            <Outlet />
        </div>

    </div>
    )
}
export default Nav