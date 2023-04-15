import React from 'react';
import { Image } from '../types/post';

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
        </div>
    )
}

export default ImageSlider;