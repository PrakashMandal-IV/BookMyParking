import { useEffect, useState } from "react";
import { Get, Post } from "../../components/Api";
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
const ManageParking = () => {
    const [CurrentDate, SetCurrentDate] = useState('')
    const [isLotOpen, setisLotOpen] = useState(false)
    const [isSLotOpen, setisSLotOpen] = useState(false)
    const [PLotList, SetPLotList] = useState([])
    const [VTypeList, SetVTypeList] = useState([])
    const [SlotList, SetSlotList] = useState([])
    const [FilteredOrgList, SetFilteredOrgList] = useState([])
    useEffect(() => {
        const currentDate = new Date();
        SetCurrentDate(formatDate(currentDate))
        GetParkingLotList()
    }, [])


    function formatDate(date) {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const month = months[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();
        return `${day} ${month}, ${year}`;
    }
    function GetParkingLotList() {

        var det = {
            "link": "Agent/getparkingmanagementData"
        }
        Get(det, (res, rej) => {

            SetPLotList(JSON.parse(res.data[0].PLots))

            SetVTypeList(JSON.parse(res.data[0].Vtypes))
            SetSlotList(JSON.parse(res.data[0].SlotList))
            SetFilteredOrgList(JSON.parse(res.data[0].SlotList))
        }, (err) => {

        });
    }
    function SearchFunc(e) {
        e.preventDefault()

        let s = e.target[0].value.toLowerCase()
        SetFilteredOrgList(PLotList.filter(i => i.OrganizationName.toLowerCase().startsWith(e.target[0].value.toLowerCase())))
    }

    const SuccessAdd = () => {
        setisLotOpen(false)
        GetParkingLotList()
    }
    const ToggleParkingSlot=(id,value)=>{
        var det = {
            "link": "Agent/toggleparkingslot?SlotID="+id+"&Status="+value
        }
        Get(det, (res, rej) => {
            var data =  FilteredOrgList
            var updatedData = data.map(item => {
                if (item.ParkingSlotID === id) {
                  return { ...item, IsActive: value === 1 ? true : false };
                } else {
                  return item;
                }
              });
           SetFilteredOrgList(updatedData)
        }, (err) => {

        });
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
                <div className="text-xl">Manage Parking</div>
                <div className="ml-auto text-lg font-medium">{CurrentDate}</div>
            </div>
            <div className=" px-32 mt-10">
                <div className="flex ">
                    <div className="ml-auto flex gap-2">
                        <div className="bg-slate-600 text-white hover:bg-slate-700 h-10 rounded-md flex gap-2 px-2  transition-all cursor-pointer" onClick={() => setisLotOpen(!isLotOpen)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="m-auto w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            <p className="my-auto">Add Parking lot</p>
                        </div>
                        <div className="bg-slate-600 text-white hover:bg-slate-700  h-10 rounded-md flex gap-2 px-2 transition-all cursor-pointer" onClick={() => setisSLotOpen(!isSLotOpen)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="m-auto w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            <p className="my-auto">Add Parking SLot</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-10  px-32">
                <table className="w-full">
                    <tr className="flex py-2 bg-slate-700 text-white">
                        <th className="w-2/12 text-center">S.No</th>
                        <th className="w-2/12 text-center">Floor</th>
                        <th className="w-2/12 text-center">Parking Lot</th>
                        <th className="w-2/12 text-center">Parking Slot</th>
                        <th className="w-2/12 text-center">Vehical Type</th>
                        <th className="w-2/12 text-center">Status</th>
                        <th className="w-2/12 text-center">Start/Stop</th>
                    </tr>
                    <tbody className="w-full">
                        {FilteredOrgList.map((item, idx) => {

                            return (<tr key={idx} className="flex py-2 transition-all hover:bg-slate-200"  >
                                <td className="w-2/12 text-center">{idx + 1}</td>
                                <td className="w-2/12 text-center">{floor_map[item.FloorNumber]}</td>
                                <td className="w-2/12 text-center">{item.ParkingLotName}</td>
                                <td className="w-2/12 text-center">{item.ParkingSlotName}</td>
                                <td className="w-2/12 text-center">{item.VehicalType}</td>
                                <td className="w-2/12 text-center">{item.Status ? "Active" : "InActive"}</td>
                                <td className="w-2/12 text-center flex">
                                    <div className="my-auto mx-auto">
                                        {item.IsActive && (<svg xmlns="http://www.w3.org/2000/svg" onClick={()=>ToggleParkingSlot(item.ParkingSlotID,0)} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:stroke-red-600 hover:fill-red-600 hover:scale-105 transition-all">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z" />
                                        </svg>)}
                                        {!item.IsActive && (<svg xmlns="http://www.w3.org/2000/svg" onClick={()=>ToggleParkingSlot(item.ParkingSlotID,1)} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="-6 h-6 hover:stroke-green-400  hover:fill-green-400 hover:scale-105 transition-all">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                                        </svg>
                                        )}
                                    </div>
                                </td>

                            </tr>)
                        })}
                    </tbody>
                </table>
            </div>
        </div>
        {isLotOpen && (
            <AddParkinglot Close={() => setisLotOpen(!isLotOpen)} Success={SuccessAdd} />
        )}
        {isSLotOpen && (
            <AddParkingSlot Close={() => setisSLotOpen(!isSLotOpen)} Success={SuccessAdd} PLotList={PLotList} VType={VTypeList} />
        )}
    </>)
}
export default ManageParking


const AddParkinglot = (props) => {

    const [Scale, SetScale] = useState('scale-0')
    const [Error, SetError] = useState('')
    const [Success, SetSuccess] = useState(false)
    const [Loading, SetLoading] = useState(false)
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
        SetSuccess(false)
        SetError('')
        SetLoading(true)
        var data = {
            "floor": e.target[0].value,
            "name": e.target[1].value.toUpperCase(),
        }
        AddParkinglot(data)
    }

    const AddParkinglot = (data) => {

        var det = {
            "link": "Agent/AddParkinglot",
            "data": JSON.stringify(data)
        }
        Post(det, (res, rej) => {
            SetSuccess(true)
            SetLoading(false)
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
                        <p className="text-center  text-2xl mb-4">Add Parking Lot</p>
                        <div id="NewOrgForm" name="NewOrgForm" className="flex flex-col gap-2">
                            <label htmlFor="Floor" className="font-medium">Floor</label>
                            <input type="number" name="Floor" min={0} className="border px-2 py-3 outline-none rounded-md" placeholder="GF=0,FF=1..." required />
                            <label htmlFor="LotName" className="font-medium">Parking Lot Name</label>
                            <input type="text" name="LotName" min={0} className="border px-2 py-3 outline-none rounded-md" placeholder="Parking Lot Name" required />
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
                            {Success && (
                                <p className="text-center my-auto pr-5 text-green-500 text-sm">Success !!</p>
                            )}
                            <button type="submit" disabled={Loading} className="inline-flex justify-center  rounded-md border border-transparent px-4 py-2 bg-green-600 text-base leading-6  text-white shadow-sm hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green transition ease-in-out duration-150ms sm:text-sm sm:leading-5">
                                {Loading ? <div className="animate-spin rounded-full border-b-2 border-white">
                                    <div className="w-5 h-5"></div>
                                </div> : 'Add'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </>)
}

const AddParkingSlot = (props) => {

    const [Scale, SetScale] = useState('scale-0')
    const [Error, SetError] = useState('')

    const [Loading, SetLoading] = useState(false)
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
        debugger
        var data = {
            "pLotID": e.target[0].value,
            "slotCount": parseInt(e.target[1].value),
            "vehicalTypeID": e.target[2].value
        }
        AddParkinglot(data)
    }

    const AddParkinglot = (data) => {

        var det = {
            "link": "Agent/insertslots",
            "data": JSON.stringify(data)
        }
        Post(det, (res, rej) => {

            SetLoading(false)
            props.Success()
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
                        <p className="text-center  text-2xl mb-4">Add Parking SLot</p>
                        <div id="NewOrgForm" name="NewOrgForm" className="flex flex-col gap-2">
                            <label htmlFor="Floor" className="font-medium">Floor</label>
                            <select name="Floor" min={0} className="border px-2 py-3 outline-none rounded-md" placeholder="" required >
                                {props.PLotList.map((lots, idx) => (
                                    <option key={idx} className="py-4" value={lots.ParkingLotID}>Floor {floor_map[lots.FloorNumber]}, {lots.ParkingLotName}</option>
                                ))}
                            </select>
                            <label htmlFor="SlotCount" className="font-medium">Parking Lot Name</label>
                            <input type="number" min={0} name="SlotCount" className="border px-2 py-3 outline-none rounded-md" placeholder="Number of slots" required />
                            <label htmlFor="VType" className="font-medium">Vehical Type</label>
                            <select name="VType" min={0} className="border px-2 py-3 outline-none rounded-md" placeholder="" required >
                                {props.VType.map((Vtype, idx) => (
                                    <option key={idx} className="py-4" value={Vtype.VehicalTypeID}>{Vtype.VehicalType}</option>
                                ))}
                            </select>
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
                                {Loading ? <div className="animate-spin rounded-full border-b-2 border-white">
                                    <div className="w-5 h-5"></div>
                                </div> : 'Add'}
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



