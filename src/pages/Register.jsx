import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { FaCircleExclamation } from "react-icons/fa6";
import Buttons from "../components/Buttons/Buttons";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../App";
import loginGif from "../assets/imgs/loginGif.gif";

const Register = () => {
    const [form, setForm] = useState({ email: '', password: '', username: '' });
    const [errors, setErrors] = useState({ email: '', password: '', username: '' });
    const [loading, setLoading] = useState(false);
    const { loginUser, setLoginUser } = useContext(AuthContext)
    const navigate = useNavigate();

    useEffect(() => {
        if (loginUser) {
            navigate("/");
        }
    })

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        // Reset errors
        setErrors({ email: '', password: '', username: '' });

        // Validation
        let isValid = true;
        if (form.username === '') {
            setErrors(errors => ({ ...errors, username: 'Username is required' }));
            isValid = false;
        }
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
                axios.post('http://localhost:8000/register', form, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(response => {
                    if (response.data.error) {
                        toast.error(response.data.message, {
                            position: toast.POSITION.TOP_RIGHT
                        });
                        setLoading(false);
                        navigate("/login")
                        console.log(response.data.message);
                    } else {
                        toast.success(response.data.message, {
                            position: toast.POSITION.TOP_RIGHT
                        });
                        setLoading(false);
                        navigate("/login");
                    }
                }).catch(error => {
                    setLoading(false);
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
                        <div className="hidden md:flex md:flex-col items-stretch w-[41%] max-md:w-full max-md:ml-0">
                            <div className="bg-slate-50 shadow-lg flex grow flex-col justify-center align-middle w-full mx-auto px-5 py-16 rounded-[30px_0px_0px_30px] max-md:max-w-full">
                                <img src={loginGif} alt="register" />
                            </div>
                        </div>
                        <div className="flex flex-col items-stretch w-[59%] max-md:w-full max-md:ml-0">
                            <div className="bg-slate-100 shadow-lg flex grow flex-col w-full mx-auto pt-24 pb-20 px-5 rounded-[10px_10px_10px_10px] md:rounded-[0px_10px_10px_0px] max-md:max-w-full">
                                <h2 className="text-slate-800 text-center text-xl font-semibold leading-[130%] self-center">Welcome! Please enter your registration details below.</h2>
                                <form onSubmit={handleSubmit} className="self-center flex w-[436px] max-w-full flex-col mt-10 max-md:mt-10">
                                    <div className="self-center flex w-[436px] max-w-full flex-col max-md:mt-10">
                                        <label htmlFor="username" className="text-black text-sm leading-[130%] mt-5">Username</label>
                                        <input type="text" id="username" name="username" className="text-neutral-500 text-sm leading-[130%] self-stretch border bg-white mt-2.5 pl-5 pr-5 py-3.5 rounded-md border-solid border-sky-800 max-md:max-w-full" placeholder="Enter your username here" value={form.username} onChange={handleChange} />
                                        {errors.username && <div className="text-red-600 text-sm pt-1 flex space-x-2 items-center"><div><FaCircleExclamation /></div><div>{errors.username}</div></div>}

                                        <label htmlFor="email" className="text-slate-800 text-sm font-semibold leading-[130%] mt-5">Email</label>
                                        <input type="" id="email" name="email" className="text-neutral-500 text-sm leading-[130%] self-stretch border bg-white mt-2.5 pl-5 pr-5 py-3.5 rounded-md border-solid border-sky-800 max-md:max-w-full" placeholder="Enter your email here" value={form.email} onChange={handleChange} />
                                        {errors.email && <div className="text-red-600 text-sm pt-1 flex space-x-2 items-center"><div><FaCircleExclamation /></div><div>{errors.email}</div></div>}

                                        <label htmlFor="password" className="text-slate-800 text-sm font-semibold leading-[130%] mt-5">Password</label>
                                        <input type="password" id="password" name="password" className="text-neutral-500 text-sm leading-[130%] self-stretch border bg-white mt-2.5 pl-5 pr-5 py-3.5 rounded-md border-solid border-sky-800 max-md:max-w-full" placeholder="Enter your password here" value={form.password} onChange={handleChange} />
                                        {errors.password && <div className="text-red-600 text-sm pt-1 flex space-x-2 items-center"><div><FaCircleExclamation /></div><div>{errors.password}</div></div>}
                                        <div className="flex flex-col mt-8 items-center space-y-5">
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
                                                    Register
                                                </Buttons>
                                            }
                                            <div className="flex space-x-2">
                                                <div className="underline">Already have an account? </div><Link to={"/login"}><p className="text-sky-800 font-semibold">Login</p></Link>
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

export default Register