import { useState } from "react";
import { Get } from "../../components/Api";

const BookParking = () => {
    const [SearchedOrgLists, SetSearchedOrgLists] = useState([])


    const SearchParkings = (e) => {
        e.preventDefault()
        debugger
        var det = {
            "link": "Customer/searchorg?SearchText=" + e.target[0].value
        }
        Get(det, (res, rej) => {
            debugger
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
            <p className="text-2xl font-semibold text-center my-10">Book You Parking !!</p>
            <div className="flex w-full ">
                <div className="mx-auto">
                    <form onSubmit={SearchParkings}>
                        <div className="flex  px-2  rounded-md border" >
                            <input type="text" name="Org_Search" id="SearchParkings" className="w-96  py-2 outline-none" placeholder="Where you want to park ?" />
                            <span className="my-auto ml-auto" id="basic-addon1">
                                <svg width='16' height='16'>
                                    <use xlinkHref='#svg_search'></use>
                                </svg>
                            </span>
                        </div>
                    </form>
                    <p className="text-center mt-1 text-sm ">Start by Selected where you want to go..</p>
                </div>
            </div>
            <div className="flex flex-col w-full mt-10">
                <div className="w-3/5 mx-auto">
                     
                    <div className="flex h-[40rem] flex-col gap-5 pr-2 overflow-y-auto scrollbar-thin" >
                        <OrgListCard />
                        <OrgListCard />
                        <OrgListCard />
                    </div>
                </div>
            </div>
        </div>
    </>)
}


export default BookParking


const OrgListCard = () => {
    return (<>
        <div className="flex border hover:border-gray-400 p-2 rounded-md transition-all">
            <div className="max-w-[40%]  bg-gray-200  rounded-md overflow-hidden">
                <img src="https://i.pinimg.com/564x/8d/35/b2/8d35b2cf43859bfec6d5ade4d466c9ad.jpg" className=" object-cover pointer-events-none max-h-52" alt="" />
            </div>
            <div className="flex-grow flex flex-col px-4 py-1 ">
                  <div className="">
                             <p className="text-2xl font-medium  ">City Center</p>
                             <p className="text-sm">Raipur, Chhatisgarh</p>
                             <p className="text-sm">road 34, phase 2 , Pandri</p>
                  </div>
                  <div className="mt-auto flex">
                    <div className="ml-auto">
                        <button className="px-6 py-2 bg-green-400 rounded-md text-white hover:bg-green-600  transition-all">
                            Book
                        </button>
                    </div>
                  </div>
            </div>
        </div>
    </>)
}