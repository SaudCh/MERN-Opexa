import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import "./styles.css";

// import required modules
import { Autoplay, Pagination, Navigation, Grid } from "swiper/modules";

export default function roundedCard() {
  const details = [
    {
      id: 1,
      name: "Man",
      url: "https://pressmart.presslayouts.com/wp-content/uploads/2022/04/Men-Category-150x150.jpg",
    },
    {
      id: 2,
      name: "Woman",
      url: "https://pressmart.presslayouts.com/wp-content/uploads/2022/04/Men-Category-150x150.jpg",
    },
    {
      id: 3,
      name: "kids",
      url: "https://pressmart.presslayouts.com/wp-content/uploads/2022/04/Men-Category-150x150.jpg",
    },
    {
      id: 4,
      name: "Shoes",
      url: "https://pressmart.presslayouts.com/wp-content/uploads/2022/04/Men-Category-150x150.jpg",
    },
    {
      id: 5,
      name: "Bags",
      url: "https://pressmart.presslayouts.com/wp-content/uploads/2022/04/Men-Category-150x150.jpg",
    },
    {
      id: 6,
      name: "Watches",
      url: "https://pressmart.presslayouts.com/wp-content/uploads/2022/04/Men-Category-150x150.jpg",
    },
    {
      id: 7,
      name: "Sports",
      url: "https://pressmart.presslayouts.com/wp-content/uploads/2022/04/Men-Category-150x150.jpg",
    },
    {
      id: 8,
      name: "Accessories",
      url: "https://pressmart.presslayouts.com/wp-content/uploads/2022/04/Men-Category-150x150.jpg",
    },
    {
      id: 9,
      name: "Watches",
      url: "https://pressmart.presslayouts.com/wp-content/uploads/2022/04/Men-Category-150x150.jpg",
    },
    {
      id: 10,
      name: "Sports",
      url: "https://pressmart.presslayouts.com/wp-content/uploads/2022/04/Men-Category-150x150.jpg",
    },
    {
      id: 11,
      name: "Accessories",
      url: "https://pressmart.presslayouts.com/wp-content/uploads/2022/04/Men-Category-150x150.jpg",
    },
  ];

  return (
    <div className="flex justify-center">
      <Swiper
        slidesPerView={9}
        grid={{
          rows: 1,
        }}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          340: {
            slidesPerView: 3,
          },
          630: {
            slidesPerView: 5,
          },
          1024: {
            slidesPerView: 9,
          },
        }}
        modules={[Autoplay, Grid]}
        className="mySwiper md:mx-16 mx-4  my-5 p-5 "
      >
        {details.map((detail) => (
          <SwiperSlide key={detail.id}>
            <div className="flex flex-col items-center justify-center">
              <div className="h-28 w-28 rounded-full bg-gray-50">
                <img
                  decoding="async"
                  src={detail.url}
                  className="h-28 w-28 rounded-full transform hover:scale-105"
                />
              </div>
              <h1 className="text-center my-3">{detail.name}</h1>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
