import { useEffect, useState } from "react";

const AgentOverView = () => {
    const [CurrentDate, SetCurrentDate] = useState('')
    useEffect(() => {
        const currentDate = new Date();
        SetCurrentDate(formatDate(currentDate))
    }, [])


    function formatDate(date) {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const month = months[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();
        return `${day} ${month}, ${year}`;
    }



    return (<>
        <div className="pl-10 pr-20 pt-5 ">
            <div className="flex h-10">
                <div className="text-xl">Overview</div>
                <div className="ml-auto text-lg font-medium">{CurrentDate}</div>
            </div>
            <div className="flex  justify-between px-32 mt-20">
                <div className=" bg-gray-200 w-80 h-48 rounded-md flex flex-col p-4 ">
                    <p className="text-lg  ">Total Slots</p>
                    <p className="mt-auto ml-auto text-4xl">1</p>
                </div>
                <div className="bg-gray-200 w-80 h-48 rounded-md flex flex-col p-4 ">
                    <p className="text-lg  ">Active Slots</p>
                    <p className="mt-auto ml-auto text-4xl">5</p>
                </div>
                <div className="bg-gray-200 w-80 h-48 rounded-md flex flex-col p-4 ">
                    <p className="text-lg  ">Total Revenue</p>
                    <p className="mt-auto ml-auto text-xl">Rs 5000</p>
                </div>
            </div>
        </div>
    </>)
}
export default AgentOverView