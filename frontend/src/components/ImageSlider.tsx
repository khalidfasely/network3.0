import React from 'react';
import { Image } from '../types/post';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

interface Props {
    images: Image[]
}

const ImageSlider: React.FC<Props> = ({ images }) => {
    return (
        <div className='slide-container'>
            <Swiper
                spaceBetween={50}
                slidesPerView={1}
                //onSlideChange={() => console.log('slide change')}
                //onSwiper={(swiper) => console.log(swiper)}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
            >
                {
                    images.map((image: Image, idx) => (
                        <SwiperSlide key={idx}>
                            <img
                                src={'http://127.0.0.1:8000' + image.image}
                                alt={`Image ${idx + 1}`}
                                className='my-2 w-[95%] m-auto'
                            />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            {/*<Carousel>
                {
                    images.map((image: Image, idx) => (
                        <div key={idx}>
                            <img src={'http://127.0.0.1:8000' + image.image} />
                        </div>
                    ))
                }
            </Carousel>*/}
        </div>
    )
}

export default ImageSlider;