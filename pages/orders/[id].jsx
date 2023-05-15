import React from "react";
import { ClockCircleOutlined, CodeSandboxOutlined } from "@ant-design/icons";
import { Button, Timeline, Image, Steps, notification } from "antd";
import styles from "../../styles/Home.module.css";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import CheckIcon from "@mui/icons-material/Check";
import { useState } from "react";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DoneIcon from "@mui/icons-material/Done";

import CancelIcon from "@mui/icons-material/Cancel";
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

  console.log(products.length);

  return (
    <div className="flex flex-col gap-[5vh] justify-around mt-[5vh] w-[80vw] p-[5vw] m-auto min-h-[70vh]">
      {products.length === 0 ? (
        <p className="text-center text-4xl text-slate-500 pt-[25vh]">
          No order to show
        </p>
      ) : (
        <div
          className="xxl:h-[20vh] xsm:h-[60vh] flex items-center justify-center p-[4vw]"
          id={styles.shadow3}
        >
          <Steps
            className={`${status[0] === "Cancelled" ? "invisible" : "visible"}`}
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
        </div>
      )}

      {products.map((data) => {
        return (
          <>
            <div className="flex flex-col" key={data._id}>
              <div
                className="flex flex-col gap-[15px] bg-white p-[5vh]"
                id={styles.shadow3}
              >
                <div className="flex xsm:flex-col md:flex-row justify-between">
                    <h1 className="xsm:text-[16px] md:text-2xl p-4">Purchased Item</h1>
                {status[0] === "Delivered" ? (
                  <p className="text-3xl text-slate-600 mt-10 flex items-center justify-center">
                    <DoneIcon className="bg-[green] rounded-3xl h-[30px] w-[30px] text-white" />

                    <span>Order Reached You SuccessFully!</span>
                  </p>
                ) : status[0] === "Cancelled" ? (
                  <p className="text-3xl text-slate-600 mt-10 flex items-center justify-center">
                    <span className="tracking-wider text-4xl pl-2 ">
                      Order Cancelled
                    </span>
                    <CancelIcon className="bg-[red] rounded-3xl h-[30px] w-[30px] text-white" />
                  </p>
                ) : (
                  <button
                    className="bg-red-600 !text-white p-[8px] xsm:mb-[8px] xl:mb-0 xsm:w-[40vw] h-[5vh] md:w-[20vw] xl:w-[9vw] rounded-md"
                    onClick={() => {
                      handleClick(data._id, data);
                    }}
                  >
                    Cancel Order
                  </button>
                )}
                </div>
              
                <div className="flex  w-[70vw] flex-wrap xsm:gap-x-10 md:gap-x-6 xl:gap-x-10 gap-y-20">
                  {data.image.map((img, index) => {
                    return (
                      <div key={index} className="xxl:!w-[10vw] xsm:!w-[40vw] sm:!w-[20vw] md:w-[10vw]  flex  shadow-2xl rounded-box items-center justify-center flex-col h-[15vh]">
                        <div>
                          <Image
                          src={data.image.length === 1 ? img : img[0]}
                          alt="order"
                          width={70}
                          height={70}
                         
                          preview={false}
                        />
                        </div>
                        <p className="text-2xl text-slate-600">
                          &#8377;{data.price[index]}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <h1
                  className={`xsm:text-md md:text-xl xl:text-3xl pt-[5px] text-slate-600 ${
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
