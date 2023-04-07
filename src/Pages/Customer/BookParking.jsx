import { useState } from "react";
import { Get } from "../../components/Api";

const BookParking = () => {
   const [SearchedOrgLists,SetSearchedOrgLists]= useState([])


    const SearchParkings = (e) => {
        e.preventDefault()
        debugger
        var det = {
            "link": "Customer/searchorg?SearchText="+e.target[0].value
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
        <div className="max-h-[calc(100vh-3.5rem)] overflow-y-auto">
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
        </div>
    </>)
}


export default BookParking