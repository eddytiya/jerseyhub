import React from "react";
import JerseyCard from "./JerseyCard";
import EmptyState from "./EmptyState";
import "./JerseyList.css";

const JerseyList = ({

    jerseys,

    selectedJerseys,

    onSelect,

    onDelete,

    onToggleFeatured

}) => {

    if (!jerseys.length) {

        return <EmptyState />;

    }

    return (

        <section className="adminjersey-list">

            <div className="adminjersey-grid">

                {

                    jerseys.map((jersey) => (

                        <JerseyCard

                            key={jersey._id}

                            jersey={jersey}

                            selected={selectedJerseys?.includes(jersey._id)}

                            onSelect={onSelect}

                            onDelete={onDelete}

                            onToggleFeatured={onToggleFeatured}

                        />

                    ))

                }

            </div>

        </section>

    );

};

export default JerseyList;