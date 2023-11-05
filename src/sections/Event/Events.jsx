import axios from "axios";
import { useEffect, useState } from "react";
import Buttons from "../../components/Buttons/Buttons";
import CategoryNavbar from "../../components/NavBar/CategoryNavbar";

const Events = () => {

    const [events, setEvents] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(''); // all categories
    const [isHovered, setIsHovered] = useState([]);

    const handleMouseEnter = index => {
        setIsHovered(isHovered.map((val, i) => i === index ? true : val));
    }

    const handleMouseLeave = index => {
        setIsHovered(isHovered.map((val, i) => i === index ? false : val));
    }

    useEffect(() => {
        getEvents();
        getCategories();
    }, [selectedCategory])

    const getEvents = async () => {
        try {
            console.log(selectedCategory);
            if (selectedCategory) {
                const response = await axios.get(`http://localhost:8000/events/category/${selectedCategory}`);
                setEvents(response.data.events);
            } else {
                console.log("all categories")
                const response = await axios.get('http://localhost:8000/events');
                setEvents(response.data.events);
                setIsHovered(new Array(response.data.events.length).fill(false));
                console.log(response.data.events)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getCategories = async () => {
        try {
            const response = await axios.get('http://localhost:8000/category');
            setCategories(response.data.category);
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <>
            <CategoryNavbar
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />
            <div className="block space-y-5 mb-10 lg:flex lg:space-x-4 lg:space-y-0">
                {events.map(((event, index) => (
                    <div className="bg-slate-100 p-6 rounded-sm shadow-sm lg:w-1/3" key={index}>
                        <div className="flex flex-col space-y-5">
                            <div
                                className="rounded-md relative"
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={() => handleMouseLeave(index)}
                            >
                                <img
                                    className="rounded-md w-full h-full object-cover lg:h-60"
                                    src={event.event_image}
                                    alt=""
                                />
                                {isHovered[index] && (
                                    <div className="flex flex-col absolute rounded-md inset-0 bg-black bg-opacity-70 items-center justify-center">
                                        <p className="text-white font-semibold text-2xl">{event.name}</p>
                                        <p className="text-white font-semibold text-lg italic">{event.event_date}</p>
                                        <p className={event.ticket_available ? "text-green-400 font-semibold border-2 border-gray-300 px-5 py-2 my-3 rounded-lg" : "text-red-500 font-semibold border-2 border-gray-300 px-5 py-2 my-3 rounded-lg"}>
                                            {event.ticket_available ? "Tickets Available" : "Sold Out"}
                                        </p>
                                    </div>
                                )}
                            </div>
                            <div className="block space-y-4">
                                <div className="flex justify-between">
                                    <h1 className="font-bold text-slate-800 capitalize">{event.name}</h1>
                                    <p className="text-slate-900 font-semibold bg-slate-200 px-4 py-1 rounded-full capitalize">{event.catigorie_name}</p>
                                </div>
                                <div className="text-slate-700 italic text-justify">
                                    <p>{event.description}</p>
                                </div>
                                <div className="flex justify-between">
                                    <h3 className="text-slate-900 font-semibold text-right italic capitalize">{event.event_adresse}.</h3>
                                    <h3 className="text-slate-900 font-semibold text-right italic">{event.event_date}.</h3>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center mt-6">
                            <Buttons
                                px="px-5"
                                py="py-2"
                                text="text-sky-800"
                                bg="bg-white"
                                border="border-sky-800"
                                hoverBg={event.ticket_available ? "hover:bg-sky-800" : ""}
                                hoverBorderColor="hover:border-sky-800"
                                hoverText={event.ticket_available ? "hover:text-white" : ""}
                                additionClass={event.ticket_available ? "" : "cursor-not-allowed"}
                            >
                                Réserver
                            </Buttons>
                        </div>
                    </div>
                )))
                }
            </div>
        </>
    )
}

export default Events