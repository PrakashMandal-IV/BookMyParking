import { useEffect, useState } from "react";
import { Api, Get } from "../../components/Api";
import useRazorpay from "react-razorpay";

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
            <p className="text-2xl font-semibold text-center mt-5">Book You Parking !!</p>
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
        if(props.item.OutTime<=time.getHours()&&props.item.InTime>=time.getHours()){
            setIsOpen(false);
        }else{
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
                            <p className="text-[.6rem] sm:text-sm ml-auto mt-auto">Available Parking : <span className="text-green-500">{props.item.AvailableSlots}</span></p>
                            {/* <button className="ml-auto px-6 py-2 text-xs md:text-lg bg-green-400 rounded-md text-white hover:bg-green-600  transition-all">
                                Book
                            </button> */}
                        </div>
                    </div>
                </div>
            </div>
            {/* Collapsible Div */}
            <div
                className={`overflow-hidden transition-max-h duration-300 ease-in-out mt-4 bg-gray-100 rounded-md ${isOpen ? 'max-h-[50rem]' : 'max-h-0 '
                    }`}
            >
                {isOpen && (<ParkingDetailsOnOrg item={props.item} VList={props.VList} />)}
            </div>
            {/* Collapsible Div Toggle Button */}
        </>
    );
};



const ParkingDetailsOnOrg = (props) => {
    const [TimeOptions, SetTimeOptions] = useState([])
    const [SelectedTime, SetSelectedTime] = useState('')
    const [IsNewVhicle, SetIsNewVehicle] = useState(false)
    const [PricingList, SetPricingList] = useState([])
    const [VtypeID, SetVTypeID] = useState('')

    const [SelectedCarNumber, SetSelectedCarNumber] = useState('')
    const [SelectedCarName, SetSelectedCarName] = useState('')
    const [SaveVhicle, SetSaveVhicle] = useState(true)
    const Razorpay = useRazorpay();
    useEffect(() => {
        GetPricingDetails()
        
        let timeArray = [];
        let currentTime = new Date();
        let currentHour = currentTime.getHours();
        let currentMinute = currentTime.getMinutes();
        let endTime = currentHour + 2; // 2 hours after current hour in 24-hour format
        let inTime = props.item.InTime; // props.item.InTime represents the minimum allowed hour
        let outTime = props.item.OutTime - 1; // props.item.OutTime - 1 represents the maximum allowed hour
        
        // Ensure currentHour is not less than props.item.InTime
        currentHour = Math.max(currentHour, inTime);
        
        // Ensure endTime is not greater than props.item.OutTime - 1
        endTime = Math.min(endTime, outTime);
        
        // If current time is 12 PM, start from 1 PM
        if (currentHour === 12 && currentMinute >= 0) {
          currentHour = 13;
        }
        
        // Calculate the difference between currentHour and endTime
        let diff = calculateHourDifference(currentHour, endTime);
        
        // Loop to generate time options
        for (let i = 0; i <= diff; i++) {
          if (currentHour <= 23) {
            let hour = currentHour % 12;
            let amPm = currentHour < 12 ? 'am' : 'pm';
            timeArray.push({ values: (hour === 0 ? 12 : hour) + (amPm === 'am' ? 0 : 12), time: `${hour === 0 ? 12 : hour} ${amPm}` });
          }
          currentHour++;
        }
        
        SetTimeOptions(timeArray);
        SetSelectedTime(timeArray[0]?.values);
        
    }, [])
    function calculateHourDifference(currentHour, endTime) {
        if (currentHour === endTime) {
          // If currentHour is the same as endTime, the difference is 0
          return 0;
        } else if (currentHour < endTime) {
          // If currentHour is less than endTime, simply subtract the values
          return endTime - currentHour;
        } else {
          // If currentHour is greater than endTime, we have crossed midnight
          // Subtract currentHour from 24 and add endTime
          return (24 - currentHour) + endTime;
        }
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

    const MakePayment=()=>{
        var det = {
            "link": "Customer/getOrderID?Amount=" + PricingList.filter(i => i.VTypeID === VtypeID)[0]?.Price
        }
        Get(det, (res, rej) => {
            
            openRazorpayGateway(res.data.OrderID,res.data.RazorPayID)
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
        // Handle payment success callback here
        debugger
        console.log('Payment success:', paymentResponse);
      };
      const openRazorpayGateway = (orderId,Key) => {
        debugger
        const razorpayOptions = {
          key: Key,
          amount: 1000, // Replace with the amount you want to charge
          order_id: orderId, // Use the received order ID from the state
          name: 'BOOKMYPARKING',
          description: 'Payment for purchase',
          image: 'https://yourcompany.com/logo.png', // Replace with your company logo URL
          handler: handlePaymentSuccess,
          prefill: {
            name: 'John Doe', // Replace with customer's name
            email: 'john.doe@example.com', // Replace with customer's email
            contact: '+91 9876543210', // Replace with customer's contact number
          },
          theme: {
            color: '#F37254', // Replace with your desired color
          },
        };
    
        const razorpayInstance = new Razorpay(razorpayOptions);
        razorpayInstance.open();
      };
    return (<>
        <div className="mt-2 p-2 flex flex-col sm:flex-row">

            <section className="sm:w-2/3 flex flex-col gap-5 p-2">
                <div className="w-full flex gap-5">
                    <div className="w-1/2 flex flex-col gap-5">
                        <select type="text" id="SearchParkings" className="rounded-md p-2 outline-none text-xs sm:text-sm " placeholder="Where you want to park ?" onChange={e => SetSelectedTime(parseInt(e.target.value))}>
                            {TimeOptions.map((item, idx) =>
                                <option value={item.values} key={idx}>{item.time}</option>
                            )}
                        </select>





                    </div>
                    <div className="w-1/2 flex  flex-col gap-5">
                        <div className="flex flex-col sm:flex-row justify-between h-full">
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
                                    <span className="text-gray-700 text-xs sm:text-sm">Save Vehicle</span>
                                </label>
                            </div>
                            <div className="w-1/2 flex flex-col">
                                <p className="text-xs text-red-500 ml-auto">Note : Your Vehical Number will be your Parking Pass</p>

                            </div>
                        </div>
                    </section>
                )}
            </section>

            {VtypeID !== '' && (<section className="flex-grow p-2 flex-col gap-2 border rounded-md bg-gray-50 text-[.9rem]">
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
                    <p className="w-1/2 text-right font-semibold text-green-500">₹ {PricingList.filter(i => i.VTypeID === VtypeID)[0]?.Price}</p>
                </div>
                <div className="flex mt-2">

                    <button className="ml-auto  px-6 py-2 text-xs md:text-[1rem] bg-green-400 rounded-md text-white hover:bg-green-600  transition-all" onClick={()=>MakePayment()}>
                        Make Payment
                    </button>
                </div>
            </section>)}
            {VtypeID === '' && (<section className="flex-grow p-2 flex-col gap-2 border rounded-md bg-gray-50 text-[.95rem]">
                <p className="text-center ">Select Vehicle Or Add New Vehicle !!</p>
            </section>)}
        </div>
    </>)
}

