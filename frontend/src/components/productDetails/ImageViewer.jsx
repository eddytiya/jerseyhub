import React, {

    useEffect,

    useRef,

    useState

} from "react";

import {

    FaTimes,

    FaPlus,

    FaMinus,

    FaUndo,

    FaChevronLeft,

    FaChevronRight

} from "react-icons/fa";

import "./ImageViewer.css";

const ImageViewer = ({

    images = [],

    currentImage,

    onClose

}) => {

    /* ==========================================
                IMAGE INDEX
    ========================================== */

    const initialIndex = Math.max(

        images.findIndex(

            img => img === currentImage

        ),

        0

    );

    const [currentIndex, setCurrentIndex] = useState(

        initialIndex

    );

    const [scale, setScale] = useState(1);

    const [position, setPosition] = useState({

        x:0,

        y:0

    });

    const [dragging,setDragging]=useState(false);

    const imageRef=useRef(null);

    const stageRef=useRef(null);

    const dragStart=useRef({

        x:0,

        y:0

    });

    /* ==========================================
                RESET IMAGE
    ========================================== */

    const resetImage=()=>{

        setScale(1);

        setPosition({

            x:0,

            y:0

        });

    };

    /* ==========================================
            CHANGE IMAGE
    ========================================== */

    const nextImage=()=>{

        if(images.length<=1)return;

        setCurrentIndex(

            prev=>

                (prev+1)%images.length

        );

        resetImage();

    };

    const previousImage=()=>{

        if(images.length<=1)return;

        setCurrentIndex(

            prev=>

                prev===0

                ?

                images.length-1

                :

                prev-1

        );

        resetImage();

    };

    /* ==========================================
            KEYBOARD
    ========================================== */

    useEffect(() => {

    const handleKey = (e) => {

        switch (e.key) {

            case "Escape":

                onClose();

                break;

            case "ArrowRight":

                nextImage();

                break;

            case "ArrowLeft":

                previousImage();

                break;

            default:

                break;

        }

    };

    window.addEventListener("keydown", handleKey);

    return () =>

        window.removeEventListener(

            "keydown",

            handleKey

        );

}, [currentIndex, images, onClose]);

useEffect(() => {

    const index = images.findIndex(

        img => img === currentImage

    );

    if (index !== -1) {

        setCurrentIndex(index);

        resetImage();

    }

}, [currentImage, images]);

    /* ==========================================
                ZOOM
    ========================================== */

    const handleWheel=(e)=>{

        e.preventDefault();

        const factor =

    e.deltaY < 0

        ? 1.12

        : 0.90;

        let zoom=scale*factor;

        if(zoom<1)zoom=1;

        if(zoom>8)zoom=8;

        setScale(zoom);

    };

    /* ==========================================
                DRAG
    ========================================== */

    const handleMouseDown=(e)=>{

        if(scale===1)return;

        setDragging(true);

        dragStart.current={

            x:e.clientX-position.x,

            y:e.clientY-position.y

        };

    };

    const handleMouseMove=(e)=>{

        if(!dragging)return;

        setPosition({

            x:e.clientX-dragStart.current.x,

            y:e.clientY-dragStart.current.y

        });

    };

    const handleMouseUp=()=>{

        setDragging(false);

    };

    /* ==========================================
            TOOLBAR BUTTONS
    ========================================== */

    const zoomIn=()=>{

        setScale(prev=>

            Math.min(prev+0.25,8)

        );

    };

    const zoomOut=()=>{

        setScale(prev=>

            Math.max(prev-0.25,1)

        );

    };

    return (

    <div

        className="viewer-backdrop"

        onClick={onClose}

    >

        <div

            className="viewer-container"

            onClick={(e)=>e.stopPropagation()}

        >

            {/* ======================================
                    TOOLBAR
            ====================================== */}

            <div className="viewer-toolbar">

                <button onClick={zoomIn}>

                    <FaPlus/>

                </button>

                <button onClick={zoomOut}>

                    <FaMinus/>

                </button>

                <button onClick={resetImage}>

                    <FaUndo/>

                </button>

                <button onClick={onClose}>

                    <FaTimes/>

                </button>

            </div>

            {/* ======================================
                PREVIOUS BUTTON
            ====================================== */}

            {

                images.length>1 &&

                <button

                    className="viewer-nav viewer-prev"

                    onClick={previousImage}

                >

                    <FaChevronLeft/>

                </button>

            }

            {/* ======================================
                NEXT BUTTON
            ====================================== */}

            {

                images.length>1 &&

                <button

                    className="viewer-nav viewer-next"

                    onClick={nextImage}

                >

                    <FaChevronRight/>

                </button>

            }

            {/* ======================================
                IMAGE COUNTER
            ====================================== */}

            {

                images.length>1 &&

                <div className="viewer-counter">

                    {

                        currentIndex+1

                    }

                    /

                    {

                        images.length

                    }

                </div>

            }

            {/* ======================================
                    IMAGE
            ====================================== */}

            <div

                ref={stageRef}

                className="viewer-stage"

                onWheel={handleWheel}

                onMouseMove={handleMouseMove}

                onMouseUp={handleMouseUp}

                onMouseLeave={handleMouseUp}

            >

                <img

                    ref={imageRef}

                    src={

                        images[currentIndex]

                    }

                    alt="Preview"

                    className="viewer-image"

                    draggable={false}

                    onMouseDown={handleMouseDown}

                    onDoubleClick={resetImage}

                    style={{

                        transform:`

                            translate(

                                ${position.x}px,

                                ${position.y}px

                            )

                            scale(${scale})

                        `,

                        cursor:

                            scale>1

                            ?

                            dragging

                                ?

                                "grabbing"

                                :

                                "grab"

                            :

                            "zoom-in"

                    }}

                />

            </div>

        </div>

    </div>

);

};

export default ImageViewer;