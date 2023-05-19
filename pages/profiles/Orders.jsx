import { Badge, Image } from "antd";
import React from "react";

function Orders() {
  return (
    <div>
      <div className=" p-[10px] rounded-md  w-[90%] ">
        <h1 className="text-black text-[32px] text-center p-[2vh] ">My Orders</h1>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 m-auto gap-[2vw] items-center justify-center pt-[2vw]">
        <div className="shadow-md m-auto bg-white p-[4vh] xl:w-[35vw] flex items-center justify-center">
          <div className="flex gap-[2vw] pt-[2vh]">
            <div className="text-xl">
              <p className="text-slate-600">
                APPLE iPad (10th Gen) 64 GB ROM 10.9 inch with Wi-Fi Only
                (Silver)
              </p>
              <p className="text-slate-600 pt-2">
                <Badge dot color="green" className="!text-xl"/>
                <span className="pl-[3px]">Delivery On Thu,sep 28,2019</span>
              </p>
            </div>
            <div>
              <Image src="/assets/cam1.webp" width={70} height={50} alt="img" />
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Orders;
