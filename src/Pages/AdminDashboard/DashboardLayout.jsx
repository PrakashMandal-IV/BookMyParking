import { Outlet, useNavigate } from "react-router-dom"

const AdminDashboardLayout = () => {
    
    const nav = useNavigate()

    return (<>
        <div className="w-full h-full flex">
            <div className="w-64   bg-gray-200">
                <div className="flex flex-col mt-5">
                    <div className="text-lg pl-10 font-medium hover:bg-gray-300 py-4 cursor-pointer" onClick={()=> nav('/admin')}>
                        Overview
                    </div>
                    <div className="text-lg pl-10  font-medium hover:bg-gray-300 py-4 cursor-pointer" onClick={()=> nav('organization')}>
                        Organization
                    </div>
                </div>
            </div>
            <div className="flex-grow">
                <Outlet />
            </div>
        </div>
    </>)
}
export default AdminDashboardLayout