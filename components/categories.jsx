/* eslint-disable react-hooks/exhaustive-deps */
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

function Categories({ setLoading }) {
  const router = useRouter();
  const [category, setCategory] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await getAllCatagory();
      setCategory(get(result, "data.data"));
      
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-screen pt-5 ">
      <div className="w-screen flex justify-center">
        <div className="flex h-[7vh] text-[--first-color] justify-between items-center  w-[80vw]  rounded-sm">
          <h1 className="xsm:text-sm lg:text-2xl sm:text-md text-center pt-3 font-semibold">
            Shop By Category
          </h1>
          <Link href="/products">
            <p className="text-center xsm:text-sm sm:text-md lg:text-2xl lg:pr-10 pt-5 font-semibold">
              View All
            </p>
          </Link>
        </div>
      </div>
      <div className=" xsm:mt-[10px]  xsm:w-[90vw] lg:w-[80vw] m-auto shadow-xl ">
        <Swiper
         
          grid={{
            rows: 2,
          }}
          slidesPerView={1}
         

          modules={[Grid, Pagination, Navigation, Autoplay]}
          navigation={{
            clickable: true,
          }}
          
          breakpoints={{
          640: {
            slidesPerView: 2,
             rows: 2,
         
          },
          768: {
            slidesPerView: 4,
             rows: 2,
          
          },
          1024: {
            slidesPerView: 6,
             rows: 2,
          
            },
            1280: {
              slidesPerView: 7,
               rows: 2,
            },
            1420:{
              slidesPerView: 8,
               rows: 2,
            },
       }}

          autoplay={{ delay: 2000 }}
          className={`mySwiper flex xsm:w-[80vw] lg:w-[80vw] `}
        >
          {category.map((data) => {
            return (
              <SwiperSlide
                className="border border-slate-300 cursor-pointer !flex flex-col items-center justify-center"
                key={data.id}
                onClick={() => {
                  console.log(data._id)
                  router.push({
                    pathname: "/allCat",
                    query: { cat_id: data._id },
                  });
                }}
              >
                <div className="flex justify-center items-center">
                  <Image
                    width={100}
                    height={100}
                    alt="logo"
                    src={data.image}
                    className="w-fit xsm:!h-[10vh] xsm:w-fit lg:!h-[5vh] m-auto mt-6"
                    preview={false}
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
