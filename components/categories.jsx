import Link from "next/link";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import { Grid, Pagination, Navigation, Autoplay } from "swiper";
import { Category } from "@/helper/categories";
import { useRouter } from "next/router";
import { Image, notification } from "antd";
import { getAllCatagory } from "../helper/utilities/apiHelper";
import { useEffect } from "react";
import { get } from "lodash";

function Categories() {
  const router = useRouter();
  const [category, setCategory] = useState([]);

  const fetchData = async () => {
    try {
      const result = await getAllCatagory();
      setCategory(get(result, "data.data"));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-screen pt-5">
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
      <div className="h-[38vh] w-[80vw] m-auto shadow-xl ">
        <Swiper
          slidesPerView={8}
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
          {
            category.map((data) => {
             
              return (
                <SwiperSlide
                  className=" !w-[10vw] !h-[17vh] border py-5 cursor-pointer !flex flex-col items-center justify-center"
                  key={data.id}
                  onClick={() => {
                    router.push({ pathname: "/allCat", query: data });
                  }}
                >
                  <div className="flex justify-center items-center">
                    <Image
                      width={100}
                      height={100}
                      alt="logo"
                      src={data.image}
                      className="!w-[3vw] !h-[6vh] m-auto mt-6"
                    />
                  </div>
                  <div className="flex flex-col   items-center">
                    <h1 className="text-justify text-lg">{data.name}</h1>
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
