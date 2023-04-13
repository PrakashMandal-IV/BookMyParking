import { useNavigate } from "react-router-dom"
import HomepageMainBG from "../assets/stockimages/HomepageMainBG.jpg"
const Home = () => {

  const nav = useNavigate()

  return (
    <div className="max-h-[calc(100vh-3.5rem)] overflow-y-scroll scrollbar-thin">
      <div className="w-full flex flex-col gap-5 ">
        <div className="bg-gray-300 flex   h-[75vh] brightness-[150%]" style={{ backgroundImage: `url(${HomepageMainBG})` }}>
          <div className="  absolute top-0 left-0 right-0 bottom-0 bg-gray-800/60  transition-all"></div>
          <div className="mx-auto my-auto z-50">
            <button className="py-4   rounded text-white hover:bg-red-500 transition-all px-10 bg-red-600 flex gap-4 hover:gap-8" onClick={() => nav('/bookmyparking')}>
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
          <p className="text-center font-normal   text-3xl">Get your Parking in 3 easy steps</p>
          <div className="flex gap-20 mx-auto">
            <div className="w-96 bg-gray-400 h-48 rounded-md"></div>
            <div className="w-96 bg-gray-400 h-48 rounded-md"></div>
            <div className="w-96 bg-gray-400 h-48 rounded-md"></div>
          </div>
        </div>
        <div className="flex flex-col mt-24  gap-10 mb-16">
          <div className="">
            <p className="text-center font-normal   text-xl">Type of Parking</p>
            <p className="text-center font-normal   text-3xl">Our Parking Services</p>
          </div>
          <div className="flex gap-20 mx-auto">
            <div className="w-96 bg-gray-400 h-48 rounded-md"></div>
            <div className="w-96 bg-gray-400 h-48 rounded-md"></div>
            <div className="w-96 bg-gray-400 h-48 rounded-md"></div>
          </div>
        </div>
        <div className="bg-gray-100 flex">
          <div className="w-1/2 ml-32 my-20">
            <div className="">
              <p className="text-lg">Why Choose ParkIn ?</p>
              <p className="text-2xl">Parking made easy with our  </p>
            </div>
            <div className="flex flex-col gap-5 mt-8 pl-10">
              <div className="bg-gray-200 h-20 w-96 rounded">

              </div>
              <div className="bg-gray-200 h-20 w-96 rounded">

              </div>
            </div>
          </div>
          <div className="w-1/2 bg-gray-400 ">

          </div>

        </div>

        <div className="flex flex-col gap-10">
          <p className="text-center font-normal   text-3xl">Rent your parking slot with a few easy steps !!</p>
          <div className="   flex gap-32 justify-center w-3/5 mx-auto ">
            <div className="w-96 rounded-md flex flex-col gap-5">
              <div className="w-40 h-40 rounded-full bg-gray-400 mx-auto"></div>
              <div className="text-center">
                <p className=" text-xl font-medium">List yourself with us </p>
                <p className="">Get a quote with <br /> <span className="text-blue-400">Get A Quote</span></p>
              </div>
            </div>
            <div className="   w-96  rounded-md flex flex-col gap-5 ">
              <div className="w-40 h-40 rounded-full bg-gray-400 mx-auto"></div>
              <div className="text-center">
                <p className="text-xl font-medium">List yourself with us </p>
                <p className="">Get a quote with <br /> <span className="text-blue-400">Get A Quote</span></p>
              </div>
            </div>
            <div className="  w-96  rounded-md flex flex-col gap-5 ">
              <div className="w-40 h-40 rounded-full bg-gray-400 mx-auto"></div>
              <div className="text-center">
                <p className="text-xl font-medium">List yourself with us </p>
                <p className="">Get a quote with <br /> <span className="text-blue-400">Get A Quote</span></p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-10 mt-16">
          <div className="w-3/4  mx-auto flex">
            <div className="flex-grow">
              <ContactUs />
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