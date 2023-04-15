const MyBookings = () => {
    return (<>
        <div className="mx-80 mt-16">
            <div className="w-full h-32">
                <p className="font-semi
                bold text-2xl text-center">Bookings</p>
                <div className="mt-5">
                    <div className="flex flex-col gap-4">
                        <BookingCard />
                        <BookingCard />
                    </div>
                </div>
            </div>
        </div>
    </>)
}
export default MyBookings


const BookingCard = () => {
    return (<>
        <div className="bg-gradient-to-l    border hover:border-slate-700 transition-all w-full flex gap-2 p-2 rounded-md">

            <div className="max-w-[35%] sm:max-w-[40%] overflow-hidden flex">
                <img src="https://i.pinimg.com/564x/7e/6a/f9/7e6af90864bb1ba1ac9f87a6f31cc3a5.jpg" className="rounded-md my-auto sm:max-h-52 object-cover pointer-events-none" alt="" />
            </div>
            <div className="flex-grow flex flex-col">
                <div className="flex w-full">
                    <div className="">
                        <p className="text-2xl text-slate-700">PVR <span className="text-lg font-light">(10:00 AM - 12:00 PM)</span></p>
                        <p className="text-slate-700">123 streets , raipur </p>
                        <p className=" text-green-600 mt-2">Total Cost : Rs 100 only</p>
                    </div>
                    <div className=" ml-auto">
                      <p className="text-slate-700 ">4 wheeler | JK029080 | Safari</p>
                    </div>
                </div>
                <div className="mt-auto">
                    Rating
                </div>
            </div>
        </div>
    </>)
}