import React from "react";
import { ClockCircleOutlined, CodeSandboxOutlined } from "@ant-design/icons";
import { Button, Timeline, Image, Steps, notification } from "antd";
import styles from "../../styles/Home.module.css";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import CheckIcon from "@mui/icons-material/Check";
import { useState } from "react";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DoneIcon from "@mui/icons-material/Done";

import CancelIcon from '@mui/icons-material/Cancel';
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { useRouter } from "next/router";
import {
  getAllCart,
  getAllOrder,
  updateOrder,
} from "@/helper/utilities/apiHelper";
import { useEffect } from "react";
import { get } from "lodash";


function Orders() {
  const router = useRouter();
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    try {
      const result = await getAllOrder();
      setProducts(get(result, "data.data", []));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const status = products.map((data) => {
    return data.status;
  });

  const handleClick = async (id, data) => {
  
    if (status !== "Delivered") {
      try {
        const formData = {
          status: "Cancelled",
          id: id,
        };
        await updateOrder(formData);
        notification.success({ message: "You cancel Your Order" });
      } catch (err) {
        console.log(err);
        notification.error({ message: "something went wrong" });
      }
    }
  };

  return (
    <div
      className="flex flex-col gap-[5vh] justify-around mt-[5vh] w-[80vw] p-[5vw] m-auto"
      id={styles.shadow3}
    >
      <Steps
        className={`${status[0]==="Cancelled"?"invisible":"visible"}`}
        size="large"
        lineWidth={1}
        items={[
          {
            title: "Confirmed",
            status: status[0] === "Confirmed" ? "process" : "finish",
            icon: (
              <DoneIcon
                style={{ fontSize: "30px" }}
                className=" text-[--third-color] "
              />
            ),
          },
          {
            title: "Order Shipped",
            status:
              status[0] === "Out_For_Delivery"
                ? "finish"
                : status[0] === "Delivered"
                ? "finish"
                : "process",
            icon: (
              <CodeSandboxOutlined
                style={{ fontSize: "30px" }}
                className="text-[--third-color]"
              />
            ),
          },
          {
            title: "Order out for delivery",
            status: status[0] === "Delivered" ? "finish" : "process",
            icon: (
              <LocalShippingIcon
                style={{ fontSize: "30px" }}
                className="text-[--third-color]"
              />
            ),
          },

          {
            title: "Order Delivered",
            status: "finish",

            icon: (
              <HomeRoundedIcon
                style={{ fontSize: "30px" }}
                className="text-[--third-color]"
              />
            ),
          },
        ]}
      />

      {products.map((data) => {
      
        return (
          <>
            <div className="flex flex-col" key={data._id}>
              <div
                className="flex flex-col gap-[15px] h-[fit]  bg-white p-[5vh]"
                id={styles.shadow3}
              >
                <h1 className="text-2xl">Purchased Item</h1>

                <div className="bg-white flex flex-col w-[20vw] ">
                  <>
                    <div className="grid grid-flow-col gap-[80px]">
                      {data.image.map((img) => {
                        return (
                          <>
                            <Image
                              src={data.image.length === 1 ? img : img[0]}
                              alt="order"
                              width={100}
                              height={100}
                              className="!h-[10vh] !w-fit"
                              preview={false}
                            />
                          </>
                        );
                      })}
                    </div>

                    <div className="grid grid-flow-col gap-[115px]">
                      {data.price.map((price) => {
                        return (
                          <>
                            <p className="text-2xl text-slate-600">
                              &#8377;{price}
                            </p>
                          </>
                        );
                      })}
                    </div>
                  </>
                </div>

                {status[0] === "Delivered" ? (
                  <p className="text-3xl text-slate-600 mt-10 flex items-center justify-center">
                    <DoneIcon className="bg-[green] rounded-3xl h-[30px] w-[30px] text-white" />

                    <span>Order Reached You SuccessFully!</span>
                  </p>
                ) : status[0] === "Cancelled" ? (
                  <p className="text-3xl text-slate-600 mt-10 flex items-center justify-center">
                  

                      <span className="tracking-wider text-4xl pl-2">Order Cancelled</span>
                        <CancelIcon className="bg-[red] rounded-3xl h-[30px] w-[30px] text-white" />
                  </p>
                ) : (
                  <button
                    className="bg-red-600 !text-white p-[8px] h-[5vh] rounded-md"
                    onClick={() => {
                      handleClick(data._id, data);
                    }}
                  >
                    Cancel Order
                  </button>
                )}
                <h1
                  className={`text-3xl pt-[5px] text-slate-600 ${
                    data.total === null ? "hidden" : "block"
                  }`}
                >
                  Total Price:{data.total}
                </h1>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
}

export default Orders;
