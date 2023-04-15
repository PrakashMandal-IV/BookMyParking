import { useEffect, useState } from "react";
import { Api, FileUpload, Get, Post } from "../../components/Api";
import StarRatings from "react-star-ratings";

const AgentOverView = () => {
    const [CurrentDate, SetCurrentDate] = useState('')
    const [OrgData, SetOrgData] = useState()
    const [OrgEditableData, SetOrgEditableData] = useState(null)
    const [OrgEditModal, SetOrgEditModal] = useState(false)
    const [OrgImage, SetOrgImage] = useState('')
    const [AddedImage, SetAddedImage] = useState(null)
    const [ImageChange, SetImageChange] = useState(false)
    const [InTime, SetInTime] = useState('')
    const [OutTime, SetOutTime] = useState('')


    const [TotalSlot, SetTotalSlot] = useState(0)
    const [ActiveSlot, SetActiveSlot] = useState(0)
    const [TotalRevenue, SetTotalRevenue] = useState(0)
    useEffect(() => {
        const currentDate = new Date();
        SetCurrentDate(formatDate(currentDate))
        GetOrgData()
    }, [])


    function formatDate(date) {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const month = months[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();
        return `${day} ${month}, ${year}`;
    }
    async function GetOrgData() {
        var det = {
            "link": "Agent/OverViewData"
        }
        Get(det, (res, rej) => {

            SetOrgData(res.data.Table[0])
            SetOrgEditableData(res.data.Table[0])
            SetOrgImage(Api + "orgthumb?OrgID=" + res.data.Table[0].OrganizationID + "&FileName=" + res.data.Table[0].Thumbnail)
            SetTime(res.data.Table[0].InTime, 'in')
            SetTime(res.data.Table[0].OutTime, 'out')
            SetTotalSlot(res.data.Table1[0].TotalSlot)
            SetActiveSlot(res.data.Table1[0].ActiveSlot)

            SetTotalRevenue(res.data.Table2[0].Revenue)
        }, (err) => {

        });
    }

    function SetTime(hours, type) {

        var meridiem = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours === 0 ? 12 : hours;
        var timeString = hours + ':00 ' + meridiem;
        if (type === "in") {
            SetInTime(timeString)
        } else {
            SetOutTime(timeString)
        }
    }
    const OrgEditClick = () => {
        SetOrgEditModal(true)
    }
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            SetImageChange(true)
            SetOrgImage(reader.result);

        };

        if (file) {
            SetAddedImage(file)
            reader.readAsDataURL(file);
        }
    };
    const OnImageChangeCancle = () => {
        SetOrgImage(Api + "orgthumb?OrgID=" + OrgData.OrganizationID + "&FileName=" + OrgData.Thumbnail)
        SetImageChange(false)
    }
    const OnImageSave = async () => {

        if (OrgData && AddedImage) {
            var det = {
                "link": "uploadorgthumb?TypeID=" + OrgData.OrganizationID,
                "file": AddedImage
            }
            FileUpload(det, (res, rej) => {
                SetImageChange(false)
                GetOrgData()
            }, (err) => {

            });

        }

    }
    return (<>
        <div className="pl-10 pr-20 pt-5 ">
            <div className="flex h-10">
                <div className="text-xl">Overview</div>
                <div className="ml-auto text-lg font-medium">{CurrentDate}</div>
            </div>
            <div className="flex px-20 w-full mt-10">
                <div className="max-w-[40%]  rounded-md overflow-hidden">
                    <img src={OrgImage} className=" object-cover pointer-events-none max-h-96" alt="" />
                </div>
                <div className="flex flex-col px-10 flex-grow">
                    <div className="flex flex-grow">
                        <div className="flex flex-col">
                            <p className="text-3xl font-semibold">{OrgData?.OrganizationName}</p>
                            <p className="">{OrgData?.City}, {OrgData?.State} <span className=" font-light ">{OrgData?.PinCode}</span> </p>
                            <p className="text-sm">{OrgData?.AddressLine1}</p>
                            <div className="mt-2">
                                <p className="">Total Ratings ({OrgData?.TotalRating})</p>
                                <StarRatings
                                    rating={OrgData?.AverageRating}
                                    starDimension="25px"
                                    starRatedColor="#475569"
                                    starHoverColor="#334155"
                                   
                                    numberOfStars={5}
                                    name='User Rating'
                                />
                            </div>
                            <div className="mt-auto mb-2">
                                <p className="text-sm font-medium mt-auto">Opens At : <span className="font-normal"> {InTime}</span></p>
                                <p className="text-sm font-medium mb-1">Close At : <span className="font-normal">{OutTime}</span></p>
                            </div>
                        </div>

                        <div className="ml-auto">
                            <div className="ml-auto flex gap-2 py-1 bg-gray-200 hover:bg-slate-300 transition-all my-2 px-2 rounded-md cursor-pointer" onClick={() => OrgEditClick()}>
                                <p className="">Edit</p>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>

                            </div>

                        </div>
                    </div>
                    <div className="flex h-3/6 gap-10 mt-auto">
                        <div className="flex-grow bg-slate-600 text-white shadow-lg  rounded-md flex flex-col p-4 ">
                            <p className="text-lg  ">Total Slots</p>
                            <p className="mt-auto ml-auto text-4xl">{TotalSlot}</p>
                        </div>
                        <div className="bg-slate-600 text-white   shadow-lg flex-grow rounded-md flex flex-col p-4 ">
                            <p className="text-lg  ">Active Slots</p>
                            <p className="mt-auto ml-auto text-4xl">{ActiveSlot}</p>
                        </div>
                        <div className="bg-slate-600 text-white shadow-lg flex-grow rounded-md flex flex-col p-4 ">
                            <p className="text-lg  ">Total Revenue</p>
                            <p className="mt-auto ml-auto text-xl">Rs {TotalRevenue}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex py-2  flex-grow px-20">
                {!ImageChange && (<> <label
                    htmlFor="imageInput"
                    className="bg-slate-500 text-white hover:bg-slate-600  px-4 py-2 rounded cursor-pointer  transition duration-200"
                >
                    Set New Image
                </label>
                    <input
                        id="imageInput"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageChange}
                    /></>)}
                {ImageChange && (<>
                    <div className="flex gap-5">
                        <button className="px-3 py-1 bg-red-500 text-white hover:bg-red-600 transition duration-200 rounded" onClick={OnImageChangeCancle}>Cancle</button>
                        <button className="px-3 py-1 bg-blue-500 text-white hover:bg-blue-600 transition duration-200 rounded" onClick={() => OnImageSave()}>Save</button>
                    </div>
                </>)}
            </div>
            {OrgEditModal && (
                <EditOrg Close={() => SetOrgEditModal(!OrgEditModal)} Data={OrgEditableData} />
            )}
        </div>
    </>)
}
export default AgentOverView


