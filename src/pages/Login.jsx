import { useState, useEffect } from "react";
import Buttons from "../components/Buttons/Buttons";
import { FaCircleExclamation } from "react-icons/fa6";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../App";
import loginGif from "../assets/imgs/loginGif.gif";

const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const { loginUser, setLoginUser } = useContext(AuthContext)
    const navigate = useNavigate();

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    }

    useEffect(() => {
        if (loginUser) {
            navigate("/");
        }
    }, [loginUser])

    const handleSubmit = (event) => {
        event.preventDefault();

        // Reset errors
        setErrors({ email: '', password: '' });

        // Validation
        let isValid = true;
        if (form.email === '') {
            setErrors(errors => ({ ...errors, email: 'Email is required' }));
            isValid = false;
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(form.email)) {
            setErrors(errors => ({ ...errors, email: 'Invalid email address' }));
            isValid = false;
        }
        if (form.password === '') {
            setErrors(errors => ({ ...errors, password: 'Password is required' }));
            isValid = false;
        } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&/]{8,}$/.test(form.password)) {
            setErrors(errors => ({ ...errors, password: 'Password must contain minimum eight characters, at least one letter, one number, and one special character' }));
            isValid = false;
        }

        if (isValid) {
            // Handle form submission logic here
            try {
                setLoading(true);
                axios.post('http://localhost:8000/login', form, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(response => {
                    if (response.data.error) {
                        toast.error(response.data.message, {
                            position: toast.POSITION.TOP_RIGHT
                        });
                        setLoading(false);
                        console.log(response.data.message);
                    }
                    else {
                        toast.success(response.data.message, {
                            position: toast.POSITION.TOP_RIGHT
                        });
                        localStorage.setItem('user', JSON.stringify(response.data.user));
                        setLoginUser(response.data.user)
                        setLoading(false);
                        navigate("/");
                    }
                }).catch(error => {
                    console.log(error);
                });
            }
            catch (error) {
                console.log(error);
            }
        }
    }
    return (
        <>
            <main className="bg-white flex flex-col px-5">
                <section className="self-center w-full max-w-[1248px] mt-10 mb-24 max-md:max-w-full">
                    <div className="flex max-md:flex-col max-md:items-stretch max-md:gap-0">
                        <div className="hidden md:flex md:flex-col  items-stretch w-[41%] max-md:w-full max-md:ml-0">
                            <div className="bg-slate-50 shadow-lg flex grow flex-col justify-center align-middle w-full mx-auto px-5 py-16 rounded-[10px_0px_0px_10px] max-md:max-w-full">
                                <img src={loginGif} alt="Login" />
                            </div>
                        </div>
                        <div className="flex flex-col items-stretch w-[59%] max-md:w-full max-md:ml-0">
                            <div className="bg-slate-100 shadow-lg flex grow flex-col w-full mx-auto pt-20 pb-20 px-5 rounded-[10px_10px_10px_10px] md:rounded-[0px_10px_10px_0px] max-md:max-w-full">
                                <h2 className="text-slate-800 text-center text-xl font-semibold leading-[130%] self-center">Welcome back! Please enter your login details below.</h2>
                                <form onSubmit={handleSubmit} className="self-center flex w-[436px] max-w-full flex-col mt-10 max-md:mt-10">
                                    <div className="self-center flex w-[436px] max-w-full flex-col max-md:mt-10">
                                        <label htmlFor="email" className="text-slate-800 text-sm font-semibold leading-[130%] mt-5">Email</label>
                                        <input type="" id="email" name="email" className="text-neutral-500 text-sm leading-[130%] self-stretch border bg-white mt-2.5 pl-5 pr-5 py-3.5 rounded-md border-solid border-sky-800 max-md:max-w-full" placeholder="Enter your email here" value={form.email} onChange={handleChange} />
                                        {errors.email && <div className="text-red-600 text-sm pt-1 flex space-x-2 items-center"><div><FaCircleExclamation /></div><div>{errors.email}</div></div>}
                                        <label htmlFor="password" className="text-slate-800 text-sm font-semibold leading-[130%] mt-5">Password</label>
                                        <input type="password" id="password" name="password" className="text-neutral-500 text-sm leading-[130%] self-stretch border bg-white mt-2.5 pl-5 pr-5 py-3.5 rounded-md border-solid border-sky-800 max-md:max-w-full" placeholder="Enter your password here" value={form.password} onChange={handleChange} />
                                        {errors.password && <div className="text-red-600 text-sm pt-1 flex space-x-2 items-center"><div><FaCircleExclamation /></div><div>{errors.password}</div></div>}
                                        <div className="flex flex-col items-center mt-8 space-y-8">
                                            {loading ? <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-800"></div> :
                                                <Buttons
                                                    px="px-7"
                                                    py="py-2"
                                                    text="text-white"
                                                    bg="bg-sky-800"
                                                    border="border-sky-800"
                                                    hoverBg="hover:bg-white"
                                                    hoverBorderColor="hover:border-sky-800"
                                                    hoverText="hover:text-sky-800"
                                                >
                                                    Login
                                                </Buttons>
                                            }
                                            <div className="flex space-x-2">
                                                <div className="underline">Don't have an account? </div><Link to={"/register"}><p className="text-sky-800 font-semibold">Register</p></Link>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Login