import React, { useState } from "react";
import { FaCalendarAlt, FaTshirt, FaRulerHorizontal } from "react-icons/fa";
import SizeGuideModal from "./SizeGuideModal";
import ShareButtons from "./ShareButtons";

const ProductInfo = ({ jersey }) => {

    const [showSizeGuide, setShowSizeGuide] = useState(false);

    return (

        <div className="product-info">

            <span className="product-category">

                {jersey.category}

            </span>

            <h1>

                {jersey.jerseyName}

            </h1>

            <h3>

                {jersey.teamName}

            </h3>

            <div className="product-price">

                ₹ {jersey.price}

            </div>

            {

                jersey.stock > 0 ?

                (

                    <div className="stock available">

                        ✓ {jersey.stock} In Stock

                    </div>

                )

                :

                (

                    <div className="stock unavailable">

                        Out Of Stock

                    </div>

                )

            }

            <div className="product-meta">

                <div className="meta-badge">

                    <FaCalendarAlt />

                    <div>
                        <span className="meta-label">Season</span>
                        <strong>{jersey.season}</strong>
                    </div>

                </div>

                {
                    jersey.productType?.typeName && (
                        <div className="meta-badge">

                            <FaTshirt />

                            <div>
                                <span className="meta-label">Type</span>
                                <strong>{jersey.productType.typeName}</strong>
                            </div>

                        </div>
                    )
                }

                <div className="meta-badge sizes-meta">

                    <FaRulerHorizontal />

                    <div>
                        <span className="meta-label">Sizes</span>
                        <div className="size-pills">
                            {
                                jersey.sizes?.map((size) => (
                                    <span className="size-pill" key={size}>
                                        {size}
                                    </span>
                                ))
                            }
                        </div>
                    </div>

                    <button
                        type="button"
                        className="size-guide-trigger"
                        onClick={() => setShowSizeGuide(true)}
                    >
                        Size Guide
                    </button>

                </div>

            </div>

            <ShareButtons title={`${jersey.teamName} - ${jersey.jerseyName}`} />

            {
                showSizeGuide && (
                    <SizeGuideModal onClose={() => setShowSizeGuide(false)} />
                )
            }

        </div>

    );

};

export default ProductInfo;