const BookingConfirmationPage = () => {

    
    return (<>
        <div className="flex">
            <div className="mt-16  mx-auto">
                <p className="text-2xl text-center">Booking Confirmation</p>
                <div className="mt-5 border rounded-md p-5">
                    <p className="text-center text-lg font-medium  ">Your booking has been confirmed</p>
                    <div className="w-[30rem] mt-5 flex flex-col gap-2">
                        <div className="flex">
                            <p className="">Transection ID</p>
                            <p className="ml-auto">9999-0000-099999-0000</p>
                        </div>
                        <div className="flex">
                            <p className="">Booking Status</p>
                            <p className="ml-auto">Confirmed</p>
                        </div>
                        <div className="flex">
                            <p className="">Floor</p>
                            <p className="ml-auto">GF (Ground Floor)</p>
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

                    </div>
                   
                </div>
                <p className="text-center">Your Vehical Number is your entry ticket :)</p>
            </div>
        </div>
    </>)
}

export default BookingConfirmationPage