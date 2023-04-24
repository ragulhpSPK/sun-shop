import Link from "next/link";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import { Grid, Pagination, Navigation, Autoplay } from "swiper";
import { Category } from "@/helper/categories";
import { useRouter } from "next/router";
// import { createCatagory } from "../helper/utilities/apiHelper";

function Categories() {
  const router = useRouter();
  return (
    <div className="w-screen pt-10">
      <div className="w-screen flex justify-center">
        <div className="flex h-[7vh] text-[--first-color] justify-between items-center  w-[80vw]  rounded-sm">
          <h1 className=" text-2xl text-center pt-3 font-semibold">
            Shop By Category
          </h1>
          <Link href="/products">
            <p className="text-center  text-2xl pr-10 pt-5 font-semibold">
              View All
            </p>
          </Link>
        </div>
      </div>
      <div className="h-[40vh] w-[80vw] m-auto shadow-xl">
        <Swiper
          slidesPerView={7}
          grid={{
            rows: 2,
          }}
          modules={[Grid, Pagination, Navigation, Autoplay]}
          navigation={{
            clickable: true,
          }}
          autoplay={{ delay: 2000 }}
          className={`mySwiper flex w-[80vw]`}
        >
          {Category.map((data) => {
            return (
              <SwiperSlide
                className=" w-[80px]  border py-5 cursor-pointer"
                key={data.id}
                onClick={() => {
                  router.push({ pathname: "/subcat", query: data });
                }}
              >
                <div className="flex justify-center">
                  <img src={data.image} className="w-20 h-20" />
                </div>
                <div className="flex flex-col   items-center">
                  <h1 className="text-justify text-lg">{data.category}</h1>
                  <p className="text-justify text-md">{data.items}</p>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}

export default Categories;
