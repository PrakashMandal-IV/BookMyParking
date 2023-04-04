import { Outlet, useNavigate } from "react-router-dom"

const AgentDashboardLayout = () => {
    
    const nav = useNavigate()

    return (<>
        <div className="w-full h-full flex">
            <div className="w-60  bg-gray-200">
                <div className="flex flex-col mt-5">
                    <div className="text-lg pl-10 font-medium hover:bg-gray-300 py-4 cursor-pointer" onClick={()=> nav('/agent')}>
                        Overview
                    </div>
                    <div className="text-lg pl-10  font-medium hover:bg-gray-300 py-4 cursor-pointer" onClick={()=> nav('manageparking')}>
                        Manage Parking
                    </div>
                    <div className="text-lg pl-10  font-medium hover:bg-gray-300 py-4 cursor-pointer" onClick={()=> nav('finance')}>
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