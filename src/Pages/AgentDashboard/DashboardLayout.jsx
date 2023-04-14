import { useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { Get } from "../../components/Api"

const AgentDashboardLayout = () => {

    const nav = useNavigate()
    const [OrgData,SetOrgData] = useState(null)

    useEffect(()=>{
        GetOrgDetails()
    },[])
    const GetOrgDetails=()=>{
        var det = {
            "link": "Agent/getOrgData"
        }
        Get(det, (res, rej) => {
           
            SetOrgData(res.data[0])

        }, (err) => {

        });
    }
    return (<>
        <div className="w-full h-full flex">
            <div className="w-64  bg-slate-700">
                <div className="flex flex-col ">
                    <div className=" bg-gray-400 flex">
                        <div className="mx-10 my-10 w-full">
                            <p className="text-center text-lg ">{OrgData?.OrganizationName}</p>
                            <p className="text-center text-sm">{OrgData?.FullName}</p>
                        </div>
                    </div>
                    <div className="text-lg pl-10 text-white font-medium hover:bg-slate-800 py-4 cursor-pointer transition-all" onClick={() => nav('')}>
                        Overview
                    </div>
                    <div className="text-lg pl-10  text-white font-medium hover:bg-slate-800 py-4 cursor-pointer transition-all" onClick={() => nav('manageparking')}>
                        Manage Parking
                    </div>
                    <div className="text-lg pl-10 text-white font-medium hover:bg-slate-800 py-4 cursor-pointer transition-all" onClick={() => nav('finance')}>
                        Finance
                    </div>
                </div>
            </div>
            <div className="flex-grow">
                <Outlet />
            </div>
        </div>
        
    </>)
}

export default AgentDashboardLayout