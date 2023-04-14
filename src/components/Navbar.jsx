import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom"



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
            nav('home')
        }
    }
    const Logout=()=>{
      props.Logout()
    }
    return (<div className="flex flex-col min-h-screen  " id="top">
        <div className="w-full h-14 flex bg-slate-700 px-2 sm:px-10  z-50">
            <div className="my-auto cursor-pointer" onClick={() => NavigationClick('home')}>
                <p className="text-lg sm:text-3xl font-medium text-white ">Book<span className="text-red-600 font-semibold">My</span>Parking</p>
            </div>
            <div className="my-auto ml-auto mr-10">
                {(props.UserData?.IsAdmin || props.UserData?.IsAgent) && (<p className="text-lg font-medium cursor-pointer text-white" onClick={() => NavigationClick('dashboard')}>Dashboard</p>)}
            </div>
            <div className=" my-auto flex gap-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden">
                    <img src="https://i.pinimg.com/564x/d9/7b/bb/d97bbb08017ac2309307f0822e63d082.jpg" alt="" />
                </div>
                <p className="my-auto text-xs sm:text-sm font-medium text-white  ">{props.UserData?.FullName}</p>
                <div className="my-auto" onClick={Logout}>
                   

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                    </svg>


                </div>

            </div>
        </div>
        <div className="w-full h-[calc(100vh-3.5rem)]">
            <Outlet />
        </div>

    </div>
    )
}
export default Nav