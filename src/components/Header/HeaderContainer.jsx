import { Link, useNavigate } from "react-router-dom";
import Buttons from "../Buttons/Buttons";
import Links from "./Links";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../../App";
import { BiLogOut } from "react-icons/bi";

const HeaderContainer = () => {
    const { loginUser, setLoginUser } = useContext(AuthContext)
    const navigate = useNavigate();

    const logout = () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': `${loginUser.apiKey}`
            },
        }
        try {
            axios.post('http://localhost:8000/logout',
                { user_id: loginUser.id }, config).then(response => {
                    if (response.data.error) {
                        toast.error("Something went wrong, try later", {
                            position: toast.POSITION.TOP_RIGHT
                        })
                        console.log(response.data.message);
                    }
                    else {
                        toast.success(response.data.message, {
                            position: toast.POSITION.TOP_RIGHT
                        })
                        localStorage.removeItem("user");
                        setLoginUser(null)
                        navigate("/login")
                    }
                }).catch(error => {
                    toast.error("Something went wrong, try later", {
                        position: toast.POSITION.TOP_RIGHT
                    })
                    console.log(error);
                });
        }
        catch (error) {
            toast.error("Something went wrong, try later", {
                position: toast.POSITION.TOP_RIGHT
            })
            console.log(error);
        }

    }
    return (
        <>
            <Link to={"/"}><Links>Home</Links></Link>
            {
                loginUser ?
                    <Link to={"/profile"}><Links>Profile</Links></Link>
                    : null
            }
            <Links>FAQ</Links>
            <Links>News</Links>
            <Links>Contact</Links>
            {
                !loginUser ?
                    <Link to={"/register"}>
                        <Buttons
                            px="px-5"
                            py="py-2"
                            text="text-white"
                            bg="bg-sky-800"
                            border="border-sky-800"
                            hoverBg="hover:bg-white"
                            hoverBorderColor="hover:border-sky-800"
                            hoverText="hover:text-sky-800"
                        >
                            Me connecter
                        </Buttons>
                    </Link>
                    : <button className="flex items-center space-x-1 text-red-600 font-bold" onClick={() => logout()}><div><BiLogOut size={22} /></div> <div>Logout</div></button>
            }
        </>
    )
}

export default HeaderContainer;