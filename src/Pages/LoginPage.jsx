import { useNavigate } from "react-router-dom"

const Login=()=>{

    const nav = useNavigate()

function OnLogin(){
    nav('/home')
}
    return(<>
         <div className="w-full flex h-full justify-center align-middle">
            
                 <div className="md:w-1/5 rounded border mt-36 p-5">
                      <div className="flex flex-col gap-16 ">
                            <p className="text-center text-2xl">Login</p>
                            <div className="flex flex-col w-full gap-5">
                                <input type="text" className="border mx-auto w-4/5 px-2 py-3 outline-none rounded-md" placeholder="Email" />
                                <input type="text" className="border mx-auto w-4/5 px-2 py-3 outline-none rounded-md" placeholder="Password" />
                            </div>
                            <div className="flex flex-col w-full gap-5 pb-5">
                                <button className="border py-4 mx-10 rounded hover:bg-gray-100 transition-all" onClick={()=>OnLogin()}>
                                   Login
                                </button>
                                <div className="border-t pt-4">
                                <p className="text-center">Create a free account <span className="text-blue-400 hover:text-blue-500 transition-all cursor-pointer">Register</span></p>
                            </div>
                            </div>
                            
                      </div>
                 </div>
             
         </div>
    </>)
}

export default Login