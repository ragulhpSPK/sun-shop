import React from "react";
import { ClockCircleOutlined, CodeSandboxOutlined } from "@ant-design/icons";
import { Button, Timeline, Image, Steps } from "antd";
import styles from "../../styles/Home.module.css";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import CheckIcon from "@mui/icons-material/Check";
import { useState } from "react";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ShareLocationRoundedIcon from "@mui/icons-material/ShareLocationRounded";
import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { useRouter } from "next/router";
import { getAllCart, getAllOrder } from "@/helper/utilities/apiHelper";
import { useEffect } from "react";
import { get } from "lodash";
import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';

function Orders() {

  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState(false);
  const [shipped, setShipped] = useState(false);
  const [outForDelivery, setOutForDelivery] = useState(false);
  const [near, setNear] = useState(false)
  const[finish, setFinish] = useState(false)


  const fetchData = async () => {
    try {
      const result = await getAllOrder();
      setProducts(get(result, "data.data", []));
    } catch (err) {
      console.log(err);
    }
  };

  console.log(products);

  useEffect(() => {
    fetchData();
  }, []);



  return (
  
    <div
      className="flex flex-col gap-[5vh] justify-around mt-[5vh] w-[80vw] p-[5vw] m-auto"
      id={styles.shadow3}
    >
     
      <Steps size="large" lineWidth={1} items={[
      {
        title: 'Order Processing',
          status:order?"finish":"process",
        icon: <RestartAltIcon
                style={{ fontSize: "30px" }}
                className=" text-[--third-color] "
              />,
      },
      {
        title: 'Order Shipped',
       status:order&&shipped?"finish":"process",
        icon: <CodeSandboxOutlined
                  style={{ fontSize: "30px" }}
                  className="text-[--third-color]"
                />,
      },
      {
        title: 'Order out for delivery',
       status:order&&shipped&&outForDelivery?"finish":"process",
        icon: <LocalShippingIcon
                  style={{ fontSize: "30px" }}
                  className="text-[--third-color]"
                />,
      },
      {
        title: 'Order nearest to u',
         status:order&&shipped&&outForDelivery&&near?"finish":"process",
        icon:  <ShareLocationRoundedIcon
                  style={{ fontSize: "30px" }}
                  className="text-[--third-color]"
                />,
      },
      {
        title: 'Order Delivered',
       status:order&&shipped&&outForDelivery&&near&&finish?"finish":"process",
        icon:  <HomeRoundedIcon
                  style={{ fontSize: "30px" }}
                  className="text-[--third-color]"
                />,
      },
    ]}/>

      {products.map((data) => {
        console.log(data.image);
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
                        console.log(img[0]);
                        return (
                          <>
                            <Image
                              src={img[0]}
                              alt="order"
                              width={100}
                              height={100}
                            />
                          </>
                        );
                      })}
                    </div>

                    <div className="grid grid-flow-col gap-[115px]">
                      {data.price.map((price) => {
                        console.log(price);
                        return (
                          <>
                            <p className="text-2xl text-slate-500">
                              &#8377;{price}
                            </p>
                          </>
                        );
                      })}
                    </div>
                  </>
                </div>

                <button className="bg-red-600 !text-white p-[8px] h-[5vh] rounded-md">
                  Cancel Order
                </button>
              </div>
              <h1 className="text-2xl pt-[5px]">Total Price:{data.total}</h1>
            </div>
          </>
        );
      })}
    </div>
  );
}

export default Orders;
