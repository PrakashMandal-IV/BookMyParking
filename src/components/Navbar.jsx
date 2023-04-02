import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom"



const Nav = (props) => {
 const nav = useNavigate()



function NavigationClick(type){
   
     if(type==='dashboard'){
        if(props.UserData?.IsAdmin){
            nav('/admin')
        }
     }else if(type==='home'){
        nav('/home')
     }
}
    return (<div className="flex flex-col min-h-screen " id="top">
        <div className="w-full h-14 flex bg-gray-200 px-10">
            <div className="my-auto cursor-pointer" onClick={()=>NavigationClick('home')}>
                <p className="text-3xl font-medium  ">Park<span className="text-blue-600">Mate</span></p>
            </div>
            <div className="my-auto ml-auto mr-10">
                {(props.UserData?.IsAdmin || props.UserData?.IsAgent) && (<p className="text-lg font-medium cursor-pointer" onClick={()=>NavigationClick('dashboard')}>Dashboard</p>)}
            </div>
            <div className=" my-auto flex gap-2">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img src="https://i.pinimg.com/564x/d9/7b/bb/d97bbb08017ac2309307f0822e63d082.jpg" alt="" />
                </div>
                <p className="my-auto text-lg font-medium ">User Name</p>
                <div className="my-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
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