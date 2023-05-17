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
    <div className="flex flex-col pt-[3vh]">
 <div className="xsm:pt-5 md:pt-0   flex flex-col gap-[2vh]  md:justify-between ">
      <div className="  xsm:!w-[90vw] lg:w-[80vw] m-auto flex ">
        <div className="flex flex-col   xsm:!w-[92vw] sm:w-[90vw] lg:!w-[80vw] m-auto !rounded-xl">
          <div className="flex justify-between px-1 bg-[var(--second-color)] xxl:p-[4vh]">
            <div className="flex flex-col justify-around">
              <Image
                width={100}
                height={100}
                alt="logo"
                src="/assets/deals.png"
                className="lg:w-28 lg:h-14 xsm:w-[50px] xsm:h-[20px]"
              />
              <p className="text-white xsm:text-[10px] md:text-[18px] xsm:tracking-tight xsm:leading-tight xl:text-2xl lg:text-xl  pl-2">
                Best Deals today
              </p>
            </div>
            <div className="xsm:w-[60vw]">
              <h1 className="lg:text-4xl md:text-2xl  xxl:!text-6xl xsm:text-md xsm:text-md xsm:text-center text-white pt-10 lg:text-center">
                Limited Time Sales
              </h1>
            </div>
            <div className="flex flex-col justify-around ">
              <Image
                width={100}
                height={100}
                alt="logo"
                src="/assets/deals2.png"
                className="lg:w-16 lg:h-14 xsm:w-[28px] xsm:h-[30px] xsm:pt-[4px] "
              />
              <Link href="/Allbestdeals">
                <pre className="text-white pr-2 xsm:text-[10px] md:text-[14px] xsm:w-[100%] lg:text-2xl">
                  See More &#8594;
                </pre>
              </Link>
            </div>
          </div>
          <div className="xsm:grid xsm:grid-cols-2 xsm:gap-10 md:grid-cols-3 xsm:m-auto lg:m-0 lg:gap-y-4  xxl:gap-x-5 lg:gap-0 xl:flex">
            {bestProducts.slice(0, 6).map((data) => {
              return (
                <div
                  className="relative flex flex-col  items-center justify-center xsm:w-[40vw] xsm:h-[18vh] md:w-[22vw] md:h-[22vh]   xl:h-[25vh]   bg-[#fff] shadow-md"
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
                    className="xl:!h-[10vh] md:!h-[8vh] lg:!h-[8vh] xsm:!h-[6vh] xxl:!h-[9vh] xsm:w-fit m-auto pt-[2vh]"
                  />
                  <div className="bg-[var(--fifth-color)] xsm:!text-[8px] md:text-[10px] xsm:leading-tight lg:text-md font-semibold text-black xsm:w-[7vw] lg:w-[2.5vw]   lg:leading-tight md:w-[26px] absolute top-0 right-0 skew-[20px] flex flex-col lg:text-sm text-center">
                    <span className="lg:text-[10px]">{data.bestOffer}%</span>
                    <span className="lg:text-[10px]">OFF</span>
                  </div>
                  <p className="text-center xsm:text-[8px] lg:pt-[15px] md:!text-[13px] md:pt-0  xsm:pt-[10px]   lg:text-[8px] lg:leading-tight lg:tracking-tight xl:!text-[11px] px-[10px] xxl:!text-[14px] xxl:pt-0 font-semibold lg:h-[10vh] xxl:!h-[5vh]">
                    {data.title}
                  </p>
                  {data.bestOffer !== null || 0 ? (
                    <p className="text-center flex flex-row-reverse pt-[15px] gap-2 pb-2 xsm:text-[10px] xsm:font-semibold md:text-[13px] xsm:pt-[10px]lg:pt-0 lg:text-lg font-medium">
                      <s>&#8377;{data.price}</s>
                      &#8377;
                      {Math.round(
                        data.price - (data.price / 100) * data.bestOffer
                      )}
                    </p>
                  ) : (
                    <p className="text-center flex flex-col xsm:text-[12px] md:text-[10px] xsm:pt-[10px] lg:pt-0 lg:text-lg font-normal">
                      {data.price}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Flash Deals */}

      <div
        className="  xsm:w-[90vw] lg:w-[80vw] m-auto "
        id={styles.shadow2}
      >
        <div>
          <div className="flex xsm:w-[90vw] lg:w-[80vw]  text-xl  justify-between m-auto px-5 bg-[var(--second-color)] py-3 text-white">
            <h1>Flash Deals</h1>
            <Link href="flashDeals">
              <h1 className=" text-xl">See All &#8594;</h1>
            </Link>
          </div>
        </div>
        <div >
          <Swiper
            slidesPerView={1}
            pagination={{
              clickable: false,
            }}
            modules={[Autoplay]}
            autoplay={{ delay: 3000 }}
            className="mySwiper !w-[80vw] "
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 4,
              },
              1024: {
                slidesPerView: 5,
              },
              1220: {
                slidesPerView: 6,
              },
            }}
          >
            {filteredProducts.map((data) => {
              return (
                <SwiperSlide
                  className="  border-r border-b border-l relative border-slate-200 "
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
                    className="xsm:!h-[10vh] sm:!h-[12vh] lg:!h-[7.5vh] xl:!h-[12vh] xl:pt-[3vh] !w-fit m-auto"
                  />
                  <div className="flex flex-col  bg-[var(--fifth-color)] text-xsm leading-tight font-semibold text-black w-8 text-center absolute top-0 right-0">
                    <span>{data.offer} %</span>
                    OFF
                  </div>
                  <div className="flex items-center justify-center xl:pt-[2vh] pt-[2vh]">
                    {data.offer !== null || 0 ? (
                      <p className="text-lg  flex flex-row-reverse gap-2 pb-[2vh] xsm:text-md xsm:font-semibold font-medium">
                        <s>&#8377;{data.price}</s>
                        &#8377;
                        {Math.round(
                          data.price - (data.price / 100) * data.offer
                        )}
                      </p>
                    ) : (
                      <p className="text-lg   font-medium">{data.price}</p>
                    )}
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
      </div>
       </div>
  );
   
   
}

export default Bestdeals;
