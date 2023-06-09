import { useNavigate } from "react-router-dom"
import HomepageMainBG from "../assets/stockimages/HomepageMainBG.jpg"
import { ArriveAndPark, ParkingIcon, ParkingStep2, TosImg1, TosImg2, TosImg3, WcpImg1, WcpImg2 } from "../components/svgIcons"
import HomepageSIMAGE from '../assets/stockimages/HomepageSIMAGE.png'



const Home = () => {

  const nav = useNavigate()

  return (
    <div className="max-h-[calc(100vh-3.5rem)] overflow-y-scroll scrollbar-thin">
      <div className="w-full flex flex-col gap-5 bg-slate-700">
        <div className="bg-gray-300 flex   h-[75vh] brightness-[150%]" style={{ backgroundImage: `url(${HomepageMainBG})` }}>
          <div className="  absolute top-0 left-0 right-0 bottom-0 bg-gray-800/60  transition-all"></div>
          <div className="mx-auto my-auto z-50">
            <button className="py-4   rounded text-white bg-gradient-to-b from-blue-600 to-blue-700 shadow-lg transition-all px-10  flex gap-4 hover:gap-8" onClick={() => nav('/bookmyparking')}>
              <p className="">Get a Parking </p>
              <div className="ml-auto">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </button>
          </div>

        </div>
        <div className="flex flex-col gap-10">
          <p className="text-center font-medium text-gray-300  text-2xl ">Get your Parking in 3 easy steps</p>
          <div className="flex flex-col md:flex-row gap-4 md:gap-20 mx-5 sm:mx-auto">
            <div className="w-80 sm:w-96 bg-gradient-to-tl from-blue-300 to-blue-500 shadow-lg shadow-slate-800   hover:scale-110 h-48 rounded-md flex flex-col p-2 transition-all duration-200">
              <div className="flex">

                <ParkingIcon id="p1" />

                <div className="ml-auto text-[4rem] px-4 ">
                  1
                </div>
              </div>
              <p className="text-2xl font-semibold text-gray-700">Easy Search and Find</p>
              <p className="text-white text-sm">Search your Destination</p>
            </div>
            <div className="w-80 sm:w-96 bg-gradient-to-t from-blue-300 to-blue-500 shadow-lg shadow-slate-800  hover:scale-110 h-48 rounded-md flex flex-col p-2 transition-all duration-200">
              <div className="flex">

                <ParkingStep2 />

                <div className="ml-auto text-[4rem] px-4">
                  2
                </div>
              </div>
              <p className="text-2xl font-semibold text-gray-700    ">Book your Space</p>
              <p className=" text-white text-sm">Book your parking space easily with our
                Reasonable Price</p>
            </div>
            <div className="w-80 sm:w-96 bg-gradient-to-tr from-blue-300 to-blue-500 shadow-lg shadow-slate-800 hover:scale-110 h-48 rounded-md flex flex-col p-2 transition-all duration-200">
              <div className="flex">
                <ArriveAndPark />

                <div className="ml-auto text-[4rem] px-4">
                  3
                </div>
              </div>
              <p className="text-2xl font-semibold text-gray-700   ">Arrive and Park</p>
              <p className=" text-white text-sm">Just Arrive and park your vehicle without
                any Effort . Simple and easy</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-24  gap-10 mb-16">
          <div className="">
            <p className="text-center font-normal text-gray-300   text-xl">Type of Parking</p>
            <p className="text-center font-normal text-gray-300  text-3xl">Our Parking Services</p>
          </div>
          <div className="flex flex-col md:flex-row gap-4 md:gap-20  mx-5 sm:mx-auto">

            <div className="w-80 sm:w-96 bg-gradient-to-bl from-blue-300 to-blue-500 shadow-lg shadow-slate-800 hover:scale-110 h-48 rounded-md flex flex-col p-2 transition-all duration-200">
              <p className="text-2xl font-semibold text-gray-700   ">Easy Book and Park</p>
              <div className="flex ml-auto">
                <TosImg1 />

              </div>

              <p className=" text-white text-sm">Book your parking in 3 easy steps and park
                your vehicle !!</p>
            </div>
            <div className="w-80 sm:w-96 bg-gradient-to-b from-blue-300 to-blue-500 shadow-lg shadow-slate-800 hover:scale-110 h-48 rounded-md flex flex-col p-2 transition-all duration-200">
              <p className="text-2xl font-semibold text-gray-700    ">Queue your parking </p>
              <div className="flex ml-auto">
                <TosImg2 />

              </div>

              <p className=" text-white text-sm">Incase the parking is full , u can queue your
                Parking with an average waiting time !!</p>
            </div><div className="w-80 sm:w-96 bg-gradient-to-br from-blue-300 to-blue-500 shadow-lg shadow-slate-800 hover:scale-110 h-48 rounded-md flex flex-col p-2 transition-all duration-200">
              <p className="text-2xl font-semibold text-gray-700  ">Daily Parking</p>
              <div className="flex ml-auto">
                <TosImg3 />

              </div>

              <p className=" text-white text-sm">Set your daily time and place to get the booked
                Parking ready for you !!!</p>
            </div>
          </div>
        </div>
        <div className=" shadow-lg flex bg-slate-600 ">
          <div className="md:w-1/2 p-10 md:ml-32 my-20">
            <div className="">
              <p className="text-lg text-white">Why Choose ParkIn ?</p>
              <p className="text-2xl font-semibold text-white">Parking made easy with our  </p>
            </div>
            <div className="flex flex-col gap-5 mt-8 pl-10  mx-5 sm:mx-auto">
              <div className=" h-20 w-80 sm:w-96 rounded bg-blue-600 hover:bg-blue-500 transition-all flex gap-5 shadow-lg hover:scale-105 cursor-pointer" >
                <div className="flex my-auto ml-4">
                  <WcpImg1 />
                </div>
                <div className="flex-grow my-auto mr-10">
                  <p className="font-semibold text-lg text-white">Stress Free And Easy Parking</p>
                  <p className=" text-xs text-white">Now Leave your home without the
                    stress of finding a parking for hours</p>
                </div>
              </div>
              <div className=" h-20 w-80 sm:w-96 rounded bg-yellow-400 hover:bg-yellow-300 transition-all flex gap-1 shadow-lg hover:scale-105 cursor-pointer" >

                <div className="flex my-auto">
                  <WcpImg2 />
                </div>
                <div className="flex-grow my-auto mr-10">
                  <p className="font-semibold text-lg text-gray-600">Save money and Time</p>
                  <p className=" text-xs text-gray-600">Save your money with our reasonable pricing
                    and time for looking a parking !!</p>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden  w-1/2 bg-gray-400 md:flex brightness-150" style={{ backgroundImage: `url(${HomepageSIMAGE})` }}>

          </div>

        </div>

        <div className="flex flex-col gap-10">
          <p className="text-center font-normal  text-gray-200 text-3xl">Rent your parkings with a few easy steps !!</p>
          <div className=" text-white  flex flex-col md:flex-row gap-5 md:gap-32 justify-center md:w-3/5 mx-auto ">
            <div className="w-96 rounded-md flex flex-col gap-5">
              <div className="w-40 h-40 rounded-full bg-gray-400 mx-auto overflow-hidden">
                <img src="https://i.pinimg.com/564x/68/e4/76/68e476fe6fa32347063204bfc57a4766.jpg" alt="" className="" />
              </div>
              <div className="text-center">
                <p className=" text-xl font-medium">List yourself with us </p>
                <p className="">Get a quote with <br /> </p>
              </div>
            </div>
            <div className="   w-96  rounded-md flex flex-col gap-5 ">
              <div className="w-40 h-40 rounded-full bg-gray-400 mx-auto overflow-hidden">
                <img src="https://i.pinimg.com/564x/76/ed/99/76ed99cee9382671d9ef540ebf3318b3.jpg" alt="" className="" />
              </div>
              <div className="text-center">
                <p className="text-xl font-medium">List your parkings  </p>
                <p className="">List your parking in our website <br /> </p>
              </div>
            </div>
            <div className="  w-96  rounded-md flex flex-col gap-5 ">
              <div className="w-40 h-40 rounded-full bg-gray-400 mx-auto overflow-hidden">
                <img src="https://i.pinimg.com/564x/6c/de/79/6cde7950339869d53692f1d256b7aea3.jpg" alt="" className="" />
              </div>
              <div className="text-center">
                <p className="text-xl font-medium">Start Earning right away </p>
                <p className="">Start earning right away without
                  limitations </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-10 mt-16">
          <div className="w-3/4  mx-auto flex">
            <div className="flex-grow">
              {/* <ContactUs /> */}
            </div>
            <div className="w-1/3 bg-gray-300"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home


const ContactUs = () => {
  const Contact = (e) => {
    e.preventDefault()

  }
  return (
    <div className="mx-28" >
      <p className="text-3xl font-medium   mb-10 ">Contact Us</p>
      <form onSubmit={Contact} className="form flex flex-col gap-10">
        <div className="flex gap-10">
          <input type="text" className="border flex-grow px-2 py-3 outline-none rounded-md" placeholder="Your Name" required />
          <input type="email" className="border  flex-grow  px-2 py-3 outline-none rounded-md" placeholder="Email" required />
        </div>
        <div className="flex gap-10">
          <input type="text" className="border flex-grow px-2 py-3 outline-none rounded-md" placeholder="Organization Name" required />
          <input type="text" className="border  flex-grow px-2 py-3 outline-none rounded-md" placeholder="City Pincode" required />
        </div>
        <div className="flex gap-10">
          <textarea name="" placeholder="Details" className="border w-full px-2 py-3 outline-none rounded-md" id="" cols="30" rows="5" required></textarea>
        </div>
        <div className="w-full flex">
          <button className="border w-2/5 py-4 ml-auto rounded hover:bg-gray-100 transition-all" type="submit">
            Contact
          </button>
        </div>
      </form>
    </div>
  )
}