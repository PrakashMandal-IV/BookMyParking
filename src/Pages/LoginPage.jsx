import { useNavigate } from "react-router-dom"
import { NoAuthPost } from "../components/Api";
import { useEffect, useState } from "react";

const Login = (props) => {
    const [Error, SetError] = useState('')
    const [Loading, SetIsLoading] = useState(false)
    useEffect(() => {
        SetError('')
        SetIsLoading(false)
        let Email = localStorage.getItem('email')
        let pass = localStorage.getItem('pass')
        if ((Email && pass)) {
            OnLogin(Email, pass)
        }
    }, [])
    const OnLoginClick = (e) => {
        e.preventDefault()
        OnLogin(e.target[0].value, e.target[1].value)
    }


    const OnLogin = (email, pass) => {

        SetIsLoading(true)
        SetError('')
        var det = {
            "link": "User/Login?Email=" + email + "&Password=" + pass
        }
        NoAuthPost(det, (res, rej) => {
            if (res.data.length !== 0) {
                localStorage.setItem('email', email)
                localStorage.setItem('pass', pass)
                sessionStorage.setItem('token', res.data[0].Token)
                props.OnLogin(res.data[0])
            } else {
                SetError('User Not Found !!')
            }

        }, (err) => {
            //error
            SetError("Network Error! Please try again")
            SetIsLoading(false)
        });
    }
    return (<>
        <div className="w-full flex h-full justify-center align-middle">

            <div className="md:w-1/5 rounded border mt-36 p-5">
                <form onSubmit={OnLoginClick} className="flex flex-col gap-12 ">
                    <p className="text-center text-2xl">Login</p>
                    <div className="flex flex-col w-full gap-5">
                        <input type="email" name="LoginEmail" className="border mx-auto w-4/5 px-2 py-3 outline-none rounded-md" placeholder="Email" required />
                        <input type="password" name="LoginPassword" className="border mx-auto w-4/5 px-2 py-3 outline-none rounded-md" placeholder="Password" required />
                    </div>
                    <div className="flex flex-col w-full gap-4 pb-5">
                        <button type="submit" className="w-4/5 mx-auto Inline-flex justify-center rounded-md border border-transparent px-4 py-2 bg-green-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green transition ease-in-out duration-150ms sm:text-sm sm:leading-5">
                            Login
                        </button>
                        <p className="text-center text-red-500">{Error}</p>
                        <div className="border-t pt-4">
                            <p className="text-center">Create a free account <span className="text-blue-400 hover:text-blue-500 transition-all cursor-pointer">Register</span></p>
                        </div>
                    </div>
                </form>
            </div>

        </div>
    </>)
}

export default Login