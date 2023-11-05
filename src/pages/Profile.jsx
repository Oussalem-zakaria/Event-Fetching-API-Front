import { useContext, useEffect } from "react"
import { AuthContext } from "../App"
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const { loginUser, setLoginUser } = useContext(AuthContext)
    const navigate = useNavigate();
    useEffect(() => {
        if (!loginUser) {
            navigate("/login");
        }
    });
    
    if (!loginUser) {
        navigate("/login");
        return null
    }

    return (
        <>
            <div className="flex justify-center">
                <div className="flex flex-col items-center align-middle space-y-3 w-full md:w-1/2 my-10 px-5 py-8 bg-slate-100 rounded-md">
                    <div className="mb-2">
                        <img
                            className="inline-block h-20 w-20 rounded-full ring-2 ring-white"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                        />
                    </div>
                    <div className="flex flex-col items-start space-y-3">
                        <div className="flex space-x-3 bg-slate-50 px-5 py-3 rounded-lg w-full">
                            <h2 className="text-md text-slate-900 font-semibold">Username:</h2>
                            <h2>{loginUser.name}</h2>
                        </div>
                        <div className="flex space-x-3 bg-slate-50 px-5 py-3 rounded-lg w-full">
                            <h2 className="text-md text-slate-900 font-semibold">Email:</h2>
                            <h2>{loginUser.email}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile