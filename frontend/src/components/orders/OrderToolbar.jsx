import React from "react";
import "./OrderToolbar.css";

const OrderToolbar = ({

    search,
    setSearch,

    status,
    setStatus

}) => {

    const statuses = [

        "All",

        "Processing",

        "Shipped",

        "Delivered",

        "Cancelled"

    ];

    return (

        <section className="orders-toolbar">

            <div className="toolbar-search">

                <input

                    type="text"

                    placeholder="Search by Team Name..."

                    value={search}

                    onChange={(e)=>

                        setSearch(e.target.value)

                    }

                />

            </div>

            <div className="toolbar-status">

                {

                    statuses.map(item=>(

                        <button

                            key={item}

                            className={

                                status===item

                                ?

                                "status-chip active"

                                :

                                "status-chip"

                            }

                            onClick={()=>

                                setStatus(item)

                            }

                        >

                            {item}

                        </button>

                    ))

                }

            </div>

        </section>

    );

};

export default OrderToolbar;