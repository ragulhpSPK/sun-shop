import { BestDeals } from "@/helper/bestDeals";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper";
import { flashdeals } from "@/helper/flashdeals";
import styles from "../styles/Home.module.css";

function Bestdeals() {
  return (
    <div className="pt-5">
      <div className="  h-[50vh] w-[80vw] m-auto flex">
        <div className="flex flex-col  h-[49vh] w-[79.5vw] m-auto rounded-md">
          <div className="flex justify-between px-1 bg-[var(--third-color)]  h-[20vh]">
            <div className="flex flex-col justify-around">
              <img src="/assets/deals.png" className="w-28 h-14" />
              <p className="text-white text-2xl">Best Deals today</p>
            </div>
            <div>
              <h1 className="text-5xl text-white pt-10">Limited Time Sales</h1>
            </div>
            <div className="flex flex-col justify-around">
              <img src="/assets/deals2.png" className="w-16 h-14" />
              <Link href="/Allbestdeals">
                <p className="text-white">See More &#8594;</p>
              </Link>
            </div>
          </div>
          <div className="flex gap-x-5">
            {BestDeals.slice(0, 6).map((data) => {
              return (
                <div
                  className="relative   w-[18vw] h-[30vh]  bg-[#fff] shadow-md"
                  key={data.id}
                >
                  <img src={data.image} className="h-[220px] pt-10 pl-10" />
                  <div className="bg-[var(--fifth-color)] text-md font-semibold text-black w-14 h-10 absolute top-0 right-0 skew-[20px] flex flex-col text-sm text-center">
                    <span className="">{data.offer[0]}</span>
                    {data.offer[1]}
                  </div>
                  <p className="text-center text-lg font-normal">{data.name}</p>
                  <p className="text-center text-lg font-normal">
                    Rs:{data.price}
                  </p>
                </div>
              );
            })}{" "}
          </div>
        </div>
      </div>

      {/* Flash Deals */}

      <div className="h-[35vh]  mt-14 w-[80vw] m-auto " id={styles.shadow2}>
        <div className="pt-5 ">
          <div className="flex w-[76vw] justify-between m-auto px-5">
            <p className="text-[var(--second-color)] font-bold text-3xl">
              Flash Deals
            </p>
            <Link href="flashDeals">
              <p className="text-[var(--first-color)] font-bold text-xl">
                See All &#8594;
              </p>
            </Link>
          </div>
        </div>
        <div className="pt-5 ">
          <Swiper
            slidesPerView={5}
            spaceBetween={30}
            pagination={{
              clickable: false,
            }}
            modules={[Autoplay]}
            autoplay={{ delay: 3000 }}
            className="mySwiper w-[75vw] "
          >
            {flashdeals.map((data) => {
              return (
                <SwiperSlide
                  className="relative w-[10vw] border-2 "
                  key={data.id}
                >
                  <img src={data.image} className="w-36 m-auto" />
                  <div className="flex flex-col bg-[var(--fifth-color)] text-sm font-semibold text-black w-14 text-center absolute top-0 right-0">
                    <span>{data.offer}</span>
                    OFF
                  </div>
                  <p className="text-lg text-center font-medium">
                    Rs:{data.price}
                  </p>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default Bestdeals;
