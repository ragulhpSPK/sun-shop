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
    <div className="w-screen flex justify-center">
 <div className="lg:w-[80vw]  w-screen gap-x-2  justify-center flex flex-col lg:flex-row">
        <div className="lg:w-[50vw] lg:h-[35vh]">
           <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        className="p-0 lg:h-[35vh]"
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        autoplay={{ delay: 4000 }}
       
      >
        {left.map((data, index) => {
          return (
            <SwiperSlide
              className="lg:p-0 p-1 "
              key={index}
              onClick={() =>
                router.push({
                  pathname: `/product/${data.productid}`,
                  query: { id: data.productid },
                })
              }
            >
              
                <Image
                  src={data.image}
                  className="!w-[100%] !h-[100%]"
                  width={800}
                  height={800}
                  alt="not found"
                ></Image>
              
            </SwiperSlide>
          );
        })}
      </Swiper>
     </div>
      <div className="flex lg:w-[20vw] lg:h-[35vh] justify-center items-center lg:flex-col ">
        {top.map((data) => {
          return (
            <>
              <div
                className=" lg:w-[20vw] lg:h-[17vh] lg:p-0 p-1"
                onClick={() =>
                  router.push({
                    pathname: `/product/${data.productid}`,
                    query: { id: data.productid },
                  })
                }
              >
                <Image
                  src={data.image}
                  className="!w-[100%] !h-[100%]"
                  width={300}
                  height={300}
                  alt="not found"
                />
                
              </div>
            </>
          );
        })}

        {bottom.map((data) => {
          return (
            <>
              <div
                className="lg:w-[20vw] lg:h-[17vh]  lg:p-0 p-1"
                onClick={() =>
                  router.push({
                    pathname: `/product/${data.productid}`,
                    query: { id: data.productid },
                  })
                }
              >
                <Image
                  src={data.image}
                  className="!w-[100%] !h-[100%]"
                  width={300}
                  height={300}
                  alt="not found"
                />
                
              </div>
            </>
          );
        })}
      </div>
    </div>
    </div>
   
  );
}
