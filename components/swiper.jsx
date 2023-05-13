/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay, Pagination } from "swiper";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Image from "next/image";
import { getAllBanner } from "../helper/utilities/apiHelper";
import { useEffect } from "react";
import { get, set } from "lodash";
import { Spin } from "antd";
// import Home from "../pages/index"
import { useRouter } from "next/router";

export default function Swipper({ setLoading }) {
  const [banner, setBanner] = useState([]);

  const router = useRouter();

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await getAllBanner();
      setBanner(get(result, "data.data"));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  let left = banner.filter((data) => {
    return data.status === "Left";
  });

  let top = banner.filter((data) => {
    return data.status === "Top";
  });

  let bottom = banner.filter((data) => {
    return data.status === "Bottom";
  });

  return (
    
    <div className="flex xsm:w-[90vw] pt-[10px] lg:w-[80vw] m-auto xsm:gap-x-[2px] xsm:pl-[3vw] lg:pl-0 lg:h-[35vh] sm:h-[20vh] xsm:h-[10vh]">
      <div className="lg:w-[60vw] lg:h-[35vh] xsm:w-[60vw] xsm:!h-[10vh] sm:h-[20vh]">
        <Swiper
          modules={[Navigation, Autoplay, Pagination]}
          className="lg:!w-[60vw] lg:h-[35vh] xsm:!w-[60vw] xsm:h-[10vh] sm:h-[20vh]"
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          autoplay={{ delay: 4000 }}
        >
          {left.map((data) => {
           
            return (
              <>
                <SwiperSlide>
                  <Image src={data.image} alt="leftbanner" width={100} height={100} className="lg:w-[60vw] lg:!h-[35vh] xsm:w-[60vw] xsm:h-[10vh] sm:h-[20vh]"/>
                </SwiperSlide>
              </>
            );
          })}
        </Swiper>
      </div>
      <div className="flex flex-col lg:gap-[18px]">
        {top.map(data => {
          return (
            <> <div className="w-[20vw] h-[15vh]">
             <Image src={data.image} alt="topbanner" width={100} height={100} className="lg:w-[20vw] lg:h-[17.5vh] xsm:!w-[40vw] xsm:h-[5vh]  lg:ml-0 sm:h-[10vh]"/>
            </div></>
          )
        })}
       
        {bottom.map(data => {
          return (
            <> <div className="w-[20vw] h-[15vh] ">
             <Image src={data.image} alt="bottombanner" width={100} height={100} className="lg:w-[20vw] lg:h-[18vh] xsm:!w-[40vw] pt-2 xsm:h-[5vh]  sm:h-[10vh]"/>
            </div></>
          )
        })}
      </div>
    </div>
  );
}
