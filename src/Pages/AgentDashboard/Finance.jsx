import { useEffect, useState } from "react";
import { Get, Post } from "../../components/Api";

const Finance = () => {
    const [CurrentDate, SetCurrentDate] = useState('')
    const [isLotOpen, setisLotOpen] = useState(false)
    const [PricingList, SetPricingList] = useState([])

   
    useEffect(() => {
        const currentDate = new Date();
        SetCurrentDate(formatDate(currentDate))
        GetPricingList()
    }, [])


    function formatDate(date) {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const month = months[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();
        return `${day} ${month}, ${year}`;
    }
    function GetPricingList() {

        var det = {
            "link": "Agent/parkingpricing"
        }
        Get(det, (res, rej) => {
            SetPricingList(res.data)

        }, (err) => {

        });
    }
    

    const SuccessAdd = () => {
        setisLotOpen(false)
        GetPricingList()
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
                <div className="text-xl">Finance</div>
                <div className="ml-auto text-lg font-medium">{CurrentDate}</div>
            </div>
            <div className=" px-32 mt-10">
                <div className="flex ">
                </div>
            </div>
            <div className="flex gap-20 ">
                <div className=" w-1/2  px-32">
                    <div className="flex">
                        <p className="mb-2 text-lg font-medium">Parking Price </p>
                        <div className="ml-auto flex gap-2 hover:bg-slate-200 transition-all my-2 px-2 rounded-md cursor-pointer" onClick={() => setisLotOpen(!isLotOpen)}>
                            <p className="">Edit</p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>

                        </div>
                    </div>
                    <table className="w-full">
                        <tr className="flex py-2 bg-gray-200">
                            <th className="w-1/2 text-center">Vehical Type</th>
                            <th className="w-1/2 text-center">Price per hour</th>
                        </tr>
                        <tbody className="w-full">
                            {PricingList.map((item, idx) => {

                                return (<tr key={idx} className={"flex py-2  " + (idx % 2 !== 0 ? "bg-gray-100" : "")}>
                                    <td className="w-1/2 text-center">{item.VehicalType}</td>
                                    <td className="w-1/2 text-center">{item.Price}</td>
                                </tr>)
                            })}
                        </tbody>
                    </table>
                </div>
                <div className=" w-1/2  px-32">
                    <p className="mb-2 text-lg font-medium">Total Revenue </p>
                    <table className="w-full">
                        <tr className="flex py-2 bg-gray-200">
                            <th className="w-1/2 text-center">Vehical Type</th>
                            <th className="w-1/2 text-center">Revenue</th>
                        </tr>
                        <tbody className="w-full">
                            {PricingList.map((item, idx) => {

                                return (<tr key={idx} className={"flex py-2  " + (idx % 2 !== 0 ? "bg-gray-100" : "")}>
                                    <td className="w-2/12 text-center">{idx + 1}</td>
                                    <td className="w-2/12 text-center"></td>

                                </tr>)
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        {isLotOpen && (
            <EditPricing Close={() => setisLotOpen(!isLotOpen)} Success={SuccessAdd} Data={PricingList} />
        )}

    </>)
}
export default Finance


const EditPricing = (props) => {

    const [Scale, SetScale] = useState('scale-0')
    const [Error, SetError] = useState('')
    const [Success, SetSuccess] = useState(false)
    const [Loading, SetLoading] = useState(false)
    const [Pricing,SetPricing] = useState([])
    useEffect(() => {
        SetScale('scale-100')
        SetPricing([...props.Data])
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
              var temp =  {
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
    const SetPrice=(value,ID)=>{
       
        let Index = Pricing.map(i=>i.VehicalTypeID).indexOf(ID)
        if(Index!==-1){
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
                        <p className="text-center  text-2xl mb-4">Pricing</p>
                        {Pricing.map((item,idx)=>(
                            <div className="flex" key={idx}>
                            <label htmlFor="Floor" className="font-medium my-auto w-1/2">{item.VehicalType}</label>
                            
                            <input  name="Floor" type="number"  value={item.Price} onChange={(e)=>SetPrice(e.target.value,item.VehicalTypeID)} className="border px-2 py-3 outline-none rounded-md" placeholder="GF=0,FF=1..." /> 
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

