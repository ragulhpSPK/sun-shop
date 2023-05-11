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

  const [product, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const router=useRouter()

  const fetchData = async() => {
    try {
      const result = await getAllproducts();
      setProducts(get(result,"data.data",[]))
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
  
  useEffect(() => {
    setFilteredProducts(product.filter(data=>{return data.flashStatus===true}))
  },[product])




  return (
    <div className="pt-5">
      <div className="  h-[50vh] w-[80vw] m-auto flex ">
        <div className="flex flex-col  h-[49vh] w-[80vw] m-auto !rounded-xl">
          <div className="flex justify-between px-1 bg-[var(--second-color)]  h-[20vh]">
            <div className="flex flex-col justify-around">
              <Image
                width={100}
                height={100}
                alt="logo"
                src="/assets/deals.png"
                className="w-28 h-14"
              />
              <p className="text-white text-2xl pl-2">Best Deals today</p>
            </div>
            <div>
              <h1 className="text-5xl text-white pt-10">Limited Time Sales</h1>
            </div>
            <div className="flex flex-col justify-around">
              <Image
                width={100}
                height={100}
                alt="logo"
                src="/assets/deals2.png"
                className="w-16 h-14"
              />
              <Link href="/Allbestdeals">
                <p className="text-white pr-2">See More &#8594;</p>
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
                  <Image
                    width={180}
                    height={100}
                    alt="logo"
                    src={data.image}
                    className="h-[220px] pt-10 pl-10"
                  />
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

      <div className="h-[30vh]  mt-14 w-[80vw] m-auto " id={styles.shadow2}>
        <div>
          <div className="flex w-[80vw]  text-xl h- justify-between m-auto px-5 bg-[var(--second-color)] py-3 text-white">
            <h1>
              Flash Deals
            </h1>
            <Link href="flashDeals">
              <h1 className=" text-xl">
                See All &#8594;
              </h1>
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
            {filteredProducts.map((data) => {
              return (
                <SwiperSlide
                  className="relative w-[10vw] border-r border-b border-l border-slate-200 "
                  key={data._id}
                  onClick={ ()=>  router.push({
                      pathname: `/product/${data._id}`,
                      query: { id: data._id },
                    })}
                >
                  <Image
                    width={100}
                    height={100}
                    alt="logo"
                    src={data.image[0]}
                    className="!h-[14vh] !w-fit m-auto"
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