const EditOrg = (props) => {

    const [Scale, SetScale] = useState('scale-0')
    const [Error, SetError] = useState('')
    const [Success, SetSuccess] = useState(false)
    const [Loading, SetLoading] = useState(false)
    const [Pricing, SetPricing] = useState([])
    useEffect(() => {
        SetScale('scale-100')
    }, [])
    const OnClose = () => {
        SetScale('scale-0')
        setTimeout(() => {
            props.Close()
        }, 150);
    }

    const AddParkinglot = () => {
        SetLoading(true)
        var data = []
        Pricing.forEach(element => {
            var temp = {
                "vehicleTypeID": element.VehicalTypeID,
                "price": element.Price
            }
            data.push(temp)
        });
        var det = {
            "link": "Agent/setPricing",
            "data": JSON.stringify(data)
        }
        Post(det, (res, rej) => {
            props.Success()
            SetLoading(false)
        }, (err) => {
            SetError('Something went wrong , Please try again')
            SetLoading(false)
        });
    }
    const SetPrice = (value, ID) => {

        let Index = Pricing.map(i => i.VehicalTypeID).indexOf(ID)
        if (Index !== -1) {
            let data = Pricing
            data[Index].Price = parseFloat(value)
            SetPricing([...data])
        }
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
                        <p className="text-center  text-2xl mb-4">Edit</p>
                        {Pricing.map((item, idx) => (
                            <div className="flex" key={idx}>
                                <label htmlFor="Floor" className="font-medium my-auto w-1/2">{item.VehicalType}</label>
                                <input name="Floor" type="number" value={item.Price} onChange={(e) => SetPrice(e.target.value, item.VehicalTypeID)} className="border px-2 py-3 outline-none rounded-md" placeholder="GF=0,FF=1..." />
                            </div>
                        ))}
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
                            <button onClick={AddParkinglot} disabled={Loading} className="inline-flex justify-center  rounded-md border border-transparent px-4 py-2 bg-green-600 text-base leading-6  text-white shadow-sm hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green transition ease-in-out duration-150ms sm:text-sm sm:leading-5">
                                {Loading ? <div className="animate-spin rounded-full border-b-2 border-white">
                                    <div className="w-5 h-5"></div>
                                </div> : 'Add'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}
