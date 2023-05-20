import { useEffect, useState } from "react"
import { Api, FileUpload, Get, Post } from "../../components/Api"

const MyAccount = (props) => {
   
    const [OrgData, SetOrgData] = useState(null)
    const [AddedImage, SetAddedImage] = useState(null)
    const [ImageChange, SetImageChange] = useState(false)
    const [UserImage,SetUserImage] = useState('')
    const [OrgEditModal, SetOrgEditModal] = useState(false)

useEffect(()=>{
    
    SetUserImage(Api + "profilepic?UserID=" + props?.UserData?.UserID + "&FileName=" + props?.UserData?.ProfilePic)
},[props])
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
        SetUserImage(Api + "profilepic?UserID=" + props?.UserData?.UserID + "&FileName=" + props?.UserData?.ProfilePic)
       
        SetImageChange(false)
    }
    const OnImageSave = async () => {
    
        if (AddedImage) {
            var det = {
                "link": "uploadprofilepic?TypeID=" + props?.UserData?.UserID,
                "file": AddedImage
            }
            FileUpload(det, (res, rej) => {
                props.OnUpdateName()
                SetImageChange(false)
               
            }, (err) => {

            });

        }

    }
    const OrgEditClick = () => {
        SetOrgEditModal(true)
    }
    const OnNameUpdate=()=>{
        props.OnUpdateName()
        SetOrgEditModal(false)
    }
    return (<>
        <div className="md:pl-10 md:pr-20 pt-5 ">

            <div className="flex flex-col gap-5 md:gap-1 md:flex-row md:px-20 w-full mt-10">
                <div className="max-w-[40%] mx-auto  rounded-md overflow-hidden">
                    <img src={UserImage} className=" object-cover pointer-events-none max-h-96" onError={()=>SetUserImage('https://i.pinimg.com/564x/d9/7b/bb/d97bbb08017ac2309307f0822e63d082.jpg')} alt="" />
                </div>
                <div className="flex flex-col px-10 flex-grow">
                    <div className="flex flex-grow">
                        <div className="flex flex-col">
                            <p className="text-3xl font-semibold">{props?.UserData?.FullName}</p>

                            <p className="text-sm">{props?.UserData?.Email}</p>
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
                   
                </div>
            </div>
            <div className="flex py-2  flex-grow px-10  md:px-20">
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
                <EditOrg Close={() => SetOrgEditModal(!OrgEditModal)} Name={props?.UserData?.FullName} OnUpdate={OnNameUpdate} />
            )}
        </div>
    </>)
}
export default MyAccount

const EditOrg = (props) => {

    const [Scale, SetScale] = useState('scale-0')
    const [Error, SetError] = useState('')
    const [Success, SetSuccess] = useState(false)
    const [Loading, SetLoading] = useState(false)
    const [Name,SetName] = useState(props.Name)
    useEffect(() => {
        SetScale('scale-100')
    }, [])
    const OnClose = () => {
        SetScale('scale-0')
        setTimeout(() => {
            props.Close()
        }, 150);
    }

    
   
const UpdateName=()=>{
    SetLoading(true)
    var det = {
        "link": "User/UpdateName?NewName="+Name.replaceAll("'",'"')
    }
    Get(det, (res, rej) => {
         props.OnUpdate()
       
    }, (err) => {

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
                <div className={"inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full  " + Scale}>
                        <p className="text-xl text-center mt-4">Update Name</p>
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 flex">
                        
                      <input type="email" name="UserName" className="border mx-auto w-4/5 px-2 py-3 outline-none rounded-md" value={Name} placeholder="Name" onChange={(e)=>SetName(e.target
                        .value)} />
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
                            <button onClick={UpdateName} disabled={Loading} className="inline-flex justify-center  rounded-md border border-transparent px-4 py-2 bg-green-600 text-base leading-6  text-white shadow-sm hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green transition ease-in-out duration-150ms sm:text-sm sm:leading-5">
                                {Loading ? <div className="animate-spin rounded-full border-b-2 border-white">
                                    <div className="w-5 h-5"></div>
                                </div> : 'Update'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}
