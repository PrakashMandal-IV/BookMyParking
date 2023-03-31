const Home = () => {


  return (
    <div className="w-full flex flex-col gap-5">
      <div className="bg-gray-300 flex   h-[75vh]">
        <div className="mx-auto mt-auto mb-32">
          <button className="py-4  rounded text-white hover:bg-gray-500 transition-all px-10 bg-gray-600 flex gap-4 hover:gap-8">
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
                <div className="w-80 bg-gray-400 h-48 rounded-md"></div>
                <div className="w-80 bg-gray-400 h-48 rounded-md"></div>
                <div className="w-80 bg-gray-400 h-48 rounded-md"></div>
           </div>
      </div>
    </div>
  )
}

export default Home