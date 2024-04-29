/* eslint-disable @typescript-eslint/ban-types */
import { Link } from "react-router-dom";
import { user } from "../utils/helpers";
import { useRef, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ApiException, Fetcher } from "../lib/fetcher";
import { Event } from "../@types";
import { IconCalendarMonth, IconCircleMinus, IconCirclePlus, IconClock } from "@tabler/icons-react";
import { toastMessage } from "../components/shared/toast";

const HomePage = () => {
    const ticketsSection = useRef<HTMLDivElement>(null);
    const { data: eventsData } = useQuery<any, ApiException, { data: Event[] }>({
        queryKey: ["Events"],
        queryFn: () => Fetcher.get("/event/all"),
        retry: false,
    });

    return (
        <>
            <header className="bg-[url('https://cdn.pixabay.com/photo/2018/05/10/11/34/concert-3387324_1280.jpg')] bg-cover bg-no-repeat h-[100vh] text-white w-full">
                <div className="h-full flex flex-col w-full bg-black/60">
                    <nav className="flex justify-between p-4 max-w-7xl mx-auto w-full">
                        <h1 className="font-extrabold text-2xl">Eventa</h1>
                        <ul>
                            <li className="flex gap-8 items-center">
                                <Link to="/">Home</Link>
                                <Link to="#" onClick={(e) => {
                                    e.preventDefault();
                                    if (ticketsSection?.current) {
                                        ticketsSection.current?.scrollIntoView({ behavior: "smooth" })
                                    }
                                }}>Events</Link>
                                <Link to="/dashboard/bookings">Tickets</Link>
                                {user.userId ? <Link to="/dashboard" className="bg-primary p-2 px-12 rounded-full">Dashboard</Link> :
                                    <Link to="/auth" className="bg-primary p-2 px-12 rounded-full">Login</Link>
                                }
                            </li>
                        </ul>
                    </nav>
                    <div className="max-w-7xl mx-auto text-center h-full w-full flex flex-col items-center gap-12 justify-center">
                        <h1 className="text-6xl font-bold">The Best E-tickets<br />Booking Platform App</h1>
                        <p>Seamless tickets booking for various events at any time any place<br />
                            we are thrilled to welcome you here on this platform
                        </p>
                        <button
                            className="bg-primary p-3 px-12 rounded-full"
                            onClick={() => {
                                if (ticketsSection?.current) {
                                    ticketsSection.current?.scrollIntoView({ behavior: "smooth" })
                                }
                            }}
                        >
                            Get Started
                        </button>
                        <div />
                        <div />
                    </div>
                </div>
            </header>
            <main className="max-w-7xl mx-auto">
                <section className="py-10" id="Tickets" ref={ticketsSection}>
                    <h1 className="text-2xl font-bold text-primary">Booking Events</h1>
                    <div className="grid grid-cols-3 gap-10 mt-10">
                        {eventsData?.data?.map((eventItem) => {
                            return <EventCard key={eventItem.eventId} eventItem={eventItem} />
                        })}
                    </div>
                </section>
            </main>
            <footer className="bg-primary p-10 text-white text-center mt-20">
                <p>&copy; Copyright 2024 - Eventa</p>
            </footer>
        </>
    );
}


const EventCard = ({ eventItem }: { eventItem: Event }) => {
    const [nbrTickets, setNbrTickets] = useState(0);
    const { mutate, isLoading } = useMutation<any, ApiException, {}, any>({
        mutationFn: () => Fetcher.post(`/booking/create/${eventItem.eventId}`, {
            "tickets": nbrTickets,
        }),
        onSuccess: () => {
            toastMessage(`🎉 Event <b>${eventItem.name}</b> was booked succesfully! Go to <b>Tickets</b> to view more details.`, 'info');
        },
        onError: (e: ApiException) => {
            toastMessage(e.message, 'error');
        }
    });

    return <div className="shadow-lg rounded-3xl overflow-hidden">
        <div className="h-[250px] w-full">
            <img src={eventItem.image} alt={eventItem.name} className="h-full w-full object-cover" />
        </div>
        <div className="p-6 pt-3 flex flex-col gap-2">
            <div className="flex justify-between gap-4">
                <h2 className="text-xl font-bold">
                    {eventItem.name}
                </h2>
                <span className="text-sm text-gray-700 font-semibold whitespace-nowrap">{eventItem.price.toLocaleString()} Rwf</span>
            </div>
            <p>{eventItem.description}</p>
            <div className="flex gap-2 items-center py-2">
                <IconCalendarMonth size={20} className="text-primary" />
                <span>{new Date(eventItem.date).toLocaleDateString()}</span>
                <div className="flex-1" />
                <IconClock size={20} className="text-primary" />
                <span>{eventItem.time.substring(0, 5)}</span>
            </div>
            <div className="flex justify-between pb-4">
                <span>
                    Number of Tickets:
                </span>
                <div className="flex gap-2">
                    <button
                        onClick={() => {
                            if (nbrTickets > 0) {
                                setNbrTickets(prev => prev - 1);
                            }
                        }}
                    ><IconCircleMinus size={20} className="text-primary" /></button>
                    <div className="border w-[50px] cursor-text text-center border-primary/20">{nbrTickets}</div>
                    <button
                        onClick={() => {
                            if (nbrTickets <= eventItem.availableTickets) {
                                setNbrTickets(prev => prev + 1);
                            }
                        }}
                    ><IconCirclePlus size={20} className="text-primary" /></button>
                </div>
            </div>
            <button className="bg-white text-primary font-semibold border hover:bg-primary hover:text-white border-primary p-2 rounded-full" onClick={() => {
                if (nbrTickets>=0) {
                    mutate({});
                }
            }} disabled={isLoading}>
                <span>{isLoading ? "Loading, please wait..." : "Book Event"}</span>
            </button>
        </div>
    </div>
}

export default HomePage;