import React, {

    useEffect,
    useMemo,
    useState

} from "react";

import axios from "axios";

import API_URL from "../../utils/api";

import {

    FaTrash,
    FaEnvelope,
    FaUsers,
    FaSearch,
    FaCalendarDay,
    FaCalendarAlt

} from "react-icons/fa";

import { toast } from "react-toastify";

import "./ManageSubscribers.css";

const ManageSubscribers = () => {

    const [subscribers,setSubscribers]=useState([]);

    const [loading,setLoading]=useState(true);

    const [search,setSearch]=useState("");

    /* ==========================================
                FETCH
    ========================================== */

    const fetchSubscribers = async()=>{

        try{

            const resp = await axios.get(

                `${API_URL}/newsletter/all`,

                {

                    withCredentials:true

                }

            );

            setSubscribers(

                resp.data.subscribers

            );

        }

        catch(err){

            console.log(err);

            toast.error(

                "Failed to load subscribers."

            );

        }

        finally{

            setLoading(false);

        }

    };

    useEffect(()=>{

        fetchSubscribers();

    },[]);

    /* ==========================================
                DELETE
    ========================================== */

    const deleteSubscriber = async(id)=>{

        const confirmDelete = window.confirm(

            "Delete this subscriber?"

        );

        if(!confirmDelete) return;

        try{

            await axios.delete(

                `${API_URL}/newsletter/${id}`,

                {

                    withCredentials:true

                }

            );

            toast.success(

                "Subscriber deleted."

            );

            fetchSubscribers();

        }

        catch(err){

            toast.error(

                "Delete failed."

            );

        }

    };

    /* ==========================================
                SEARCH
    ========================================== */

    const filteredSubscribers = useMemo(()=>{

        return subscribers.filter(

            item=>

                item.email

                .toLowerCase()

                .includes(

                    search.toLowerCase()

                )

        );

    },[search,subscribers]);

    /* ==========================================
                STATS
    ========================================== */

    const today = new Date().toDateString();

    const todaySubscribers = subscribers.filter(

        item=>

            new Date(

                item.createdAt

            ).toDateString()===today

    ).length;

    const thisMonthSubscribers = subscribers.filter(

        item=>{

            const date = new Date(item.createdAt);

            const now = new Date();

            return (

                date.getMonth()===now.getMonth()

                &&

                date.getFullYear()===now.getFullYear()

            );

        }

    ).length;

    return(

        <div className="subscriber-page">

            {/* HEADER */}

            <div className="subscriber-header">

                <h2>

                    <FaEnvelope />

                    Newsletter Subscribers

                </h2>

            </div>

            {/* STATS */}

            <div className="subscriber-stats">

                <div className="subscriber-card">

                    <FaUsers />

                    <h3>

                        {subscribers.length}

                    </h3>

                    <p>

                        Total Subscribers

                    </p>

                </div>

                <div className="subscriber-card">

                    <FaCalendarDay />

                    <h3>

                        {todaySubscribers}

                    </h3>

                    <p>

                        Today

                    </p>

                </div>

                <div className="subscriber-card">

                    <FaCalendarAlt />

                    <h3>

                        {thisMonthSubscribers}

                    </h3>

                    <p>

                        This Month

                    </p>

                </div>

            </div>

            {/* SEARCH */}

            <div className="subscriber-search">

                <FaSearch />

                <input

                    type="text"

                    placeholder="Search subscriber..."

                    value={search}

                    onChange={(e)=>

                        setSearch(

                            e.target.value

                        )

                    }

                />

            </div>

            {/* TABLE */}

            {

                loading

                ?

                <div className="subscriber-loading">

                    <div className="spinner"></div>

                </div>

                :

                filteredSubscribers.length===0

                ?

                <div className="subscriber-empty">

                    <h3>

                        No Subscribers Found

                    </h3>

                    <p>

                        Newsletter subscribers will appear here.

                    </p>

                </div>

                :

                <div className="subscriber-table-wrapper">

                    <table className="subscriber-table">

                        <thead>

                            <tr>

                                <th>Email</th>

                                <th>Status</th>

                                <th>Subscribed On</th>

                                <th></th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                filteredSubscribers.map(

                                    subscriber=>(

                                        <tr

                                            key={subscriber._id}

                                        >

                                            <td>

                                                {subscriber.email}

                                            </td>

                                            <td>

                                                <span className="subscriber-status">

                                                    Active

                                                </span>

                                            </td>

                                            <td>

                                                {

                                                    new Date(

                                                        subscriber.createdAt

                                                    ).toLocaleDateString(

                                                        "en-IN",

                                                        {

                                                            day:"numeric",

                                                            month:"short",

                                                            year:"numeric"

                                                        }

                                                    )

                                                }

                                            </td>

                                            <td>

                                                <button

                                                    className="subscriber-delete"

                                                    onClick={()=>

                                                        deleteSubscriber(

                                                            subscriber._id

                                                        )

                                                    }

                                                >

                                                    <FaTrash />

                                                </button>

                                            </td>

                                        </tr>

                                    )

                                )

                            }

                        </tbody>

                    </table>

                </div>

            }

        </div>

    );

};

export default ManageSubscribers;