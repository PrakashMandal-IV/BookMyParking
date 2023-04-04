import { useNavigate } from "react-router-dom"
import { NoAuthPost } from "../components/Api";
import { useEffect, useState } from "react";
const RegisterUser = (props) => {
    const [Error, SetError] = useState('')
    const [Loading, SetIsLoading] = useState(false)
    const nav = useNavigate()
    useEffect(() => {
       
    }, [])
    const OnLoginClick = (e) => {
        e.preventDefault()
        OnLogin(e.target[0].value, e.target[1].value,e.target[2].value)
    }


    const OnLogin = (name,email, pass) => {
        SetIsLoading(true)
        SetError('')
        var det = {
            "link": "User/register?Email=" + email + "&Password=" + pass+"&Name="+name
        }
        NoAuthPost(det, (res, rej) => {
            if (res.data.length !== 0) {
                localStorage.setItem('email', email)
                localStorage.setItem('pass', pass)
                sessionStorage.setItem('token', res.data[0].Token)
                nav('/')
            } else {
                SetError('Email already in use !!')
                SetIsLoading(false)
            }
        }, (err) => {
            SetError("Network Error! Please try again")
            SetIsLoading(false)
        });
    }
    return (<>
        <div className="w-full flex h-full justify-center align-middle">

            <div className="md:w-1/5 rounded border mt-36 p-5">
                <form onSubmit={OnLoginClick} className="flex flex-col gap-12 ">
                    <p className="text-center text-2xl">Create Free Account</p>
                    <div className="flex flex-col w-full gap-5">
                        <input type="text" name="RegName" className="border mx-auto w-4/5 px-2 py-3 outline-none rounded-md" placeholder="Name" required />
                        <input type="email" name="RegEmail" className="border mx-auto w-4/5 px-2 py-3 outline-none rounded-md" placeholder="Email" required />
                        <input type="password" name="RegPassword" className="border mx-auto w-4/5 px-2 py-3 outline-none rounded-md" placeholder="Password" required />
                    </div>
                    <div className="flex flex-col w-full gap-4 pb-5">
                        <button type="submit" disabled={Loading} className="w-4/5 mx-auto Inline-flex justify-center rounded-md border border-transparent px-4 py-2 bg-green-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green transition ease-in-out duration-150ms sm:text-sm sm:leading-5">
                            {Loading ? <div className="mx-auto animate-spin w-5 h-5 rounded-full border-b-2 border-white">
                                 
                            </div> : 'Register'}
                        </button>
                        <p className="text-center text-red-500">{Error}</p>
                        <div className="border-t pt-4">
                            <p className="text-center">Already have an account ? <span className="text-blue-400 hover:text-blue-500 transition-all cursor-pointer" onClick={()=>nav('/')}>Login</span></p>
                        </div>
                    </div>
                </form>
            </div>

        </div>
    </>)
}

export default RegisterUser