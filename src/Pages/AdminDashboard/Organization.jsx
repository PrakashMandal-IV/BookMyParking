import { useEffect, useState } from "react";
import { Get, Post } from "../../components/Api";

const Organization = () => {
    const [CurrentDate, SetCurrentDate] = useState('')
    const [isOpen, setisOpen] = useState(false)
    const [OrgList,SetOrgList] = useState([])
    const [FilteredOrgList,SetFilteredOrgList] =useState([])
    useEffect(() => {
        const currentDate = new Date();
        SetCurrentDate(formatDate(currentDate))
        GetOrganizationList()
    }, [])


    function formatDate(date) {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const month = months[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();
        return `${day} ${month}, ${year}`;
    }
   function GetOrganizationList(){
    
    var det = {
        "link": "Admin/orglistforadmin"
    }
    Get(det, (res, rej) => {
        document.getElementById('SearchInput').value=''
        SetOrgList(res.data)
        SetFilteredOrgList(res.data)
    }, (err) => {
        
    });
   }

    function SearchFunc(e) {
        e.preventDefault()
    
         let s = e.target[0].value.toLowerCase()
        SetFilteredOrgList(OrgList.filter(i=>i.OrganizationName.toLowerCase().startsWith(e.target[0].value.toLowerCase())))
    }

    const SuccessAdd = () => {
        setisOpen(false)
        GetOrganizationList()
    }
    return (<>
        <svg className='hidden'>
            <defs>
                <symbol id='svg_search' xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </symbol>
                <symbol id='svg_calendar_check' xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                </symbol>
            </defs>
        </svg>
        <div className="pl-10 pr-20 pt-5 ">
            <div className="flex h-10">
                <div className="text-xl">Organization</div>
                <div className="ml-auto text-lg font-medium">{CurrentDate}</div>
            </div>
            <div className=" px-32 mt-10">
                <div className="flex ">
                    <form onSubmit={SearchFunc}>
                        <div className="flex border px-2  rounded-md">
                            <input type="text" name="Org_Search" id="SearchInput" className="  py-2 outline-none" placeholder="Search.." />
                            <span className="my-auto" id="basic-addon1">
                                <svg width='16' height='16'>
                                    <use xlinkHref='#svg_search'></use>
                                </svg>
                            </span>
                        </div>
                    </form>
                    <div className="ml-auto">
                        <div className="bg-slate-600 w-10 h-10 rounded-md flex hover:bg-slate-500 transition-all cursor-pointer" onClick={() => setisOpen(!isOpen)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="m-auto w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-10  px-32">
                <table className="w-full">
                    <tr className="flex py-2 text-white bg-slate-700">
                        <th className="w-[10%] text-center">S.No</th>
                        <th className="w-[20%] text-center">Name</th>
                        <th className="w-[10%] text-center">Parking Slots</th>
                        <th className="w-[10%] text-center">Active Slots</th>
                        <th className="w-[10%] text-center">Total Revenue</th>
                        <th className="w-[20%] text-center">Location</th>
                        <th className="w-[10%] text-center">Status</th>
                    </tr>
                    <tbody className="w-full">
                       {FilteredOrgList.map((item,idx)=>{
                          debugger
                        return ( <tr key={idx} className="flex py-2 transition-all hover:bg-slate-200  ">
                        <td className="w-[10%] text-center">{idx+1}</td>
                        <td className="w-[20%] text-center">{item.OrganizationName}</td>
                        
                        <td className="w-[10%] text-center">{item. TotalSlot}</td>
                        <td className="w-[10%] text-center">{item.ActiveSlot}</td>
                        <td className="w-[10%] text-center">{item.Revenue}</td>
                        <td className="w-[20%] text-center">{item.State+","+item.City}</td>
                        <td className="w-[10%] text-center">{item.IsActive?"Active":"InActive"}</td>
                       
                    </tr>)
                       })}
                    </tbody>
                </table>
            </div>
        </div>
        {isOpen && (
            <AddOrganizationModal Close={() => setisOpen(!isOpen)} Success={SuccessAdd} />
        )}



    </>)
}
export default Organization


const AddOrganizationModal = (props) => {

    const [Scale, SetScale] = useState('scale-0')
    const [Error, SetError] = useState('')
    const [Loading,SetLoading] = useState(false)
    useEffect(() => {
        SetScale('scale-100')
    }, [])
    const OnClose = () => {
        SetScale('scale-0')
        setTimeout(() => {
            props.Close()
        }, 150);
    }

    const OnFormSubmit = (e) => {

        e.preventDefault()
        SetError('')
        SetLoading(true)
        var data = {
            "name": e.target[0].value,
            "addressLine1": e.target[1].value,
            "adddressLine2": e.target[2].value,
            "city": e.target[3].value,
            "state": e.target[4].value,
            "postalCode": e.target[5].value,
            "ownerEmail": e.target[6].value
        }
        AddOrg(data)
    }

    const AddOrg = (data) => {

        var det = {
            "link": "Admin/addorganization",
            "data": JSON.stringify(data)
        }
        Post(det, (res, rej) => {
            if (res.data = "Success") {
                props.Success()
            } else {
                SetError(res.data)
                SetLoading(false)
            }

        }, (err) => {
            SetError('Something went wrong , Please try again')
            SetLoading(false)
        });
    }

    return (<>
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-6 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" onClick={OnClose}>
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
                &#8203;
                <form onSubmit={OnFormSubmit} className={"inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full  " + Scale}>
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <p className="text-center  text-2xl mb-4">Add Organization</p>
                        <div id="NewOrgForm" name="NewOrgForm" className="flex flex-col gap-2">
                            <input type="text" name="LoginEmail" className="border mx-auto w-4/5 px-2 py-3 outline-none rounded-md" placeholder="Name" required />
                            <input type="text" name="LoginEmail" className="border mx-auto w-4/5 px-2 py-3 outline-none rounded-md" placeholder="Address Line 1" required />
                            <input type="text" name="LoginEmail" className="border mx-auto w-4/5 px-2 py-3 outline-none rounded-md" placeholder="Address Line 1" required />
                            <input type="text" name="LoginEmail" className="border mx-auto w-4/5 px-2 py-3 outline-none rounded-md" placeholder="City" required />
                            <input type="text" name="LoginEmail" className="border mx-auto w-4/5 px-2 py-3 outline-none rounded-md" placeholder="State" required />
                            <input type="text" name="LoginEmail" className="border mx-auto w-4/5 px-2 py-3 outline-none rounded-md" placeholder="Postal Code" required />
                            <input type="email" name="LoginEmail" className="border mx-auto w-4/5 px-2 py-3 outline-none rounded-md" placeholder="Owner's Email" required />
                        </div>
                    </div>

                    <div className="bg-gray-50 px-4 py-3 sm:px-6 flex">
                        <div className="flex w-full rounded-md shadow-sm sm:w-auto">
                            <button onClick={OnClose} type="button" className=" inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-gray-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-gray-500 focus:outline-none focus:border-gray-700 focus:shadow-outline-green transition ease-in-out duration-150ms sm:text-sm sm:leading-5">
                                Close
                            </button>
                        </div>
                       
                        <div className="ml-auto flex w-full rounded-md  sm:w-auto">

                            <p className="text-center my-auto pr-5 text-red-500 text-sm">{Error}</p>
                           
                            <button type="submit" disabled={Loading} className="inline-flex justify-center  rounded-md border border-transparent px-4 py-2 bg-green-600 text-base leading-6  text-white shadow-sm hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green transition ease-in-out duration-150ms sm:text-sm sm:leading-5">
                            {Loading? <div className="animate-spin rounded-full border-b-2 border-white">
                                 <div className="w-5 h-5"></div>
                            </div>:'Add'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </>)
}



const PopupModal = (props) => {

    const [Scale, SetScale] = useState('scale-0')
    useEffect(() => {
        SetScale('scale-100')
    }, [])
    const OnClose = () => {
        SetScale('scale-0')
        setTimeout(() => {
            props.Close()
        }, 150);
    }
    return (<>
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-6 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" onClick={OnClose}>
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
                &#8203;
                <div className={"inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full  " + Scale}>
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Modal Title</h3>
                                <div className="mt-2">
                                    <p className="text-sm leading-5 text-gray-500">
                                        Modal description goes here.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                            <button onClick={OnClose} type="button" className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-green-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green transition ease-in-out duration-150ms sm:text-sm sm:leading-5">
                                Close
                            </button>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </>)
}



