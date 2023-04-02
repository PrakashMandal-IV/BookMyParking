import { Outlet } from "react-router-dom"

const AdminDashboardLayout = () => {
    return (<>
        <div className="w-full h-full flex">
            <div className="w-60  bg-gray-200">
                <div className="flex flex-col mt-5">
                    <div className="text-xl pl-10 font-medium hover:bg-gray-300 py-4">
                        Overview
                    </div>
                    <div className="text-xl pl-10  font-medium hover:bg-gray-300 py-4">
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