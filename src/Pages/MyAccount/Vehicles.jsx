import { useEffect, useState } from "react"
import { Get } from "../../components/Api"

const Vehicle = () => {
    const [VList, SetVList] = useState([])
    useEffect(() => {
        GetParkingList()
    }, [])
    const GetParkingList = async () => {
        var det = {
            "link": "Customer/GetVehicleList"
        }
        Get(det, (res, rej) => {
            SetVList(res.data)
        }, (err) => {

        });
    }
    return (<>
        <div className="mx-80 mt-16">
            <div className="w-full h-full flex flex-col">
                <p className="font-semi bold text-2xl text-center">Your Saved Vehicles</p>
                <div className="mt-5 flex-grow ">
                    <div className="flex flex-col gap-4 mb-20">
                        {VList.map((item, idx) => (
                            <VListCard item={item} key={idx} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default Vehicle


const VListCard = (props) => {
    debugger
    return (<>
        <div className="border flex gap-10 p-4 rounded-md">
            <div className="">
                {props.item.VehicalType1==='4 Wheeler'&&(<svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={150}
                    height={150}
                    viewBox="0 0 16 16"
                    {...props}
                >
                    <path
                        fill="#444"
                        d="m15 6.1-1.4-2.9c-.4-.7-1.1-1.2-1.9-1.2H4.3c-.8 0-1.5.5-1.9 1.2L1 6.1c-.6.1-1 .6-1 1.1v3.5c0 .6.4 1.1 1 1.2v2c0 .6.5 1.1 1.1 1.1H3c.5 0 1-.5 1-1.1V12h8v1.9c0 .6.5 1.1 1.1 1.1h.9c.6 0 1.1-.5 1.1-1.1v-2c.6-.1 1-.6 1-1.2V7.2c-.1-.5-.5-1-1.1-1.1zM4 8.4c0 .3-.3.6-.6.6H1.6c-.3 0-.6-.3-.6-.6v-.8c0-.3.3-.6.6-.6h1.8c.3 0 .6.3.6.6v.8zm6 2.6H6v-1h4v1zM2.1 6l1.2-2.4c.2-.4.6-.6 1-.6h7.4c.4 0 .8.2 1 .6L13.9 6H2.1zM15 8.4c0 .3-.3.6-.6.6h-1.8c-.3 0-.6-.3-.6-.6v-.8c0-.3.3-.6.6-.6h1.8c.3 0 .6.3.6.6v.8z"
                    />
                </svg>)}
                {props.item.VehicalType1==='2 Wheeler'&&(<svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlSpace="preserve"
                    width={150}
                    height={150}
                    style={{
                        enableBackground: "new 0 0 451.66 451.66",
                    }}
                    viewBox="0 0 451.66 451.66"
                    {...props}
                >
                    <path d="M397.884 217.461c.881-.868 1.736-1.715 2.56-2.537 10.797-10.797 15.417-21.94 13.73-33.119-1.75-11.611-10.229-21.74-24.521-29.292-18.274-9.656-74.508-38.746-75.073-39.039a10 10 0 0 0-14.315 11.238l8.234 33.965-66.88-14.592a9.995 9.995 0 0 0-8.132 1.77l-38.365 28.773-42.261-8.965-36.938-35.517a10.009 10.009 0 0 0-8.135-2.719l-98.995 12a9.995 9.995 0 0 0-8.614 8.036 9.998 9.998 0 0 0 5.014 10.661l120.526 66.045-11.528 9.278C103.263 223.254 88.617 217 72.528 217c-33.719 0-61.151 27.433-61.151 61.151 0 33.72 27.434 61.151 61.151 61.151 32.589 0 59.302-25.626 61.056-57.784h34.394l6.84 15.801a9.998 9.998 0 0 0 9.177 6.027h115.494a9.995 9.995 0 0 0 6.574-2.465c1.003-.875 10.445-9.12 23.349-20.568 1.145 32.721 28.104 58.989 61.097 58.989 33.721 0 61.152-27.433 61.152-61.151-.002-31.22-23.526-57.032-53.777-60.69zM72.528 299.304c-11.663 0-21.151-9.488-21.151-21.15 0-11.664 9.488-21.152 21.151-21.152s21.151 9.489 21.151 21.152c.001 11.661-9.488 21.15-21.151 21.15zm317.978 0c-11.663 0-21.15-9.488-21.15-21.15 0-11.664 9.487-21.152 21.15-21.152s21.152 9.489 21.152 21.152c.001 11.661-9.489 21.15-21.152 21.15z" />
                </svg>)}
            </div>
            <div className="flex flex-col">
                  <p className="text-xl font-medium ">{props.item.VehicalName} | {props.item.VehicalNumber}</p>
                  <p className="text-lg">{props.item.VehicalType1}</p>  
            </div> 
        </div>
    </>)
}