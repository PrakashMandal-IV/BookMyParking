import { useEffect, useState } from "react";

const OverView = () => {
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
                <div className="text-2xl">Overview</div>
                <div className="ml-auto text-lg font-medium">{CurrentDate}</div>
            </div>
        </div>
    </>)
}
export default OverView