import { useEffect, useState } from "react";
import { Api, Get, Post } from "../../components/Api";
import useRazorpay from "react-razorpay";
import { useNavigate } from "react-router-dom";
import StarRatings from "react-star-ratings";

const BookParking = () => {
    const [SearchedOrgLists, SetSearchedOrgLists] = useState([])
    const [UserVehicles, SetUserVehicles] = useState([])
    useEffect(() => {
        GetUserVhiclesList()
    }, [])
    const GetUserVhiclesList = () => {
        var det = {
            "link": "Customer/vehiclelist"
        }
        Get(det, (res, rej) => {
            SetUserVehicles(res.data)
        }, (err) => {

        });
    }
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
            <p className="text-2xl font-semibold text-center mt-5">Book Your Parking !!</p>
            <div className="flex w-full  mt-5">
                <div className="mx-auto sm:w-1/4">
                    <form onSubmit={SearchParkings}>
                        <div className="flex   rounded-md border" >
                            <input type="text" id="SearchParkings" className=" w-full px-4 focus:bg-none py-2 outline-none" placeholder="Where you want to park ?" />
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
            <div className="flex-grow flex flex-col w-full mt-10 overflow-y-auto scrollbar-thin scroll-smooth ">
                <div className="w-full px-2 md:w-4/5 lg:w-3/5 mx-auto">

                    <div className="flex flex-col gap-5 pr-2  " >
                        {SearchedOrgLists.map((item, idx) => (
                            <div className="" key={idx}>
                                <OrgListCard item={item} VList={UserVehicles} />
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

    const [isOpen, setIsOpen] = useState(false); // State to track whether the collapsible div is open or not

    const [InTime, SetInTime] = useState('')
    const [OutTime, SetOutTime] = useState('')
    useEffect(() => {
        SetTime(props.item.InTime, 'in')
        SetTime(props.item.OutTime, 'out')
        // setIsOpen(false)
    }, [props])
    const toggleCollapse = () => {

        var time = new Date()
        if (props.item.OutTime <= time.getHours() && props.item.InTime >= time.getHours()) {
            setIsOpen(false);
        } else {
            setIsOpen(!isOpen);
        }


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
            <div className="flex gap-2 border hover:border-gray-400 p-2 rounded-md transition-all bg-gradient-to-b from-slate-600 to-slate-500  cursor-pointer" onClick={toggleCollapse}>
                <div className="max-w-[35%] sm:max-w-[40%] overflow-hidden flex">
                    <img src={Api + "orgthumb?OrgID=" + props.item.OrganizationID + "&FileName=" + props.item.Thumbnail} className="rounded-md my-auto sm:max-h-52 object-cover pointer-events-none" alt="" />
                </div>
                <div className="flex-grow flex flex-col sm:px-4 py-1 text-white">
                    <div className="flex">
                        <div className="">
                            <p className="sm:text-2xl font-medium ">{props.item.OrganizationName}</p>
                            <p className="text-[.6rem] sm:text-sm">{props.item.City}, {props.item.State}</p>
                            <p className="text-[.6rem] sm:text-sm">{props.item.Address1}</p>
                        </div>
                        <div className="ml-auto">

                            <StarRatings
                                rating={props?.item?.AverageRating}
                                starDimension="25px"
                                starRatedColor="#0f172a"
                                starHoverColor="#1e293b"
                                numberOfStars={5}
                                name='User Rating'
                            />
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
                            <p className="text-[.6rem] sm:text-sm ml-auto mt-auto">Available Parking : <span className="text-yellow-300 font-semibold">{props.item.AvailableSlots}</span></p>
                            {/* <button className="ml-auto px-6 py-2 text-xs md:text-lg bg-green-400 rounded-md text-white hover:bg-green-600  transition-all">
                                Book
                            </button> */}
                        </div>
                    </div>
                </div>
            </div>
            {/* Collapsible Div */}
            <div
                className={`overflow-hidden transition-max-h duration-300 ease-in-out mt-4  bg-gradient-to-t from-slate-600 to-slate-500  rounded-md ${isOpen ? 'max-h-[50rem]' : 'max-h-0 '
                    }`}
            >
                {isOpen && (<ParkingDetailsOnOrg item={props.item} VList={props.VList} />)}
            </div>
            {/* Collapsible Div Toggle Button */}
        </>
    );
};



const ParkingDetailsOnOrg = (props) => {
    const nav = useNavigate()
    const [TimeOptions, SetTimeOptions] = useState([])
    const [SelectedTime, SetSelectedTime] = useState('')
    const [IsNewVhicle, SetIsNewVehicle] = useState(false)
    const [PricingList, SetPricingList] = useState([])
    const [VtypeID, SetVTypeID] = useState('')

    const [SelectedCarNumber, SetSelectedCarNumber] = useState('')
    const [SelectedCarName, SetSelectedCarName] = useState('')
    const [SaveVhicle, SetSaveVhicle] = useState(true)
    const [Loading, setLoading] = useState(false)
    const Razorpay = useRazorpay();
    useEffect(() => {
        GetPricingDetails()

        // Get the start time and end time from props
        const startTime = props.item.InTime;
        const endTime = props.item.OutTime;

        // Create a new Date object with the current date
        const currentDate = new Date();

        // Get the current hour
        const currentHour = currentDate.getHours();

        // Create an empty array to store the objects with time values and corresponding times
        const timeArray = [];

        // Loop through each hour from 0 to 23
        for (let i = 0; i < 24; i++) {
            // Calculate the time value by adding the loop index to the start time
            const timeValue = startTime + i;

            // Skip the hours that have already passed
            if (timeValue > currentHour) {
                // Calculate the corresponding time in 12-hour format
                const timeIn12HourFormat = (timeValue % 12) === 0 ? 12 : (timeValue % 12);

                // Determine whether it's AM or PM
                const amOrPm = timeValue < 12 ? 'AM' : 'PM';

                // Create an object with time value and corresponding time in 12-hour format
                const timeObject = {
                    value: timeValue % 24, // Use modulo operator to wrap around to 0 after 23
                    time: `${timeIn12HourFormat} ${amOrPm}`
                };

                // Add the time object to the array
                timeArray.push(timeObject);

                // Check if the time value exceeds the end time, and break out of the loop if it does
                if (timeValue >= endTime) {
                    break;
                }
            }
        }
        timeArray.pop()

      
        SetTimeOptions(timeArray);
        SetSelectedTime(timeArray[0]?.value);



    }, [])
    function calculateHourDifference(currentHour, endTime) {
        // Convert currentHour and endTime to minutes
        let currentMinutes = currentHour * 60;
        let endMinutes = endTime * 60;

        // If endTime is earlier than currentHour, add 24 hours (1440 minutes)
        if (endMinutes < currentMinutes) {
            endMinutes += 1440;
        }

        // Calculate the hour difference in minutes
        let minuteDifference = endMinutes - currentMinutes;

        // Convert minute difference to hours
        let hourDifference = Math.floor(minuteDifference / 60);

        return hourDifference;
    }

    async function GetPricingDetails() {
        var det = {
            "link": "Customer/getparkingstatusoforg?OrgID=" + props.item.OrganizationID
        }
        Get(det, (res, rej) => {

            SetPricingList(res.data.Table)
        }, (err) => {

        });
    }

    const ToggleVehicleSelection = (e, item) => {
        if (item === 'NV') {
            SetIsNewVehicle(e.target.checked)
            SetVTypeID('')
            SetSelectedCarName('')
            SetSelectedCarNumber('')
        } else {
            SetIsNewVehicle(!e.target.checked)
        }
    }

    const MakePayment = async () => {
        setLoading(true)
        var det = {
            "link": "Customer/getOrderID?Amount=" + PricingList.filter(i => i.VTypeID === VtypeID)[0]?.Price
        }
        Get(det, (res, rej) => {

            openRazorpayGateway(res.data.OrderID, res.data.RazorPayID)
            setLoading(false)
        }, (err) => {

        });

    }
    const VehcalSelectionHandeler = (id) => {
        var List = props.VList.filter(i => i.VehicalID === id)[0]
        if (List) {
            SetVTypeID(List.VehicalType)

            SetSelectedCarNumber(List.VehicalNumber)
            SetSelectedCarName(List.VehicalName)
        } else {
            SetVTypeID('')
            SetSelectedCarName('')
            SetSelectedCarNumber('')
        }
    }



    const handlePaymentSuccess = (paymentResponse) => {

        console.log('Payment success:', paymentResponse);
        var Data = {
            "orderID": paymentResponse.razorpay_order_id,
            "paymentID": paymentResponse.razorpay_payment_id,
            "signature": paymentResponse.razorpay_signature,
            "orgID": props.item.OrganizationID,
            "vTypeID": VtypeID,
            "vNumber": SelectedCarNumber,
            "vName": SelectedCarName,
            "amount": PricingList.filter(i => i.VTypeID === VtypeID)[0]?.Price,
            "bookTime": SelectedTime,
            "addVehicale": (IsNewVhicle ? SaveVhicle : false)
        }
        CreateBooking(Data)
    };
    const openRazorpayGateway = (orderId, Key) => {
        const razorpayOptions = {
            key: Key,
            amount: 1000, // Replace with the amount you want to charge
            order_id: orderId, // Use the received order ID from the state
            name: 'BOOKMYPARKING',
            description: 'Parking reservation',
            image: 'https://i.pinimg.com/564x/78/ff/57/78ff579622be4e58efa8ef3d5bdd3301.jpg', // Replace with your company logo URL
            handler: handlePaymentSuccess,
            prefill: {
                name: 'John Doe', // Replace with customer's name
                email: 'john.doe@example.com', // Replace with customer's email
                contact: '+91 9876543210', // Replace with customer's contact number
            },
            theme: {
                color: '#566573', // Replace with your desired color
            },
        };

        const razorpayInstance = new Razorpay(razorpayOptions);
        razorpayInstance.open();
    };

    async function CreateBooking(data) {
        setLoading(true)
        var det = {
            "link": "Customer/BookParking",
            "data": JSON.stringify(data)
        }
        Post(det, (res, rej) => {

            if (res.data.Status === 1) {
                nav("/bookingconfirmation?status=Confirm&id=" + res.data.ID)

            } else {
                nav("/bookingconfirmation?status=Queue&id=" + res.data.ID)
            }
            setLoading(false)
        }, (err) => {
            setLoading(false)
        });

    }
    return (<>
        <div className="mt-2 p-2 flex flex-col sm:flex-row ">

            <section className="sm:w-2/3 flex flex-col gap-5 p-2">
                <div className="w-full flex gap-5">
                    <div className="w-1/2 flex flex-col gap-5">
                        <select type="text" id="SearchParkings" className="rounded-md p-2 outline-none text-xs sm:text-sm " placeholder="Where you want to park ?" onChange={e => SetSelectedTime(parseInt(e.target.value))}>
                            {TimeOptions.slice(0, 4).map((item, idx) =>
                                <option value={item.value} key={idx}>{item.time}</option>
                            )}
                        </select>





                    </div>
                    <div className="w-1/2 flex  flex-col gap-5">
                        <div className="flex flex-col gap-2 sm:flex-row justify-between h-full ">
                            <label className="flex items-center space-x-3">
                                <input
                                    type="checkbox" checked={!IsNewVhicle}
                                    onChange={(e) => ToggleVehicleSelection(e, 'EV')}
                                    className="form-checkbox text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                />
                                <span className="text-gray-200 text-xs sm:text-sm ">Existing Vehicle</span>
                            </label>
                            <label className="flex items-center space-x-3">
                                <input
                                    type="checkbox"
                                    checked={IsNewVhicle}
                                    onChange={(e) => ToggleVehicleSelection(e, 'NV')}
                                    className="form-checkbox text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                />
                                <span className="text-gray-200 text-xs sm:text-sm">New Vehicle</span>
                            </label>
                        </div>
                    </div>
                </div>


                {!IsNewVhicle && (<div className="w-full flex gap-5">
                    <div className="w-1/2 flex flex-col gap-5">
                        <select type="text" id="SearchParkings" className="rounded-md text-xs sm:text-sm p-2 outline-none" placeholder="Vehicle Selector" onChange={(e) => VehcalSelectionHandeler(e.target.value)}>
                            <option value="" >Select Your Vehicle</option>
                            {props.VList.map((item, idx) => (
                                <option value={item.VehicalID} key={idx}>{item.VehicalName}</option>
                            ))}
                        </select>
                    </div>
                </div>)}
                {IsNewVhicle && (
                    <section className="flex flex-col gap-4">
                        <div className="w-full flex  gap-5">
                            <div className="w-1/2 flex flex-col gap-5">
                                <select type="text" id="SearchParkings" className="rounded-md p-2 outline-none text-xs sm:text-sm " placeholder="Vehicle Selector" onChange={(e) => SetVTypeID(e.target.value)}>
                                    <option value="" >Select Your Vehicle Type</option>
                                    {PricingList.map((item, idx) => (
                                        <option value={item.VTypeID} key={idx}>{item.VName}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="w-1/2 flex flex-col gap-5">
                                <input type="text" id="SearchParkings" className=" rounded w-full focus:bg-none p-2 outline-none text-xs sm:text-sm " onChange={(e) => SetSelectedCarNumber(e.target.value)} placeholder="Vehicle Number" />
                            </div>
                        </div>
                        <div className="w-full flex gap-5">
                            <div className="w-1/2 flex flex-col gap-2">
                                <input type="text" id="SearchParkings" className=" rounded w-full focus:bg-none p-2 outline-none text-xs sm:text-sm " onChange={(e) => SetSelectedCarName(e.target.value)} placeholder="Vehicle Name" />
                                <label className="flex items-center space-x-3">
                                    <input
                                        type="checkbox"
                                        checked={SaveVhicle}
                                        onChange={(e) => SetSaveVhicle(e.target.checked)}
                                        className="form-checkbox text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                    />
                                    <span className=" text-xs sm:text-sm text-white">Save Vehicle</span>
                                </label>
                            </div>
                            <div className="w-1/2 flex flex-col">
                                <p className="text-xs text-white ml-auto">Note : Your Vehical Number will be your Parking Pass</p>

                            </div>
                        </div>
                    </section>
                )}
            </section>

            {VtypeID !== '' && (<section className="flex-grow p-2 flex-col gap-2 border rounded-md bg-slate-400 text-[.9rem]  text-gray-100">
                <p className=" font-semibold text-center">Overview</p>
                <div className="flex">
                    <p className="w-1/2">Type</p>
                    <p className="w-1/2 text-right">{PricingList.filter(i => i.VTypeID === VtypeID)[0]?.VName}</p>
                </div>
                <div className="flex">
                    <p className="w-1/2">No.</p>
                    <p className="w-1/2 text-right">{SelectedCarNumber.replaceAll(' ', '').toUpperCase()}</p>
                </div>
                <div className="flex">
                    <p className="w-1/2">Name</p>
                    <p className="w-1/2 text-right">{SelectedCarName}</p>
                </div>
                <div className="flex">
                    <p className="w-1/2">Time</p>

                    <p className="w-1/2 text-right">{TimeOptions.filter(i => i.values === SelectedTime)[0]?.time}</p>
                </div>
                <div className="flex mt-2">
                    <p className="w-1/2 font-semibold ">Your Total :</p>
                    <p className="w-1/2 text-right  text-yellow-300 font-semibold">₹ {PricingList.filter(i => i.VTypeID === VtypeID)[0]?.Price}</p>
                </div>
                <div className="flex mt-2">

                    <button disabled={Loading} className="ml-auto  px-6 py-2 text-xs md:text-[1rem] bg-green-400 rounded-md text-white hover:bg-green-600  transition-all" onClick={() => MakePayment()}>
                        {Loading ? <div className="mx-auto animate-spin w-5 h-5 rounded-full border-b-2 border-white">

                        </div> : 'Make Payment'}
                    </button>
                </div>
            </section>)}
            {VtypeID === '' && (<section className="flex-grow p-2 flex-col gap-2 rounded-md bg-slate-400 text-[.95rem] text-gray-100">
                <p className="text-center ">Select Vehicle Or Add New Vehicle !!</p>
            </section>)}
        </div>
    </>)
}

