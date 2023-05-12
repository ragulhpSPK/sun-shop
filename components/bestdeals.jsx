import { BestDeals } from "@/helper/bestDeals";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper";
import { flashdeals } from "@/helper/flashdeals";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import { getAllproducts } from "@/helper/utilities/apiHelper";
import { useEffect } from "react";
import { get } from "lodash";
import { useRouter } from "next/router";

function Bestdeals() {
  const [product, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [bestProducts, setbestProducts] = useState([]);
  const router = useRouter();

  const fetchData = async () => {
    try {
      const result = await getAllproducts();
      setProducts(get(result, "data.data", []));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredProducts(
      product.filter((data) => {
        return data.flashStatus === true;
      })
    );
    setbestProducts(
      product.filter((data) => {
        return data.bestStatus === true;
      })
    );
  }, [product]);

  return (
    <div className="pt-5 flex flex-col">
      <div className=" h-[50vh] xsm:!w-[90vw] lg:w-[80vw] m-auto flex ">
        <div className="flex flex-col  h-[49vh] xsm:!w-[90vw] lg:!w-[80vw] m-auto !rounded-xl">
          <div className="flex justify-between px-1 bg-[var(--second-color)]  lg:!h-[30vh]">
            <div className="flex flex-col justify-around">
              <Image
                width={100}
                height={100}
                alt="logo"
                src="/assets/deals.png"
                className="lg:w-28 lg:h-14 xsm:w-[50px] xsm:h-[20px]"
              />
              <p className="text-white xsm:text-[10px] xl:text-3xl lg:text-2xl pl-2">
                Best Deals today
              </p>
            </div>
            <div className="xsm:w-[60vw]">
              <h1 className="lg:text-5xl  xsm:text-md text-white pt-10 lg:text-center">
                Limited Time Sales
              </h1>
            </div>
            <div className="flex flex-col justify-around">
              <Image
                width={100}
                height={100}
                alt="logo"
                src="/assets/deals2.png"
                className="lg:w-16 lg:h-14 xsm:w-[25px] xsm:h-[30px] xsm:pt-[4px] "
              />
              <Link href="/Allbestdeals">
                <p className="text-white pr-2 xsm:text-[10px] lg:text-2xl">
                  See More &#8594;
                </p>
              </Link>
            </div>
          </div>
          <div className="xsm:grid xsm:grid-cols-2 xsm:gap-10 md:grid-cols-3  gap-x-5 lg:flex">
            {bestProducts.slice(0, 6).map((data) => {
              return (
                <div
                  className="relative flex flex-col xsm:mt-[10px] items-center justify-center xsm:w-[40vw] xsm:h-[18vh] md:w-[22vw] md:h-[22vh] lg:w-[18vw] lg:h-[30vh] xl:!w-[20vw]  bg-[#fff] shadow-md"
                  key={data._id}
                >
                  <Image
                    width={100}
                    height={100}
                    alt="logo"
                    src={data.image[0]}
                    className="xl:!h-[13vh] lg:!h-[8vh] xsm:!h-[5vh] xsm:w-fit m-auto "
                  />
                  <div className="bg-[var(--fifth-color)] xsm:text-[8px] md:text-[10px] xsm:leading-3 lg:text-md font-semibold text-black xsm:w-[20px] xsm:h-[25px] lg:w-14 lg:h-10 md:w-[25px] md:h-[28px] absolute top-0 right-0 skew-[20px] flex flex-col lg:text-sm text-center">
                    <span className="">{data.bestOffer}%</span>
                    OFF
                  </div>
                  <p className="text-center xsm:text-[8px] md:text-[10px] xsm:pt-[10px] lg:pt-0  lg:text-[8px] xl:text-[14px] font-bold lg:h-[6vh]">
                    {data.title}
                  </p>
                  <p className="text-center xsm:text-[12px] md:text-[10px] xsm:pt-[10px] lg:text-lg font-normal">
                    Rs:{data.price}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Flash Deals */}

      <div
        className="h-[28vh] xsm:mt-[30vh] lg:mt-14 xsm:w-[90vw] lg:w-[80vw] m-auto "
        id={styles.shadow2}
      >
        <div>
          <div className="flex xsm:w-[90vw] lg:w-[80vw]  text-xl h- justify-between m-auto px-5 bg-[var(--second-color)] py-3 text-white">
            <h1>Flash Deals</h1>
            <Link href="flashDeals">
              <h1 className=" text-xl">See All &#8594;</h1>
            </Link>
          </div>
        </div>
        <div className="pt-5 ">
          <Swiper
            // slidesPerView={5}
            spaceBetween={30}
            pagination={{
              clickable: false,
            }}
            modules={[Autoplay]}
            autoplay={{ delay: 3000 }}
            className="mySwiper w-[75vw] "
            breakpoints={{
              480: {
                width: 480,
                slidesPerView: 1,
              },

              520: {
                width: 640,
                slidesPerView: 2,
              },

              924: {
                width: 924,
                slidesPerView: 3,
              },
              1024: {
                width: 924,
                slidesPerView: 4,
              },

              2940: {
                width: 924,
                slidesPerView: 5,
              },
            }}
          >
            {filteredProducts.map((data) => {
              return (
                <SwiperSlide
                  className="relative w-[10vw] border-r border-b border-l border-slate-200 "
                  key={data._id}
                  onClick={() =>
                    router.push({
                      pathname: `/product/${data._id}`,
                      query: { id: data._id },
                    })
                  }
                >
                  <Image
                    width={100}
                    height={100}
                    alt="logo"
                    src={data.image[0]}
                    className="!h-[14vh] xl:!h-[12vh] xl:pt-[3vh] !w-fit m-auto"
                  />
                  <div className="flex flex-col bg-[var(--fifth-color)] text-sm font-semibold text-black w-14 text-center absolute top-0 right-0">
                    <span>{data.offer} %</span>
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
