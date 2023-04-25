import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay, Pagination } from "swiper";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import styles from "../styles/navbar.module.css";
import { swipperContent } from "@/helper/swipper";
import Image from "next/image";

export default function App() {
  return (
    // <div className="xsm:h-[300px] lg:h-[500px] xsm:w-screen ">
    //   <Swiper
    //     navigation={false}
    //     modules={[Navigation, Autoplay, Pagination]}
    //     className="myswiper h-[100%] xsm:w-screen"
    //     pagination={{ clickable: true }}
    //     scrollbar={{ draggable: true }}
    //     autoplay={{ delay: 3000 }}
    //   >
    //     <SwiperSlide
    //       className="xsm:flex xsm:flex-column  lg:flex lg:flex-row w-screen  opacity-90 bg-[url('/assets/bg-6.webp')]"
    //       id={styles.wrapper_3}
    //     >
    //       <img
    //         src="/assets/products7.png"
    //         alt="Image"
    //         className="float-right pr-56 pt-20 xsm:h-[200px]  md:h-[200px] md:w-[400px] xsm:w-[500px] lg:h-[300px] lg:w-[500px] xl:h-[400px] xl:w-[600px]"
    //       ></img>
    //       <p
    //         className="xsm:text-sm lg:text-4xl xl:text-5xl xxl:text-6xl lg:pl-14 xsm:w-[80vw] xsm:m-auto md:pt-40 lg:w-[100vw] xl:pl-0  xl:w-[80vw] xl:p-36 text-slate-800"
    //         id={styles.typewritter}
    //       >
    //         Get unbeatable prices on the latest electronic devices by
    //         <span
    //           className="text-red-400 xsm:text-xl lg:text-5xl xl:text-7xl xxl:text-8xl"
    //           id={styles.letter}
    //         >
    //           shopping online!
    //         </span>
    //       </p>
    //     </SwiperSlide>
    //     <SwiperSlide id={styles.wrapper_2} className="xsm:pt-20 lg:pt-0">
    //       <img
    //         src="/assets/headphone3.png"
    //         alt="Image"
    //         className="lg:m-auto float-right lg:pr-40 xsm:h-[150px] xsm:w-[150px] md:h-[200px] md:w-[250px] lg:h-[400px] lg:pt-10 lg:w-[400px] xxl:h-[500px] xxl:w-[650px]"
    //       />
    //       <div className="m-auto xsm:w-[100vw]xsm:text-sm xxl:w-[50vw] xsm:pl-4 md:pl-10 lg:pt-20 xxl:pl-0">
    //         <p className="xsm:text-xl lg:text-7xl lg:pt-5">
    //           Bo<span className="text-[red]">a</span>t Rockers 370
    //         </p>
    //         <p className="lg:text-4xl lg:pt-5">Upto 30% Offer</p>
    //         <p className="lg:text-4xl lg:pt-5">Don't Miss It</p>
    //         <p className="lg:text-3xl lg:pt-5 text-slate-800 xsm:lg-w-[100vw] lg:w-[50vw]">
    //           Get lost in the music and find your perfect purchase with Boat
    //           headsets
    //         </p>
    //       </div>
    //     </SwiperSlide>
    //     <SwiperSlide id={styles.wrapper_1} className="xsm:pt-20 md:pt-0">
    //       <img
    //         src="/assets/tv4.png"
    //         alt="Image"
    //         className="float-left xsm:h-[150px] xsm:w-[150px] md:h-[300px] md:w-[300px] lg:h-[350px] lg:w-[550px] lg:mt-14 xxl:pl-32 xxl:h-[400px] xxl:w-[700px] "
    //       />
    //       <div className="lg:w-[50vw] xsm:w-[50vw]  xxl:pl-0 float-right xxl:pt-10 md:pt-20 lg:pt-32 ">
    //         <p className="lg:text-8xl  font-light">
    //           <span className="xxl:text-9xl">T</span>v
    //         </p>
    //         <p className="lg:text-5xl xxl:w-[70vw]" id={styles.text}>
    //           <span className="lg:text-7xl">S</span>pecial &nbsp;
    //           <span className="lg:text-7xl">S</span>ale
    //         </p>
    //         <p className="lg:text-5xl xxl:pt-10">
    //           <span>U</span>pto 20% <span>O</span>ffer
    //         </p>

    //         <p className="lg:text-3xl xsm:w-[50vw] xxl:w-[30vw] xxl:pt-10 text-slate-600">
    //           Shop the latest TV models and enjoy the ultimate home viewing
    //           experience!
    //         </p>
    //       </div>
    //     </SwiperSlide>
    //   </Swiper>
    // </div>
    <div className="w-[80vw] m-auto flex ">
      <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        className="myswiper w-[70%] m-auto"
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        autoplay={{ delay: 4000 }}
      >
        {swipperContent.map((data, index) => {
          return (
            <SwiperSlide key={index}>
              <div
                className={`h-[35vh] bg-right bg-no-repeat !bg-[url(/assets/bg-6.webp)]  bg-cover flex ${
                  data.flex === "reverse" ? "flex-row-reverse" : "flex-row"
                } justify-center items-center `}
              >
                <Image
                  src={data.image}
                  className="w-[18vw] pr-10 "
                  width={300}
                  height={300}
                  alt="not found"
                ></Image>
                <div className="pl-10">
                  <span className="text-[36px] leading-tight font-extralight w-[25vw]">
                    {data.content1}
                    <span className="text-5xl">
                      <span>{data.content2}</span>
                      <span className="text-red-600">{data.content3}</span>
                      <span>{data.content4}</span>
                    </span>
                  </span>
                  <br />
                  <span className="text-5xl text-red-400 ">{data.desc1}</span>
                  <span className="text-2xl">{data.desc2}</span> <br />
                  <span className="text-2xl ">{data.desc3}</span>
                  <p className="text-2xl ">{data.desc4}</p>
                  <p className="text-2xl ">{data.desc5}</p>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="flex flex-col gap-[4.8px] text-white">
        <div className="bg-[#F28500] from-current h-[17.2vh] w-[23.5vw] flex justify-center items-center gap-10">
          <p className="text-4xl">
            <Image
              src="/assets/sony.png"
              className="w-20"
              width={300}
              height={300}
              alt="not found"
            />
          </p>
          <Image
            src="/assets/sonyspeaker.png"
            className="w-[120px] "
            width={300}
            height={300}
            alt="not found"
          />
          <p className="text-3xl w-28">Upto 20% Offer</p>
        </div>

        <div className="bg-[#613f75] from-current h-[17.2vh] w-[23.5vw] flex justify-center items-center gap-6">
          <p className="text-4xl">
            <Image
              src="/assets/logojbl.jpg"
              className="w-16"
              width={300}
              height={300}
              alt="not found"
            />
          </p>
          <Image
            src="/assets/headset-4.png"
            className="w-[160px]"
            width={300}
            height={300}
            alt="not found"
          />
          <p className="text-3xl w-28">Upto 30% Offer</p>
        </div>
      </div>
    </div>
  );
}
