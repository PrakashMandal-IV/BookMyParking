import { useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { Api, Get } from "../../components/Api"

const MyAccountDashboardLayout = (props) => {

    const nav = useNavigate()
    const Logout = () => {
        props.Logout()
    }
    return (<>
        <div className=" w-full h-full flex">
            <div className="w-64  bg-slate-700">
                <div className="flex flex-col h-full">
                    <div className=" bg-slate-500 flex">
                        <div className="mx-10 my-10 w-full">
                            <div className="w-32 h-32 mx-auto mb-2 rounded-full overflow-hidden">
                                <img src={Api + "profilepic?UserID=" + props?.UserData?.UserID + "&FileName=" + props?.UserData?.ProfilePic} alt="" />
                            </div>
                            <p className="text-center text-lg text-white">{props?.UserData?.FullName}</p>
                        </div>
                    </div>
                    <div className="text-lg pl-10 text-white  hover:bg-slate-800 py-4 cursor-pointer transition-all" onClick={() => nav('')}>
                        Account
                    </div>
                    <div className="text-lg pl-10  text-white  hover:bg-slate-800 py-4 cursor-pointer transition-all" onClick={() => nav('bookings')}>
                        Bookings
                    </div>
                    <div className="text-lg pl-10 text-white  hover:bg-slate-800 py-4 cursor-pointer transition-all" onClick={() => nav('vehicles')}>
                        Vehicles
                    </div>
                    <div className="mt-auto  flex gap-2 text-lg justify-around  text-red-500  bg-red-500 hover:bg-red-600 py-4 cursor-pointer transition-all" onClick={() => Logout()}>
                        <p className="my-auto text-white">Logout</p>
                        <div className="">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="w-8 h-8 stroke-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-grow max-h-[calc(100vh-3.5rem)] overflow-y-scroll scrollbar-thin">
                <Outlet />
            </div>

        </div>

    </>)
}

export default MyAccountDashboardLayout