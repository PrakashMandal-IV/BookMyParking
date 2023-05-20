import { useEffect, useState } from "react";
import { Get } from "../../components/Api";
import { useSearchParams } from "react-router-dom";
const floor_map = {
    0: 'GF',
    1: 'FF',
    2: 'SF',
    3: 'TF',
    4: 'FO',
    5: 'FV',
    6: 'SX',
    7: 'SV',
    8: 'ET',
    9: 'NT',
    10: 'TT'
}
const getTime = (timeString) => new Date(timeString).toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true});

const BookingConfirmationPage = () => {
   const [SuccesStatus,SetSuccessStatus] = useState(null)
   const [QueueStatus,SetQueueStatus] = useState(null)
   const [searchParams] = useSearchParams();
    useEffect(()=>{
    
        let status = searchParams.get('status')
        if(status==='Confirm'){
            GetBookingStatus( searchParams.get('id'))
        }else{
            GetQueueStatus( searchParams.get('id'))
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
    function GetQueueStatus(ID){
        debugger
        var det = {
            "link": "Customer/QueueStatus?PQID=" + ID
        }
        Get(det, (res, rej) => {
           debugger
            SetQueueStatus(res.data[0]?res.data[0]:null)
           
        }, (err) => {

        });
    }
    return (<>
        <div className="flex mx-1">
            <div className="mt-16  mx-auto">
                <p className="text-2xl text-center">Booking {SuccesStatus?"Confirmed":" In Queue"}</p>
                <div className="mt-5 border rounded-md p-2 md:p-5">
                    <p className="text-center text-lg font-medium  ">{SuccesStatus?"Your booking has been confirmed !!":"Your booking has been assigned !!"}</p>
                    {SuccesStatus&&(<div className="w-[30rem] mt-5 flex flex-col gap-2">
                        <div className="flex">
                            <p className=" font-medium">Transection ID</p>
                            <p className="ml-auto ">{SuccesStatus.TransectionID}</p>
                        </div>
                        <div className="flex">
                            <p className="font-medium">Booking Status</p>
                            <p className="ml-auto">Confirmed</p>
                        </div>
                        <div className="flex">
                            <p className="font-medium">Floor</p>
                            <p className="ml-auto">{floor_map[SuccesStatus.FloorNumber]}</p>
                        </div>
                        <div className="flex">
                            <p className="font-medium">Parking Slot</p>
                            <p className="ml-auto">{SuccesStatus.ParkingLotName} {SuccesStatus.ParkingSlotName}</p>
                        </div>
                        <div className="flex">
                            <p className="font-medium">Vehicle Number</p>
                            <p className="ml-auto">{SuccesStatus.VehicalNumber}</p>
                        </div>
                        <div className="flex">
                            <p className="font-medium">Vehicle Type</p>
                            <p className="ml-auto">{SuccesStatus.VehicalType}</p>
                        </div>
                        <div className="flex">
                            <p className="font-medium">Arriving Time</p>
                            <p className="ml-auto">{getTime(SuccesStatus.BookedFrom)}</p>
                        </div>
                        
                    </div>)}
                    {QueueStatus&&(<div className=" md:w-[30rem] mt-5 flex flex-col gap-2">
                        <div className="flex">
                            <p className="font-medium">Transection ID</p>
                            <p className="ml-auto">{QueueStatus.TransectionID}</p>
                        </div>
                        <div className="flex">
                            <p className="font-medium">Booking Status</p>
                            <p className="ml-auto">In Queue</p>
                        </div>
                       
                        <div className="flex">
                            <p className="font-medium">Queue Number</p>
                            <p className="ml-auto">{QueueStatus.QueueNumber+1}</p>
                        </div>
                        <div className="flex">
                            <p className="font-medium">Vehicle Number</p>
                            <p className="ml-auto">{QueueStatus.VehicleNumber}</p>
                        </div>
                        <div className="flex">
                            <p className="font-medium">Vehicle Type</p>
                            <p className="ml-auto">{QueueStatus.VehicalType}</p>
                        </div>
                        <div className="flex">
                            <p className="font-medium">Arriving Time</p>
                            <p className="ml-auto">{getTime(QueueStatus.BookedFrom)}</p>
                        </div>
                        
                    </div>)}
                </div>
                {SuccesStatus&&(<>
                <p className="text-center text-sm">Your Vehical Number is your entry ticket :)</p>
                <p className="text-center text-sm">You can now close this website and proceed to your destination</p>
                <p className="text-center mt-5">Thank you for using our service , Happy Journey</p>
                </>)}
                {QueueStatus&&(<>
                <p className="text-center text-sm">We are experiencing high demand of parking </p>
                <p className="text-center text-sm">Once we have an empty slot for you, we will inform you </p>
                <p className="text-center mt-5">Thank you for your patience</p>
                </>)}
            </div>
        </div>
    </>)
}

export default BookingConfirmationPage