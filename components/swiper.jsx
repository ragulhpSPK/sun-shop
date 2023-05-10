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

export default function Swipper({ loading, setLoading }) {
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
    <div className="w-[80vw] m-auto flex ">
      <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        className="myswiper w-[70%] m-auto"
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        autoplay={{ delay: 4000 }}
      >
        {left.map((data, index) => {
          return (
            <SwiperSlide
              key={index}
              onClick={() =>
                router.push({
                  pathname: `/product/${data.productid}`,
                  query: { id: data.productid },
                })
              }
            >
              <div className="h-[35vh] bg-right bg-no-repeat bg-[red] w-[60vw]">
                <Image
                  src={data.image}
                  className=" !h-[35vh] pr-10 !w-[100vw] "
                  width={800}
                  height={800}
                  alt="not found"
                ></Image>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="flex flex-col gap-[4.8px] text-white">
        {top.map((data) => {
          return (
            <>
              <div
                className="  h-[17.2vh] w-[23.5vw]"
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
                <p className="text-3xl w-28">Upto 20% Offer</p>
              </div>
            </>
          );
        })}

        {bottom.map((data) => {
          return (
            <>
              <div
                className="bg-[#613f75]  h-[17.2vh] w-[23.5vw] "
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
                <p className="text-3xl w-28">Upto 30% Offer</p>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}
