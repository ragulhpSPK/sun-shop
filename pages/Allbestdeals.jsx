import React from "react";
import { BestDeals } from "@/helper/bestDeals";
import Image from "next/image";

function Allbestdeals() {
  return (
    <div className="w-[80vw] m-auto">
      <div className="bg-[url('/assets/purple3.jpg')] bg-left h-[40vh] w-[80vw] m-auto bg-[cover] shadow-xl shadow-black/30">
        <div className=" flex justify-center items-center pt-10">
          <h1 className="text-6xl text-white w-[400px] pl-10">
            Daily Best Deals
          </h1>
          <Image
            width={100}
            height={100}
            alt="logo"
            src="/assets/bestdeals.png"
            className="w-[500px] h-[250px] "
          />
          <p className="text-5xl text-white w-[300px]">Upto 50% Offers</p>
        </div>
        <p className="text-[32px] text-white w-[80vw] text-center m-auto">
          Unbeatable daily deals on top-rated products,with discounts upto 30%
          offer...
        </p>
      </div>

      <div className="flex items-center justify-center pt-10">
        <div className="grid grid-cols-5 gap-24 ">
          {BestDeals.map((data) => {
            return (
              <div
                className="relative   w-[13vw] h-[32vh] border bg-[#fff] border-gray-200 m-auto shadow-lg"
                key={data.id}
              >
                <Image
                  width={100}
                  height={100}
                  alt="logo"
                  src={data.image}
                  className="h-[220px] pt-10 m-auto"
                />
                <p className="bg-[--fifth-color] text-sm font-semibold text-black w-14 h-10 absolute top-0 right-0  flex flex-col  text-center">
                  <span>{data.offer[0]}</span>
                  {data.offer[1]}
                </p>
                <p className="text-center text-lg font-medium">{data.name}</p>
                <p className="text-center text-lg font-medium ">
                  Rs:{data.price}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Allbestdeals;
