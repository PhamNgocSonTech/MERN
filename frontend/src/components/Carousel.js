import React from "react";

const Carousel = ({ images, id }) => {
    const isActive = (index) => {
        if (index === 0) return "active";
    };

    return (
        <div id={`images${id}`} className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
                {images.map((img, index) => (
                    // <li data-target={`#image${id}`}></li>
                    <li
                        data-target={`#images${id}`}
                        data-slide-to="{index}"
                        className={isActive(index)}
                    ></li>
                ))}
                {/* <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li> */}
            </ol>
            <div className="carousel-inner">
                {images.map((img, index) => (
                    <div
                        key={index}
                        className={`carousel-item ${isActive(index)}`}
                    >
                        <img
                            className="d-block w-100"
                            src={img.url}
                            alt={img.url}
                        />
                    </div>
                ))}
            </div>
            <a
                className="carousel-control-prev"
                href={`#images${id}`}
                role="button"
                data-slide="prev"
            >
                <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                ></span>
                <span className="sr-only">Previous</span>
            </a>
            <a
                className="carousel-control-next"
                href={`#images${id}`}
                role="button"
                data-slide="next"
            >
                <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                ></span>
                <span className="sr-only">Next</span>
            </a>
        </div>
    );
};

export default Carousel;
