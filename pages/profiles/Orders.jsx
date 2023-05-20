import { Badge, Image } from "antd";
import React from "react";
import { getAllOrder } from "@/helper/utilities/apiHelper";
import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { get } from "lodash";

function Orders() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);

  const fetchData = async () => {
    try {
      const result = await getAllOrder();

      setOrders(get(result, "data.data"));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className=" p-[10px] rounded-md  w-[90%] ">
        <h1 className="text-black text-[32px] text-center p-[2vh] ">
          My Orders
        </h1>
      </div>

      <div className="flex flex-col m-auto gap-[2vw] pl-[10vw] items-center justify-center pt-[2vw]">
        {orders.map((data, index) => {
          return (
            <div
              className="shadow-md m-auto bg-white p-[4vh] xl:w-[60vw] flex flex-col items-center justify-center"
              key={index}
              onClick={() => {
                router.push({
                  pathname: `/orders/${data._id}`,
                  query: { id: data._id },
                });
              }}
            >
              <div className="flex gap-[2vw] pt-[2vh]">
                <div className="text-xl flex">
                  <div className="flex flex-col gap-[2vh] ">
                    {data.productname.map((name, i) => {
                      return (
                        <p className="text-slate-600 " key={i}>
                          {name},
                        </p>
                      );
                    })}
                  </div>

                  <div className="flex flex-col gap-[2vh]">
                    {data.image.map((image, i) => {
                      return (
                        <div key={i}>
                          <Image
                            src={image[0]}
                            width={70}
                            height={50}
                            alt="img"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="flex justify-start items-start">
                <p className="text-slate-600 pt-2">
                  <Badge dot color="green" className="!text-xl" />
                  <span className="pl-[3px] text-xl tracking-wider">
                    {data.status} On Thu,sep 28,2019
                  </span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Orders;
