import { useState } from "react"
import { Api, FileUpload } from "../../components/Api"

const MyAccount = () => {
    const [OrgData, SetOrgData] = useState(null)
    const [AddedImage, SetAddedImage] = useState(null)
    const [ImageChange, SetImageChange] = useState(false)
    const [UserImage,SetUserImage] = useState('')

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            SetImageChange(true)
            SetUserImage(reader.result);

        };

        if (file) {
            SetAddedImage(file)
            reader.readAsDataURL(file);
        }
    };
    const OnImageChangeCancle = () => {
       // SetUserImage(Api + "orgthumb?OrgID=" + OrgData.OrganizationID + "&FileName=" + OrgData.Thumbnail)
       SetUserImage('https://i.pinimg.com/736x/59/48/ef/5948ef67758be98738482ec354742996.jpg')
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
               
            }, (err) => {

            });

        }

    }
    return (<>
        <div className="pl-10 pr-20 pt-5 ">

            <div className="flex px-20 w-full mt-10">
                <div className="max-w-[40%]  rounded-md overflow-hidden">
                    <img src={UserImage} className=" object-cover pointer-events-none max-h-96" onError={()=>SetUserImage('https://i.pinimg.com/564x/d9/7b/bb/d97bbb08017ac2309307f0822e63d082.jpg')} alt="" />
                </div>
                <div className="flex flex-col px-10 flex-grow">
                    <div className="flex flex-grow">
                        <div className="flex flex-col">
                            <p className="text-3xl font-semibold">{OrgData?.OrganizationName}</p>

                            <p className="text-sm">{OrgData?.AddressLine1}</p>
                        </div>

                        <div className="ml-auto">
                            <div className="ml-auto flex gap-2 py-1 bg-gray-200 hover:bg-slate-300 transition-all my-2 px-2 rounded-md cursor-pointer">
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
                            <p className="mt-auto ml-auto text-4xl"></p>
                        </div>
                        <div className="bg-slate-600 text-white   shadow-lg flex-grow rounded-md flex flex-col p-4 ">
                            <p className="text-lg  ">Active Slots</p>
                            <p className="mt-auto ml-auto text-4xl"></p>
                        </div>
                        <div className="bg-slate-600 text-white shadow-lg flex-grow rounded-md flex flex-col p-4 ">
                            <p className="text-lg  ">Total Revenue</p>
                            <p className="mt-auto ml-auto text-xl">Rs</p>
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
        </div>
    </>)
}
export default MyAccount