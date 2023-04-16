import { useEffect, useState } from "react"
import { Api, Get } from "../../components/Api"
import StarRatings from "react-star-ratings"

const MyBookings = () => {
    const [ParkingList, SetParkingList] = useState([])
    useEffect(() => {
        GetParkingList()
    }, [])

    const GetParkingList = async () => {
        var det = {
            "link": "Customer/GetBookingList"
        }
        Get(det, (res, rej) => {
            SetParkingList(res.data)
        }, (err) => {

        });
    }
    return (
        <div className="mx-80 mt-16">
        <div className="w-full h-full flex flex-col">
          <p className="font-semi bold text-2xl text-center">Bookings</p>
          <div className="mt-5 flex-grow ">
            <div className="flex flex-col gap-4 mb-20">
              {ParkingList.map((item, idx) => (
                <BookingCard item={item} key={idx} />
              ))}
             
            </div>
          </div>
        </div>
      </div>
      

    )
}
export default MyBookings


const BookingCard = (props) => {
   
    const [Rating, SetRating] = useState(props.item.Ratings)


    const UpdateUserRating = (value) => {
        if (value > 0) {
            var det = {
                "link": "Customer/SetUserRating?BookingID=" + props.item.BookingID + "&Rating=" + value
            }
            Get(det, (res, rej) => {
                SetRating(value)
            }, (err) => {

            });
        }
    }
    function getTimeInFormat(timeString) {
        // Create a new Date object from the input time string
        const date = new Date(timeString);
      
        // Retrieve the hour, minute, and time format (AM/PM) from the Date object
        const hour = date.getHours();
        const minute = date.getMinutes();
        const timeFormat = hour >= 12 ? 'PM' : 'AM';
      
        // Convert the hour to 12-hour format
        const hour12 = (hour % 12) || 12;
      
        // Format the time string in the desired format
        const formattedTime = `${hour12}:${minute.toString().padStart(2, '0')} ${timeFormat}`;
      
        return formattedTime;
      }
      
    return (<>
        <div className="bg-gradient-to-l    border hover:border-slate-700 transition-all w-full flex gap-2 p-2 rounded-md">

            <div className="max-w-[35%] sm:max-w-[40%] overflow-hidden flex">
                <img src={Api + "orgthumb?OrgID=" + props.item.OrganizationID + "&FileName=" + props.item.Thumbnail} className="rounded-md my-auto sm:max-h-52 object-cover pointer-events-none" alt="" />
            </div>
            <div className="flex-grow flex flex-col">
                <div className="flex w-full">
                    <div className="">
                        <p className="text-2xl text-slate-700">{props.item.OrganizationName} <span className="text-lg font-light">({getTimeInFormat(props.item.BookedFrom)} - {getTimeInFormat(props.item.BookedTo)})</span></p>
                        <p className="text-slate-700">{props.item.City} , {props.item.STATE} </p>
                        <p className=" text-green-600 mt-2 text-sm">Total Cost : Rs {props.item.Amount} only</p>
                    </div>
                    <div className=" ml-auto">
                        <p className="text-slate-700 ">{props.item.VehicalType} | {props.item.VehicalNumber}|  {props.item.VhicalName}</p>
                    </div>
                </div>
                <div className="mt-auto">
                    <p className="">Rating</p>
                    <div className="">
                        <StarRatings
                            rating={Rating}
                            starDimension="25px"
                            starRatedColor="#475569"
                            starHoverColor="#334155"
                            changeRating={UpdateUserRating}
                            numberOfStars={5}
                            name='User Rating'
                        />
                    </div>
                </div>
            </div>
        </div>
    </>)
}