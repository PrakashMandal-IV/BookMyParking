import { useEffect, useState } from "react";
import { Get } from "../../components/Api";
import { useSearchParams } from "react-router-dom";

const BookingConfirmationPage = () => {
   const [SuccesStatus,SetSuccessStatus] = useState(null)
   const [searchParams] = useSearchParams();
    useEffect(()=>{
        
        let status = searchParams.get('status')
        if(status==='Confirm'){
            GetBookingStatus( searchParams.get('id'))
        }
    },[])
    function GetBookingStatus(ID){
        var det = {
            "link": "Customer/BookingStatus?BookingID=" + ID
        }
        Get(det, (res, rej) => {
           
              SetSuccessStatus(res.data[0]?res.data[0]:null)
           
        }, (err) => {

        });
    }
    return (<>
        <div className="flex">
            <div className="mt-16  mx-auto">
                <p className="text-2xl text-center">Booking Confirmation</p>
                <div className="mt-5 border rounded-md p-5">
                    <p className="text-center text-lg font-medium  ">Your booking has been confirmed</p>
                    {SuccesStatus&&(<div className="w-[30rem] mt-5 flex flex-col gap-2">
                        <div className="flex">
                            <p className="">Transection ID</p>
                            <p className="ml-auto">{SuccesStatus.TransectionID}</p>
                        </div>
                        <div className="flex">
                            <p className="">Booking Status</p>
                            <p className="ml-auto">Confirmed</p>
                        </div>
                        <div className="flex">
                            <p className="">Floor</p>
                            <p className="ml-auto"></p>
                        </div>
                        <div className="flex">
                            <p className="">Parking Slot</p>
                            <p className="ml-auto">A 01</p>
                        </div>
                        <div className="flex">
                            <p className="">Vehicle Number</p>
                            <p className="ml-auto">JK 02 5609</p>
                        </div>
                        <div className="flex">
                            <p className="">Vehicle Type</p>
                            <p className="ml-auto">4 Wheeler</p>
                        </div>
                        <div className="flex">
                            <p className="">Arriving Time</p>
                            <p className="ml-auto">4:00 pm</p>
                        </div>

                    </div>)}
                   
                </div>
                <p className="text-center">Your Vehical Number is your entry ticket :)</p>
            </div>
        </div>
    </>)
}

export default BookingConfirmationPage