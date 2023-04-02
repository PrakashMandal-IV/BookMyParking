import { useEffect, useState } from "react";

const Organization = () => {
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


    function SearchFunc(e) {
        e.preventDefault()
    }
    return (<>
        <svg className='hidden'>
            <defs>
                <symbol id='svg_search' xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </symbol>
                <symbol id='svg_calendar_check' xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                </symbol>
            </defs>
        </svg>
        <div className="pl-10 pr-20 pt-5 ">
            <div className="flex h-10">
                <div className="text-xl">Organization</div>
                <div className="ml-auto text-lg font-medium">{CurrentDate}</div>
            </div>
            <div className=" px-32 mt-10">
                <div className="flex ">
                    <form onSubmit={SearchFunc}>
                        <div className="flex border px-2  rounded-md">
                            <input type="text" name="Org_Search" className="  py-2 outline-none" placeholder="Search.." />
                            <span className="my-auto" id="basic-addon1">
                                <svg width='16' height='16'>
                                    <use xlinkHref='#svg_search'></use>
                                </svg>
                            </span>
                        </div>
                    </form>
                    <div className="ml-auto">
                        <div className="bg-gray-200 w-10 h-10 rounded-md flex hover:bg-gray-300 transition-all cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="m-auto w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-10  px-32">
                        <table className="w-full">
                             <thead className="flex py-2 bg-gray-200">
                                  <td className="flex-grow text-center">S.No</td>
                                  <td className="flex-grow text-center">Name</td>
                                  <td className="flex-grow text-center">Parking Slots</td>
                                  <td className="flex-grow text-center">Active Slots</td>
                                  <td className="flex-grow text-center">Total Revenue</td>
                                  <td className="flex-grow text-center">Location</td>
                                  <td className="flex-grow text-center">Status</td>
                                  <td className="flex-grow text-center">Remove</td>
                             </thead>
                        </table>
            </div>
        </div>
    </>)
}
export default Organization