import { useEffect, useState } from "react";
import { Api, Get } from "../../components/Api";

const BookParking = () => {
    const [SearchedOrgLists, SetSearchedOrgLists] = useState([])


    const SearchParkings = (e) => {
        e.preventDefault()
        var det = {
            "link": "Customer/searchorg?SearchText=" + e.target[0].value
        }
        Get(det, (res, rej) => {

            SetSearchedOrgLists(res.data)
        }, (err) => {

        });
    }
    return (<>
        <svg className='hidden'>
            <defs>
                <symbol id='svg_search' xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </symbol>
            </defs>
        </svg>
        <div className="max-h-[calc(100vh-3.5rem)] overflow-hidden flex flex-col  ">
            <p className="text-2xl font-semibold text-center mt-5">Book You Parking !!</p>
            <div className="flex w-full  mt-5">
                <div className="mx-auto sm:w-1/4">
                    <form onSubmit={SearchParkings}>
                        <div className="flex  px-4  rounded-md border" >
                            <input type="text" id="SearchParkings" className="  py-2 outline-none" placeholder="Where you want to park ?" />
                            <span className="my-auto ml-auto" id="basic-addon1">
                                <svg width='16' height='16'>
                                    <use xlinkHref='#svg_search'></use>
                                </svg>
                            </span>
                        </div>
                    </form>
                    <p className="text-center mt-1 text-sm ">Start by Selected where you want to go...</p>
                </div>
            </div>
            <div className="flex-grow flex flex-col w-full mt-10">
                <div className="w-full px-2 md:w-4/5 lg:w-3/5 mx-auto">

                    <div className="flex h-[100vh] flex-col gap-5 pr-2 overflow-y-auto scrollbar-thin scroll-smooth  " >
                        {SearchedOrgLists.map((item, idx) => (
                            <div className="" key={idx}>
                                <OrgListCard item={item} />
                            </div>

                        ))}


                    </div>
                </div>
            </div>
        </div>
    </>)
}


export default BookParking


const OrgListCard = (props) => {
    const [isOpen, setIsOpen] = useState(!false); // State to track whether the collapsible div is open or not

    const [InTime, SetInTime] = useState('')
    const [OutTime, SetOutTime] = useState('')
    useEffect(() => {
        SetTime(props.item.InTime, 'in')
        SetTime(props.item.OutTime, 'out')
    }, [props])
    const toggleCollapse = () => {
        setIsOpen(!isOpen); // Function to toggle the collapsible div
    };

    function SetTime(hours, type) {

        var meridiem = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours === 0 ? 12 : hours;
        var timeString = hours + ':00 ' + meridiem;
        if (type === "in") {
            SetInTime(timeString)
        } else {
            SetOutTime(timeString)
        }
    }
    return (
        <>
            <div className="flex gap-2 border hover:border-gray-400 p-2 rounded-md transition-all bg-gray-50 cursor-pointer" onClick={toggleCollapse}>
                <div className="max-w-[35%] sm:max-w-[40%] overflow-hidden flex">
                    <img src={Api + "orgthumb?OrgID=" + props.item.OrganizationID + "&FileName=" + props.item.Thumbnail} className="rounded-md my-auto sm:max-h-52 object-cover pointer-events-none" alt="" />
                </div>
                <div className="flex-grow flex flex-col sm:px-4 py-1 ">
                    <div className="flex">
                        <div className="">
                            <p className="sm:text-2xl font-medium ">{props.item.OrganizationName}</p>
                            <p className="text-[.6rem] sm:text-sm">{props.item.City}, {props.item.State}</p>
                            <p className="text-[.6rem] sm:text-sm">{props.item.Address1}</p>
                        </div>
                    </div>
                    <div className="flex gap-1 mt-auto">
                        <div className="sm:flex flex-col flex-grow mt-auto">
                            <div className="flex">
                                <p className="w-20 text-[.6rem] md:text-sm font-medium">Opens At:</p>
                                <p className="w-1/2 text-[.6rem]  md:text-sm font-normal ">{InTime} </p>
                            </div>
                            <div className="flex">
                                <p className="w-20 text-[.6rem] md:text-sm font-medium">Close At:</p>
                                <p className="w-1/2 text-[.6rem]  md:text-sm font-normal ">{OutTime} </p>
                            </div>
                           
                        </div>
                        <div className="flex-grow flex ml-auto">
                            <p className="text-[.6rem] sm:text-sm ml-auto mt-auto">Available Parking : <span className="text-green-500">10</span></p>
                            {/* <button className="ml-auto px-6 py-2 text-xs md:text-lg bg-green-400 rounded-md text-white hover:bg-green-600  transition-all">
                                Book
                            </button> */}
                        </div>
                    </div>
                </div>
            </div>
            {/* Collapsible Div */}
            <div
                className={`overflow-hidden transition-max-h duration-300 ease-in-out mt-4 bg-gray-100 rounded-md ${isOpen ? 'max-h-40' : 'max-h-0 '
                    }`}
            >
                <ParkingDetailsOnOrg item={props.item}/>
            </div>
            {/* Collapsible Div Toggle Button */}
        </>
    );
};



