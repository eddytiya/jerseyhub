import React, { useEffect, useRef, useState } from "react";

import { FaChevronDown } from "../../utils/navbarIcons";

const statuses = [

    "Pending",

    "Processing",

    "Shipped",

    "Delivered",

    "Cancelled"

];
const OrderStatusBadge = ({

    status,

    orderId,

    onStatusChange

}) => {

    const [open, setOpen] = useState(false);

    const dropdownRef = useRef(null);

    useEffect(() => {

        const handleClickOutside = (e) => {

            if (

                dropdownRef.current &&

                !dropdownRef.current.contains(e.target)

            ) {

                setOpen(false);

            }

        };

        document.addEventListener(

            "mousedown",

            handleClickOutside

        );

        return () =>

            document.removeEventListener(

                "mousedown",

                handleClickOutside

            );

    }, []);

    const handleSelect = (newStatus) => {

        setOpen(false);

        if (newStatus !== status) {

            onStatusChange(

                orderId,

                newStatus

            );

        }

    };

    return (

        <div

            className="admin-orders-status-dropdown"

            ref={dropdownRef}

        >

            <button

                type="button"

                className={`admin-orders-status-trigger ${status.toLowerCase()}`}

                onClick={() =>

                    setOpen(!open)

                }

            >

                <span className="admin-orders-status-dot"/>

                <span>

                    {status}

                </span>

                <FaChevronDown

                    className={

                        open

                            ? "admin-orders-chevron rotate"

                            : "admin-orders-chevron"

                    }

                />

            </button>

            {

                open && (

                    <div className="admin-orders-status-menu">

                        {

                            statuses.map(item => (

                                <button

                                    key={item}

                                    type="button"

                                    className={`admin-orders-status-item ${item === status ? "active" : ""}`}

                                    onClick={() =>

                                        handleSelect(item)

                                    }

                                >

                                    <span

                                        className={`admin-orders-status-dot ${item.toLowerCase()}`}

                                    />

                                    {item}

                                </button>

                            ))

                        }

                    </div>

                )

            }

        </div>

    );

};

export default OrderStatusBadge;