const ParkingDetailsOnOrg = (props) => {
    const [TimeOptions, SetTimeOptions] = useState([])
    const [SelectedTime, SetSelectedTime] = useState()
    const [IsNewVhicle, SetIsNewVehicle] = useState(false)

    useEffect(() => {
        let timeArray = [];
        let currentTime = new Date();
        let currentHour = currentTime.getHours();
        let currentMinute = currentTime.getMinutes();
        let endTime = props.item.OutTime-1; // 10 PM in 24-hour format

        // If current time is 12 PM, start from 1 PM
        if (currentHour === 12 && currentMinute >= 0) {
            currentHour = 13;
        }

        for (let i = currentHour; i <= endTime; i++) {
            if (i <= 23) {
                let hour = i % 12;
                let amPm = i < 12 ? 'am' : 'pm';
                timeArray.push({ values: (hour === 0 ? 12 : hour) + (amPm === 'am' ? 0 : 12), time: `${hour === 0 ? 12 : hour} ${amPm}` });
            }
        }
        SetTimeOptions(timeArray)
    }, [])


    const ToggleVehicleSelection = (e, item) => {
        if (item === 'NV') {
            SetIsNewVehicle(e.target.checked)
        } else {
            SetIsNewVehicle(!e.target.checked)
        }
    }


    return (<>
        <div className="mt-2 p-2 flex flex-col sm:flex-row">

            <div className="sm:w-2/3 flex flex-col gap-5 ">
                <div className="w-full flex gap-5">
                    <div className="w-1/2 flex flex-col gap-5">
                        <select type="text" id="SearchParkings" className="rounded-md p-2 outline-none" placeholder="Where you want to park ?" onChange={e => SetSelectedTime(parseInt(e.target.value))}>
                            {TimeOptions.map((item, idx) =>
                                <option value={item.value} key={idx}>{item.time}</option>
                            )}
                        </select>





                    </div>
                    <div className="w-1/2 flex  flex-col gap-5">
                        <div className="flex justify-between h-full">
                            <label className="flex items-center space-x-3">
                                <input
                                    type="checkbox" checked={!IsNewVhicle}
                                    onChange={(e) => ToggleVehicleSelection(e, 'EV')}
                                    className="form-checkbox text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                />
                                <span className="text-gray-700 text-xs sm:text-sm">Existing Vehicle</span>
                            </label>
                            <label className="flex items-center space-x-3">
                                <input
                                    type="checkbox"
                                    checked={IsNewVhicle}
                                    onChange={(e) => ToggleVehicleSelection(e, 'NV')}
                                    className="form-checkbox text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                />
                                <span className="text-gray-700 text-xs sm:text-sm">New Vehicle</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="w-full flex gap-5">
                    <div className="w-1/2 flex flex-col gap-5">
                        <select type="text" id="SearchParkings" className="rounded-md p-2 outline-none" placeholder="Vehicle Selector" >

                        </select>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

